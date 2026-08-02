# Central TODO (Dali)

Единый список задач по бизнесу и сайту.
Формат: `- [ ] P{0|1|2} · YYYY-MM-DD (дата добавления) · задача · (источник)`.
P0 = блокирует продажи/деньги, P1 = сильно влияет, P2 = гигиена.
Файлы `docs/seo/geo/*` остаются архивом и деталями; открытые пункты оттуда слиты сюда 2026-08-02.
При закрытии: ставить `[x]` и дату закрытия в конце строки.

---

## Продажи / каналы

- [ ] P0 · 2026-08-02 · Обновить URL во всех внешних профилях после cutover на daliagents.com: LinkedIn company (website field), Clutch, GoodFirms, Crunchbase, schema sameAs. Сейчас часть заведена на dali.agents.ge (308 redirect спасает, но бренд-строка должна быть единой) · (social-linkedin-plan.md + status.md cutover 2026-08-01)
- [ ] P1 · 2026-08-01 · Clutch: получить первый реальный отзыв клиента, опубликовать профиль · (blockers B-P1-03)
- [ ] P1 · 2026-08-01 · X (Twitter) company: пройти SMS OTP · (blockers, human-only)
- [ ] P1 · 2026-08-01 · AI Agents Directory: submit после Auth0-логина · (blockers)
- [ ] P1 · 2026-08-01 · Прошлые контакты: список 40, 5 личных сообщений в день · (find-10-clients #9, фокус 30 дней)
- [ ] P1 · 2026-08-01 · LinkedIn outbound: 20 личных заметок в день, цель 3 звонка в неделю; Sales Navigator только при 20+ outreach в неделю · (find-10-clients #1, blockers B-P1-02)
- [ ] P1 · 2026-08-01 · Upwork: обновить профиль с proof-ссылками на блог/кейсы, 5 качественных proposals в день · (find-10-clients #2)
- [ ] P1 · 2026-08-02 · Upwork: specialized profile "AI Agent Developer" + Project Catalog entry "Fixed-scope AI agent audit" (зеркалит готовую воронку audit -> fixed price из solutionContent.ts) · (рисерч каналов)
- [ ] P1 · 2026-08-02 · Upwork: saved searches + алерты на "AI agent / n8n / voice agent", отклик в первый час. Медиана найма в нише - 6 часов, критическое окно 20-30 минут; шаблонные proposals штрафуются relevance-скорингом · (рисерч каналов)
- [ ] P1 · 2026-08-02 · LinkedIn: продавать с личного профиля David (5-7x охват против company page), 3-4 поста в неделю: текст-процесс + карусель before/after + короткое демо-видео. Company page оставить для entity/GEO · (рисерч каналов)
- [ ] P1 · 2026-08-02 · LinkedIn outbound: правило "инвайт в течение 24ч после коммента" (acceptance 41-44% против 27%), максимум 15 инвайтов в день с нотой, 3 follow-up. Пункт плана "20 notes/day" устарел · (рисерч каналов)
- [ ] P2 · 2026-08-02 · Вступить в Skool-комьюнити ниши (AI Automation Agency Hub ~306k, AI Automation Society ~425k) - там субподряд, нетворк и реальные боли клиентов; ни в одном внутреннем плане не упомянуты · (рисерч каналов)
- [ ] P2 · 2026-08-02 · Facebook: зафиксировать решение "deferred, global-first". Единственный сценарий - локальный GE/AM тест (lead ads + группы) и только после демо-креатива и первого локального кейса · (рисерч каналов)
- [ ] P2 · 2026-08-01 · GBP: решить service-area vs skip (нет улицы) и залогировать решение · (blockers B-P1-05)
- [ ] P2 · 2026-08-01 · RU-директории (1 площадка) и GE/AM-директории (по 1) или явный skip · (blockers B-P1-06, B-P1-07)

## Кейсы (аудит 2026-08-02)

- [ ] P0 · 2026-08-02 · Починить OG-теги всех кейсов: сейчас og:title/og:url/og:image наследуются от главной, ссылка на кейс в proposal показывает generic-превью. Добавить openGraph блок или opengraph-image.tsx per-route в `v2/src/app/project/*/page.tsx` · (аудит кейсов)
- [ ] P0 · 2026-08-02 · Переупаковать Kora в флагманский AI-кейс: проблема, стек, метрики запусков/экономии, скриншоты агентных прогонов, честная плашка "our own product" · (аудит кейсов)
- [ ] P0 · 2026-08-02 · hub21: пустой шаблон отдаёт 200 без noindex на /project/hub21 (пустые title и h1). Снести роут или noindex как у stayandwork · (аудит кейсов)
- [ ] P0 · 2026-08-02 · Сделать 1-2 кейса по формату "проблема клиента -> решение -> до/после в цифрах -> срок -> цитата". Если клиентских AI-проектов нет, оформить внутренние автоматизации агентства с реальными замерами. Сейчас таких кейсов 0 из 8 · (аудит кейсов)
- [ ] P1 · 2026-08-02 · Дизайн-кейсы (muqta, muqtad, tamari, masuro, deliverysetup): переписать подписи в `v2/src/i18n/projectWork.ts` под угол автоматизации или скрыть по схеме stayandwork; tamari и masuro - первые кандидаты на скрытие · (аудит кейсов)
- [ ] P2 · 2026-08-02 · ColorsPanel dev-панель в прод-бандле перехватывает Ctrl+P на страницах с каруселью (`v2/src/Components/ProjectsSelect/ProjectsSelect.tsx`). Убрать из прода · (аудит кейсов)

## Маркетинг / конверсия (аудит 2026-08-02)

- [ ] P0 · 2026-08-02 · Проверить prod env: задан ли CONSULTATION_WEBHOOK_URL или RESEND_API_KEY. Если нет - лиды идут через formsubmit.co fallback, где неподтверждённый inbox = тихая потеря 100% заявок при success-экране у пользователя (`v2/src/app/api/consultation/route.ts`) · (аудит конверсии)
- [ ] P0 · 2026-08-02 · /for/upwork отдаёт 404: есть только [slug]-страницы, индекса нет. Сделать индекс или redirect на /solutions - это заявленный канал продаж · (аудит конверсии)
- [ ] P0 · 2026-08-02 · Заменить mailto на модалку консультации на всех /solutions/[slug] и в блоге, с предзаполненным interest по slug. mailto умирает в in-app браузерах LinkedIn/Facebook - основной источник трафика (`SolutionPages.tsx:142-150`, `BlogPostView.tsx:23`) · (аудит конверсии)
- [ ] P1 · 2026-08-02 · Главная: поднять AgentSolutions на позицию 01, убрать бренд-портфолио с первого экрана после hero; вторичную CTA hero "Projects" заменить на "See solutions" (`v2/src/app/page.tsx:49-52`, `Hero.tsx:49-54`) · (аудит конверсии)
- [ ] P1 · 2026-08-02 · Назвать ICP в hero: "For service businesses drowning in inbound messages and founders with AI-built MVPs" вместо абстрактного "your business"; вытащить дифференциацию (one workflow, one acceptance test, client owns IP, human gates) из глубины /solutions на главную · (аудит маркетинга)
- [ ] P1 · 2026-08-02 · Ценовой якорь: "pilot from $X, 30 days, one acceptance test" на solution-страницах + вопрос про бюджет/объём в форме. Сейчас "fixed-price" повторяется 6 раз без единой цифры · (аудит конверсии)
- [ ] P1 · 2026-08-02 · Lead magnet: vibe-code security checklist как PDF за email - второй шаг для не готовых к заявке (сейчас newsletter/subscribe/download = 0 на сайте) · (аудит конверсии)
- [ ] P1 · 2026-08-02 · Почта hello@daliagents.com вместо hello@dali.agents.ge (`v2/src/lib/contact.ts:6`) - домен почты должен совпадать с доменом сайта · (аудит маркетинга)
- [ ] P1 · 2026-08-02 · Авто-письмо лиду после submit (подтверждение + 2-3 уточняющих вопроса через Resend) и/или "book a 15-min slot" на success-экране. Сейчас лид не получает ничего, ответ обещан за сутки - для Upwork-темпа вечность · (аудит конверсии)
- [ ] P2 · 2026-08-02 · Сузить публичный список услуг с 5 линий до 2 якорей (agent systems + vibe-code rescue); GEO/SEO-услуги убрать из About (`About.tsx:31-37`) · (аудит маркетинга)
- [ ] P2 · 2026-08-02 · Единая CTA-лексика: сейчас "Start audit" / "Start a workflow audit" / "Book a free consultation" вперемешку · (аудит конверсии)
- [ ] P2 · 2026-08-02 · Футер: личные хендлы t.me/aisceptic0 и x.com/larseen66 заменить на брендовые ("aisceptic" у AI-агентства - антисигнал) (`Footer.tsx:206-226`) · (аудит маркетинга)
- [ ] P2 · 2026-08-02 · Опечатка в продающем абзаце: "fixed-scope, fixed-price fixed-scope milestone" (`solutionContent.ts:269`); client-only deferred секции главной дают "дыру" 70vh на медленном мобильном (`HomeDeferredSections.tsx`) · (аудит конверсии)

## SEO / GEO

- [ ] P0 · 2026-08-02 · GSC для daliagents.com СЕГОДНЯ (30 мин): создать `sc-domain:daliagents.com`, submit sitemap, Change of Address в старой property, Request indexing на 10 денежных URL. Домен зарегистрирован 2026-08-01, вся GSC-работа спринта (property, 11 inspects) осталась на dali.agents.ge - для канонического хоста индексация с нуля. Чек-лист уже написан в `domain-cutover-daliagents-com.md:32-34`, просто не выполнен · (SEO-аудит)
- [ ] P0 · 2026-08-02 · Стоп новым постам, углубить 10-15 денежных пиллеров. Сейчас 107 постов x 4 локали (428 URL) с медианой 227 слов, всё отгружено за 48 часов на однодневном домене - паттерн scaled thin content. Собственный плейбук ("stop shipping until GSC data", opportunities-next A4) нарушен: +55 постов ушло без данных · (SEO-аудит)
- [ ] P1 · 2026-08-02 · Entity-дизамбигуация: /about с Person JSON-LD (David Hakobyan) + disambiguatingDescription в Organization. Брендовый запрос "Dali Agents" не возвращает сайт вообще - выигрывают DALI Prolog framework и dali-agency.com (Сирия) · (SEO-аудит)
- [ ] P1 · 2026-08-02 · BOFU-страницы: hire/pricing-лендинг + один сравнительный лендинг. Сейчас коммерческие интенты кроют только инфо-посты, Tier C из opportunities-next так и не сделан · (SEO-аудит)
- [ ] P1 · 2026-08-02 · Листинги-агрегаторы: TechBehemoths + Sortlist Georgia + Clutch Georgia. Именно эти страницы Perplexity/поиск цитируют по "AI agency Tbilisi/Georgia" - там перечислены конкуренты, Dali отсутствует. Это и есть путь в AI-ответы · (SEO-аудит, mention-sites-ge-am.md)
- [ ] P1 · 2026-08-02 · AI citation baseline перезапустить под daliagents.com (brand strings в доке ещё "dali.agents.ge", единственная цитата Perplexity ведёт через редирект); добить до 10 промптов на 2 движках, проверять еженедельно · (SEO-аудит, ai-citation-baseline.md)
- [ ] P1 · 2026-08-01 · Одно earned third-party упоминание (не директория) · (opportunities-next)
- [ ] P1 · 2026-08-01 · Один original research или сильно прокачанный pillar-пост · (opportunities-next)
- [ ] P1 · 2026-08-01 · YouTube: канал + 3 видео с транскриптами, end screen на сайт, embed в подходящие посты · (youtube-scripts-batch1.md)
- [ ] P1 · 2026-08-01 · Bing: дождаться discovery после Processing, опционально IndexNow key; после cutover проверить что property смотрит на daliagents.com · (blockers B-P1-08)
- [ ] P2 · 2026-08-02 · Гигиена одним PR: lastModified в sitemap.ts (492 URL без lastmod), x-default hreflang на home/solutions, унифицировать og:title главной ("Workflow Automation" vs "Agent-First Products"), SSR html lang для локалей (сейчас `<html lang="en">` на /ru до JS), опционально llms.txt (404) · (SEO-аудит)
- [ ] P2 · 2026-08-02 · Синхронизировать леджер с реальностью: status.md "52 статьи" -> 107/локаль; blockers B-P0-02 закрыть (куплен); "Index ~55%" -> ~0% после cutover; audit-independent "276 loc" -> 492; opportunities-next B1 (robots AI-боты) закрыть как сделанное · (SEO-аудит, расхождения)
- [ ] P2 · 2026-08-01 · Weekly loop: GSC queries, rewrite позиций 11-20, Request indexing на новые посты · (status.md, после появления данных)
- [ ] P2 · 2026-08-01 · Crawler policy decision залогировать · (opportunities-next, optional)

## Креативы / контент (рисерч 2026-08-02)

- [ ] P0 · 2026-08-02 · Записать демо-ассет номер один: сырой screen-recording прогона агента на реальной задаче с видимым approval gate, 60-120 сек. Один ассет закрывает Upwork proposals (Loom в отклике поднимает engagement), LinkedIn-посты, будущий FB-креатив и YouTube. Сейчас во всех планах ноль демо-ассетов · (рисерч креативов)
- [ ] P1 · 2026-08-02 · Записать живой звонок voice-агента без монтажа - прямой креатив для пакета voice-agents (референсы: AIR AI demo, MediaBloom) · (рисерч креативов)
- [ ] P1 · 2026-08-02 · Полуперсонализированный Loom-шаблон разбора процесса клиента (2-3 мин) для Upwork proposals и LinkedIn DM · (рисерч креативов)
- [ ] P1 · 2026-08-02 · Карусель/PDF before/after процесса ("3 человека вручную -> агент + один approver") - топ-engagement формат ~6.6%, совместим с правилом "no fake metrics": показывать процесс, не цифры · (рисерч креативов)
- [ ] P2 · 2026-08-02 · n8n template giveaway (JSON + скриншот воркфлоу) - кормит GEO и аудиторию, но притягивает DIY-публику, поэтому не в приоритете · (рисерч креативов)
- Правило: формат "N часов в неделю сэкономили" не использовать до первого измеримого кейса - иначе это фейковые метрики, запрещённые внутренними правилами.

## Перформанс (аудит 2026-08-02, Lighthouse lab)

Цифры: главная mobile 83 (desktop 98), кейс kora mobile 89 (desktop 99), CLS 0 везде, TTFB 70-80ms.
Динамика против 31.07: score 87 -> 83, Speed Index 3.7s -> 5.9s - деградация от React Flow в хиро (коммит 609fbac) и PostHog c session replay.

- [ ] P1 · 2026-08-02 · `priority` на LCP-Image всех project/*/page.tsx (10 однострочников). Lighthouse флагует "fetchpriority=high: false" на скриншоте kora. LCP кейсов -0.3-0.8s; кейсы шлют клиентам - прямая выгода · (перф-аудит)
- [ ] P1 · 2026-08-02 · PostHog-диета: `disable_surveys: true`, session replay сэмплировать 10-20% или только при интенте (открытие консультации), убрать scroll из триггеров DeferredAnalytics. Сейчас ~170KB gz JS и replay для 100% посетителей, бьёт по INP на дешёвых Android · (перф-аудит)
- [ ] P1 · 2026-08-02 · Мобильный гейт хиро: не монтировать React Flow-тур и WebGL-шейдер ниже md (статичная картинка мока), шейдер только desktop. Сейчас mainthread 6.0s, TTI 6.7s, H1 рендерится с задержкой 2.1s. Ожидание: mobile 83 -> ~90+, SI -2-3s · (перф-аудит, `HeroMotion.tsx`, `neon-dither.tsx`)
- [ ] P2 · 2026-08-02 · Убрать full-page fade-in на кейс-страницах (`globals.css:247` + FadeIn вокруг всего Container) - FCP/LCP кейсов -0.2-0.5s · (перф-аудит)
- [ ] P2 · 2026-08-02 · IBM Plex Mono конвертировать в woff2 + subset (сейчас TTF 133-145KB, -60-80KB на кейсах) · (перф-аудит)
- [ ] P2 · 2026-08-02 · framer-motion из first-load: динамический импорт в Navbar/ConsultationModal, ProjectsSelect через dynamic + IntersectionObserver (-30-60KB на кейсах) · (перф-аудит)

## Инфраструктура / гигиена

- [ ] P1 · 2026-08-01 · Vercel: подтвердить что каждый push в main авто-деплоит прод (CLI alias ещё используется при лаге) · (blockers B-P0-03)
- [ ] P2 · 2026-08-01 · GA4 property (или осознанно остаться на текущей аналитике) · (blockers B-P2-01)
- [ ] P2 · 2026-08-01 · Gmail: фильтр not-spam для *@dali.agents.ge чтобы OTP не терялись · (email-setup-dali.md)
- [ ] P2 · 2026-08-01 · dali-seo-workspace: git-backed или принять как local-only · (blockers B-P2-03)

## Устарело / закрыто при слиянии (2026-08-02)

- [x] B-P0-02 "купить daliagents.com" - домен куплен, cutover сделан 2026-08-01, canonical = daliagents.com · закрыто 2026-08-02
- [x] LinkedIn company page shell + 3 поста + sameAs - DONE 2026-08-01 (blockers B-P1-01)
- [x] hello@ брендовая почта на публичных CTA - DONE 2026-08-01 (blockers B-P2-02)
- [x] GSC property + sitemap, Bing property - setup DONE 2026-08-01 (остались ops-пункты выше)
- Чекбокс "Website field = dali.agents.ge" из social-linkedin-plan.md устарел: поле должно быть daliagents.com (см. P0-пункт в "Продажи / каналы")

---

Все 5 аудитов от 2026-08-02 слиты: кейсы, маркетинг/конверсия, каналы/креативы, SEO/GEO, перформанс.
