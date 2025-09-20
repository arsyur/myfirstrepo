const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Telegram Bot Token
const token = '8395484296:AAG2EGWRpGxSCqOfrolJjOLDGGch35YDXaI';

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

// Express app for webhook
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Your Telegram chat ID (you'll need to get this from the bot)
// You can get it by sending a message to the bot and checking the logs
let adminChatId = null;

// Bot commands and handlers
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    adminChatId = chatId; // Set admin chat ID on first start
    
    const welcomeMessage = `
🤖 *BORK Order Bot*

Добро пожаловать! Этот бот обрабатывает заказы на УЛЬТРА ШВАБРА V2 B750002.

*Доступные команды:*
/start - Запустить бота
/help - Показать помощь
/status - Статус бота

Бот готов к приему заказов! 📦
    `;
    
    bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
    console.log(`Bot started by admin: ${chatId}`);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📋 *Помощь по боту*

*Функции бота:*
• Прием заказов с сайта
• Уведомления о новых заказах
• Отслеживание статуса заказов

*Команды:*
/start - Запустить бота
/help - Показать это сообщение
/status - Проверить статус бота

*Для разработчика:*
Бот автоматически получает заказы с сайта и отправляет уведомления.
    `;
    
    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

bot.onText(/\/status/, (msg) => {
    const chatId = msg.chat.id;
    
    const statusMessage = `
✅ *Статус бота*

🟢 Бот активен
📊 Заказов обработано: ${orderCount}
🕐 Время работы: ${Math.floor(process.uptime())} секунд
💾 Память: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB

Бот готов к работе! 🚀
    `;
    
    bot.sendMessage(chatId, statusMessage, { parse_mode: 'Markdown' });
});

// Counter for orders
let orderCount = 0;

// Function to send order notification
function sendOrderNotification(orderData) {
    if (!adminChatId) {
        console.log('Admin chat ID not set yet');
        return;
    }
    
    orderCount++;
    
    const orderMessage = `
🛒 *НОВЫЙ ЗАКАЗ #${orderCount}*

📦 *Продукт:* ${orderData.product}
💰 *Цена:* ${orderData.price}

👤 *Клиент:*
• Имя: ${orderData.name}
• Телефон: ${orderData.phone}
• Email: ${orderData.email}

📍 *Доставка:*
• Адрес: ${orderData.address}
• Количество: ${orderData.quantity} шт.

💳 *Оплата:* ${orderData.payment}

📝 *Комментарии:* ${orderData.comments || 'Нет'}

🕐 *Время заказа:* ${orderData.timestamp}

---
*Статус:* Ожидает обработки ⏳
    `;
    
    // Send message with inline keyboard
    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '✅ Принять заказ', callback_data: `accept_${orderCount}` },
                    { text: '❌ Отклонить', callback_data: `reject_${orderCount}` }
                ],
                [
                    { text: '📞 Связаться с клиентом', callback_data: `contact_${orderCount}` }
                ]
            ]
        }
    };
    
    bot.sendMessage(adminChatId, orderMessage, options);
}

// Handle callback queries (button presses)
bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const chatId = message.chat.id;
    
    if (data.startsWith('accept_')) {
        const orderNum = data.split('_')[1];
        bot.answerCallbackQuery(callbackQuery.id, {
            text: `Заказ #${orderNum} принят! ✅`,
            show_alert: true
        });
        
        // Update message
        const updatedText = message.text + '\n\n✅ *ЗАКАЗ ПРИНЯТ* - ' + new Date().toLocaleString('ru-RU');
        bot.editMessageText(updatedText, {
            chat_id: chatId,
            message_id: message.message_id,
            parse_mode: 'Markdown'
        });
    }
    
    if (data.startsWith('reject_')) {
        const orderNum = data.split('_')[1];
        bot.answerCallbackQuery(callbackQuery.id, {
            text: `Заказ #${orderNum} отклонен! ❌`,
            show_alert: true
        });
        
        // Update message
        const updatedText = message.text + '\n\n❌ *ЗАКАЗ ОТКЛОНЕН* - ' + new Date().toLocaleString('ru-RU');
        bot.editMessageText(updatedText, {
            chat_id: chatId,
            message_id: message.message_id,
            parse_mode: 'Markdown'
        });
    }
    
    if (data.startsWith('contact_')) {
        const orderNum = data.split('_')[1];
        bot.answerCallbackQuery(callbackQuery.id, {
            text: `Контактная информация отправлена! 📞`,
            show_alert: true
        });
    }
});

// Express route to receive orders from website
app.post('/api/order', (req, res) => {
    try {
        const orderData = req.body;
        
        // Validate required fields
        if (!orderData.name || !orderData.phone || !orderData.email || !orderData.address) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }
        
        // Send notification to Telegram
        sendOrderNotification(orderData);
        
        // Log order
        console.log('New order received:', orderData);
        
        res.json({ 
            success: true, 
            message: 'Order sent to Telegram successfully',
            orderNumber: orderCount
        });
        
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        uptime: process.uptime(),
        orders: orderCount,
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'BORK Order Bot API',
        status: 'Running',
        endpoints: {
            'POST /api/order': 'Submit new order',
            'GET /api/health': 'Health check',
            'GET /': 'API info'
        }
    });
});

// Error handling
bot.on('error', (error) => {
    console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Bot server running on port ${PORT}`);
    console.log(`📱 Telegram bot is active`);
    console.log(`🌐 API available at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down bot...');
    bot.stopPolling();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Shutting down bot...');
    bot.stopPolling();
    process.exit(0);
});

