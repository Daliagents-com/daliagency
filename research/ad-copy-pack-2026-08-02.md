# Dali Agents: Message Map + Ad Copy Pack

Дата: 2026-08-02.
Источники: research.csv (233 агентства, распарсено программно), ai-agency-market-refresh-2026-08.md, positioning-strategy-2026-08-02.md.
Каждый блок копирайта аннотирован основанием из рисерча (basis).
Каveат: раздел A (message map) построен на апрельском датасете - используется как корпус языка конкурентов, не как актуальный спрос; свежий рисерч (август 2026) независимо подтверждает те же пустые углы (rescue единичен, drift/evals почти не используются, deadline-urgency не продаёт никто). Разделы B и C опираются на августовские данные.

---

## A. MESSAGE MAP (выжимка из 233 компаний)

### A1. Топ повторяющихся маркетинговых слов

| # | Слово | Кол-во |
|---|---|---|
| 1 | development | 98 |
| 2 | automation | 82 |
| 3 | software | 73 |
| 4 | custom | 55 |
| 5 | digital | 51 |
| 6 | enterprise | 36 |
| 7 | solutions | 35 |
| 8 | transformation | 25 |
| 9 | free (consultation/audit/trial) | 22 |
| 10 | agentic | 21 |

Точные повторяющиеся фразы: "digital transformation" (9), "enterprise-grade" (6), "AI automation" (6), "agentic AI" (5), "Fortune 500" (5), "free consultation" (5), "measurable outcomes" (4), "production-grade" (4).
Вывод: общий словарь рынка - язык коммодити-девшопа. Заголовок из топ-10 слов = обои.

### A2. Топ-5 углов позиционирования

| # | Угол | Компаний | Доля |
|---|---|---|---|
| 1 | Credibility/scale proof (логотипы, годы, звёзды Clutch) | 109 | 47% |
| 2 | Proprietary platform / методология | 66 | 28% |
| 3 | ROI-обещания (в основном неверифицированные) | 40 | 17% |
| 4 | Скорость / no-code | 40 | 17% |
| 5 | Оффшорный кост-арбитраж | 39 | 17% |

Воронки: 71/233 вход через free consultation, 27 через free audit, только 3 через платную диагностику, 23 demo-first.
81 компания имеет retainer-апселл, но почти никто не ведёт с ops-стори.

### A3. ПУСТЫЕ УГЛЫ (главная находка - triple-zero)

| Угол | Используют | Заметка |
|---|---|---|
| «Rescue» (чиним провалившихся агентов/пилотов) | **0 / 233** | В основном датасете - ноль |
| Deprecation / EOL-миграции с urgency | **0 / 233** | 19 упоминают «migration», но это cloud/legacy, не агентные EOL |
| «Drift» (LLM drift monitoring) | 1 / 233 | Язык обоснования ретейнера 2026 - не занят |
| Evals / eval engineering | 2 / 233 | Parlance берёт $128K; средний тир пуст |
| PoC-to-production gap как named enemy | 1 / 233 | Игра Fractional, ниже enterprise не занята |
| Observability as a service | 5 / 233 | Тулинг профинансирован, сервис пуст |
| Страх / дедлайн / urgency вообще | 8 / 233 | Почти никто не продаёт против часов |
| Risk reversal / гарантии | 5 / 233 | Дешёвая дифференциация на холодном трафике |
| Done-for-you managed / «we run it» | 4 / 233 | Retainer-стори почти отсутствует в маркетинге |

Стратегическое чтение: 109 компаний кричат «поверьте, мы много построили».
Примерно ноль говорят «мы держим уже построенное работающим».
Строка Dali - «берём агентов: чужих, сломанных, депрекейтнутых - и заставляем работать в проде» - не сталкивается ни с чем в датасете из 233 компаний.

### A4. Лучшие реальные хуки из данных (красть механику, не слова)

1. «Done-for-you AI Setup in 90 Days» + money-back (theaiautomationagency) - time-boxed outcome + risk reversal.
2. «automated 8 FTEs, ROI in 30 days» (vstorm) - number-first компрессия.
3. «We build AI products that WORK» (ninetwothree) - анти-хайп одним словом.
4. «Consultants who build AI agents that work» (Focused Labs) - ближайшая к нашей территории фраза; но она про *building*, не про *keeping working* - гэп жив.
5. «MVP in 20 hours» (automation.house) - абсурдно конкретное число скорости.
6. «3-10 custom GPTs trained on YOUR data» (aismbsolutions) - счётный деливерабл.
7. «The last agency you'll ever hire» + «+700% orders» (webitmd) - фрейм облегчения.
8. «Growth squads, not agencies» (NoGood) - отказ от категории как позиционирование.
9. Sintra (252 активных ада): «If your feed is quiet, your dining room will be too»; «Clients pay for your thinking. Not your busywork».

---

## B. ГОТОВЫЕ ТЕКСТЫ

### B1. Миграционный клин - Meta/LinkedIn (дедлайн 26 августа)

**Вариант 1 - страх/дедлайн**

EN:
Primary: "On August 26 OpenAI shuts down the Assistants API. Agents built on it don't degrade gracefully - they stop. If yours is in production, you have 3 weeks. We migrate Assistants API workloads to the Responses API in 1-2 weeks, fixed price, with eval runs proving nothing broke in the cutover. No discovery calls, no 'AI transformation'. One migration, done."
Headline: "Assistants API dies Aug 26. Is your agent on it?"
CTA: "Get a 10-minute migration check"

RU:
Primary: «26 августа OpenAI отключает Assistants API. Агенты на нём не "начнут работать хуже" - они просто встанут. Если ваш в проде, у вас 3 недели. Переносим с Assistants API на Responses API за 1-2 недели, фикс-прайс, с прогоном evals до и после - чтобы было чем доказать, что ничего не сломалось. Без "стратегических сессий". Одна миграция, и закрыли вопрос.»
Headline: «Assistants API умирает 26 августа. Ваш агент на нём?»
CTA: «Проверка миграции за 10 минут»

basis: 0/233 используют deadline urgency; жёсткая EOL-дата; «book a demo» на холоде не конвертит, диагностика - да.

**Вариант 2 - математика бездействия**

EN:
Primary: "Quick math for teams still on the Assistants API. Your agent handles, say, 400 conversations a day. From Aug 27 that's 400 failed conversations a day, every day, until someone rebuilds it under fire. An emergency rebuild mid-outage costs 3-5x a planned migration and ships with no eval baseline. A planned migration is 1-2 weeks, fixed price, zero downtime cutover. The expensive option is waiting."
Headline: "Every day after Aug 26 costs more than the migration"
CTA: "Price my migration"

RU:
Primary: «Считаем для тех, кто ещё на Assistants API. Ваш агент ведёт, допустим, 400 диалогов в день. С 27 августа это 400 упавших диалогов в день - каждый день, пока кто-то в панике не перепишет всё под нагрузкой. Аварийная переделка во время простоя стоит в 3-5 раз дороже плановой миграции и уезжает в прод без evals. Плановая миграция - 1-2 недели, фикс-прайс, переключение без даунтайма. Дорогой вариант - это ждать.»
Headline: «Каждый день после 26 августа дороже самой миграции»
CTA: «Посчитать мою миграцию»

basis: loss-aversion math - доказанный креативный паттерн ниши; fixed-price снимает главное SMB-возражение (LeftClick).

**Вариант 3 - «мы проверили ваш стек» (ретаргет / тёплый список / LinkedIn 1:1)**

EN:
Primary: "We went through public GitHub repos and OpenAI forum threads and found teams that still have Assistants API calls in production paths. If that's you, we recorded a 60-second video: the exact call that dies on Aug 26, what it takes down, and the 2-week fix plan. No pitch deck. One video, one plan, one price."
Headline: "We found the call that breaks your agent on Aug 26"
CTA: "Send me my video"

RU:
Primary: «Мы прошлись по открытым репозиториям и форумам OpenAI и нашли команды, у которых вызовы Assistants API до сих пор в проде. Если это про вас - у нас записано 60-секундное видео: конкретный вызов, который умрёт 26 августа, что он утянет за собой и план фикса на 2 недели. Без презентаций. Одно видео, один план, одна цена.»
Headline: «Мы нашли вызов, который уронит вашего агента 26 августа»
CTA: «Пришлите моё видео»

basis: персонализированный видео-аудит даёт ~3x reply rate, цель 25-30% (Ciela; Intercom +19% / $120K через Loom).

### B2. Rescue-клин - объявления

**Вариант 1 - статистика провалов**

EN:
Primary: "95% of GenAI pilots never make it to production (MIT). Not because the model is bad - because nobody built the boring parts: evals, monitoring, fallbacks, cost controls. We take agents that stalled at the demo stage - yours, an ex-contractor's, a vibe-coded one - and get them to production in 2-4 weeks. Fixed price. First deliverable is a video diagnosis with the failure points priced in dollars."
Headline: "Your agent demoed great. Then it met production."
CTA: "Get the diagnosis"

RU:
Primary: «95% GenAI-пилотов не доезжают до прода (MIT). Не потому что модель плохая - потому что никто не сделал скучную часть: evals, мониторинг, fallback'и, контроль расходов. Мы берём агентов, застрявших на стадии демо - ваших, от бывшего подрядчика, навайбкоженных - и доводим до прода за 2-4 недели. Фикс-прайс. Первый результат - видео-диагностика, где каждая проблема посчитана в деньгах.»
Headline: «На демо агент был прекрасен. Потом он встретил прод.»
CTA: «Получить диагностику»

basis: «95% пилотов фейлятся» - топливо rescue-ниши (8/10); 0/233 конкурентов используют «rescue».

**Вариант 2 - split-screen before/after**

Визуал: слева «День демо» - идеальный диалог; справа «3-я неделя в проде» - выдуманный возврат, молчаливые таймауты, счёт за API x3.

EN:
Primary: "Demo day: perfect answers. Week 3: it promised a customer a refund you don't offer, timed out silently 200 times, and tripled your API bill. Nobody noticed until a customer did. We fix agents like this for a living: eval suite, monitoring, cost caps, then a monthly ops retainer so it never rots again."
Headline: "Demo day vs Week 3 in production"
CTA: "Show me what's broken"

RU:
Primary: «День демо: идеальные ответы. Третья неделя: агент пообещал клиенту возврат, которого у вас нет, молча упал по таймауту 200 раз и утроил счёт за API. Никто не заметил, пока не заметил клиент. Мы этим и занимаемся: evals, мониторинг, лимиты по косту - и дальше ops-ретейнер, чтобы это не сгнило снова.»
Headline: «День демо против третьей недели в проде»
CTA: «Показать, что сломано»

basis: split-screen - топовый документированный Meta-паттерн (Sintra, 252 ада).

**Вариант 3 - sunk-cost математика**

EN:
Primary: "You paid $30K for an agent that's right 70% of the time. That's not 70% of the value - every wrong answer in front of a customer costs trust you paid marketing dollars to build. The fix is rarely a rebuild. It's usually 2-4 weeks of evals, guardrails and monitoring on what you already own. Keep the $30K. Fix the 30%."
Headline: "Don't rebuild the $30K agent. Fix the 30% that's wrong."
CTA: "Price the fix"

RU:
Primary: «Вы заплатили $30K за агента, который прав в 70% случаев. Это не 70% ценности: каждый неверный ответ перед клиентом сжигает доверие, за которое вы уже заплатили маркетингом. Лечится это редко переписыванием с нуля. Обычно это 2-4 недели: evals, ограждения, мониторинг - поверх того, что у вас уже есть. Сохраните свои $30K. Почините свои 30%.»
Headline: «Не переписывайте агента за $30K. Почините 30%, где он врёт.»
CTA: «Оценить фикс»

basis: loss-aversion math; «монетизирует агентов, построенных другими» - ядро ops-ниши 9/10; number-first грамматика Fractional.

### B3. LinkedIn-карусель фаундера - ops-retainer стори (7 слайдов)

Структура challenge -> solution -> number; карусели - топ формат 2026; слайд 7 обязан провоцировать комментарии (весят ~15x лайков).

1. Хук: «Агентство сдало клиенту красивого AI-агента. Через полгода он тихо врал в каждом пятом ответе. Никто не смотрел.» / EN: "An agency shipped this client a beautiful AI agent. Six months later it was quietly wrong 1 answer in 5. Nobody was watching."
2. Challenge: «Подрядчик получил деньги и ушёл. Модель обновилась дважды. База знаний устарела. Промпт, который никто не версионировал, "улучшил" стажёр.»
3. Неудобная правда: «Агенты не падают с грохотом. Они дрейфуют. Узнаёте вы от клиента, из счёта или из скриншота в X.»
4. Solution (неделя 1): «Evals на реальных диалогах, алерты на дрейф, лимиты по косту, версионирование промптов. Скучно - и это осознанно.»
5. Solution (ритм): «Месячный ритм: отчёт по eval-регрессиям, одно измеримое улучшение в месяц, человек, который отвечает за цифру.»
6. Число: «Неверные ответы: 19% -> 4% за 60 дней. Кост API: -31%. Эскалации: -40%.» [ПОДСТАВИТЬ реальный кейс Dali; ничего непроверяемого не публиковать]
7. CTA-вопрос: «Кто в этом месяце присматривает за вашим агентом? Честные ответы в комменты - отвечу каждому.»

### B4. Cold DM / email + скрипт 60-сек Loom (миграционный аутрич)

**3-строчный опенер (RU):**
1. «Увидел ваш [репозиторий/пост на форуме/вакансию] - у вас вызовы Assistants API в [конкретный файл/флоу].»
2. «26 августа эту ручку отключают; флоу не "просядет" - он остановится.»
3. «Записал 60-секундное видео: что именно ломается и план фикса на 2 недели - скинуть ссылку?»

EN:
1. "Saw your [repo/forum post/job posting] - you've got Assistants API calls in [specific file/flow]."
2. "That endpoint shuts down Aug 26; that flow won't degrade, it will stop."
3. "I recorded a 60-sec video showing exactly what breaks and a 2-week fix plan - want the link?"

**Скрипт Loom (60 сек):**

- 0:00-0:10 - на экране ИХ репо/приложение, не слайды. «Привет, [имя]. Это ваш [продукт]. Я не продаю созвон - записал, что нашёл.»
- 0:10-0:25 - курсор на конкретном вызове Assistants API. «Вот этот вызов перестаёт работать 26 августа. Вместе с ним ляжет [конкретный пользовательский флоу].»
- 0:25-0:45 - долларовая математика + план. «Если этот флоу держит ~N запросов в день, с 27 августа это N отказов ежедневно. План: карта вызовов (день 1-2), перенос на Responses API (день 3-7), параллельный прогон evals, переключение без даунтайма (неделя 2). Фикс-прайс: $X.»
- 0:45-1:00 - ОДНА рекомендация, один шаг. «Даже если мы не спишемся: заморозьте изменения в этом флоу и выгрузите thread-данные - после отключения их не достать. Хотите, чтобы это сделали мы - ответьте "план", вышлю смету сегодня.»

basis: механика конвертящего аудита 2026: запись <10 мин, утечки в долларах, reverse-demo, одна рекомендация; подготовка 20-40 мин по чеклисту; цель 25-30% reply.

### B5. Шаблон Upwork-заявки (n8n / agent-build)

Правила: бид 2-5x от пола с письменным обоснованием; вести с платной scoped-диагностики; конвертить в $500/mo ретейнер при сдаче.
Контекст пола: n8n-спецы $40-100/hr, simple workflow $300-800; разрыв продаётся через reliability/ownership/monitoring.

EN:

> Hi [name] - I looked at your posting and [one specific observation]. Before building anything I'd flag [one concrete risk they haven't mentioned: rate limits on X, auth expiry on Y, no failure alerting].
>
> Step 1 I propose: a paid scoped diagnosis ($150-300, 2 days) - I map the workflow, list failure points, and give you a fixed price for the build. You keep the doc either way.
>
> On price: I'm not the cheapest bid you'll get. The $300 versions of this work until the first silent failure - no retries, no alerting, no one watching. My builds ship with error handling, run monitoring, and 30 days of stabilization included. You're paying for it to still work in month 6.
>
> After delivery, most clients keep me on a $500/mo care plan: monitoring, fixes within 24h, one improvement per month. Optional, no lock-in.
>
> Fixed price for the build after diagnosis: $[2-5x floor]. When can you share access to [specific thing]?

RU (для прямого аутрича на русском):

> Здравствуйте, [имя]. Посмотрел задачу и [конкретное наблюдение]. Сразу отмечу риск, которого нет в ТЗ: [rate limit на X / протухание токена Y / отсутствие алертов на падение].
>
> Первым шагом предлагаю платную диагностику ($150-300, 2 дня): карта воркфлоу, список точек отказа и фиксированная цена сборки. Документ остаётся у вас в любом случае.
>
> По цене: я не самый дешёвый отклик. Версия за $300 работает до первого молчаливого падения - без ретраев, алертов и присмотра. Я сдаю с обработкой ошибок, мониторингом запусков и 30 днями стабилизации. Вы платите за то, чтобы это работало и через полгода.
>
> После сдачи большинство клиентов остаются на сопровождении за $500/мес: мониторинг, фиксы в течение 24 часов, одно улучшение в месяц. Опционально, без привязки.
>
> Фикс-прайс сборки после диагностики: $[2-5x от пола]. Когда сможете дать доступ к [конкретное]?

---

## C. СТОП-ЛИСТ ФРАЗ

| Запрещено | Почему |
|---|---|
| «custom AI agents» (как позиционирование) | Рынок объявил мёртвым; AAA «100% saturated»; 55/233 ведут с «custom» |
| «AI transformation» / «digital transformation» | #1 фраза датасета; категория занята BCG X/McKinsey вниз до Catalant; мгновенно читается как коммодити |
| «cutting-edge» / «innovative» / «next-gen» | Грамматика credibility-инфляции большинства (47%); ноль информации |
| Непроверяемые revenue/ROI-клеймы | Датасет помечает их «bold unverified»; эскалация Morningside $3M->$18M - анти-пример; публиковать только числа из дашборда |
| «enterprise-grade» (без named enterprise в проде) | 6 использований в датасете - все у шопов без верифицированных деплоев; умирает на первом reference call |
| «free consultation» / «book a demo» как холодный CTA | 71/233 так входят; на холоде не конвертит; вход = диагностика с деливераблом |
| «AI-first» / «agentic AI» как самоописание | Описывает технологию, не проблему покупателя; покупатель ищет «почему мой агент галлюцинирует» |
| Меню услуг в рекламе | Правило: один клин на касание; меню - у недифференцированных 47% |
| Заимствованные статистики без источника | Одна циркулирующая («AI for Main Street Act») - вероятная фабрикация; каждое число трассируется к источнику или дашборду клиента |

---

## Ключевая находка (для стратегии)

Triple-zero: **0/233 «rescue», 0/233 deprecation urgency, 1/233 «drift»** - против 109/233, кричащих credibility/scale.
Весь копирайт выше построен как противоположность голосу большинства: дедлайн вместо legacy, диагностика вместо консультации, долларовая математика вместо ROI-прилагательных, «держим работающим» вместо «строим».
Плейсхолдеры ($X, N, числа слайда 6) заменить на первый реальный кейс Dali.
