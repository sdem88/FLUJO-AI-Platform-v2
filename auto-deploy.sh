#!/bin/bash

echo "🚀 АВТОМАТИЧЕСКИЙ ДЕПЛОЙ FLUJO"
echo "=============================="

# Цвета для красивого вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода с цветом
print_step() {
    echo -e "${BLUE}[ШАГ $1]${NC} $2"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Проверка установки необходимых инструментов
check_requirements() {
    print_step "1" "Проверка требований..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git не установлен. Установите Git и попробуйте снова."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js не установлен. Установите Node.js и попробуйте снова."
        exit 1
    fi
    
    if ! command -v gh &> /dev/null; then
        print_warning "GitHub CLI не установлен. Будет использован веб-интерфейс."
        USE_GH_CLI=false
    else
        USE_GH_CLI=true
    fi
    
    print_success "Все требования выполнены"
}

# Настройка Git
setup_git() {
    print_step "2" "Настройка Git..."
    
    # Проверяем, настроен ли Git
    if ! git config user.name &> /dev/null; then
        echo "Введите ваше имя для Git:"
        read -r git_name
        git config --global user.name "$git_name"
    fi
    
    if ! git config user.email &> /dev/null; then
        echo "Введите ваш email для Git:"
        read -r git_email
        git config --global user.email "$git_email"
    fi
    
    print_success "Git настроен"
}

# Создание GitHub репозитория
create_github_repo() {
    print_step "3" "Создание GitHub репозитория..."
    
    echo "Введите имя пользователя GitHub:"
    read -r github_username
    
    echo "Введите название репозитория (по умолчанию: FLUJO):"
    read -r repo_name
    repo_name=${repo_name:-FLUJO}
    
    if [ "$USE_GH_CLI" = true ]; then
        print_step "3a" "Создание репозитория через GitHub CLI..."
        
        # Авторизация в GitHub CLI
        if ! gh auth status &> /dev/null; then
            print_step "3b" "Авторизация в GitHub..."
            gh auth login
        fi
        
        # Создание репозитория
        gh repo create "$repo_name" --public --source=. --remote=origin --push
        
        if [ $? -eq 0 ]; then
            print_success "Репозиторий создан и код загружен!"
            REPO_URL="https://github.com/$github_username/$repo_name"
        else
            print_error "Не удалось создать репозиторий через CLI"
            manual_github_setup "$github_username" "$repo_name"
        fi
    else
        manual_github_setup "$github_username" "$repo_name"
    fi
}

# Ручная настройка GitHub
manual_github_setup() {
    local username=$1
    local repo_name=$2
    
    print_step "3b" "Ручная настройка GitHub..."
    
    echo -e "${YELLOW}"
    echo "==================================================="
    echo "СОЗДАЙТЕ РЕПОЗИТОРИЙ ВРУЧНУЮ:"
    echo "==================================================="
    echo "1. Откройте https://github.com/new"
    echo "2. Название репозитория: $repo_name"
    echo "3. Сделайте публичным (Public)"
    echo "4. НЕ инициализируйте с README"
    echo "5. Нажмите 'Create repository'"
    echo "==================================================="
    echo -e "${NC}"
    
    echo "Нажмите Enter когда создадите репозиторий..."
    read -r
    
    # Настройка remote и push
    REPO_URL="https://github.com/$username/$repo_name.git"
    
    git remote remove origin 2>/dev/null || true
    git remote add origin "$REPO_URL"
    git branch -M main
    
    echo "Загружаем код в GitHub..."
    if git push -u origin main; then
        print_success "Код успешно загружен в GitHub!"
        REPO_URL="https://github.com/$username/$repo_name"
    else
        print_error "Не удалось загрузить код. Проверьте настройки репозитория."
        exit 1
    fi
}

# Деплой в Railway
deploy_to_railway() {
    print_step "4" "Деплой в Railway..."
    
    echo -e "${YELLOW}"
    echo "==================================================="
    echo "АВТОМАТИЧЕСКИЙ ДЕПЛОЙ В RAILWAY:"
    echo "==================================================="
    echo "1. Откроется страница Railway с вашим репозиторием"
    echo "2. Нажмите 'Deploy Now'"
    echo "3. Дождитесь завершения сборки"
    echo "4. Добавьте API ключи в Variables"
    echo "==================================================="
    echo -e "${NC}"
    
    # Создаем URL для автоматического деплоя
    encoded_repo_url=$(echo "$REPO_URL" | sed 's/https:\/\/github.com\///')
    railway_deploy_url="https://railway.app/new/github?template=${encoded_repo_url}"
    
    echo "Откройте эту ссылку для деплоя:"
    echo "$railway_deploy_url"
    echo ""
    
    # Пытаемся открыть автоматически
    if command -v open &> /dev/null; then
        echo "Открываю Railway в браузере..."
        open "$railway_deploy_url"
    elif command -v xdg-open &> /dev/null; then
        echo "Открываю Railway в браузере..."
        xdg-open "$railway_deploy_url"
    else
        echo "Скопируйте и вставьте ссылку в браузер"
    fi
    
    echo ""
    echo "Нажмите Enter после завершения деплоя..."
    read -r
}

# Настройка API ключей
setup_api_keys() {
    print_step "5" "Настройка API ключей..."
    
    echo -e "${YELLOW}"
    echo "==================================================="
    echo "ДОБАВЬТЕ API КЛЮЧИ В RAILWAY:"
    echo "==================================================="
    echo "В Railway Dashboard → Variables → добавьте:"
    echo ""
    echo "GOOGLE_API_KEY=ваш_ключ     (БЕСПЛАТНО)"
    echo "OPENAI_API_KEY=ваш_ключ     (Платно)"
    echo "ANTHROPIC_API_KEY=ваш_ключ  (Платно)"
    echo ""
    echo "Получить Google API ключ (бесплатно):"
    echo "https://aistudio.google.com/app/apikey"
    echo "==================================================="
    echo -e "${NC}"
    
    # Пытаемся открыть Google AI Studio
    if command -v open &> /dev/null; then
        echo "Открываю Google AI Studio для получения бесплатного ключа..."
        open "https://aistudio.google.com/app/apikey"
    elif command -v xdg-open &> /dev/null; then
        echo "Открываю Google AI Studio для получения бесплатного ключа..."
        xdg-open "https://aistudio.google.com/app/apikey"
    fi
    
    echo ""
    echo "Нажмите Enter после добавления ключей..."
    read -r
}

# Финальная проверка
final_check() {
    print_step "6" "Финальная проверка..."
    
    echo "Введите URL вашего приложения Railway (например: https://flujo-xxxxx.up.railway.app):"
    read -r app_url
    
    echo ""
    echo -e "${GREEN}"
    echo "🎉 ДЕПЛОЙ ЗАВЕРШЕН!"
    echo "==================="
    echo "GitHub: $REPO_URL"
    echo "Railway: $app_url"
    echo ""
    echo "Теперь вы можете:"
    echo "1. Открыть приложение: $app_url"
    echo "2. Пройти мастер настройки (2 мин)"
    echo "3. Создать первую автоматизацию!"
    echo -e "${NC}"
    
    # Пытаемся открыть приложение
    if command -v open &> /dev/null; then
        echo "Открываю ваше приложение..."
        open "$app_url"
    elif command -v xdg-open &> /dev/null; then
        echo "Открываю ваше приложение..."
        xdg-open "$app_url"
    fi
}

# Основная функция
main() {
    echo "Добро пожаловать в автоматический деплой FLUJO!"
    echo "Этот скрипт поможет развернуть приложение за 5 минут."
    echo ""
    
    check_requirements
    setup_git
    create_github_repo
    deploy_to_railway
    setup_api_keys
    final_check
    
    echo ""
    print_success "Готово! FLUJO развернут и готов к использованию! 🚀"
}

# Запуск
main