# Как добавить логотипы клиентов

## Готово:
- Блок "КЛИЕНТЫ И ОТЗЫВЫ" полностью переработан
- Левая часть: отзыв с аватаром, именем, должностью
- Правая часть: сетка логотипов клиентов (3x2)
- Стрелки для переключения отзывов
- Активный логотип подсвечивается рамкой

## Как работает:

### Переключение отзывов:
- Стрелки < и > переключают отзывы
- При смене отзыва автоматически подсвечивается соответствующий логотип клиента
- Всего 6 отзывов от разных клиентов

### Подсветка логотипов:
- Активный логотип: цветной, с розовой рамкой
- Неактивные: черно-белые, полупрозрачные
- При hover любой логотип становится цветным

## Логотипы клиентов уже добавлены! ✨

### Текущие логотипы в SVG формате (идеальное качество!):
```
src/assets/clients/
├── cdi home.svg         (CD Home) - 65x72px
├── cokina_verde.svg     (Colina Verde) - 161x68px
├── joma.svg             (Joma) - 162x38px
├── epilbar.svg          (Epil Bar) - 70x70px
├── golban trade.svg     (Golban Trade) - 160x68px
└── getmancarr.svg       (Getmancar) - 162x35px
```

**Преимущества SVG:**
- Идеальная четкость на любом экране (даже 4K и Retina)
- Масштабируются без потери качества
- Маленький размер файлов

Все логотипы уже импортированы и используются в компоненте!

### Как заменить логотипы:

1. Замените SVG файлы в папке `src/assets/clients/`
2. Если изменились имена файлов, обновите импорты в `src/components/Clients/Clients.jsx`:

```javascript
// Импорты логотипов (SVG для идеального качества)
import cdHomeLogo from '../../assets/clients/cdi home.svg';
import colinaVerdeLogo from '../../assets/clients/cokina_verde.svg';
import jomaLogo from '../../assets/clients/joma.svg';
import epilBarLogo from '../../assets/clients/epilbar.svg';
import golbanTradeLogo from '../../assets/clients/golban trade.svg';
import getmancarLogo from '../../assets/clients/getmancarr.svg';

// Массив clients:
const clients = [
  { name: 'CD Home', logo: cdHomeLogo },
  { name: 'Colina Verde', logo: colinaVerdeLogo },
  { name: 'Joma', logo: jomaLogo },
  { name: 'Epil Bar', logo: epilBarLogo },
  { name: 'Golban Trade', logo: golbanTradeLogo },
  { name: 'Getmancar', logo: getmancarLogo }
];
```

### Вариант 2: Использовать папку public

1. Создайте папку `public/clients/`
2. Поместите туда логотипы
3. Обновите массив clients:

```javascript
const clients = [
  { name: 'CD Home', logo: '/clients/cd-home.png' },
  { name: 'Colina Verde', logo: '/clients/colina-verde.png' },
  { name: 'Joma', logo: '/clients/joma.png' },
  { name: 'Epil Bar', logo: '/clients/epil-bar.png' },
  { name: 'Golban Trade', logo: '/clients/golban-trade.png' },
  { name: 'Getmancar', logo: '/clients/getmancar.png' }
];
```

## Как редактировать отзывы:

В файле `src/components/Clients/Clients.jsx` найдите массив `testimonials`:

```javascript
const testimonials = [
  {
    name: 'ИМЯ ФАМИЛИЯ',              // Имя автора отзыва
    position: 'Должность',             // Должность (SEO, CEO, Director)
    company: 'Название компании',      // Название компании
    text: 'Текст отзыва...',          // Полный текст отзыва
    clientIndex: 0                     // Индекс логотипа (0-5)
  },
  // ...остальные отзывы
];
```

### Параметры отзыва:
- **name**: Имя и фамилия автора (заглавными буквами)
- **position**: Должность автора
- **company**: Название компании клиента
- **text**: Текст отзыва (рекомендуемая длина 200-300 символов)
- **clientIndex**: Номер логотипа (0-5), который будет подсвечиваться

## Рекомендации по логотипам:

- **Формат**: PNG с прозрачным фоном
- **Размер**: 150x80px или пропорциональный
- **Цвет**: Можно любой (будет автоматически черно-белым для неактивных)
- **Качество**: Высокое разрешение для четкости

## Эффекты:

1. **Активный логотип**:
   - Цветной
   - Розовая рамка (3px solid #ec4899)
   - Тень (box-shadow)
   - Увеличен (scale 1.05)

2. **Неактивные логотипы**:
   - Черно-белые (grayscale 100%)
   - Полупрозрачные (opacity 0.6)

3. **При hover**:
   - Логотип становится цветным
   - Увеличивается

Готово! Просто замени URL на свои логотипы, и все заработает!
