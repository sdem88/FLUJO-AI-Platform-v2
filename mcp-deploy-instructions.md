# 🚀 MCP АВТОМАТИЧЕСКИЙ ДЕПЛОЙ FLUJO

## ⚡ СУПЕР-БЫСТРЫЙ ЗАПУСК (30 СЕКУНД!)

### Вариант 1: Через FLUJO интерфейс

1. **Запустите FLUJO:**
   ```bash
   cd "/Users/sergeidemchuk/кодинг/FLUJO"
   npm run dev
   ```

2. **Откройте http://localhost:4200**

3. **Найдите шаблон "⚡ MCP Быстрый деплой"**

4. **Заполните 4 поля:**
   - GitHub username: `ваш_username`
   - Ваше имя: `Ваше Имя`
   - Email: `ваш@email.com`
   - Google API ключ: получите [здесь](https://aistudio.google.com/app/apikey) (бесплатно!)

5. **Нажмите "Запустить"** 🚀

**ВСЁ! Через 3 минуты ваше приложение будет в облаке!**

---

## Вариант 2: Через MCP команды напрямую

Если хотите больше контроля:

### Пошаговый деплой:

```javascript
// 1. Проверка требований
mcp.call('deployment', 'check_prerequisites', {})

// 2. Настройка Git
mcp.call('deployment', 'setup_git_config', {
  username: 'Ваше Имя',
  email: 'ваш@email.com'
})

// 3. Создание GitHub репозитория
mcp.call('deployment', 'create_github_repo', {
  github_username: 'ваш_username',
  repo_name: 'FLUJO'
})

// 4. Деплой в Railway
mcp.call('deployment', 'deploy_to_railway', {
  auto_open: true
})

// 5. Добавление API ключей
mcp.call('deployment', 'setup_environment_variables', {
  variables: {
    GOOGLE_API_KEY: 'ваш_google_ключ',
    OPENAI_API_KEY: 'ваш_openai_ключ'  // опционально
  }
})

// 6. Проверка статуса
mcp.call('deployment', 'get_deployment_status', {})
```

### Автоматический деплой одной командой:

```javascript
mcp.call('deployment', 'full_deploy_automation', {
  github_username: 'ваш_username',
  git_name: 'Ваше Имя', 
  git_email: 'ваш@email.com',
  repo_name: 'FLUJO',
  api_keys: {
    GOOGLE_API_KEY: 'ваш_google_ключ'
  }
})
```

---

## 🎯 ЧТО ПРОИСХОДИТ АВТОМАТИЧЕСКИ:

✅ **Проверка системы** (Git, Node.js, npm)  
✅ **Настройка Git** с вашими данными  
✅ **Создание GitHub репозитория** (публичного)  
✅ **Загрузка кода** в GitHub  
✅ **Автоматический деплой** в Railway  
✅ **Настройка переменных** окружения  
✅ **Открытие Railway** в браузере  

## 📋 ЧТО НУЖНО:

### Обязательно:
- ✅ GitHub аккаунт
- ✅ Google API ключ (бесплатно!)

### Опционально:
- OpenAI API ключ ($10-20/мес)
- Anthropic API ключ ($10-15/мес)  
- OpenRouter API ключ

## 🔑 ПОЛУЧЕНИЕ API КЛЮЧЕЙ:

### Google Gemini (БЕСПЛАТНО!):
1. https://aistudio.google.com/app/apikey
2. Нажмите "Create API key"  
3. Копируйте ключ

### OpenAI (Платно):
1. https://platform.openai.com/api-keys
2. Создайте ключ
3. Пополните баланс $5-10

### Anthropic Claude (Платно):
1. https://console.anthropic.com/
2. Создайте API ключ  
3. Добавьте кредиты

---

## 💰 СТОИМОСТЬ:

- **Railway**: $5/месяц кредита
- **Google Gemini**: БЕСПЛАТНО 
- **OpenAI o3**: ~$0.10-0.30 за запрос
- **Claude 4**: ~$0.05-0.15 за запрос

**Начните с бесплатного Google Gemini!**

---

## 🆘 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ:

### "GitHub CLI не найден"
```bash
# Установите GitHub CLI:
brew install gh
# или скачайте: https://cli.github.com/
```

### "Ошибка авторизации GitHub"
```bash
gh auth login
# Следуйте инструкциям
```

### "Railway не открывается"
Откройте вручную ссылку из результата команды

### "API ключ не работает"
- Проверьте правильность ключа
- Убедитесь что есть кредиты/квота

---

## 🎉 ГОТОВО!

После успешного деплоя:

1. **Откройте ваше приложение** (Railway покажет URL)
2. **Пройдите мастер настройки** (2 минуты)  
3. **Выберите готовый шаблон**
4. **Создайте первую автоматизацию!**

**Теперь у вас есть собственная AI-платформа в облаке! 🚀**