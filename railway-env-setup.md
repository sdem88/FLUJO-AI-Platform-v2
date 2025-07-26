# 🔧 НАСТРОЙКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ В RAILWAY

## 📋 СПИСОК ПЕРЕМЕННЫХ ДЛЯ ДОБАВЛЕНИЯ:

### 🔐 Обязательные переменные безопасности:
```bash
ENCRYPTION_KEY=generate_random_32_char_string_here
SESSION_SECRET=generate_random_session_secret_here
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 🤖 API ключи для AI моделей:
```bash
# Google Gemini (БЕСПЛАТНО!)
GOOGLE_API_KEY=your_google_api_key

# OpenAI (платно, но мощно)
OPENAI_API_KEY=your_openai_api_key

# Anthropic Claude (платно)
ANTHROPIC_API_KEY=your_anthropic_api_key

# OpenRouter (опционально)
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 🚂 Railway интеграция:
```bash
RAILWAY_API_TOKEN=df8dc119-a66a-4ba9-9f9b-d8dcfb912b6f
```

### 🐙 GitHub интеграция:
```bash
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 🎯 Настройки по умолчанию:
```bash
DEFAULT_MODEL=gemini-25-pro
DEFAULT_TEMPERATURE=0.1
DEFAULT_MAX_TOKENS=4000
NEXT_PUBLIC_API_URL=https://your-app-name.up.railway.app
```

## 📍 КАК ДОБАВИТЬ В RAILWAY:

1. **Откройте ваш проект в Railway Dashboard**
2. **Перейдите на вкладку "Variables"**
3. **Нажмите "New Variable"**
4. **Добавьте каждую переменную по одной**
5. **После добавления всех переменных нажмите "Deploy"**

## 🎯 БЫСТРЫЕ ССЫЛКИ ДЛЯ ПОЛУЧЕНИЯ API КЛЮЧЕЙ:

### Google Gemini (БЕСПЛАТНО):
https://aistudio.google.com/app/apikey

### OpenAI:
https://platform.openai.com/api-keys

### Anthropic:
https://console.anthropic.com/

## ✅ ГОТОВО!

После добавления всех переменных:
1. Дождитесь завершения deploy
2. Откройте ваше приложение
3. Пройдите мастер настройки
4. Создайте первую автоматизацию! 🚀