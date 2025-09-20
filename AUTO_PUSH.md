# 🚀 Автоматическая загрузка в GitHub

## Быстрый способ через веб-интерфейс

### 1. Создание репозитория для сайта

1. Откройте [GitHub.com](https://github.com)
2. Нажмите **"New repository"**
3. Название: `bork-mop-website`
4. Описание: `BORK УЛЬТРА ШВАБРА V2 B750002 - Landing page`
5. Выберите **Public**
6. **НЕ** ставьте галочки на README, .gitignore, license
7. Нажмите **"Create repository"**

### 2. Загрузка файлов сайта

1. На странице репозитория нажмите **"uploading an existing file"**
2. Перетащите ВСЕ файлы из папки `mop-website/`:
   - ✅ `index.html`
   - ✅ `styles.css` 
   - ✅ `script.js`
   - ✅ `mop-image.png`
   - ✅ `vercel.json`
   - ✅ `package.json`
   - ✅ `IMAGE_SETUP.md`

3. В поле **"Commit changes"** введите: `Add BORK mop website`
4. Нажмите **"Commit changes"**

### 3. Создание репозитория для бота

1. Создайте новый репозиторий: `bork-telegram-bot`
2. Загрузите ВСЕ файлы из папки `telegram-bot/`:
   - ✅ `bot.js`
   - ✅ `config.js`
   - ✅ `package.json`
   - ✅ `railway.json`
   - ✅ `README.md`
   - ✅ `DEPLOYMENT.md`

3. Commit message: `Add Telegram bot for mop orders`

## 🔗 Следующие шаги

### Развертывание сайта на Vercel:
1. Подключите репозиторий `bork-mop-website` к Vercel
2. Vercel автоматически развернет сайт

### Развертывание бота на Railway:
1. Подключите репозиторий `bork-telegram-bot` к Railway
2. Установите переменную: `TELEGRAM_BOT_TOKEN = 8395484296:AAG2EGWRpGxSCqOfrolJjOLDGGch35YDXaI`
3. Получите URL приложения

### Обновление URL в коде:
1. Откройте файл `script.js` в репозитории `bork-mop-website`
2. Замените `your-railway-app-url.railway.app` на реальный URL от Railway
3. Commit изменения

## ✅ Готово!

После выполнения этих шагов у вас будет:
- 🌐 Работающий сайт на Vercel
- 🤖 Telegram бот на Railway  
- 📱 Полная интеграция между ними

Все файлы готовы к загрузке!
