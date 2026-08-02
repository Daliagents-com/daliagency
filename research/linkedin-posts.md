# LinkedIn Posts x4 - Draft Pack (B7)

Дата: 2026-08-02.
Цель: комментарии, не лайки; каждый пост заканчивается конкретным вопросом.
Основание: ad-copy-pack-2026-08-02.md (A3 triple-zero, B3 карусель, стоп-лист C), positioning-strategy-2026-08-02.md (разд. 4, 11), ai-agency-market-refresh-2026-08.md.
Порядок публикации: Post 3 первым (дедлайн 26.08 ближайший), затем 1, 2; Post 4 только после C1.

---

## Post 1 - Research finding: the triple-zero

### EN

We analyzed 233 AI agencies. The three most important numbers were 0, 0 and 1.

0 out of 233 position around rescuing agents that failed in production.

0 out of 233 sell against a deprecation deadline, in the year OpenAI shuts down the Assistants API (Aug 26) and LangChain retires AgentExecutor (December).

1 out of 233 mentions model drift at all.

And what do 109 of them, 47% of the dataset, lead with instead? The same credibility claims: logos, years on the market, review stars, headcount.

So the entire market sells "we build agents."
Almost nobody sells "we keep your agent working."

Yet Gartner expects over 40% of agent projects to be canceled by end of 2027, and MIT found 95% of GenAI pilots never reach production.
The building side is crowded. The keeping-alive side is empty.

We are betting on the empty side.

Question for everyone shipping agents to clients: six months after the invoice is paid, who is actually watching your agent?

### RU

Мы разобрали 233 AI-агентства. Три самых важных числа: 0, 0 и 1.

0 из 233 позиционируются на спасении агентов, провалившихся в проде.

0 из 233 продают против дедлайна, и это в год, когда OpenAI отключает Assistants API (26 августа), а LangChain закрывает AgentExecutor (декабрь).

1 из 233 вообще упоминает дрейф модели.

А с чем выходят 109 из них, то есть 47% выборки? Одни и те же кредибилити-клеймы: логотипы, годы на рынке, звёзды отзывов, размер команды.

Весь рынок продаёт «мы строим агентов».
Почти никто не продаёт «мы держим вашего агента работающим».

При этом Gartner ждёт отмены более 40% агентных проектов к концу 2027, а по данным MIT 95% GenAI-пилотов не доезжают до прода.
На стороне «строить» толпа. Сторона «держать живым» пустая.

Мы ставим на пустую: rescue, миграции, ops-ретейнер.

Вопрос всем, кто сдаёт агентов клиентам: через полгода после оплаты счёта кто на самом деле смотрит за вашим агентом?

---

## Post 2 - Insight: agents do not crash, they drift

### EN

Agents do not crash loudly. They drift.

Here is the pattern practitioners describe again and again.
At launch, the agency audits 100% of the agent's output.
By week 4, about 20%.
After that, nobody looks at all.

Meanwhile the model updates twice, the knowledge base quietly goes stale, and someone "improves" a prompt nobody versioned.
The agent keeps answering, fluent and confident, now wrong in 1 answer out of 5.

No error. No alert. Nothing to page anyone about.
The client finds out from a customer, from a screenshot, or from an API bill that tripled.
In one commercial project, 28% of all commits were fixes to things the agent had already "done."

The fix is not a smarter model.
It is boring operations: evals on real conversations, drift alerts, cost caps, and a weekly report a human actually reads.
Boring is what production means.

Honest question, no judgment: when did you last audit one full day of your agent's output? This week, this month, or not since launch?

### RU

Агенты не падают с грохотом. Они дрейфуют.

Практики описывают один и тот же паттерн.
На запуске агентство проверяет 100% ответов агента.
К четвёртой неделе - около 20%.
Дальше не смотрит никто.

Тем временем модель обновилась дважды, база знаний тихо устарела, а промпт, который никто не версионировал, кто-то «улучшил».
Агент продолжает отвечать - гладко, уверенно и уже неверно в каждом пятом ответе.

Ни ошибки, ни алерта, ни повода кого-то будить.
Клиент узнаёт от своего покупателя, из скриншота или из утроившегося счёта за API.
В одном коммерческом проекте 28% всех коммитов были исправлением того, что агент уже «сделал».

Лечится это не более умной моделью.
Лечится скучной операционкой: evals на реальных диалогах, алерты на дрейф, лимиты по косту и недельный отчёт, который человек реально читает.
Прод - это и есть скучно.

Честный вопрос, без осуждения: когда вы в последний раз проверили один полный день выдачи вашего агента? На этой неделе, в этом месяце или ни разу с запуска?

---

## Post 3 - Urgent PSA: Assistants API shutdown Aug 26

### EN

On August 26, OpenAI shuts down the Assistants API. Not deprecates. Shuts down.

What breaks: /v1/assistants, /v1/threads and /v1/runs stop responding.
Agents built on them do not degrade, they stop.
Azure OpenAI is retiring its mirror too, so "we run on Azure" is not an exit.

Two things to do this week, even if you never hire anyone:

1. Freeze changes to any flow touching Assistants. A half-migrated flow failing on the 26th is worse than an untouched one.

2. Export your thread data now. After shutdown it is gone, and threads often hold the only full history of your customer conversations.

Then migrate to the Responses API on your own schedule, not during an outage.
An emergency rebuild under fire costs 3-5x a planned migration and ships with no eval baseline.

If you would rather have it handled: we do fixed-price migrations with eval runs before and after, proving nothing broke.

Where is your stack today: already migrated, migrating now, or riding it to the deadline?

### RU

26 августа OpenAI отключает Assistants API. Не депрекейтит. Отключает.

Что именно ломается: /v1/assistants, /v1/threads и /v1/runs перестают отвечать.
Агенты на них не «начнут работать хуже» - они встанут.
Azure OpenAI закрывает своё зеркало тоже, так что «мы на Azure» не спасает.

Две вещи на этой неделе, даже если вы никого не нанимаете:

1. Заморозьте изменения во всех флоу, где есть Assistants. Полумигрированный флоу, упавший 26-го, хуже нетронутого.

2. Выгрузите thread-данные сейчас. После отключения их не достать, а в тредах часто лежит единственная полная история диалогов с клиентами.

Дальше мигрируйте на Responses API по своему графику, а не посреди простоя.
Аварийная переделка под нагрузкой стоит в 3-5 раз дороже плановой миграции и уезжает в прод без eval-базлайна.

Если хочется отдать в одни руки: мы делаем фикс-прайс миграции с прогоном evals до и после, чтобы было чем доказать, что ничего не сломалось.

Где ваш стек сегодня: уже мигрировали, мигрируете сейчас или едете до дедлайна?

---

## Post 4 - Carousel outline (7 slides, ad-copy-pack B3 template)

НЕ ПУБЛИКОВАТЬ до закрытия C1: слайд 6 требует реальный кейс Dali с проверяемыми числами.
Структура B3: challenge -> solution -> number; слайд 7 обязан провоцировать комментарии.

**Slide 1 - Hook**

EN: "An agency shipped this client a beautiful AI agent. Six months later it was quietly wrong 1 answer in 5. Nobody was watching."
RU: «Агентство сдало клиенту красивого AI-агента. Через полгода он тихо врал в каждом пятом ответе. Никто не смотрел.»

**Slide 2 - Challenge**

EN: "The contractor got paid and left. The model updated twice. The knowledge base went stale. An intern 'improved' a prompt nobody had versioned."
RU: «Подрядчик получил деньги и ушёл. Модель обновилась дважды. База знаний устарела. Промпт, который никто не версионировал, "улучшил" стажёр.»

**Slide 3 - Uncomfortable truth**

EN: "Agents do not crash loudly. They drift. You find out from a customer, from an invoice, or from a screenshot on X."
RU: «Агенты не падают с грохотом. Они дрейфуют. Узнаёте вы от клиента, из счёта или из скриншота в X.»

**Slide 4 - Solution, week 1**

EN: "Evals on real conversations, drift alerts, cost caps, prompt versioning. Boring, and deliberately so."
RU: «Evals на реальных диалогах, алерты на дрейф, лимиты по косту, версионирование промптов. Скучно - и это осознанно.»

**Slide 5 - Solution, the rhythm**

EN: "The monthly rhythm: an eval-regression report, one measurable improvement per month, one person accountable for the number."
RU: «Месячный ритм: отчёт по eval-регрессиям, одно измеримое улучшение в месяц, человек, который отвечает за цифру.»

**Slide 6 - The number**

[PLACEHOLDER - first real case]
Формат из B3, заполнить числами первого кейса Dali (C1): "Wrong answers: X% -> Y% in 60 days. API cost: -Z%. Escalations: -W%." / «Неверные ответы: X% -> Y% за 60 дней. Кост API: -Z%. Эскалации: -W%.»
Примечание: НЕ публиковать карусель, пока C1 не закрыт; непроверяемые числа запрещены (стоп-лист C).

**Slide 7 - CTA question**

EN: "Who is looking after your agent this month? Honest answers in the comments, I will reply to every one."
RU: «Кто в этом месяце присматривает за вашим агентом? Честные ответы в комменты - отвечу каждому.»

---

## План публикации (предложение)

| Неделя | День | Пост |
|---|---|---|
| 1 | Пн | Post 3 (PSA: дедлайн 26.08 ближе всего, максимальная срочность) |
| 1 | Чт | Post 1 (triple-zero, рисерч-находка) |
| 2 | Вт | Post 2 (drift-инсайт, мостик к Care) |
| 2+ | после C1 | Post 4 (карусель с реальным числом на слайде 6) |
