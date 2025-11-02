# Изображения портфолио добавлены! ✨

## Готово:
- Компонент Portfolio уже настроен с желтым свечением при наведении
- При hover изображение увеличивается (zoom эффект)
- Желтая рамка светится при наведении
- Описание выезжает снизу
- **Все изображения портфолио теперь в SVG формате (идеальное качество!)**

## Текущие изображения портфолио (в папке src/assets/portfolio/):
```
src/assets/portfolio/
├── golban trade_portfolio.svg  (Golban Trade)
├── joma_portfolio.svg          (Joma)
├── heel_portfolio.svg          (Heel Cosmetics)
├── colina verde_portfolio.svg  (Colina Verde)
├── getmancar_portfolio.svg     (Getmancar Auto)
└── epilbar_portfolio.svg       (Epil Bar)
```

**Преимущества SVG:**
- Идеальная четкость на любом экране
- Масштабируются без потери качества
- Оптимальный размер файлов

### Чтобы заменить на другие изображения:

#### Вариант 1: Использовать изображения из Figma

1. Откройте ваш дизайн в Figma
2. Выберите каждое изображение портфолио
3. Экспортируйте их (правая панель → Export → PNG или JPG)
4. Сохраните с именами: `golban-trade.jpg`, `joma.jpg`, `heel.jpg`, `colina-verde.jpg`, `getmancar.jpg`, `epil-bar.jpg`
5. Поместите их в папку `rose-landing/src/assets/portfolio/`

6. Обновите файл `src/components/Portfolio/Portfolio.jsx`:

```javascript
// Добавьте импорты в начало файла
import golbanTradeImg from '../../assets/portfolio/golban-trade.jpg';
import jomaImg from '../../assets/portfolio/joma.jpg';
import heelImg from '../../assets/portfolio/heel.jpg';
import colinaVerdeImg from '../../assets/portfolio/colina-verde.jpg';
import getmancarImg from '../../assets/portfolio/getmancar.jpg';
import epilBarImg from '../../assets/portfolio/epil-bar.jpg';

// Замените URL в portfolioItems:
const portfolioItems = [
  {
    title: 'GOLBAN TRADE',
    image: golbanTradeImg,
    description: 'Cula nulla nulla platea...'
  },
  {
    title: 'JOMA',
    image: jomaImg,
    description: 'Cula nulla nulla platea...'
  },
  // и так далее...
];
```

#### Вариант 2: Использовать изображения напрямую из папки public

1. Создайте папку `rose-landing/public/portfolio/`
2. Поместите туда изображения
3. Обновите URL в `Portfolio.jsx`:

```javascript
const portfolioItems = [
  {
    title: 'GOLBAN TRADE',
    image: '/portfolio/golban-trade.jpg',
    description: '...'
  },
  // и так далее...
];
```

## Текущие эффекты при наведении:

1. **Желтое свечение** - рамка светится желтым цветом
2. **Zoom эффект** - изображение плавно увеличивается
3. **Подъем карточки** - вся карточка поднимается вверх
4. **Выезжающее описание** - текст появляется снизу с черным градиентом

## Настройка эффектов

Все эффекты настраиваются в файле `src/components/Portfolio/Portfolio.css`:

- **Цвет свечения**: строки 63-65 (сейчас желтый #ffd700)
- **Скорость анимации**: строка 59 (`transition: all 0.4s ease`)
- **Сила zoom**: строка 77 (`transform: scale(1.05)`)
- **Высота подъема**: строка 49 (`translateY(-10px)`)

## Оптимизация изображений

Для лучшей производительности:
1. Оптимизируйте размер изображений (рекомендуется 800x600px)
2. Используйте формат WebP или JPG
3. Сжимайте изображения через tinypng.com

Готово! Ваш Portfolio готов к использованию с эффектом желтого свечения при наведении!
