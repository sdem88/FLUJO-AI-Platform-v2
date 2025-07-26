import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert
} from '@mui/material';
import { ExpandMore, Psychology, Speed, Lightbulb } from '@mui/icons-material';

interface ModelParametersGuideProps {
  open: boolean;
  onClose: () => void;
}

const parameterGuide = {
  temperature: {
    title: 'Temperature (Температура)',
    description: 'Контролирует креативность и случайность ответов',
    icon: <Psychology />,
    ranges: [
      { value: '0.0 - 0.2', label: 'Точность', description: 'Максимально точные, детерминированные ответы. Идеально для анализа, расчетов, технических задач.', color: 'success', examples: ['Анализ данных', 'Код-ревью', 'Финансовые расчеты'] },
      { value: '0.3 - 0.7', label: 'Баланс', description: 'Сбалансированное сочетание точности и креативности. Подходит для большинства задач.', color: 'primary', examples: ['Написание статей', 'Ответы на вопросы', 'Планирование'] },
      { value: '0.8 - 1.0', label: 'Креативность', description: 'Максимальная креативность и разнообразие. Для творческих задач и генерации идей.', color: 'warning', examples: ['Создание контента', 'Мозговой штурм', 'Художественные тексты'] }
    ]
  },
  maxTokens: {
    title: 'Max Tokens (Максимум токенов)',
    description: 'Ограничивает длину ответа модели',
    icon: <Speed />,
    ranges: [
      { value: '500 - 1000', label: 'Краткие ответы', description: 'Для быстрых вопросов, коротких объяснений, простых задач.', color: 'info', examples: ['Быстрые ответы', 'Короткие объяснения', 'Списки'] },
      { value: '1000 - 4000', label: 'Средние ответы', description: 'Подходит для большинства задач, детальных объяснений.', color: 'primary', examples: ['Статьи', 'Подробные анализы', 'Инструкции'] },
      { value: '4000 - 8000', label: 'Длинные ответы', description: 'Для сложных задач, исследований, больших текстов.', color: 'warning', examples: ['Исследования', 'Длинные документы', 'Комплексный анализ'] }
    ]
  },
  topP: {
    title: 'Top P (Nucleus Sampling)',
    description: 'Альтернатива температуре для контроля разнообразия',
    icon: <Lightbulb />,
    ranges: [
      { value: '0.1 - 0.5', label: 'Консервативный', description: 'Выбор из наиболее вероятных вариантов. Более предсказуемые ответы.', color: 'success', examples: ['Технические задачи', 'Проверенные решения'] },
      { value: '0.6 - 0.9', label: 'Сбалансированный', description: 'Хороший баланс между предсказуемостью и разнообразием.', color: 'primary', examples: ['Большинство задач', 'Универсальное использование'] },
      { value: '0.9 - 1.0', label: 'Экспериментальный', description: 'Больше разнообразия и неожиданных решений.', color: 'warning', examples: ['Творческие задачи', 'Поиск новых подходов'] }
    ]
  }
};

const recommendedSettings = [
  {
    category: 'Анализ и исследования',
    icon: '🔬',
    settings: { temperature: 0.1, maxTokens: 4000, topP: 0.3 },
    description: 'Максимальная точность для аналитических задач',
    useCases: ['Анализ данных', 'Исследования', 'Технический анализ', 'Финансовый анализ']
  },
  {
    category: 'Создание контента',
    icon: '✍️',
    settings: { temperature: 0.7, maxTokens: 2000, topP: 0.8 },
    description: 'Креативность с контролем качества',
    useCases: ['Статьи', 'Посты в соцсети', 'Маркетинговые тексты', 'Описания продуктов']
  },
  {
    category: 'Код и разработка',
    icon: '💻',
    settings: { temperature: 0.2, maxTokens: 3000, topP: 0.4 },
    description: 'Точность с минимальной креативностью',
    useCases: ['Написание кода', 'Отладка', 'Код-ревью', 'Техническая документация']
  },
  {
    category: 'Обучение и объяснения',
    icon: '🎓',
    settings: { temperature: 0.4, maxTokens: 2500, topP: 0.6 },
    description: 'Ясность с примерами и аналогиями',
    useCases: ['Объяснения', 'Обучающие материалы', 'FAQ', 'Инструкции']
  },
  {
    category: 'Мозговой штурм',
    icon: '💡',
    settings: { temperature: 0.9, maxTokens: 1500, topP: 0.9 },
    description: 'Максимальная креативность и разнообразие идей',
    useCases: ['Генерация идей', 'Творческие задачи', 'Альтернативные решения', 'Инновации']
  },
  {
    category: 'Бизнес-общение',
    icon: '💼',
    settings: { temperature: 0.3, maxTokens: 1000, topP: 0.5 },
    description: 'Профессиональный тон с четкостью',
    useCases: ['Деловые письма', 'Презентации', 'Отчеты', 'Коммуникации с клиентами']
  }
];

export const ModelParametersGuide: React.FC<ModelParametersGuideProps> = ({
  open,
  onClose
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle>
        <Typography variant="h5">
          🎯 Руководство по настройке AI моделей
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Понимание параметров для максимальной эффективности
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>Совет:</strong> Начните с рекомендованных настроек ниже, 
            затем тонко настройте параметры под свои конкретные задачи.
          </Typography>
        </Alert>

        {/* Recommended Settings */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🚀 Рекомендованные настройки по категориям
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          {recommendedSettings.map((preset, index) => (
            <Accordion 
              key={index}
              expanded={selectedPreset === preset.category}
              onChange={() => setSelectedPreset(
                selectedPreset === preset.category ? null : preset.category
              )}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h6">
                    {preset.icon} {preset.category}
                  </Typography>
                  <Chip 
                    label={`T: ${preset.settings.temperature}`} 
                    size="small" 
                    color="primary" 
                  />
                  <Chip 
                    label={`Tokens: ${preset.settings.maxTokens}`} 
                    size="small" 
                    color="secondary" 
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="body1" paragraph>
                    {preset.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Настройки:
                  </Typography>
                  <Box display="flex" gap={2} mb={2}>
                    <Chip 
                      label={`Temperature: ${preset.settings.temperature}`} 
                      color="primary" 
                    />
                    <Chip 
                      label={`Max Tokens: ${preset.settings.maxTokens}`} 
                      color="secondary" 
                    />
                    <Chip 
                      label={`Top P: ${preset.settings.topP}`} 
                      color="info" 
                    />
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Лучше всего подходит для:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {preset.useCases.map((useCase, idx) => (
                      <Chip 
                        key={idx}
                        label={useCase} 
                        variant="outlined" 
                        size="small" 
                      />
                    ))}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Detailed Parameter Guide */}
        <Typography variant="h6" gutterBottom>
          📊 Детальное руководство по параметрам
        </Typography>

        {Object.entries(parameterGuide).map(([key, param]) => (
          <Accordion key={key} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box display="flex" alignItems="center" gap={2}>
                {param.icon}
                <Typography variant="h6">{param.title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {param.description}
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Значение</TableCell>
                      <TableCell>Режим</TableCell>
                      <TableCell>Описание</TableCell>
                      <TableCell>Примеры использования</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {param.ranges.map((range, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {range.value}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={range.label} 
                            color={range.color as any} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {range.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {range.examples.map((example, exIdx) => (
                              <Chip 
                                key={exIdx}
                                label={example} 
                                variant="outlined" 
                                size="small" 
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Tips Section */}
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            💡 Профессиональные советы:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Начинайте с низкой температуры (0.1-0.3) для критически важных задач</li>
            <li>Увеличивайте температуру постепенно, если нужно больше креативности</li>
            <li>Для технических задач используйте Temperature 0.1-0.2 и Top P 0.3-0.5</li>
            <li>Для творческих задач Temperature 0.7-0.9 и Top P 0.8-0.9</li>
            <li>Max Tokens ограничивает длину, но не качество - не экономьте для сложных задач</li>
          </ul>
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Понятно, спасибо!
        </Button>
      </DialogActions>
    </Dialog>
  );
};