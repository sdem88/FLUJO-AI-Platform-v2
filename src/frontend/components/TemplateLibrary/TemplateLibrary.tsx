import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import {
  Search,
  PlayArrow,
  Download,
  Star,
  Business,
  Code,
  TrendingUp,
  Article,
  Security,
  Analytics,
  Schedule,
  Language
} from '@mui/icons-material';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  timeToSetup: string;
  uses: number;
  rating: number;
  icon: React.ReactNode;
  tags: string[];
  workflow: any;
  variables: { name: string; description: string; example: string }[];
}

const templates: Template[] = [
  {
    id: 'email-summary',
    title: 'Краткое изложение писем',
    description: 'Автоматически создает краткие выжимки из длинных email\'ов',
    category: 'business',
    difficulty: 'Легко',
    timeToSetup: '2 мин',
    uses: 1250,
    rating: 4.8,
    icon: <Business />,
    tags: ['email', 'суммаризация', 'офис'],
    variables: [
      { name: 'email_text', description: 'Текст письма для обработки', example: 'Вставьте текст письма...' }
    ],
    workflow: {
      // Готовый workflow для суммаризации
    }
  },
  {
    id: 'social-media-post',
    title: 'Посты для соцсетей',
    description: 'Создает посты для разных платформ из одной идеи',
    category: 'content',
    difficulty: 'Легко',
    timeToSetup: '1 мин',
    uses: 2100,
    rating: 4.9,
    icon: <Article />,
    tags: ['соцсети', 'контент', 'маркетинг'],
    variables: [
      { name: 'topic', description: 'Тема поста', example: 'Новый продукт компании' },
      { name: 'tone', description: 'Тон сообщения', example: 'Дружелюбный, профессиональный' }
    ],
    workflow: {}
  },
  {
    id: 'competitor-analysis',
    title: 'Анализ конкурентов',
    description: 'Исследует сайты конкурентов и составляет отчет',
    category: 'business',
    difficulty: 'Средне',
    timeToSetup: '5 мин',
    uses: 890,
    rating: 4.7,
    icon: <Analytics />,
    tags: ['конкуренты', 'анализ', 'исследование'],
    variables: [
      { name: 'competitor_urls', description: 'Ссылки на сайты конкурентов', example: 'https://competitor.com' },
      { name: 'analysis_focus', description: 'На чем сосредоточить анализ', example: 'Цены, продукты, маркетинг' }
    ],
    workflow: {}
  },
  {
    id: 'code-review',
    title: 'Ревью кода',
    description: 'Проверяет код на ошибки и предлагает улучшения',
    category: 'development',
    difficulty: 'Средне',
    timeToSetup: '3 мин',
    uses: 1750,
    rating: 4.6,
    icon: <Code />,
    tags: ['код', 'ревью', 'качество'],
    variables: [
      { name: 'code_language', description: 'Язык программирования', example: 'JavaScript, Python, etc.' },
      { name: 'code_snippet', description: 'Код для проверки', example: 'function example() {...}' }
    ],
    workflow: {}
  },
  {
    id: 'crypto-alert',
    title: 'Крипто алерты',
    description: 'Отслеживает цены криптовалют и отправляет уведомления',
    category: 'finance',
    difficulty: 'Средне',
    timeToSetup: '4 мин',
    uses: 650,
    rating: 4.5,
    icon: <TrendingUp />,
    tags: ['криптовалюты', 'цены', 'алерты'],
    variables: [
      { name: 'cryptocurrencies', description: 'Список криптовалют', example: 'BTC, ETH, USDT' },
      { name: 'price_threshold', description: 'Пороговая цена для алерта', example: '50000 USD' }
    ],
    workflow: {}
  },
  {
    id: 'meeting-notes',
    title: 'Конспект встреч',
    description: 'Создает структурированные заметки из записи встречи',
    category: 'business',
    difficulty: 'Легко',
    timeToSetup: '2 мин',
    uses: 980,
    rating: 4.8,
    icon: <Schedule />,
    tags: ['встречи', 'заметки', 'организация'],
    variables: [
      { name: 'meeting_transcript', description: 'Расшифровка встречи', example: 'Вставьте текст записи...' },
      { name: 'focus_areas', description: 'Ключевые области', example: 'Решения, действия, дедлайны' }
    ],
    workflow: {}
  }
];

const categories = {
  all: { label: 'Все', icon: <Star /> },
  business: { label: 'Бизнес', icon: <Business /> },
  content: { label: 'Контент', icon: <Article /> },
  development: { label: 'Разработка', icon: <Code /> },
  finance: { label: 'Финансы', icon: <TrendingUp /> },
  security: { label: 'Безопасность', icon: <Security /> }
};

export const TemplateLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [setupDialogOpen, setSetupDialogOpen] = useState(false);
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setTemplateVariables({});
    setSetupDialogOpen(true);
  };

  const handleSetupTemplate = () => {
    // Здесь будет логика создания workflow из шаблона
    console.log('Creating workflow from template:', selectedTemplate?.id, templateVariables);
    setSetupDialogOpen(false);
    setSelectedTemplate(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'success';
      case 'Средне': return 'warning';
      case 'Сложно': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          📚 Библиотека шаблонов
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Готовые автоматизации для типовых задач. Просто выберите и запустите!
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Поиск шаблонов..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Categories */}
      <Tabs
        value={activeCategory}
        onChange={(_, value) => setActiveCategory(value)}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {Object.entries(categories).map(([key, category]) => (
          <Tab
            key={key}
            value={key}
            icon={category.icon}
            label={category.label}
            iconPosition="start"
          />
        ))}
      </Tabs>

      {/* Templates Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} md={6} lg={4} key={template.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  {template.icon}
                  <Typography variant="h6" component="h3">
                    {template.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{ minHeight: '40px' }}
                >
                  {template.description}
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  <Chip 
                    size="small" 
                    label={template.difficulty}
                    color={getDifficultyColor(template.difficulty) as any}
                  />
                  <Chip 
                    size="small" 
                    label={template.timeToSetup}
                    variant="outlined"
                  />
                  <Chip 
                    size="small" 
                    label={`⭐ ${template.rating}`}
                    variant="outlined"
                  />
                </Box>

                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {template.tags.slice(0, 3).map((tag) => (
                    <Chip 
                      key={tag}
                      size="small"
                      label={tag}
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>

                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  display="block" 
                  mt={1}
                >
                  Использовано {template.uses.toLocaleString()} раз
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={() => handleUseTemplate(template)}
                  fullWidth
                >
                  Использовать
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredTemplates.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            Шаблоны не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Попробуйте изменить поисковый запрос или категорию
          </Typography>
        </Box>
      )}

      {/* Setup Dialog */}
      <Dialog 
        open={setupDialogOpen} 
        onClose={() => setSetupDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Настройка шаблона: {selectedTemplate?.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            {selectedTemplate?.description}
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Заполните параметры ниже. Это займет {selectedTemplate?.timeToSetup}
          </Alert>

          {selectedTemplate?.variables.map((variable, index) => (
            <FormControl fullWidth margin="normal" key={variable.name}>
              <InputLabel>{variable.description}</InputLabel>
              <OutlinedInput
                label={variable.description}
                placeholder={variable.example}
                value={templateVariables[variable.name] || ''}
                onChange={(e) => setTemplateVariables(prev => ({
                  ...prev,
                  [variable.name]: e.target.value
                }))}
                multiline={variable.name.includes('text') || variable.name.includes('snippet')}
                rows={variable.name.includes('text') || variable.name.includes('snippet') ? 4 : 1}
              />
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSetupDialogOpen(false)}>
            Отмена
          </Button>
          <Button 
            variant="contained"
            onClick={handleSetupTemplate}
            disabled={selectedTemplate?.variables.some(v => !templateVariables[v.name])}
          >
            Создать автоматизацию
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};