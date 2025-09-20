# 🚀 Загрузка проекта в GitHub

## Пошаговая инструкция

### 1. Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите **"New repository"** (зеленая кнопка)
3. Заполните данные:
   - **Repository name**: `bork-mop-website`
   - **Description**: `BORK УЛЬТРА ШВАБРА V2 B750002 - Landing page with Telegram bot`
   - Выберите **Public** или **Private**
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license"
4. Нажмите **"Create repository"**

### 2. Загрузка файлов через веб-интерфейс

1. На странице созданного репозитория нажмите **"uploading an existing file"**
2. Перетащите все файлы из папки `mop-website/`:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `mop-image.png` ✅ (уже есть!)
   - `vercel.json`
   - `package.json`
   - `IMAGE_SETUP.md`

3. В поле **"Commit changes"** введите: `Add BORK mop website files`
4. Нажмите **"Commit changes"**

### 3. Создание отдельного репозитория для Telegram бота

1. Создайте еще один репозиторий: `bork-telegram-bot`
2. Загрузите файлы из папки `telegram-bot/`:
   - `bot.js`
   - `config.js`
   - `package.json`
   - `railway.json`
   - `README.md`
   - `DEPLOYMENT.md`

### 4. Альтернативный способ - через Git Bash (если установлен)

```bash
# Для сайта
cd mop-website
git init
git add .
git commit -m "Initial commit: BORK mop website"
git branch -M main
git remote add origin https://github.com/yourusername/bork-mop-website.git
git push -u origin main

# Для бота (в новой папке)
cd ../telegram-bot
git init
git add .
git commit -m "Initial commit: Telegram bot for mop orders"
git branch -M main
git remote add origin https://github.com/yourusername/bork-telegram-bot.git
git push -u origin main
```

## 📁 Структура репозиториев

### Репозиторий 1: `bork-mop-website`
```
├── index.html
├── styles.css
├── script.js
├── mop-image.png ✅
├── vercel.json
├── package.json
└── IMAGE_SETUP.md
```

### Репозиторий 2: `bork-telegram-bot`
```
├── bot.js
├── config.js
├── package.json
├── railway.json
├── README.md
└── DEPLOYMENT.md
```

## 🔗 Следующие шаги

После загрузки в GitHub:

1. **Разверните сайт на Vercel:**
   - Подключите репозиторий `bork-mop-website` к Vercel
   - Vercel автоматически развернет сайт

2. **Разверните бота на Railway:**
   - Подключите репозиторий `bork-telegram-bot` к Railway
   - Установите переменную `TELEGRAM_BOT_TOKEN`
   - Получите URL приложения

3. **Обновите URL бота в сайте:**
   - В файле `script.js` замените URL на реальный от Railway

## ✅ Готово!

После выполнения этих шагов у вас будет:
- 🌐 Сайт на Vercel
- 🤖 Telegram бот на Railway
- 📱 Полная интеграция между ними

Все файлы уже готовы к загрузке!

