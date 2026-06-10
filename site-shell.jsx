/* === Host website shell — representative Meridian Health pages ===
   The "Search" affordances (nav button + hero search bar) call onOpenSearch,
   which opens the full search experience in a modal overlay (see search-modal.jsx).

   The site renders one of several PAGES (home, cardiology, …). Each page also
   defines a `search` context (heading + suggestions) that the modal's landing
   reads via window.SEARCH_CONTEXT, so the same search tool feels contextual to
   the page you opened it from. */

const SITE_IS_MAC = typeof navigator !== 'undefined'
  && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
const SITE_SHORTCUT = SITE_IS_MAC ? '⌘K' : 'Ctrl K';

const SITE_NAV_LINKS = ['Find care', 'Locations', 'Providers', 'Services', 'Patients & visitors'];

const SITE_STATS = [
  { value: '40+', label: 'Locations nearby' },
  { value: '1,200', label: 'Providers' },
  { value: '4.8★', label: 'Avg. patient rating' },
  { value: '24/7', label: 'Nurse line' },
];

const HOME_SERVICES = [
  { icon: 'Stethoscope', name: 'Primary care', desc: 'Annual visits, screenings, and everyday care for the whole family.' },
  { icon: 'Clock', name: 'Urgent care', desc: 'Walk-in care for non-emergencies, open early until late, 7 days a week.' },
  { icon: 'Heart', name: 'Cardiology', desc: 'Heart and vascular specialists with same-week appointments.', href: '/cardiology' },
  { icon: 'Brain', name: 'Neurology', desc: 'Expert evaluation for headaches, memory, and nerve conditions.' },
  { icon: 'Bone', name: 'Orthopedics', desc: 'Joint, bone, and sports-injury care from diagnosis to recovery.' },
  { icon: 'Video', name: 'Virtual visits', desc: 'See a provider from home, usually within the hour.' },
];

const CARDIO_SERVICES = [
  { icon: 'Heart', name: 'Preventive cardiology', desc: 'Risk assessment and heart-healthy plans to stay ahead of disease.' },
  { icon: 'Clock', name: 'Cardiac stress testing', desc: 'Treadmill and imaging stress tests to evaluate how your heart performs.' },
  { icon: 'Video', name: 'Echocardiography', desc: 'Ultrasound imaging to see how your heart pumps and how its valves work.' },
  { icon: 'Shield', name: 'Electrophysiology', desc: 'Diagnosis and treatment of arrhythmias and heart-rhythm disorders.' },
  { icon: 'Stethoscope', name: 'Heart failure clinic', desc: 'Specialized, ongoing care to manage heart failure and protect quality of life.' },
  { icon: 'Person', name: 'Cardiac rehabilitation', desc: 'Supervised programs to rebuild strength and confidence after a cardiac event.' },
];

const PAGES = {
  home: {
    title: 'Meridian Health — Search',
    breadcrumb: null,
    hero: {
      eyebrow: 'Welcome to Meridian Health',
      title: 'Find care that fits your life.',
      sub: 'Search providers, book a visit, or get answers about symptoms and conditions — all in one place.',
      placeholder: 'Search providers, conditions, locations…',
      primaryCta: { icon: 'Stethoscope', label: 'Find a doctor' },
    },
    section: { title: 'Care for every need', cards: HOME_SERVICES, cta: 'Find a provider' },
    band: { title: 'Not sure where to start?', sub: 'Describe what is going on and we will point you to the right care.' },
    search: { heading: null, suggestions: null },
  },
  cardiology: {
    title: 'Cardiology — Meridian Health',
    breadcrumb: 'Cardiology',
    hero: {
      eyebrow: 'Cardiology at Meridian',
      title: 'Heart and vascular care, close to home.',
      sub: 'From prevention to advanced treatment, our cardiologists help you understand your heart and stay ahead of disease.',
      placeholder: 'Ask about cardiology at Meridian…',
      primaryCta: { icon: 'Heart', label: 'Find a cardiologist' },
    },
    section: { title: 'Cardiology services', cards: CARDIO_SERVICES, cta: 'Learn more' },
    band: { title: 'Have a heart-health question?', sub: 'Ask Meridian for answers about symptoms, screenings, and our cardiology team.' },
    search: {
      heading: 'Want to learn more about Cardiology at Meridian?',
      suggestions: [
        'Find a cardiologist accepting new patients',
        'What happens during a cardiac stress test?',
        'Heart-healthy screenings I should consider',
        'Warning signs of heart disease to watch for',
      ],
    },
  },
};

const CURRENT_PAGE = (typeof window !== 'undefined' && window.PAGE && PAGES[window.PAGE]) ? window.PAGE : 'home';
// The modal's landing reads this to render a context-relevant heading + suggestions.
if (typeof window !== 'undefined') window.SEARCH_CONTEXT = PAGES[CURRENT_PAGE].search;

function SiteSearchTrigger({ onOpenSearch, triggerRef, variant, placeholder }) {
  if (variant === 'hero') {
    return (
      <button
        type="button"
        className="site-herosearch"
        onClick={onOpenSearch}
        aria-haspopup="dialog"
        aria-label="Open search">
        <span className="site-herosearch__icon"><Icon.SearchAI /></span>
        <span className="site-herosearch__text">{placeholder}</span>
        <span className="site-herosearch__kbd">{SITE_SHORTCUT}</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      ref={triggerRef}
      className="site-nav__search"
      onClick={onOpenSearch}
      aria-haspopup="dialog"
      aria-label="Open search">
      <span className="site-nav__search-icon"><Icon.SearchAI /></span>
      <span className="site-nav__search-label">Search</span>
    </button>
  );
}

function SiteShell({ onOpenSearch, triggerRef }) {
  const page = PAGES[CURRENT_PAGE];
  const PrimaryCtaGlyph = Icon[page.hero.primaryCta.icon];

  return (
    <div className="site">
      <header className="site-nav">
        <div className="site-nav__inner">
          <a className="site-nav__brand" href="/">
            <span className="site-nav__logo" aria-hidden="true"><Icon.Shield /></span>
            <span className="site-nav__name">Meridian Health</span>
          </a>
          <nav className="site-nav__links" aria-label="Primary">
            {SITE_NAV_LINKS.map((l) => (
              <a key={l} href="#" className="site-nav__link" onClick={(e) => e.preventDefault()}>{l}</a>
            ))}
          </nav>
          <div className="site-nav__actions">
            <SiteSearchTrigger onOpenSearch={onOpenSearch} triggerRef={triggerRef} />
            <button type="button" className="site-nav__cta" onClick={onOpenSearch}>Get care now</button>
          </div>
        </div>
      </header>

      <main className="site-main">
        {page.breadcrumb &&
          <nav className="site-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.breadcrumb}</span>
          </nav>
        }

        <section className="site-hero">
          <div className="site-hero__inner">
            <p className="site-hero__eyebrow">{page.hero.eyebrow}</p>
            <h1 className="site-hero__title serif">{page.hero.title}</h1>
            <p className="site-hero__sub">{page.hero.sub}</p>
            <SiteSearchTrigger onOpenSearch={onOpenSearch} variant="hero" placeholder={page.hero.placeholder} />
            <div className="site-hero__ctas">
              <button type="button" className="site-btn site-btn--primary" onClick={onOpenSearch}>
                {PrimaryCtaGlyph ? <PrimaryCtaGlyph /> : null} {page.hero.primaryCta.label}
              </button>
              <button type="button" className="site-btn site-btn--ghost" onClick={onOpenSearch}>
                <Icon.Calendar /> Book a visit
              </button>
            </div>
          </div>
        </section>

        <section className="site-services" aria-label="Services">
          <div className="site-section__head">
            <h2 className="site-section__title">{page.section.title}</h2>
            <a href="#" className="site-section__link" onClick={(e) => { e.preventDefault(); onOpenSearch(); }}>
              Browse all services <Icon.ArrowRight />
            </a>
          </div>
          <div className="site-services__grid">
            {page.section.cards.map((s) => {
              const Glyph = Icon[s.icon];
              const inner = (
                <>
                  <span className="site-card__icon" aria-hidden="true">{Glyph ? <Glyph /> : null}</span>
                  <span className="site-card__name">{s.name}</span>
                  <span className="site-card__desc">{s.desc}</span>
                  <span className="site-card__cta">
                    {s.href ? 'Explore' : page.section.cta} <Icon.ArrowRight />
                  </span>
                </>
              );
              return s.href
                ? <a key={s.name} href={s.href} className="site-card">{inner}</a>
                : <button key={s.name} type="button" className="site-card" onClick={onOpenSearch}>{inner}</button>;
            })}
          </div>
        </section>

        <section className="site-stats" aria-label="By the numbers">
          {SITE_STATS.map((s) => (
            <div key={s.label} className="site-stat">
              <div className="site-stat__value">{s.value}</div>
              <div className="site-stat__label">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="site-band">
          <div className="site-band__inner">
            <div>
              <h2 className="site-band__title serif">{page.band.title}</h2>
              <p className="site-band__sub">{page.band.sub}</p>
            </div>
            <button type="button" className="site-btn site-btn--primary site-btn--lg" onClick={onOpenSearch}>
              <Icon.SearchAI /> Ask Meridian
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="site-nav__logo" aria-hidden="true"><Icon.Shield /></span>
            <span className="site-nav__name">Meridian Health</span>
          </div>
          <div className="site-footer__cols">
            <div className="site-footer__col">
              <h3>Care</h3>
              <a href="#" onClick={(e) => e.preventDefault()}>Find a doctor</a>
              <a href="/cardiology">Cardiology</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Virtual visits</a>
            </div>
            <div className="site-footer__col">
              <h3>Locations</h3>
              <a href="#" onClick={(e) => e.preventDefault()}>Hospitals</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Clinics</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Pharmacies</a>
            </div>
            <div className="site-footer__col">
              <h3>Patients</h3>
              <a href="#" onClick={(e) => e.preventDefault()}>MyChart login</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Billing</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Insurance</a>
            </div>
          </div>
        </div>
        <div className="site-footer__legal">© 2026 Meridian Health. This is a design demo.</div>
      </footer>
    </div>
  );
}

window.SiteShell = SiteShell;
