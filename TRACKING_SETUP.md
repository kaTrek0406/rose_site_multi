# Настройка Cookie Consent и Tracking

## Обзор

Система cookie consent реализована и готова к использованию. Все необходимые компоненты установлены и настроены.

## Как это работает

1. **Cookie Consent Banner**
   - Появляется при первом посещении сайта (через 1 секунду после загрузки)
   - Пользователь может принять или отклонить использование cookies
   - Выбор сохраняется в localStorage браузера
   - Баннер больше не показывается после выбора

2. **Хранение данных**
   - `cookieConsent`: 'accepted' или 'declined'
   - `cookieConsentDate`: дата и время принятия решения
   - Данные хранятся в localStorage браузера пользователя

3. **Tracking инициализация**
   - Если пользователь принял cookies (`accepted`), автоматически инициализируются tracking скрипты
   - Если отклонил (`declined`), tracking не загружается

## Как добавить Google Analytics

1. Получите ваш Measurement ID из Google Analytics (формат: `G-XXXXXXXXXX`)

2. Откройте файл `/src/utils/tracking.js`

3. Найдите функцию `initializeTracking()` и раскомментируйте строку:
   ```javascript
   initGoogleAnalytics('G-XXXXXXXXXX'); // Замените на ваш ID
   ```

4. Пример:
   ```javascript
   export const initializeTracking = () => {
     const consent = localStorage.getItem('cookieConsent');

     if (consent === 'accepted') {
       initGoogleAnalytics('G-ABC123XYZ'); // Ваш реальный ID
     }
   };
   ```

## Как добавить Facebook Pixel

1. Получите ваш Facebook Pixel ID из Business Manager

2. Откройте файл `/src/utils/tracking.js`

3. Найдите функцию `initializeTracking()` и раскомментируйте строку:
   ```javascript
   initFacebookPixel('XXXXXXXXXXXXXXX'); // Замените на ваш Pixel ID
   ```

4. Пример:
   ```javascript
   export const initializeTracking = () => {
     const consent = localStorage.getItem('cookieConsent');

     if (consent === 'accepted') {
       initGoogleAnalytics('G-ABC123XYZ');
       initFacebookPixel('123456789012345'); // Ваш реальный Pixel ID
     }
   };
   ```

## Доступные функции для tracking

### Отслеживание событий
```javascript
import { trackEvent } from './utils/tracking';

// Отследить кастомное событие
trackEvent('button_click', { button_name: 'CTA Button' });
```

### Отслеживание отправки формы
```javascript
import { trackFormSubmission } from './utils/tracking';

// При отправке формы
trackFormSubmission('contact_form');
```

### Отслеживание кликов по кнопкам
```javascript
import { trackButtonClick } from './utils/tracking';

// При клике на кнопку
trackButtonClick('start_project');
```

### Проверка разрешения на tracking
```javascript
import { isTrackingAllowed } from './utils/tracking';

if (isTrackingAllowed()) {
  // Выполнить действие, требующее tracking
}
```

## Соответствие GDPR

Реализация полностью соответствует требованиям GDPR:

- ✅ Пользователь должен явно дать согласие
- ✅ Tracking не загружается до получения согласия
- ✅ Возможность отклонить cookies
- ✅ Anonymize IP включен для Google Analytics
- ✅ Secure и SameSite флаги для cookies
- ✅ Хранение даты согласия

## Тестирование

### Проверка Cookie Consent
1. Откройте сайт в режиме инкогнито
2. Через 1 секунду должен появиться баннер внизу экрана
3. Нажмите "Принять" или "Отклонить"
4. Обновите страницу - баннер больше не должен появляться

### Проверка localStorage
1. Откройте DevTools (F12)
2. Перейдите в Application → Local Storage
3. Проверьте наличие ключей:
   - `cookieConsent`: 'accepted' или 'declined'
   - `cookieConsentDate`: дата ISO

### Проверка tracking
1. Откройте DevTools (F12) → Console
2. После принятия cookies должно появиться сообщение: "Tracking ready to initialize - add your IDs"
3. После добавления ID проверьте Network tab на наличие запросов к GA/FB

## Многоязычность

Тексты баннера переведены на два языка:
- **Русский** (RU)
- **Румынский** (RO)

Переводы находятся в `/src/translations.js`:
- `cookies.title`
- `cookies.description`
- `cookies.accept`
- `cookies.decline`

## Структура файлов

```
src/
├── components/
│   └── CookieConsent/
│       ├── CookieConsent.jsx    # Компонент баннера
│       └── CookieConsent.css    # Стили баннера
├── utils/
│   └── tracking.js              # Утилиты для tracking
├── translations.js              # Переводы
└── App.jsx                      # CookieConsent добавлен здесь
```

## Следующие шаги

1. Получите ваши tracking IDs (Google Analytics, Facebook Pixel)
2. Добавьте их в `/src/utils/tracking.js`
3. Протестируйте работу на production
4. Проверьте, что события корректно отправляются в GA/FB

## Важно

⚠️ **Не забудьте добавить Privacy Policy и Cookie Policy на сайт!**

Это обязательное требование GDPR. Добавьте ссылки на эти документы в footer или в сам cookie consent баннер.
