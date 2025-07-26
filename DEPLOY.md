# 🚀 ДЕПЛОЙ FLUJO - ИНСТРУКЦИЯ ДЛЯ ПОЛЬЗОВАТЕЛЯ

## ⚡ БЫСТРЫЙ ДЕПЛОЙ В 3 ШАГА

### 1️⃣ СОЗДАТЬ GITHUB РЕПОЗИТОРИЙ (2 мин)

```bash
# Откройте терминал в папке FLUJO
cd "/Users/sergeidemchuk/кодинг/FLUJO"

# Создайте репозиторий на GitHub.com (нажмите + → New repository)
# Назовите его "FLUJO" и сделайте публичным

# Подключите локальную папку к GitHub:
git remote add origin https://github.com/ВАШ_USERNAME/FLUJO.git
git branch -M main  
git push -u origin main
```

### 2️⃣ ДЕПЛОЙ В RAILWAY (2 мин)

1. **Идите на https://railway.app**
2. **Войдите через GitHub**
3. **Нажмите "New Project"**
4. **Выберите "Deploy from GitHub repo"**
5. **Найдите репозиторий FLUJO**
6. **Нажмите Deploy**

Railway автоматически:
- ✅ Обнаружит Next.js приложение
- ✅ Установит зависимости
- ✅ Соберет проект
- ✅ Выдаст URL вида: `https://flujo-xxxxx.up.railway.app`

### 3️⃣ ДОБАВИТЬ API КЛЮЧИ (1 мин)

В Railway Dashboard → вкладка Variables → добавьте:

```bash
# ОБЯЗАТЕЛЬНО (хотя бы один):
GOOGLE_API_KEY=ваш_google_api_ключ     # Бесплатно!
OPENAI_API_KEY=ваш_openai_ключ         # $10-20/мес
ANTHROPIC_API_KEY=ваш_claude_ключ      # $10-15/мес

# ОПЦИОНАЛЬНО:
OPENROUTER_API_KEY=ваш_openrouter_ключ
TELEGRAM_BOT_TOKEN=ваш_telegram_токен
```

### 🎯 ПОЛУЧЕНИЕ API КЛЮЧЕЙ

#### Google Gemini (БЕСПЛАТНО!)
1. Идите на https://aistudio.google.com/app/apikey
2. Нажмите "Create API key"
3. Копируйте ключ

#### OpenAI (Платно, но мощно)
1. Идите на https://platform.openai.com/api-keys
2. Создайте новый ключ
3. Пополните баланс на $5-10

#### Anthropic Claude (Платно)
1. Идите на https://console.anthropic.com/
2. Создайте API ключ
3. Добавьте кредиты

---

## 🎉 ГОТОВО!

После деплоя:
1. **Откройте ваш URL** (Railway покажет его)
2. **Пройдите мастер настройки** (2 минуты)
3. **Выберите готовый шаблон**
4. **Запустите первую автоматизацию!**

---

## 🚨 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

### Проблема: "Build failed"
```bash
# Проверьте логи в Railway Dashboard
# Обычно помогает пересборка:
git add . && git commit -m "fix" && git push
```

### Проблема: "API key invalid"
- Проверьте, что ключи добавлены в Railway Variables
- Убедитесь, что у API ключей есть доступ и кредиты

### Проблема: "App не отвечает"
- Подождите 2-3 минуты после деплоя
- Проверьте статус в Railway Dashboard

---

## 💰 СТОИМОСТЬ

- **Railway**: $5/месяц кредита (хватает на начало)
- **Google Gemini**: БЕСПЛАТНО (отличный для начала)
- **OpenAI o3**: ~$0.10-0.30 за запрос (очень мощно)
- **Claude 4**: ~$0.05-0.15 за запрос (отлично для кода)

---

## 🎯 СОВЕТ

Начните с **Google Gemini** (бесплатно), а потом добавляйте платные модели по необходимости. Одного бесплатного ключа хватит для знакомства с системой!