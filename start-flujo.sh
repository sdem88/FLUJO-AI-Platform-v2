#!/bin/bash

echo "🚀 Запуск FLUJO - Продвинутая AI Оркестрация"
echo "============================================="

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js версии 18 или выше"
    exit 1
fi

# Проверяем версию Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Требуется Node.js версии 18 или выше. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) обнаружен"

# Переходим в директорию FLUJO
cd "$(dirname "$0")"
echo "📁 Рабочая директория: $(pwd)"

# Проверяем наличие зависимостей
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Ошибка установки зависимостей"
        exit 1
    fi
fi

# Проверяем наличие .env файла
if [ ! -f ".env" ]; then
    echo "⚠️  Файл .env не найден. Создайте его и добавьте API ключи"
    echo "Пример содержимого:"
    echo "OPENAI_API_KEY=your_openai_api_key_here"
    echo "ANTHROPIC_API_KEY=your_anthropic_api_key_here"
    echo "GOOGLE_API_KEY=your_google_api_key_here"
fi

# Собираем MCP серверы
echo "🔧 Сборка MCP серверов..."
cd mcp-servers/servers
npm run build 2>/dev/null || echo "⚠️  Некоторые MCP серверы не были собраны"
cd ../..

# Запускаем сервер
echo "🚀 Запуск FLUJO на порту 4200..."
echo "🌐 Откройте http://localhost:4200 в браузере"
echo ""
echo "Полезные команды:"
echo "- npm run dev      - Режим разработки с hot reload"
echo "- npm run build    - Сборка для продакшена"
echo "- npm run start    - Запуск продакшен сервера"
echo ""

# Запускаем в режиме разработки
npm run dev