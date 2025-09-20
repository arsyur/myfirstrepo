// Configuration file for the Telegram bot
module.exports = {
    // Telegram Bot Token
    TELEGRAM_BOT_TOKEN: '8395484296:AAG2EGWRpGxSCqOfrolJjOLDGGch35YDXaI',
    
    // Server Configuration
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // Railway Configuration
    RAILWAY_STATIC_URL: process.env.RAILWAY_STATIC_URL || 'localhost:3000',
    
    // Bot Settings
    BOT_SETTINGS: {
        polling: true,
        webHook: false
    }
};

