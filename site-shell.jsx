/* === Host website shell — a representative health-system homepage ===
   The "Search" affordances (nav button + hero search bar) call onOpenSearch,
   which opens the full search experience in a modal overlay (see search-modal.jsx). */

const SITE_IS_MAC = typeof navigator !== 'undefined'
  && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
const SITE_SHORTCUT = SITE_IS_MAC ? '⌘K' : 'Ctrl K';

const SITE_NAV_LINKS = ['Find care', 'Locations', 'Providers', 'Services', 'Patients & visitors'];

const SITE_SERVICES = [
  { icon: 'Stethoscope', name: 'Primary care', desc: 'Annual visits, screenings, and everyday care for the whole family.' },
  { icon: 'Clock', name: 'Urgent care', desc: 'Walk-in care for non-emergencies, open early until late, 7 days a week.' },
  { icon: 'Heart', name: 'Cardiology', desc: 'Heart and vascular specialists with same-week appointments.' },
  { icon: 'Brain', name: 'Neurology', desc: 'Expert evaluation for headaches, memory, and nerve conditions.' },
  { icon: 'Bone', name: 'Orthopedics', desc: 'Joint, bone, and sports-injury care from diagnosis to recovery.' },
  { icon: 'Video', name: 'Virtual visits', desc: 'See a provider from home, usually within the hour.' },
];

const SITE_STATS = [
  { value: '40+', label: 'Locations nearby' },
  { value: '1,200', label: 'Providers' },
  { value: '4.8★', label: 'Avg. patient rating' },
  { value: '24/7', label: 'Nurse line' },
];

function SiteSearchTrigger({ onOpenSearch, triggerRef, variant }) {
  if (variant === 'hero') {
    return (
      <button
        type="button"
        className="site-herosearch"
        onClick={onOpenSearch}
        aria-haspopup="dialog"
        aria-label="Open search">
        <span className="site-herosearch__icon"><Icon.Search /></span>
        <span className="site-herosearch__text">Search providers, conditions, locations…</span>
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
      <span className="site-nav__search-icon"><Icon.Search /></span>
      <span className="site-nav__search-label">Search</span>
    </button>
  );
}

function SiteShell({ onOpenSearch, triggerRef }) {
  return (
    <div className="site">
      <header className="site-nav">
        <div className="site-nav__inner">
          <a className="site-nav__brand" href="#" onClick={(e) => e.preventDefault()}>
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
        <section className="site-hero">
          <div className="site-hero__inner">
            <p className="site-hero__eyebrow">Welcome to Meridian Health</p>
            <h1 className="site-hero__title serif">Find care that fits your life.</h1>
            <p className="site-hero__sub">
              Search providers, book a visit, or get answers about symptoms and conditions —
              all in one place.
            </p>
            <SiteSearchTrigger onOpenSearch={onOpenSearch} variant="hero" />
            <div className="site-hero__ctas">
              <button type="button" className="site-btn site-btn--primary" onClick={onOpenSearch}>
                <Icon.Stethoscope /> Find a doctor
              </button>
              <button type="button" className="site-btn site-btn--ghost" onClick={onOpenSearch}>
                <Icon.Calendar /> Book a visit
              </button>
            </div>
          </div>
        </section>

        <section className="site-services" aria-label="Services">
          <div className="site-section__head">
            <h2 className="site-section__title">Care for every need</h2>
            <a href="#" className="site-section__link" onClick={(e) => { e.preventDefault(); onOpenSearch(); }}>
              Browse all services <Icon.ArrowRight />
            </a>
          </div>
          <div className="site-services__grid">
            {SITE_SERVICES.map((s) => {
              const Glyph = Icon[s.icon];
              return (
                <button key={s.name} type="button" className="site-card" onClick={onOpenSearch}>
                  <span className="site-card__icon" aria-hidden="true">{Glyph ? <Glyph /> : null}</span>
                  <span className="site-card__name">{s.name}</span>
                  <span className="site-card__desc">{s.desc}</span>
                  <span className="site-card__cta">Find a provider <Icon.ArrowRight /></span>
                </button>
              );
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
              <h2 className="site-band__title serif">Not sure where to start?</h2>
              <p className="site-band__sub">Describe what's going on and we'll point you to the right care.</p>
            </div>
            <button type="button" className="site-btn site-btn--primary site-btn--lg" onClick={onOpenSearch}>
              <Icon.Search /> Search Meridian
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
              <a href="#" onClick={(e) => e.preventDefault()}>Urgent care</a>
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
