# Установка переменных Vercel из .env

Чтобы я (или ты) мог выставить `MINIMAX_API_KEY` на Vercel без ручного ввода в браузере:

1. **Токен Vercel**  
   Зайди на https://vercel.com/account/tokens → Create → скопируй токен.

2. **Файл `.env` в корне репозитория** (рядом с `index.html`):
   ```env
   VERCEL_TOKEN=твой_токен_vercel
   MINIMAX_API_KEY=твой_ключ_minimax
   VERCEL_PROJECT_NAME=myfirstrepo
   ```
   Имя проекта — как в URL Vercel (например `myfirstrepo` или `myfirstrepo-yuhu-...`).

3. **Запуск скрипта** (один раз) в PowerShell из корня репо:
   ```powershell
   .\scripts\set-vercel-env.ps1
   ```
   Скрипт прочитает `.env` и добавит `MINIMAX_API_KEY` в проект на Vercel для production.

4. В Vercel: **Deployments → Redeploy** (или подождать авто-деплой).

Файл `.env` в `.gitignore` — в репозиторий не попадёт.
