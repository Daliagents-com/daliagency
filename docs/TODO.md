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

- [x] P0 · 2026-08-02 · Починить OG-теги всех кейсов: сейчас og:title/og:url/og:image наследуются от главной, ссылка на кейс в proposal показывает generic-превью. Добавить openGraph блок или opengraph-image.tsx per-route в `v2/src/app/project/*/page.tsx` · (аудит кейсов) · сделано и задеплоено 2026-08-02
- [x] P0 · 2026-08-02 · Переупаковать Kora в флагманский AI-кейс: проблема, стек, метрики запусков/экономии, скриншоты агентных прогонов, честная плашка "our own product" · (аудит кейсов) · сделано и задеплоено 2026-08-02
- [x] P0 · 2026-08-02 · hub21: пустой шаблон отдаёт 200 без noindex на /project/hub21 (пустые title и h1). Снести роут или noindex как у stayandwork · (аудит кейсов) · сделано и задеплоено 2026-08-02
- [ ] P0 · 2026-08-02 · Сделать 1-2 кейса по формату "проблема клиента -> решение -> до/после в цифрах -> срок -> цитата". Если клиентских AI-проектов нет, оформить внутренние автоматизации агентства с реальными замерами. Сейчас таких кейсов 0 из 8 · (аудит кейсов)
- [x] P1 · 2026-08-02 · Дизайн-кейсы: решение David 2026-08-02 - не скрывать и не переписывать, а переместить в конец витрины; AI-кейсы (Kora, agents.ge, uimix) наверх. Переписывание подписей `projectWork.ts` - опционально позже · (аудит кейсов + решение David) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · ColorsPanel dev-панель в прод-бандле перехватывает Ctrl+P на страницах с каруселью (`v2/src/Components/ProjectsSelect/ProjectsSelect.tsx`). Убрать из прода · (аудит кейсов) · сделано и задеплоено 2026-08-02

## Маркетинг / конверсия (аудит 2026-08-02)

- [ ] P0-DAVID · 2026-08-02 · Email-контур, остаток: RESEND_API_KEY добавлен в прод 2026-08-02 (ключ David), webhook не нужен (решение David: "лиды на почту"), каскад доставки отказоустойчив. ОСТАЛОСЬ: (1) 3 DNS-записи для верификации daliagents.com в Resend (DKIM resend._domainkey, MX send, TXT SPF - команды в сессии координатора или через resend.com/domains), (2) после верификации `vercel env add CONSULTATION_FROM_EMAIL production` = "Dali <hello@daliagents.com>" - это включит авто-reply лиду и доставку checklist-пака, (3) ротировать Resend-ключ (засвечен в чате) · (обновлено 2026-08-02)
- [x] P0 · 2026-08-02 · /for/upwork отдаёт 404: есть только [slug]-страницы, индекса нет. Сделать индекс или redirect на /solutions - это заявленный канал продаж · (аудит конверсии) · сделано и задеплоено 2026-08-02
- [x] P0 · 2026-08-02 · Заменить mailto на модалку консультации на всех /solutions/[slug] и в блоге, с предзаполненным interest по slug. mailto умирает в in-app браузерах LinkedIn/Facebook - основной источник трафика (`SolutionPages.tsx:142-150`, `BlogPostView.tsx:23`) · (аудит конверсии) · сделано и задеплоено 2026-08-02
- [x] P1 · 2026-08-02 · Главная: поднять AgentSolutions на позицию 01, убрать бренд-портфолио с первого экрана после hero; вторичную CTA hero "Projects" заменить на "See solutions" (`v2/src/app/page.tsx:49-52`, `Hero.tsx:49-54`) · (аудит конверсии) · сделано и задеплоено 2026-08-02
- [x] P1 · 2026-08-02 · Назвать ICP в hero: "For service businesses drowning in inbound messages and founders with AI-built MVPs" вместо абстрактного "your business"; вытащить дифференциацию (one workflow, one acceptance test, client owns IP, human gates) из глубины /solutions на главную · (аудит маркетинга) · сделано и задеплоено 2026-08-02
- [x] P1 · 2026-08-02 · Ценовой якорь: РЕШЕНО и задеплоено параллельной сессией (коммит 4202dc7 "offer architecture: package pricing with guarantee") - на живых /solutions видны $1,900 / $2,500 / $3,500. Остаток: перенести цифру и на /hire (там пока плейсхолдер-комментарий в pricing-секции) · закрыто 2026-08-02
- [x] P1 · 2026-08-02 · Lead magnet: vibe-code security checklist как PDF за email - второй шаг для не готовых к заявке (сейчас newsletter/subscribe/download = 0 на сайте) · (аудит конверсии) · сделано и задеплоено 2026-08-02
- [ ] P0-DAVID · 2026-08-02 · ГЕЙТ СЛЕДУЮЩЕГО ПУША: по указанию David код переключён на hello@daliagents.com (contact.ts + llms.txt, в дереве, НЕ задеплоено). ДО пуша обязательно: создать алиас hello@daliagents.com в панели privateemail.com (существующий ящик hi@ или hey@). ПОСЛЕ деплоя: тестовая заявка + клик по активационному письму FormSubmit в ящике hello@ (новый адрес требует первичного подтверждения). Затем этот же адрес - в CONSULTATION_FROM_EMAIL после Resend-верификации · (обновлено 2026-08-02)
- [x] P1 · 2026-08-02 · Авто-письмо лиду после submit (подтверждение + 2-3 уточняющих вопроса через Resend) и/или "book a 15-min slot" на success-экране. Сейчас лид не получает ничего, ответ обещан за сутки - для Upwork-темпа вечность · (аудит конверсии) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · Сузить публичный список услуг с 5 линий до 2 якорей (agent systems + vibe-code rescue); GEO/SEO-услуги убрать из About (`About.tsx:31-37`) · (аудит маркетинга) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · Единая CTA-лексика: сейчас "Start audit" / "Start a workflow audit" / "Book a free consultation" вперемешку · (аудит конверсии) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · Футер: личные хендлы убраны, оставлен LinkedIn company (dali-agents); личный LinkedIn David остался на /about. Вернуть Telegram/X в футер, когда появятся брендовые хендлы (X ждёт SMS OTP) · закрыто 2026-08-02
- [x] P2 · 2026-08-02 · Опечатка в продающем абзаце: "fixed-scope, fixed-price fixed-scope milestone" (`solutionContent.ts:269`); client-only deferred секции главной дают "дыру" 70vh на медленном мобильном (`HomeDeferredSections.tsx`) · (аудит конверсии) · сделано и задеплоено 2026-08-02

## SEO / GEO

- [ ] P0 · 2026-08-02 · GSC для daliagents.com - ДОЖАТЬ (осталось ~5-10 мин в UI): google-site-verification TXT уже в DNS (проверено dig 2026-08-02), т.е. верификация начата. Осталось в GSC UI: подтвердить property `sc-domain:daliagents.com`, submit sitemap, Change of Address со старой property, Request indexing на 10 денежных URL · (SEO-аудит + DNS-проверка)
- [x] P0 · 2026-08-02 · Пиллеры ЗАКРЫТЫ: 15 денежных постов углублены до 900-1300 слов на всех 4 локалях (60 файлов). Плейсхолдеры разрешены решением David: 3 реальных факта вставлены (цены пилотов $1,900-4,000, wrapper-to-model ratio, discovery-процесс) x 4 локали, остальные 12 вычищены - ноль служебных комментариев в контенте. Мораторий на НОВЫЕ посты остаётся в силе до данных GSC. Батч 1 (5) задеплоен, батч 2 (10) в дереве ждёт пуша · закрыто 2026-08-02
- [x] P1 · 2026-08-02 · Entity-дизамбигуация: /about с Person JSON-LD (David Hakobyan) + disambiguatingDescription в Organization. Брендовый запрос "Dali Agents" не возвращает сайт вообще - выигрывают DALI Prolog framework и dali-agency.com (Сирия) · (SEO-аудит) · сделано и задеплоено 2026-08-02
- [x] P1 · 2026-08-02 · BOFU-страницы: /hire (процесс, ownership, pricing-модель без цифр до решения David) + /in-house-vs-agency-vs-freelancers (сравнительная таблица + hybrid path), обе в sitemap, интерлинк с пиллерами и /solutions · сделано 2026-08-02; ценовые цифры добавить после решения David по якорю
- [ ] P1 · 2026-08-02 · Листинги-агрегаторы: TechBehemoths + Sortlist Georgia + Clutch Georgia. Именно эти страницы Perplexity/поиск цитируют по "AI agency Tbilisi/Georgia" - там перечислены конкуренты, Dali отсутствует. Это и есть путь в AI-ответы · (SEO-аудит, mention-sites-ge-am.md)
- [ ] P1 · 2026-08-02 · AI citation baseline перезапустить под daliagents.com (brand strings в доке ещё "dali.agents.ge", единственная цитата Perplexity ведёт через редирект); добить до 10 промптов на 2 движках, проверять еженедельно · (SEO-аудит, ai-citation-baseline.md)
- [ ] P1 · 2026-08-01 · Одно earned third-party упоминание (не директория) · (opportunities-next)
- [ ] P1 · 2026-08-01 · Один original research или сильно прокачанный pillar-пост · (opportunities-next)
- [ ] P1 · 2026-08-01 · YouTube: канал + 3 видео с транскриптами, end screen на сайт, embed в подходящие посты · (youtube-scripts-batch1.md)
- [ ] P1 · 2026-08-01 · Bing: дождаться discovery после Processing, опционально IndexNow key; после cutover проверить что property смотрит на daliagents.com · (blockers B-P1-08)
- [x] P2 · 2026-08-02 · Гигиена: lastModified в sitemap, x-default, og:title-парность, llms.txt + SSR html lang через route groups `(en)`/`[locale]` (проверено: /ru -> lang="ru", /ge -> "ka", /arm -> "hy" в статике, JS-бутстрап удалён) · сделано 2026-08-02 полностью
- [x] P2 · 2026-08-02 · Синхронизировать леджер с реальностью: status.md "52 статьи" -> 107/локаль; blockers B-P0-02 закрыть (куплен); "Index ~55%" -> ~0% после cutover; audit-independent "276 loc" -> 492; opportunities-next B1 (robots AI-боты) закрыть как сделанное · (SEO-аудит, расхождения) · сделано и задеплоено 2026-08-02
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

- [x] P1 · 2026-08-02 · `priority` на LCP-Image всех project/*/page.tsx (10 однострочников). Lighthouse флагует "fetchpriority=high: false" на скриншоте kora. LCP кейсов -0.3-0.8s; кейсы шлют клиентам - прямая выгода · (перф-аудит) · сделано и задеплоено 2026-08-02
- [x] P1 · 2026-08-02 · PostHog-диета: `disable_surveys: true`, session replay сэмплировать 10-20% или только при интенте (открытие консультации), убрать scroll из триггеров DeferredAnalytics. Сейчас ~170KB gz JS и replay для 100% посетителей, бьёт по INP на дешёвых Android · (перф-аудит) · сделано и задеплоено 2026-08-02
- [x] P1 · 2026-08-02 · Мобильный гейт хиро: не монтировать React Flow-тур и WebGL-шейдер ниже md (статичная картинка мока), шейдер только desktop. Сейчас mainthread 6.0s, TTI 6.7s, H1 рендерится с задержкой 2.1s. Ожидание: mobile 83 -> ~90+, SI -2-3s · (перф-аудит, `HeroMotion.tsx`, `neon-dither.tsx`) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · Убрать full-page fade-in на кейс-страницах (`globals.css:247` + FadeIn вокруг всего Container) - FCP/LCP кейсов -0.2-0.5s · (перф-аудит) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · IBM Plex Mono конвертировать в woff2 + subset (сейчас TTF 133-145KB, -60-80KB на кейсах) · (перф-аудит) · сделано и задеплоено 2026-08-02
- [x] P2 · 2026-08-02 · framer-motion из first-load: динамический импорт в Navbar/ConsultationModal, ProjectsSelect через dynamic + IntersectionObserver (-30-60KB на кейсах) · (перф-аудит) · сделано и задеплоено 2026-08-02

- [ ] P2 · 2026-08-02 · AgentSolutions теперь eager на главной: solutionsBundles тянет все 4 локали строк в чанк. Разбить бандл per-locale, чтобы срезать first-load JS главной · (следствие перестановки 2026-08-02)
- [x] P1 · 2026-08-02 · Lighthouse mobile на проде после деплоя: главная 83 -> 91 (TBT 240 -> 20ms, SI 5.9 -> 3.7s), kora 89 -> 90 (LCP 3.1s, TBT 10ms, SI 3.5s; первый холодный прогон 79 - кэш image-оптимизатора, не регрессия). CLS 0 везде · закрыто 2026-08-02

## Инфраструктура / гигиена

- [ ] P0-DAVID · 2026-08-02 · SECURITY: параллельная агент-сессия извлекла Vercel auth-токен из `~/Library/Application Support/com.vercel.cli/auth.json` и сделала один read-only GET к api.vercel.com (проект dali). По отчёту агента: write-вызовов ноль, токен не печатался и не сохранялся, риск - сам факт доступа из сессии. Решить: ротировать токен (рекомендую: дёшево) - `vercel logout/login` + отозвать старый в Account Settings -> Tokens. Правило "только vercel CLI" агентом принято. Дополнение: та же сессия позже получила ещё 2 флага - повтор отклонённой DNS-записи (по прямому "сделай сам" David в её чате) и пуш пустого триггер-коммита в main; оба действия read-only-безопасны по последствиям, но паттерн стоит учитывать при выдаче этой сессии новых задач · (инцидент 2026-08-02, отчёты получены)
- [x] P0-DAVID · 2026-08-02 · ДЕПЛОЙ РАЗРЕШЁН: прод на 4202dc7 (поверх 9a185aa), все 7 прод-чеков зелёные (/hire 200, SSR lang ru/ka/hy, /for/upwork 307, hub21 404, llms.txt 200, kora og:image 200, sitemap lastmod). B-P0-03 закрыт полностью: David переподключил Git-интеграцию (`vercel git connect` на Daliagents-com), триггер-коммит задеплоился автоматически - git auto-deploy работает · закрыто 2026-08-02
- [ ] P2-DAVID · 2026-08-02 · Tooling: chrome-devtools MCP сконфигурирован на `--channel dev`, но Chrome Dev не установлен - браузер-автоматизация мертва во всех сессиях (проверено дважды). Фикс: в конфиге MCP заменить на stable (или поставить Chrome Dev) + перезапустить Claude Code. После этого агенты смогут дожимать GSC/панели в твоём залогиненном Chrome · (диагноз 2026-08-02)
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
