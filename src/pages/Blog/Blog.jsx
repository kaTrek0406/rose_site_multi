import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaArrowRight, FaTag } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAssetPath } from '../../utils/assets';
import './Blog.css';

export const blogArticlesData = [
  {
    slug: 'smm-trends-2025',
    image: getAssetPath('/assets/services/smm.webp'),
    ru: {
      title: 'SMM-тренды 2025: что нужно знать бизнесу',
      excerpt: 'Искусственный интеллект, короткие видео, UGC-контент и другие тренды, которые определяют развитие социальных сетей в 2025 году.',
      category: 'Тренды',
      readTime: '8 мин',
      date: '15 января 2025',
      content: `
## Главные SMM-тренды 2025 года

Социальные сети продолжают стремительно развиваться, и каждый год приносит новые возможности для бизнеса. Рассмотрим ключевые тенденции, которые будут определять SMM в 2025 году.

### 1. Искусственный интеллект в создании контента

ИИ-инструменты стали неотъемлемой частью работы SMM-специалистов. Они помогают генерировать идеи для постов, анализировать аудиторию, создавать черновики текстов и даже подбирать оптимальное время для публикаций.

Однако важно помнить, что ИИ — это инструмент, а не замена креативной команды. Лучшие результаты достигаются, когда технологии усиливают человеческий креатив, а не заменяют его.

### 2. Короткие видео остаются в лидерах

Reels, TikTok и YouTube Shorts продолжают доминировать в лентах пользователей. Средняя продолжительность самых вовлекающих видео — 15-30 секунд. Ключ к успеху — первые 3 секунды, которые должны захватить внимание.

### 3. UGC-контент и аутентичность

Пользователи устали от идеально отполированного контента. В 2025 году побеждают бренды, которые показывают реальную жизнь: за кулисами, отзывы клиентов, неидеальные моменты. User-Generated Content повышает доверие и вовлечённость в 3-5 раз по сравнению с брендовым контентом.

### 4. Сообщества и нишевые платформы

Массовые охваты уступают место глубокому взаимодействию. Бренды создают закрытые сообщества в Telegram, Discord и Facebook Groups, где строят более тесные отношения с аудиторией.

### 5. Социальная коммерция

Покупки прямо в соцсетях становятся нормой. Instagram Shop, TikTok Shop и другие инструменты позволяют клиентам совершать покупки, не покидая платформу. Это сокращает путь от интереса до покупки.

### Что это значит для вашего бизнеса?

Адаптация к трендам — это не про слепое следование моде. Это про понимание, какие инструменты и подходы принесут максимальную пользу именно вашему бренду.

Мы в Rose Creative помогаем бизнесам интегрировать актуальные тренды в свою SMM-стратегию, сохраняя при этом уникальный голос бренда.
      `
    },
    ro: {
      title: 'Tendințe SMM 2025: ce trebuie să știe afacerile',
      excerpt: 'Inteligența artificială, video scurte, conținut UGC și alte tendințe care definesc dezvoltarea rețelelor sociale în 2025.',
      category: 'Tendințe',
      readTime: '8 min',
      date: '15 ianuarie 2025',
      content: `
## Principalele tendințe SMM ale anului 2025

Rețelele sociale continuă să se dezvolte rapid, iar fiecare an aduce noi oportunități pentru afaceri. Să analizăm tendințele cheie care vor defini SMM în 2025.

### 1. Inteligența artificială în crearea conținutului

Instrumentele IA au devenit o parte integrantă a muncii specialiștilor SMM. Ele ajută la generarea ideilor pentru postări, analiza audienței, crearea schițelor de text și chiar selectarea timpului optim pentru publicare.

Totuși, este important să reținem că IA este un instrument, nu un înlocuitor al echipei creative. Cele mai bune rezultate se obțin atunci când tehnologia amplifică creativitatea umană, nu o înlocuiește.

### 2. Videoclipurile scurte rămân lideri

Reels, TikTok și YouTube Shorts continuă să domine în feed-urile utilizatorilor. Durata medie a videoclipurilor cu cel mai mare engagement este de 15-30 secunde. Cheia succesului sunt primele 3 secunde, care trebuie să capteze atenția.

### 3. Conținut UGC și autenticitate

Utilizatorii au obosit de conținutul ideal șlefuit. În 2025 câștigă brandurile care arată viața reală: culise, recenzii ale clienților, momente imperfecte. User-Generated Content crește încrederea și engagement-ul de 3-5 ori în comparație cu conținutul de brand.

### 4. Comunități și platforme de nișă

Acoperirile în masă cedează locul interacțiunii profunde. Brandurile creează comunități închise pe Telegram, Discord și Grupuri Facebook, unde construiesc relații mai strânse cu audiența.

### 5. Comerț social

Cumpărăturile direct în rețelele sociale devin norma. Instagram Shop, TikTok Shop și alte instrumente permit clienților să facă cumpărături fără a părăsi platforma. Aceasta scurtează drumul de la interes la achiziție.

### Ce înseamnă asta pentru afacerea dvs.?

Adaptarea la tendințe nu înseamnă urmarea oarbă a modei. Înseamnă înțelegerea instrumentelor și abordărilor care vor aduce beneficii maxime brandului dvs.

Noi, la Rose Creative, ajutăm afacerile să integreze tendințele actuale în strategia lor SMM, păstrând în același timp vocea unică a brandului.
      `
    }
  },
  {
    slug: 'content-strategy-guide',
    image: getAssetPath('/assets/services/design.webp'),
    ru: {
      title: 'Как создать контент-стратегию: пошаговое руководство',
      excerpt: 'Полное руководство по созданию эффективной контент-стратегии для социальных сетей. От постановки целей до измерения результатов.',
      category: 'Стратегия',
      readTime: '12 мин',
      date: '8 января 2025',
      content: `
## Пошаговое создание контент-стратегии

Контент-стратегия — это не просто план публикаций. Это комплексный документ, который определяет, что, как, когда и зачем вы публикуете в социальных сетях.

### Шаг 1: Определите цели

Каждый пост должен работать на конкретную бизнес-цель. Типичные цели для SMM:
- Повышение узнаваемости бренда
- Генерация лидов
- Увеличение продаж
- Построение лояльного сообщества
- Привлечение трафика на сайт

### Шаг 2: Изучите аудиторию

Создайте подробные портреты ваших клиентов. Узнайте, какие социальные сети они используют, какой контент потребляют, когда активны онлайн, и какие проблемы хотят решить.

### Шаг 3: Проанализируйте конкурентов

Изучите, что публикуют ваши конкуренты. Какие посты набирают больше всего вовлечённости? Какие форматы используют? Найдите пробелы, которые вы можете заполнить.

### Шаг 4: Определите tone of voice

Голос бренда должен быть последовательным во всех каналах. Вы серьёзные или неформальные? Используете ли юмор? Обращаетесь на «ты» или на «вы»?

### Шаг 5: Создайте рубрикатор

Определите регулярные рубрики для вашего контента:
- Образовательные посты (полезные советы)
- Развлекательные (мемы, челленджи)
- Продающие (акции, товары)
- Вовлекающие (опросы, вопросы)
- Имиджевые (за кулисами, команда)

### Шаг 6: Составьте контент-план

Распределите рубрики по дням недели. Определите оптимальную частоту публикаций для каждой платформы. Подготовьте контент заранее — минимум на 2 недели вперёд.

### Шаг 7: Измеряйте и корректируйте

Отслеживайте ключевые метрики: охват, вовлечённость, клики, конверсии. Раз в месяц анализируйте результаты и корректируйте стратегию на основе данных.
      `
    },
    ro: {
      title: 'Cum să creați o strategie de conținut: ghid pas cu pas',
      excerpt: 'Ghid complet pentru crearea unei strategii eficiente de conținut pentru rețelele sociale. De la stabilirea obiectivelor până la măsurarea rezultatelor.',
      category: 'Strategie',
      readTime: '12 min',
      date: '8 ianuarie 2025',
      content: `
## Crearea pas cu pas a strategiei de conținut

Strategia de conținut nu este doar un plan de publicare. Este un document complex care definește ce, cum, când și de ce publicați în rețelele sociale.

### Pasul 1: Definiți obiectivele

Fiecare postare trebuie să servească unui obiectiv de afaceri specific. Obiective tipice pentru SMM:
- Creșterea notorietății brandului
- Generarea de lead-uri
- Creșterea vânzărilor
- Construirea unei comunități loiale
- Atragerea traficului pe site

### Pasul 2: Studiați audiența

Creați portrete detaliate ale clienților dvs. Aflați ce rețele sociale folosesc, ce conținut consumă, când sunt activi online și ce probleme vor să rezolve.

### Pasul 3: Analizați concurenții

Studiați ce publică concurenții dvs. Ce postări adună cel mai mult engagement? Ce formate folosesc? Găsiți lacunele pe care le puteți completa.

### Pasul 4: Definiți tone of voice

Vocea brandului trebuie să fie consecventă pe toate canalele. Sunteți serioși sau informali? Folosiți umor? Vă adresați cu "tu" sau "dvs."?

### Pasul 5: Creați un rubricator

Definiți rubrici regulate pentru conținutul dvs.:
- Postări educaționale (sfaturi utile)
- De divertisment (meme-uri, challenge-uri)
- De vânzare (promoții, produse)
- De implicare (sondaje, întrebări)
- De imagine (culise, echipă)

### Pasul 6: Întocmiți planul editorial

Distribuiți rubricile pe zilele săptămânii. Determinați frecvența optimă a publicărilor pentru fiecare platformă. Pregătiți conținutul în avans — minim pentru 2 săptămâni înainte.

### Pasul 7: Măsurați și ajustați

Urmăriți metricile cheie: acoperire, engagement, click-uri, conversii. O dată pe lună analizați rezultatele și ajustați strategia pe baza datelor.
      `
    }
  },
  {
    slug: 'instagram-reels-guide',
    image: getAssetPath('/assets/services/video.webp'),
    ru: {
      title: 'Instagram Reels: полный гид по созданию',
      excerpt: 'Всё, что нужно знать о создании Reels: форматы, идеи, монтаж, тренды и алгоритмы продвижения.',
      category: 'Instagram',
      readTime: '10 мин',
      date: '2 января 2025',
      content: `
## Полный гид по Instagram Reels

Reels — самый эффективный формат для органического роста в Instagram. Алгоритм активно продвигает короткие видео, и даже аккаунты с небольшой аудиторией могут получить десятки тысяч просмотров.

### Почему Reels работают

Instagram приоритизирует Reels в ленте и на странице Explore. По данным исследований, Reels получают на 67% больше вовлечённости по сравнению с обычными видео.

### Технические требования

- Вертикальный формат 9:16
- Длительность: от 3 до 90 секунд (оптимально — 15-30 секунд)
- Разрешение: 1080x1920 пикселей
- Формат файла: MP4

### Структура эффективного Reels

**Первые 3 секунды** — захват внимания (текст, неожиданное действие, вопрос).
**Основная часть** — ценность (совет, демонстрация, история).
**Финал** — призыв к действию (подписка, комментарий, сохранение).

### Идеи для Reels

1. **До/После** — трансформации всегда привлекают внимание.
2. **Обучающие** — «5 способов...», «Как я...», «Секреты...»
3. **За кулисами** — процесс работы, упаковка заказов.
4. **Тренды** — адаптация популярных аудио и шаблонов.
5. **Отзывы клиентов** — социальное доказательство.
6. **Мини-влоги** — день из жизни бизнеса.

### Советы по продвижению

- Публикуйте в пиковые часы активности вашей аудитории
- Используйте 3-5 релевантных хэштегов
- Добавляйте субтитры (85% смотрят без звука)
- Отвечайте на комментарии в первый час после публикации
- Делитесь Reels в Stories для дополнительного охвата
      `
    },
    ro: {
      title: 'Instagram Reels: ghid complet de creare',
      excerpt: 'Tot ce trebuie să știți despre crearea Reels: formate, idei, montaj, tendințe și algoritmi de promovare.',
      category: 'Instagram',
      readTime: '10 min',
      date: '2 ianuarie 2025',
      content: `
## Ghid complet Instagram Reels

Reels este cel mai eficient format pentru creșterea organică pe Instagram. Algoritmul promovează activ videoclipurile scurte, și chiar conturile cu audiență mică pot obține zeci de mii de vizualizări.

### De ce funcționează Reels

Instagram prioritizează Reels în feed și pe pagina Explore. Conform studiilor, Reels obțin cu 67% mai mult engagement comparativ cu videoclipurile obișnuite.

### Cerințe tehnice

- Format vertical 9:16
- Durata: de la 3 la 90 secunde (optim — 15-30 secunde)
- Rezoluție: 1080x1920 pixeli
- Format fișier: MP4

### Structura unui Reels eficient

**Primele 3 secunde** — captarea atenției (text, acțiune neașteptată, întrebare).
**Partea principală** — valoare (sfat, demonstrație, istorie).
**Final** — îndemn la acțiune (abonare, comentariu, salvare).

### Idei pentru Reels

1. **Înainte/După** — transformările atrag mereu atenția.
2. **Educaționale** — "5 moduri...", "Cum eu...", "Secrete..."
3. **Culise** — procesul de lucru, ambalarea comenzilor.
4. **Tendințe** — adaptarea audio și șabloanelor populare.
5. **Recenzii clienți** — dovadă socială.
6. **Mini-vloguri** — o zi din viața afacerii.

### Sfaturi de promovare

- Publicați în orele de vârf ale activității audienței dvs.
- Folosiți 3-5 hashtag-uri relevante
- Adăugați subtitrări (85% privesc fără sunet)
- Răspundeți la comentarii în prima oră după publicare
- Distribuiți Reels în Stories pentru acoperire suplimentară
      `
    }
  },
  {
    slug: 'brand-photography-tips',
    image: getAssetPath('/assets/services/photo.webp'),
    ru: {
      title: '10 правил продающей фотосъёмки для бизнеса',
      excerpt: 'Как фотографии влияют на продажи и какие правила нужно соблюдать, чтобы визуальный контент работал на ваш бренд.',
      category: 'Фотография',
      readTime: '7 мин',
      date: '25 декабря 2024',
      content: `
## 10 правил продающей фотосъёмки

Качественные фотографии — это инвестиция, которая окупается многократно. Исследования показывают, что посты с профессиональными фото получают на 94% больше вовлечённости.

### Правило 1: Единый стиль

Все фотографии вашего бренда должны быть в одном стиле: цветовая палитра, настроение, композиция. Это создаёт узнаваемую визуальную идентичность.

### Правило 2: Естественное освещение

Естественный свет делает фотографии живыми и привлекательными. Лучшее время для съёмки — утро или «золотой час» перед закатом.

### Правило 3: Правило третей

Располагайте ключевые объекты на пересечении линий третей. Это создаёт более динамичную и интересную композицию.

### Правило 4: Минимализм в фоне

Чистый, неперегруженный фон акцентирует внимание на продукте. Меньше — значит больше.

### Правило 5: Показывайте продукт в действии

Фотографии товара в контексте использования продают лучше, чем статичные снимки на белом фоне.

### Правило 6: Человеческие эмоции

Фото с людьми вызывают больше доверия и эмоционального отклика. Покажите реальных клиентов или модели, которые отражают вашу целевую аудиторию.

### Правило 7: Детали и текстуры

Макросъёмка деталей подчёркивает качество продукта и создаёт ощущение премиальности.

### Правило 8: Consistent пропорции

Используйте одинаковые пропорции для фото в ленте. Для Instagram квадрат (1:1) или вертикаль (4:5) — оптимальные форматы.

### Правило 9: Цветовое кодирование

Используйте цвета вашего бренда в фотографиях: реквизит, фоны, одежда. Это усиливает бренд-ассоциации.

### Правило 10: Инвестируйте в обработку

Ретушь и цветокоррекция — не роскошь, а необходимость. Профессиональная обработка поднимает качество фотографий на новый уровень.
      `
    },
    ro: {
      title: '10 reguli ale fotografiei de vânzare pentru afaceri',
      excerpt: 'Cum influențează fotografiile vânzările și ce reguli trebuie respectate pentru ca conținutul vizual să lucreze pentru brandul dvs.',
      category: 'Fotografie',
      readTime: '7 min',
      date: '25 decembrie 2024',
      content: `
## 10 reguli ale fotografiei de vânzare

Fotografiile de calitate sunt o investiție care se răscumpără de multe ori. Studiile arată că postările cu fotografii profesionale obțin cu 94% mai mult engagement.

### Regula 1: Stil unitar

Toate fotografiile brandului dvs. trebuie să fie în același stil: paleta de culori, dispoziția, compoziția. Aceasta creează o identitate vizuală recognoscibilă.

### Regula 2: Lumină naturală

Lumina naturală face fotografiile vii și atractive. Cel mai bun timp pentru filmare este dimineața sau "ora de aur" înainte de apus.

### Regula 3: Regula treimilor

Plasați obiectele cheie la intersecția liniilor treimilor. Aceasta creează o compoziție mai dinamică și interesantă.

### Regula 4: Minimalism în fundal

Un fundal curat, neîncărcat, accentuează atenția pe produs. Mai puțin înseamnă mai mult.

### Regula 5: Arătați produsul în acțiune

Fotografiile produsului în contextul utilizării vând mai bine decât imaginile statice pe fundal alb.

### Regula 6: Emoții umane

Fotografiile cu oameni provoacă mai multă încredere și răspuns emoțional. Arătați clienți reali sau modele care reflectă publicul dvs. țintă.

### Regula 7: Detalii și texturi

Fotografia macro a detaliilor subliniază calitatea produsului și creează o senzație de premium.

### Regula 8: Proporții consistente

Folosiți aceleași proporții pentru fotografiile din feed. Pentru Instagram pătrat (1:1) sau vertical (4:5) sunt formatele optime.

### Regula 9: Codare cromatică

Folosiți culorile brandului dvs. în fotografii: recuzită, fundaluri, haine. Aceasta întărește asocierile cu brandul.

### Regula 10: Investiți în prelucrare

Retușarea și corecția de culoare nu sunt un lux, ci o necesitate. Prelucrarea profesională ridică calitatea fotografiilor la un nou nivel.
      `
    }
  },
  {
    slug: 'target-advertising-basics',
    image: getAssetPath('/assets/services/target.webp'),
    ru: {
      title: 'Таргетированная реклама: с чего начать',
      excerpt: 'Основы таргетированной рекламы для малого бизнеса. Как настроить первую кампанию и не слить бюджет.',
      category: 'Реклама',
      readTime: '9 мин',
      date: '18 декабря 2024',
      content: `
## Таргетированная реклама: руководство для начинающих

Таргетированная реклама — один из самых эффективных каналов привлечения клиентов. Но без правильной настройки можно легко потратить бюджет впустую.

### Что такое таргет?

Таргетированная реклама — это показ рекламных объявлений конкретной аудитории на основе демографических, поведенческих и интересных данных. Вы можете показать рекламу только женщинам 25-35 лет из Кишинёва, интересующимся модой.

### С чего начать

**1. Определите цель:** Узнаваемость? Трафик на сайт? Заявки? Продажи? Каждая цель требует разных настроек кампании.

**2. Определите аудиторию:** Кто ваш идеальный клиент? Возраст, пол, местоположение, интересы, поведение. Чем точнее портрет — тем эффективнее реклама.

**3. Подготовьте креативы:** Рекламные объявления должны привлекать внимание за 1-2 секунды. Используйте яркие визуалы, чёткий оффер и понятный призыв к действию.

### Структура рекламной кампании

- **Кампания** — общая цель (трафик, конверсии)
- **Группа объявлений** — аудитория, бюджет, плейсмент
- **Объявления** — креативы и тексты

### Типичные ошибки новичков

1. Слишком широкая аудитория
2. Один креатив на всю кампанию
3. Отсутствие A/B тестирования
4. Нет посадочной страницы
5. Выключение рекламы раньше времени (нужно минимум 3-5 дней для обучения)

### Бюджет

Для тестирования рекомендуем начинать с 10-15€ в день. Этого достаточно, чтобы алгоритм собрал данные и начал оптимизировать показы.

### Когда обратиться к профессионалам?

Если вы потратили бюджет, но не получили результатов — время обратиться в агентство. Профессиональная настройка экономит в среднем 30-50% рекламного бюджета.
      `
    },
    ro: {
      title: 'Publicitate țintită: de unde să începeți',
      excerpt: 'Bazele publicității țintite pentru întreprinderile mici. Cum să configurați prima campanie și să nu risipiți bugetul.',
      category: 'Publicitate',
      readTime: '9 min',
      date: '18 decembrie 2024',
      content: `
## Publicitatea țintită: ghid pentru începători

Publicitatea țintită este unul dintre cele mai eficiente canale de atragere a clienților. Dar fără o configurare corectă, puteți risipi ușor bugetul.

### Ce este targeting-ul?

Publicitatea țintită este afișarea anunțurilor publicitare unei audiențe specifice pe baza datelor demografice, comportamentale și de interese. Puteți afișa reclama doar femeilor de 25-35 de ani din Chișinău, interesate de modă.

### De unde să începeți

**1. Definiți obiectivul:** Notorietate? Trafic pe site? Cereri? Vânzări? Fiecare obiectiv necesită setări diferite ale campaniei.

**2. Definiți audiența:** Cine este clientul dvs. ideal? Vârstă, sex, locație, interese, comportament. Cu cât portretul este mai exact — cu atât reclama este mai eficientă.

**3. Pregătiți creativele:** Anunțurile publicitare trebuie să atragă atenția în 1-2 secunde. Folosiți vizualuri luminoase, o ofertă clară și un îndemn la acțiune înțeles.

### Structura campaniei publicitare

- **Campanie** — obiectiv general (trafic, conversii)
- **Grup de anunțuri** — audiență, buget, plasare
- **Anunțuri** — creative și texte

### Greșeli tipice ale începătorilor

1. Audiență prea largă
2. Un singur creativ pentru toată campania
3. Lipsa testării A/B
4. Lipsa paginii de destinație
5. Oprirea reclamei prea devreme (sunt necesare minim 3-5 zile pentru învățare)

### Buget

Pentru testare recomandăm să începeți cu 10-15€ pe zi. Este suficient pentru ca algoritmul să adune date și să înceapă optimizarea afișărilor.

### Când să apelați la profesioniști?

Dacă ați cheltuit bugetul, dar nu ați obținut rezultate — este timpul să vă adresați unei agenții. Configurarea profesională economisește în medie 30-50% din bugetul publicitar.
      `
    }
  },
  {
    slug: 'design-for-social-media',
    image: getAssetPath('/assets/services/ilustration.webp'),
    ru: {
      title: 'Дизайн для соцсетей: основные принципы',
      excerpt: 'Как создавать визуальный контент, который привлекает внимание и повышает вовлечённость аудитории.',
      category: 'Дизайн',
      readTime: '6 мин',
      date: '10 декабря 2024',
      content: `
## Дизайн для социальных сетей: принципы, которые работают

Визуальный контент в социальных сетях — это первое, что видит ваша аудитория. У вас есть менее 2 секунд, чтобы привлечь внимание при скроллинге ленты.

### Ключевые принципы

**Контрастность.** Используйте контрастные цвета, чтобы ваш пост выделялся в ленте. Яркие акценты на нейтральном фоне работают лучше всего.

**Читаемость.** Текст на изображениях должен быть крупным и контрастным. Если текст нельзя прочитать на маленьком экране — переделывайте.

**Единый стиль.** Ваша лента должна выглядеть как единое целое. Используйте одну цветовую палитру, шрифты и стиль фотографий.

**Негативное пространство.** Не перегружайте дизайн. Свободное пространство делает композицию более профессиональной и лёгкой для восприятия.

### Размеры изображений

- Instagram пост: 1080x1080 или 1080x1350
- Stories/Reels: 1080x1920
- Facebook пост: 1200x630
- LinkedIn: 1200x627
- TikTok: 1080x1920

### Инструменты

Для профессиональной работы мы используем Adobe Creative Suite. Но если вы только начинаете, Canva — отличный инструмент для создания базовых визуалов.

### Типы визуального контента

1. Карусели с полезной информацией
2. Цитаты и мотивационные посты
3. Инфографика и статистика
4. Мемы и юмористический контент
5. Промо-баннеры и объявления
      `
    },
    ro: {
      title: 'Design pentru rețele sociale: principii de bază',
      excerpt: 'Cum să creați conținut vizual care atrage atenția și crește engagement-ul audienței.',
      category: 'Design',
      readTime: '6 min',
      date: '10 decembrie 2024',
      content: `
## Design pentru rețele sociale: principii care funcționează

Conținutul vizual în rețelele sociale este primul lucru pe care îl vede audiența dvs. Aveți mai puțin de 2 secunde pentru a atrage atenția în timpul derulării feed-ului.

### Principii cheie

**Contrast.** Folosiți culori contrastante pentru ca postarea dvs. să iasă în evidență în feed. Accentele luminoase pe un fundal neutru funcționează cel mai bine.

**Lizibilitate.** Textul pe imagini trebuie să fie mare și contrastant. Dacă textul nu poate fi citit pe un ecran mic — refaceți.

**Stil unitar.** Feed-ul dvs. trebuie să arate ca un întreg. Folosiți o paletă de culori, fonturi și stil de fotografii unic.

**Spațiu negativ.** Nu supraîncărcați designul. Spațiul liber face compoziția mai profesională și mai ușor de perceput.

### Dimensiuni imagini

- Instagram post: 1080x1080 sau 1080x1350
- Stories/Reels: 1080x1920
- Facebook post: 1200x630
- LinkedIn: 1200x627
- TikTok: 1080x1920

### Instrumente

Pentru muncă profesională folosim Adobe Creative Suite. Dar dacă sunteți la început, Canva este un instrument excelent pentru crearea vizualurilor de bază.

### Tipuri de conținut vizual

1. Carusele cu informații utile
2. Citate și postări motivaționale
3. Infografice și statistici
4. Meme-uri și conținut umoristic
5. Bannere promoționale și anunțuri
      `
    }
  }
];

const Blog = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.blog-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getArticleData = (article) => {
    const langData = article[language] || article['ru'];
    return {
      ...article,
      ...langData
    };
  };

  const featured = getArticleData(blogArticlesData[0]);
  const rest = blogArticlesData.slice(1).map(getArticleData);

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-content blog-animate">
          <span className="blog-badge">
            {language === 'ru' ? 'БЛОГ ROSE CREATIVE' : 'BLOG ROSE CREATIVE'}
          </span>
          <h1 className="blog-hero-title">
            {language === 'ru' ? 'Полезные материалы' : 'Materiale utile'} <span className="text-pink">
              {language === 'ru' ? 'о маркетинге' : 'despre marketing'}
            </span>
          </h1>
          <p className="blog-hero-subtitle">
            {language === 'ru'
              ? 'Делимся опытом, разбираем тренды и даём практические советы по продвижению бизнеса в социальных сетях'
              : 'Împărtășim experiență, analizăm tendințe și oferim sfaturi practice pentru promovarea afacerii în rețelele sociale'}
          </p>
        </div>
      </section>

      <section className="blog-featured blog-animate">
        <Link to={`/blog/${featured.slug}`} className="featured-card">
          <div className="featured-image">
            <img src={featured.image} alt={featured.title} />
            <span className="featured-badge">{featured.category}</span>
          </div>
          <div className="featured-content">
            <div className="featured-meta">
              <span>{featured.date}</span>
              <span><FaClock /> {featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="read-more">
              {language === 'ru' ? 'Читать далее' : 'Citește mai mult'} <FaArrowRight />
            </span>
          </div>
        </Link>
      </section>

      <section className="blog-grid">
        {rest.map((article, i) => (
          <Link key={article.slug} to={`/blog/${article.slug}`} className="blog-card blog-animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="blog-card-image">
              <img src={article.image} alt={article.title} />
              <span className="blog-card-category"><FaTag /> {article.category}</span>
            </div>
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span>{article.date}</span>
                <span><FaClock /> {article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span className="read-more">
                {language === 'ru' ? 'Читать далее' : 'Citește mai mult'} <FaArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Blog;
