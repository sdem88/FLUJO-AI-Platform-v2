import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  IconButton,
  Alert,
  Paper,
  Divider,
  Tooltip
} from '@mui/material';
import {
  AutoAwesome,
  PlayArrow,
  History,
  TrendingUp,
  Speed,
  CheckCircle,
  Error,
  Schedule,
  Settings,
  Help,
  Add,
  Rocket
} from '@mui/icons-material';

interface DashboardStats {
  automationsRun: number;
  timeSaved: string;
  successRate: number;
  activeAutomations: number;
}

interface RecentActivity {
  id: string;
  name: string;
  status: 'success' | 'running' | 'error';
  timestamp: Date;
  duration: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

export const SimpleDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    automationsRun: 47,
    timeSaved: '12.5 часов',
    successRate: 94,
    activeAutomations: 3
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      name: 'Анализ кода проекта',
      status: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      duration: '2 мин 15 сек'
    },
    {
      id: '2',
      name: 'Создание поста для LinkedIn',
      status: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      duration: '45 сек'
    },
    {
      id: '3',
      name: 'Мониторинг криптовалют',
      status: 'running',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      duration: 'В процессе...'
    },
    {
      id: '4',
      name: 'Суммаризация отчета',
      status: 'error',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      duration: 'Ошибка'
    }
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'analyze-text',
      title: 'Проанализировать текст',
      description: 'Быстрый анализ любого документа',
      icon: <AutoAwesome />,
      color: '#1976d2',
      action: () => console.log('Analyze text')
    },
    {
      id: 'create-content',
      title: 'Создать контент',
      description: 'Посты, статьи, письма',
      icon: <Add />,
      color: '#388e3c',
      action: () => console.log('Create content')
    },
    {
      id: 'monitor-prices',
      title: 'Отслеживать цены',
      description: 'Криптовалюты, акции, товары',
      icon: <TrendingUp />,
      color: '#f57c00',
      action: () => console.log('Monitor prices')
    },
    {
      id: 'browse-templates',
      title: 'Готовые решения',
      description: 'Библиотека шаблонов',
      icon: <Rocket />,
      color: '#7b1fa2',
      action: () => console.log('Browse templates')
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'running':
        return <Schedule color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Schedule />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'running':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} мин назад`;
    } else if (diffHours < 24) {
      return `${diffHours} ч назад`;
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  return (
    <Box>
      {/* Welcome Header */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать! 👋
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Ваша панель управления автоматизациями
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          ⚡ Быстрые действия
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action) => (
            <Grid item xs={12} sm={6} md={3} key={action.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
                onClick={action.action}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: action.color, 
                      width: 56, 
                      height: 56, 
                      mx: 'auto', 
                      mb: 2 
                    }}
                  >
                    {action.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {stats.automationsRun}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Автоматизаций запущено
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {stats.timeSaved}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Времени сэкономлено
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">
                    {stats.successRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Успешных запусков
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    {stats.activeAutomations}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Активных автоматизаций
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  📊 Последняя активность
                </Typography>
                <Button size="small" startIcon={<History />}>
                  Показать все
                </Button>
              </Box>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getStatusIcon(activity.status)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.name}
                        secondary={
                          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                            <Typography variant="caption">
                              {formatTimeAgo(activity.timestamp)}
                            </Typography>
                            <Chip
                              size="small"
                              label={activity.duration}
                              color={getStatusColor(activity.status) as any}
                              variant="outlined"
                            />
                          </Box>
                        }
                      />
                      <IconButton size="small">
                        <PlayArrow />
                      </IconButton>
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Tips Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Советы
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Попробуйте шаблон "Анализ кода" для проверки ваших проектов
              </Alert>
              <Alert severity="success">
                Настройте крипто-мониторинг для отслеживания выгодных курсов
              </Alert>
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⚡ Производительность
              </Typography>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Успешность</Typography>
                  <Typography variant="body2">{stats.successRate}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={stats.successRate} 
                  color="success"
                />
              </Box>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Скорость</Typography>
                  <Typography variant="body2">85%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  color="info"
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Средняя скорость выполнения: 1.2 мин
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Settings */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⚙️ Быстрые настройки
              </Typography>
              <Button
                fullWidth
                startIcon={<Settings />}
                variant="outlined"
                sx={{ mb: 1 }}
              >
                Настройки API
              </Button>
              <Button
                fullWidth
                startIcon={<Help />}
                variant="outlined"
              >
                Помощь
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};