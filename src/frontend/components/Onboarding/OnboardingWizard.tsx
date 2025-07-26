import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Chip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { AutoAwesome, Rocket, Security, SmartToy } from '@mui/icons-material';

interface OnboardingWizardProps {
  open: boolean;
  onClose: () => void;
  onComplete: (config: any) => void;
}

const steps = [
  'Добро пожаловать',
  'Выберите задачи',
  'Настройте AI помощников',
  'Готово к работе!'
];

const taskTemplates = [
  {
    id: 'business-analysis',
    title: 'Анализ бизнеса',
    description: 'Анализ документов, отчетов, конкурентов',
    icon: <AutoAwesome />,
    difficulty: 'Легко',
    timeToSetup: '2 минуты'
  },
  {
    id: 'content-creation',
    title: 'Создание контента',
    description: 'Тексты, посты в соцсети, статьи',
    icon: <SmartToy />,
    difficulty: 'Легко',
    timeToSetup: '1 минута'
  },
  {
    id: 'code-analysis',
    title: 'Анализ кода',
    description: 'Проверка качества кода и безопасности',
    icon: <Security />,
    difficulty: 'Средне',
    timeToSetup: '5 минут'
  },
  {
    id: 'crypto-monitoring',
    title: 'Крипто мониторинг',
    description: 'Отслеживание курсов и арбитраж',
    icon: <Rocket />,
    difficulty: 'Средне',
    timeToSetup: '3 минуты'
  }
];

const aiProviders = [
  {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    description: 'Лучший для общих задач и анализа',
    free: false,
    setup: 'Нужен API ключ (~$20/мес)'
  },
  {
    id: 'anthropic',
    name: 'Claude',
    description: 'Отличный для работы с кодом',
    free: false,
    setup: 'Нужен API ключ (~$15/мес)'
  },
  {
    id: 'google',
    name: 'Google Gemini',
    description: 'Хорош для исследований',
    free: true,
    setup: 'Бесплатный API ключ'
  },
  {
    id: 'ollama',
    name: 'Локальные модели',
    description: 'Работает без интернета',
    free: true,
    setup: 'Установка на компьютер'
  }
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  open,
  onClose,
  onComplete
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [userName, setUserName] = useState('');

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleProviderToggle = (providerId: string) => {
    setSelectedProviders(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const handleComplete = () => {
    onComplete({
      userName,
      selectedTasks,
      selectedProviders,
      apiKeys
    });
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box textAlign="center" py={4}>
            <Typography variant="h4" gutterBottom>
              🎉 Добро пожаловать в FLUJO!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Ваш личный AI-помощник для автоматизации задач
            </Typography>
            <TextField
              fullWidth
              label="Как вас зовут?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              placeholder="Введите ваше имя"
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              Мы настроим систему за 3 простых шага. Это займет всего 5 минут!
            </Alert>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Какие задачи хотите автоматизировать?
            </Typography>
            <Typography color="text.secondary" paragraph>
              Выберите одну или несколько областей. Позже можно добавить еще.
            </Typography>
            <Grid container spacing={2}>
              {taskTemplates.map((task) => (
                <Grid item xs={12} md={6} key={task.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedTasks.includes(task.id) ? 2 : 1,
                      borderColor: selectedTasks.includes(task.id) ? 'primary.main' : 'divider'
                    }}
                    onClick={() => handleTaskToggle(task.id)}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        {task.icon}
                        <Box flex={1}>
                          <Typography variant="h6">{task.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {task.description}
                          </Typography>
                          <Box display="flex" gap={1} mt={1}>
                            <Chip size="small" label={task.difficulty} />
                            <Chip size="small" label={task.timeToSetup} variant="outlined" />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Выберите AI помощников
            </Typography>
            <Typography color="text.secondary" paragraph>
              Рекомендуем начать с Google Gemini (бесплатно) или OpenAI
            </Typography>
            <Grid container spacing={2}>
              {aiProviders.map((provider) => (
                <Grid item xs={12} key={provider.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedProviders.includes(provider.id) ? 2 : 1,
                      borderColor: selectedProviders.includes(provider.id) ? 'primary.main' : 'divider'
                    }}
                    onClick={() => handleProviderToggle(provider.id)}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6">{provider.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {provider.description}
                          </Typography>
                          <Typography variant="caption" display="block" mt={1}>
                            {provider.setup}
                          </Typography>
                        </Box>
                        <Chip 
                          label={provider.free ? 'Бесплатно' : 'Платно'} 
                          color={provider.free ? 'success' : 'warning'}
                        />
                      </Box>
                      {selectedProviders.includes(provider.id) && !provider.free && (
                        <TextField
                          fullWidth
                          size="small"
                          label="API ключ"
                          value={apiKeys[provider.id] || ''}
                          onChange={(e) => setApiKeys(prev => ({
                            ...prev,
                            [provider.id]: e.target.value
                          }))}
                          margin="normal"
                          placeholder="Вставьте ваш API ключ"
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box textAlign="center" py={4}>
            <Typography variant="h4" gutterBottom>
              🚀 Все готово, {userName}!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Мы настроили для вас:
            </Typography>
            <Box my={3}>
              <Typography gutterBottom>
                📋 Задачи: {selectedTasks.length} выбрано
              </Typography>
              <Typography gutterBottom>
                🤖 AI помощники: {selectedProviders.length} настроено
              </Typography>
              <Typography gutterBottom>
                ⚡ Готовые автоматизации: {selectedTasks.length * 2} шаблонов
              </Typography>
            </Box>
            <Alert severity="success">
              Теперь можете создавать автоматизации в один клик!
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '600px' }
      }}
    >
      <DialogTitle>
        Настройка FLUJO
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {renderStepContent(activeStep)}
      </DialogContent>
      
      <DialogActions>
        <Button 
          disabled={activeStep === 0} 
          onClick={handleBack}
        >
          Назад
        </Button>
        <Box flex={1} />
        {activeStep < steps.length - 1 ? (
          <Button 
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !userName) ||
              (activeStep === 1 && selectedTasks.length === 0) ||
              (activeStep === 2 && selectedProviders.length === 0)
            }
          >
            Далее
          </Button>
        ) : (
          <Button 
            variant="contained"
            onClick={handleComplete}
            size="large"
          >
            Начать работу! 🚀
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};