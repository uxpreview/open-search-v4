/* === Mock answer data for [System] === */
const Icon = window.Icon;

const BACK_PAIN = {
  query: "What causes lower back pain?",
  chatLabel: "Lower back pain",
  tabs: [
    { id: 'pages', label: 'Pages', icon: 'FileText', count: 6 },
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 6 },
    { id: 'services', label: 'Services', icon: 'Video', count: 5 },
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 2 },
  ],
  summary: [
    { text: "Lower back pain affects roughly " },
    { text: "8 in 10 adults", cite: [1] },
    { text: " at some point in their lives and is most often caused by mechanical issues — muscle or ligament strain, age-related changes to spinal discs, or arthritis." },
    { text: " The vast majority of cases are not serious and improve within 4–6 weeks with rest, gentle movement, and over-the-counter pain relief", cite: [2, 3] },
    { text: ". Persistent pain, pain that radiates down a leg, or symptoms following an injury warrant evaluation by a clinician." },
  ],
  sections: [
    {
      id: 'overview',
      tab: 'pages',
      title: 'Overview',
      icon: 'Info',
      body: () => (
        <>
          <p>The lower back, or <em>lumbar spine</em>, supports most of the body's weight and is involved in nearly every movement — bending, twisting, walking, lifting. That mechanical workload makes it the most commonly injured region of the back.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <p>Most lower back pain is <strong>non-specific</strong>, meaning no single structural cause is identified on imaging. It's typically the result of overuse, poor posture, or temporary muscular strain rather than a serious underlying condition.<sup><a href="#src-2" className="cite">2</a></sup></p>
          <div className="callout">
            <div className="callout__icon">{Icon.Sparkle()}</div>
            <div>
              <p className="callout__title">In a nutshell</p>
              <p className="callout__body">Most lower back pain resolves on its own within 6 weeks. Rest briefly, keep moving gently, and use heat or OTC anti-inflammatories. See a clinician if pain persists or worsens.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'causes',
      tab: 'pages',
      title: 'Common Causes',
      icon: 'Bone',
      body: () => (
        <>
          <p>Causes of lower back pain typically fall into a few mechanical categories. The list below covers the most common, in roughly the order clinicians consider them.<sup><a href="#src-1" className="cite">1</a></sup><sup><a href="#src-4" className="cite">4</a></sup></p>
          <ul className="bullet-list">
            <li>
              <div className="bullet-list__label">Muscle or ligament strain</div>
              <div className="bullet-list__desc">Heavy lifting or a sudden awkward movement can strain back muscles and spinal ligaments — the most common cause.</div>
            </li>
            <li>
              <div className="bullet-list__label">Bulging or ruptured disc</div>
              <div className="bullet-list__desc">Discs cushion the vertebrae. A bulge or rupture can press on a nerve, often causing pain that radiates into the buttock or leg (sciatica).</div>
            </li>
            <li>
              <div className="bullet-list__label">Arthritis</div>
              <div className="bullet-list__desc">Osteoarthritis can affect the lower back. In some cases it leads to spinal stenosis — narrowing of the space around the spinal cord.</div>
            </li>
            <li>
              <div className="bullet-list__label">Skeletal irregularities</div>
              <div className="bullet-list__desc">Scoliosis and other curvature conditions can contribute to pain, usually appearing in middle age.</div>
            </li>
            <li>
              <div className="bullet-list__label">Osteoporosis</div>
              <div className="bullet-list__desc">Brittle, porous bones can lead to compression fractures of the spine's vertebrae.</div>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'see-doctor',
      tab: 'pages',
      title: 'When to See a Doctor',
      icon: 'Alert',
      body: () => (
        <>
          <p>Most lower back pain can be managed at home, but the following warrant prompt medical attention.<sup><a href="#src-3" className="cite">3</a></sup></p>
          <ul className="bullet-list">
            <li>
              <div className="bullet-list__label">Pain lasting &gt; 6 weeks</div>
              <div className="bullet-list__desc">Pain that doesn't improve, or that wakes you at night.</div>
            </li>
            <li>
              <div className="bullet-list__label">Severe or worsening pain</div>
              <div className="bullet-list__desc">Pain that isn't improving with rest, ice, or OTC medication.</div>
            </li>
            <li>
              <div className="bullet-list__label">Pain radiating below the knee</div>
              <div className="bullet-list__desc">Especially if accompanied by numbness, tingling, or weakness in the leg.</div>
            </li>
            <li>
              <div className="bullet-list__label">Recent fall or injury</div>
              <div className="bullet-list__desc">Particularly in older adults or anyone with osteoporosis.</div>
            </li>
          </ul>
          <div className="callout callout--danger">
            <div className="callout__icon">{Icon.Alert()}</div>
            <div>
              <p className="callout__title">Seek emergency care if</p>
              <p className="callout__body">You experience new bowel or bladder incontinence, severe numbness around the groin, or sudden severe leg weakness — these can indicate <em>cauda equina syndrome</em>, a surgical emergency.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'treatments',
      tab: 'services',
      title: 'Treatments',
      icon: 'Pill',
      body: () => (
        <>
          <p>Treatment follows a stepwise approach: try the simplest, lowest-risk options first, and escalate only if symptoms persist.<sup><a href="#src-2" className="cite">2</a></sup><sup><a href="#src-5" className="cite">5</a></sup></p>
          <ol className="bullet-list">
            <li>
              <div className="bullet-list__label">Self-care (1–2 weeks)</div>
              <div className="bullet-list__desc">Heat or ice, OTC NSAIDs like ibuprofen, gentle stretching, and continued light activity. Bed rest beyond 1–2 days can actually slow recovery.</div>
            </li>
            <li>
              <div className="bullet-list__label">Physical therapy</div>
              <div className="bullet-list__desc">A PT can teach posture, strengthening, and flexibility exercises specific to your back. Often the most effective intervention for chronic pain.</div>
            </li>
            <li>
              <div className="bullet-list__label">Prescription medication</div>
              <div className="bullet-list__desc">If OTC options are insufficient, a clinician may prescribe muscle relaxants or short courses of stronger pain medication.</div>
            </li>
            <li>
              <div className="bullet-list__label">Injections</div>
              <div className="bullet-list__desc">Epidural steroid injections can reduce inflammation around irritated nerves and provide weeks to months of relief.</div>
            </li>
            <li>
              <div className="bullet-list__label">Surgery</div>
              <div className="bullet-list__desc">Reserved for cases with structural problems unresponsive to conservative care, or for neurologic symptoms. Less than 5% of cases.</div>
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'specialties',
      tab: 'doctors',
      title: 'Related Specialties',
      icon: 'Stethoscope',
      body: () => (
        <>
          <p>Depending on duration and severity, lower back pain may be managed by several specialties. Most patients start with primary care.</p>
          <CarouselSpecialties />
        </>
      ),
    },
    {
      id: 'find-care',
      tab: 'locations',
      title: 'Find Care at [System]',
      icon: 'MapPin',
      body: () => (
        <>
          <p>Same-day and next-day appointments at three locations near you.</p>
          <CarouselLocations />
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Spine Center', title: 'Back pain — patient overview', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Rheumatology', title: 'Back pain basics — patient guide', date: 'Sep 2025', url: '#' },
    { num: 3, fav: 'S', name: '[System] Pain Management', title: 'Living with chronic low back pain', date: 'Jan 2026', url: '#' },
    { num: 4, fav: 'S', name: '[System] Clinical Library', title: 'Lumbar strain — diagnosis & care pathway', date: 'Mar 2026', url: '#' },
    { num: 5, fav: 'S', name: '[System] Physical Therapy', title: 'Non-medication approaches to back pain', date: 'Aug 2025', url: '#' },
    { num: 6, fav: 'S', name: '[System] Family Medicine', title: 'Treatment of acute low back pain', date: 'Nov 2025', url: '#' },
  ],
  followups: [
    { q: "What stretches help lower back pain?", to: 'STRETCHES' },
    { q: "When should I get an MRI for back pain?", to: 'IMAGING' },
    { q: "Find a physical therapist near me", to: 'PHYSICAL_THERAPY' },
    { q: "Is back pain a sign of something serious?", to: 'BACK_PAIN' },
    { q: "Does [System] accept my insurance for PT?", to: 'PT_COVERAGE' },
  ],
};

/* === Specialties carousel === */
function CarouselSpecialties() {
  const items = [
    { name: 'Dr. Maya Okonjo', role: 'Primary Care', rating: 4.9, count: 412, avail: 'Tomorrow, 9:40 AM', dist: '0.8 mi · Midtown' },
    { name: 'Andre Thibault, DPT', role: 'Physical Therapy', rating: 4.8, count: 287, avail: 'Today, 4:15 PM', dist: '1.2 mi · West Side' },
    { name: 'Dr. Priya Ramanathan', role: 'Orthopedic Spine', rating: 4.9, count: 198, avail: 'Thu, May 21', dist: '2.0 mi · Hudson Center' },
    { name: 'Dr. James Whitfield', role: 'Pain Management', rating: 4.7, count: 156, avail: 'Fri, May 22', dist: '1.6 mi · East Village' },
    { name: 'Dr. Lena Park', role: 'Sports Medicine', rating: 4.8, count: 224, avail: 'Mon, May 18', dist: '0.5 mi · Midtown' },
  ];
  return (
    <div className="carousel">
      {items.map((p, i) => (
        <div className="provider-card" key={i}>
          <div className="provider-card__head">
            <div className="provider-photo">{Icon.Person()}</div>
            <div>
              <p className="provider-card__name">{p.name}</p>
              <p className="provider-card__role">{p.role}</p>
              <div className="rating" style={{marginTop: 4}}>
                <span className="rating__stars">{Icon.Star()}</span>
                <span className="rating__num">{p.rating}</span>
                <span className="rating__count">({p.count})</span>
              </div>
            </div>
          </div>
          <div className="provider-card__meta">
            <div className="meta-row">{Icon.Calendar()}<span>Next: <strong>{p.avail}</strong></span></div>
            <div className="meta-row">{Icon.MapPin()}<span>{p.dist}</span></div>
            <div className="meta-row">{Icon.Shield()}<span>Accepts most insurance</span></div>
          </div>
          <div className="provider-card__actions">
            <button className="btn btn--primary">Book</button>
            <button className="btn">Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CarouselLocations() {
  const items = [
    { name: '[System] Midtown', role: 'Primary & urgent care', rating: 4.7, count: 1240, avail: 'Open until 9 PM', dist: '0.8 mi · 245 W 38th St' },
    { name: '[System] West Side', role: 'PT & rehab center', rating: 4.8, count: 612, avail: 'Open until 7 PM', dist: '1.2 mi · 410 W 57th St' },
    { name: '[System] Hudson Spine', role: 'Spine & orthopedics', rating: 4.9, count: 380, avail: 'By appointment', dist: '2.0 mi · 60 Hudson St' },
  ];
  return (
    <div className="carousel">
      {items.map((p, i) => (
        <div className="provider-card" key={i}>
          <div className="provider-card__head">
            <div className="provider-photo" style={{borderRadius: 10}}>{Icon.MapPin()}</div>
            <div>
              <p className="provider-card__name">{p.name}</p>
              <p className="provider-card__role">{p.role}</p>
              <div className="rating" style={{marginTop: 4}}>
                <span className="rating__stars">{Icon.Star()}</span>
                <span className="rating__num">{p.rating}</span>
                <span className="rating__count">({p.count})</span>
              </div>
            </div>
          </div>
          <div className="provider-card__meta">
            <div className="meta-row">{Icon.Clock()}<span><strong>{p.avail}</strong></span></div>
            <div className="meta-row">{Icon.MapPin()}<span>{p.dist}</span></div>
            <div className="meta-row">{Icon.Phone()}<span>(212) 555-0149</span></div>
          </div>
          <div className="provider-card__actions">
            <button className="btn btn--primary">Book visit</button>
            <button className="btn">Directions</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* === Follow-up: stretches === */
const STRETCHES = {
  query: "What stretches help lower back pain?",
  chatLabel: "Stretches for back pain",
  tabs: [
    { id: 'pages', label: 'Pages', icon: 'FileText', count: 4 },
    { id: 'services', label: 'Services', icon: 'Video', count: 4 },
  ],
  summary: [
    { text: "Five gentle stretches — done daily — are well-supported for relieving non-specific lower back pain." },
    { text: " Hold each for 20–30 seconds, breathe normally, and stop if you feel sharp pain", cite: [4] },
    { text: ". Start slowly and build to 2 sets per day. Most people notice improvement within 2–3 weeks." },
  ],
  sections: [
    {
      id: 'stretches-list',
      tab: 'pages',
      title: 'Five effective stretches',
      icon: 'Sparkle',
      body: () => (
        <>
          <ul className="bullet-list">
            <li>
              <div className="bullet-list__label">Knee-to-chest</div>
              <div className="bullet-list__desc">Lie on your back, pull one knee toward your chest. Hold 20–30s. Switch legs. 2–3 reps per side.</div>
            </li>
            <li>
              <div className="bullet-list__label">Cat–cow</div>
              <div className="bullet-list__desc">On hands and knees, alternate arching and rounding your back slowly. 10 cycles.</div>
            </li>
            <li>
              <div className="bullet-list__label">Pelvic tilt</div>
              <div className="bullet-list__desc">Lying with knees bent, gently flatten your lower back against the floor. Hold 5s. 10 reps.</div>
            </li>
            <li>
              <div className="bullet-list__label">Child's pose</div>
              <div className="bullet-list__desc">Sit back on heels, arms forward, forehead toward the floor. Hold 30s. Repeat 2–3 times.</div>
            </li>
            <li>
              <div className="bullet-list__label">Piriformis stretch</div>
              <div className="bullet-list__desc">On your back, cross one ankle over the opposite knee, pull thigh toward chest. Hold 20–30s per side.</div>
            </li>
          </ul>
          <div className="callout">
            <div className="callout__icon">{Icon.Info()}</div>
            <div>
              <p className="callout__title">A physical therapist will tailor this to you</p>
              <p className="callout__body">If pain is new, severe, or has lasted more than a few weeks, a PT can rule out red flags and build a program around your specific cause of pain.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'safety',
      tab: 'pages',
      title: 'Safety notes',
      icon: 'Alert',
      body: () => (
        <>
          <ul className="bullet-list">
            <li>
              <div className="bullet-list__label">Stop on sharp pain</div>
              <div className="bullet-list__desc">A gentle stretch feels like tension, not pain. Sharp or shooting pain — particularly down a leg — means stop and consult a clinician.<sup><a href="#src-3" className="cite">3</a></sup></div>
            </li>
            <li>
              <div className="bullet-list__label">Avoid bouncing</div>
              <div className="bullet-list__desc">Static, sustained stretches are safer than ballistic (bouncing) ones for an irritated back.</div>
            </li>
            <li>
              <div className="bullet-list__label">Warm up first</div>
              <div className="bullet-list__desc">A 5-minute walk before stretching makes muscles more pliable and reduces risk of strain.</div>
            </li>
          </ul>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Physical Therapy', title: 'Back exercises in 15 minutes a day', date: 'Feb 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Clinical Library', title: 'Home program: gentle stretches for the lumbar spine', date: 'Apr 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Orthopedics', title: 'Low back pain exercise guide', date: 'Jul 2025', url: '#' },
    { num: 4, fav: 'S', name: '[System] Integrative Health', title: 'Yoga, tai chi, and back pain — what we know', date: 'Oct 2025', url: '#' },
  ],
  followups: [
    { q: "What strengthening exercises help long-term?", to: 'STRETCHES' },
    { q: "Is yoga safe for a herniated disc?", to: 'BACK_PAIN' },
    { q: "How long until stretches show results?", to: 'STRETCHES' },
    { q: "Find a physical therapist near me", to: 'PHYSICAL_THERAPY' },
  ],
};

/* ============================================================ */
/* === PRIMARY_CARE: provider-first search ==================== */
/* ============================================================ */

function PrimaryCareLocs() {
  const locs = [
    { name: '[System] Midtown Primary Care',   dist: '0.5 mi', address: '245 W 38th St', hours: 'Open today until 6:00 PM',    doctors: 8, phone: '(212) 555-0122', virtual: false },
    { name: '[System] West Side Primary Care', dist: '1.2 mi', address: '410 W 57th St', hours: 'Open today until 5:00 PM',    doctors: 6, phone: '(212) 555-0177', virtual: false },
    { name: '[System] Chelsea Primary Care',   dist: '1.6 mi', address: '90 8th Ave',    hours: 'Open today until 7:00 PM',    doctors: 5, phone: '(212) 555-0165', virtual: false },
    { name: '[System] Virtual Primary Care',   dist: null,     address: 'Video visits available', hours: 'Same-week appointments', doctors: 7, phone: '(212) 555-0110', virtual: true },
  ];
  return (
    <div className="proc-locs">
      {locs.map((loc, i) => (
        <div className="proc-loc" key={i}>
          <div className="proc-loc__main">
            <div className="proc-loc__name">{loc.name}</div>
            <div className="proc-loc__meta">
              {loc.dist
                ? <div className="meta-row">{Icon.MapPin()}<span>{loc.dist} · {loc.address}</span></div>
                : <div className="meta-row">{Icon.Video()}<span>{loc.address}</span></div>
              }
              <div className="meta-row">{Icon.Clock()}<span>{loc.hours}</span></div>
              <div className="meta-row">{Icon.Stethoscope()}<span>{loc.doctors} primary care doctors</span></div>
              <div className="meta-row">{Icon.Phone()}<span>{loc.phone}</span></div>
            </div>
          </div>
          <div className="proc-loc__actions">
            <button className="btn btn--primary">{loc.virtual ? 'View virtual visits' : 'View doctors'}</button>
            <button className="btn">{loc.virtual ? 'Learn more' : 'Get directions'}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const PRIMARY_CARE = {
  query: "Find a primary care doctor near me",
  chatLabel: "Find a primary care doctor near me",
  tabs: [
    { id: 'doctors',      label: 'Doctors',      icon: 'Stethoscope', count: 12, confidence: 'high' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar',    count: 8,  confidence: 'high' },
    { id: 'locations',    label: 'Locations',    icon: 'MapPin',      count: 4,  confidence: 'high' },
    { id: 'pages',        label: 'Pages',        icon: 'FileText',    count: 5,  confidence: 'high' },
  ],
  summary: [
    { text: "Found " },
    { text: "12 primary care doctors", cite: [1] },
    { text: " accepting new patients within 2 miles of 10001. Showing doctors with availability in the next two weeks, sorted by fit. " },
    { text: "All accept your insurance ([Plan] PPO)", cite: [2] },
    { text: "." },
  ],
  sections: [
    {
      id: 'top-matches',
      tab: 'doctors',
      title: 'Top matches',
      body: () => (
        <window.ProviderHero providers={[
          {
            name: 'Dr. Maya Okonjo, MD',
            role: 'Family Medicine',
            years: '12 years',
            rating: 4.9, count: 412,
            dist: '0.8 mi · Midtown',
            langs: 'English, French',
            ins: 'Accepts [Plan] PPO',
            slots: ['Tomorrow 9:40 AM', 'Thu 11:20 AM', 'Fri 2:00 PM'],
            acceptingNew: true,
          },
          {
            name: 'Dr. Samuel Reyes, MD',
            role: 'Internal Medicine',
            years: '8 years',
            rating: 4.8, count: 287,
            dist: '0.5 mi · Midtown',
            langs: 'English, Spanish',
            ins: 'Accepts [Plan] PPO',
            slots: ['Today 4:30 PM', 'Tomorrow 8:15 AM'],
            acceptingNew: true,
          },
          {
            name: 'Dr. Lin Chen, MD',
            role: 'Family Medicine',
            years: '15 years',
            rating: 4.8, count: 521,
            dist: '1.4 mi · West Side',
            langs: 'English, Mandarin',
            ins: 'Accepts [Plan] PPO',
            slots: ['Mon 10:00 AM', 'Tue 1:45 PM'],
            acceptingNew: true,
          },
        ]} />
      ),
    },
    {
      id: 'compare',
      tab: 'doctors',
      title: 'Compare doctors',
      body: () => (
        <window.CompareTable
          headers={['Doctor', 'Distance', 'Next available', 'Languages', 'New patients', 'Insurance']}
          rows={[
            [{type:'name', name:'Dr. Maya Okonjo',  sub:'Family Medicine · 4.9★'},   '0.8 mi', 'Tomorrow', 'En, Fr', {type:'tag', label:'Accepting'},             '[Plan] PPO'],
            [{type:'name', name:'Dr. Samuel Reyes', sub:'Internal Medicine · 4.8★'}, '0.5 mi', 'Today',    'En, Es', {type:'tag', label:'Accepting'},             '[Plan] PPO'],
            [{type:'name', name:'Dr. Lin Chen',     sub:'Family Medicine · 4.8★'},   '1.4 mi', 'Monday',   'En, Zh', {type:'tag', label:'Accepting'},             '[Plan] PPO'],
            [{type:'name', name:'Dr. Aaron Patel',  sub:'Internal Medicine · 4.6★'}, '0.7 mi', '~2 weeks', 'En, Hi', {type:'tag', label:'Waitlist', neutral:true}, '[Plan] PPO'],
            [{type:'name', name:'Dr. Yara Hadid',   sub:'Family Medicine · 4.9★'},   '1.8 mi', '~3 weeks', 'En, Ar', {type:'tag', label:'Waitlist', neutral:true}, '[Plan] PPO'],
          ]}
        />
      ),
    },
    {
      id: 'appts',
      tab: 'appointments',
      title: 'Soonest available appointments',
      body: () => (
        <>
          <p style={{fontSize: 13, color: 'var(--text-muted)', marginBottom: 12}}>These are open primary care appointments from doctors who accept [Plan] PPO.<sup><a href="#src-3" className="cite">3</a></sup></p>
          <window.AppointmentSlots slots={[
            { time: '4:30 PM',  when: 'Today',    loc: 'Dr. Samuel Reyes · Internal Medicine', dist: '0.5 mi · Midtown',   wait: 'In-person',            closes: '30-min appt' },
            { time: '5:20 PM',  when: 'Today',    loc: 'Dr. Nina Brooks · Family Medicine',    dist: '1.1 mi · Midtown',   wait: 'In-person',            closes: '30-min appt' },
            { time: '8:15 AM',  when: 'Tomorrow', loc: 'Dr. Samuel Reyes · Internal Medicine', dist: '0.5 mi · Midtown',   wait: 'In-person',            closes: '30-min appt' },
            { time: '9:40 AM',  when: 'Tomorrow', loc: 'Dr. Maya Okonjo · Family Medicine',    dist: '0.8 mi · Midtown',   wait: 'In-person',            closes: '30-min appt' },
            { time: '2:10 PM',  when: 'Tomorrow', loc: 'Dr. Elena Moore · Family Medicine',    dist: '1.7 mi · West Side', wait: 'In-person',            closes: '30-min appt' },
            { time: '11:20 AM', when: 'Thursday', loc: 'Dr. Maya Okonjo · Family Medicine',    dist: '0.8 mi · Midtown',   wait: 'Telehealth available', closes: '30-min appt' },
            { time: '3:00 PM',  when: 'Thursday', loc: 'Dr. Ben Carter · Internal Medicine',   dist: '1.9 mi · Chelsea',   wait: 'In-person',            closes: '30-min appt' },
          ]} />
        </>
      ),
    },
    {
      id: 'pc-locations',
      tab: 'locations',
      title: 'Primary care locations near you',
      body: () => <PrimaryCareLocs />,
    },
    {
      id: 'pages-results',
      tab: 'pages',
      title: 'Related pages',
      body: () => (
        <window.PageResults items={[
          {
            kind: 'Service',
            url: '/services/primary-care',
            title: 'Primary care',
            snippet: 'Learn about family medicine, internal medicine, annual checkups, preventive care, and ongoing health management.',
            meta: ['Service line', 'Patient services'],
          },
          {
            kind: 'Find care',
            url: '/find-care/primary-care',
            title: 'Find a primary care doctor',
            snippet: 'Search primary care providers by location, insurance, availability, language, and accepting-new-patient status.',
            meta: ['Directory', '12 doctors near you'],
          },
          {
            kind: 'Patient guidance',
            url: '/learn/family-vs-internal-medicine',
            title: 'Family medicine vs. internal medicine',
            snippet: 'Understand the difference between family medicine and internal medicine when choosing a primary care doctor.',
            meta: ['Clinician-reviewed', '3 min read'],
          },
          {
            kind: 'Preventive care',
            url: '/learn/annual-physicals',
            title: 'Annual physicals and preventive care',
            snippet: 'Learn what is included in a routine checkup and which screenings may be recommended.',
            meta: ['Clinician-reviewed', '4 min read'],
          },
          {
            kind: 'Billing and insurance',
            url: '/billing/insurance-accepted',
            title: 'Insurance accepted',
            snippet: 'Review accepted insurance plans and learn how to confirm coverage before your visit.',
            meta: ['Updated May 2026', 'Plans accepted'],
          },
        ]} />
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Provider Directory', title: 'Primary care providers — Midtown Manhattan',  date: 'Updated May 2026', url: '#' },
    { num: 2, fav: 'P', name: '[Plan]',                      title: 'Network provider lookup — PPO plan',          date: 'May 2026',         url: '#' },
    { num: 3, fav: 'S', name: '[System] Scheduling',         title: 'Appointment availability — primary care',     date: 'Live',             url: '#' },
    { num: 4, fav: 'S', name: '[System] Locations',          title: 'Primary care location directory',                  date: 'Updated May 2026', url: '#' },
  ],
  followups: [
    { q: "Show female doctors only", to: 'PRIMARY_CARE' },
    { q: "Doctors with same-day appointments", to: 'PRIMARY_CARE' },
    { q: "Compare the top 3 in detail", to: 'PRIMARY_CARE' },
  ],
};


/* ============================================================ */
/* === URGENT_CARE: location + wait-time first ================ */
/* ============================================================ */
const URGENT_CARE = {
  query: "Urgent care open right now",
  chatLabel: "Urgent care locations",
  tabs: [
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 3, confidence: 'high' },
    {
      id: 'reserve', label: 'Available times', icon: 'Calendar', count: 4, confidence: 'high',
    },
    { id: 'guidance', label: 'Guidance', icon: 'BookOpen', count: 2, confidence: 'high' },
    { id: 'pages', label: 'Pages', icon: 'FileText', count: 5, confidence: 'high' },
  ],
  summary: [
    { text: "3 [System] urgent care locations are " },
    { text: "open right now", cite: [1] },
    { text: ". The nearest has a 12-minute estimated wait. You can " },
    { text: "reserve a spot online or walk in", cite: [2] },
    { text: " — both options are first-come, first-served by appointment time." },
  ],
  sections: [
    {
      id: 'open-now',
      tab: 'locations',
      title: 'Open now near you',
      body: () => (
        <window.UrgentCareList items={[
          {
            name: '[System] Midtown Urgent Care',
            wait: 12,
            dist: '0.8 mi',
            address: '245 W 38th St',
            closes: '9:00 PM',
            phone: '(212) 555-0149',
            hourly: [20, 18, 22, 28, 35, 45, 30, 12, 14, 22, 32, 28, 18],
            nowIdx: 7,
          },
          {
            name: '[System] West Side Urgent Care',
            wait: 28,
            dist: '1.2 mi',
            address: '410 W 57th St',
            closes: '8:00 PM',
            phone: '(212) 555-0172',
            hourly: [15, 20, 28, 38, 42, 38, 35, 28, 24, 30, 26, 18, 12],
            nowIdx: 7,
          },
          {
            name: '[System] Hudson Urgent Care',
            wait: 45,
            dist: '2.0 mi',
            address: '60 Hudson St',
            closes: '10:00 PM',
            phone: '(212) 555-0184',
            hourly: [18, 25, 32, 40, 48, 50, 48, 45, 42, 38, 35, 28, 22],
            nowIdx: 7,
          },
        ]} />
      ),
    },
    {
      id: 'pages-results',
      tab: 'pages',
      title: 'On [System].org',
      body: () => (
        <window.PageResults items={[
          {
            kind: 'Service line',
            url: '/services/urgent-care',
            title: 'Urgent Care',
            snippet: 'Same-day evaluation and treatment for non-life-threatening illness and injury — fevers, sprains, UTIs, minor lacerations, and more. No appointment required, but reserving a spot online cuts wait time.',
            meta: ['Updated May 2026', 'Patient services'],
          },
          {
            kind: 'Find care',
            url: '/locations/urgent-care',
            title: 'Urgent Care Locations',
            snippet: 'Browse all 12 [System] urgent care locations across the metro area. Filter by open-now status, pediatric availability, X-ray on-site, and language support.',
            meta: ['Directory', '12 locations'],
          },
          {
            kind: 'Service line',
            url: '/services/emergency',
            title: 'Emergency Care',
            snippet: 'Life-threatening symptoms — chest pain, stroke signs, severe bleeding, difficulty breathing, severe abdominal pain — require an emergency department, not urgent care.',
            meta: ['24/7 service', 'Patient services'],
          },
          {
            kind: 'Patient education',
            url: '/learn/urgent-vs-er',
            title: 'Urgent Care vs. Emergency Room',
            snippet: 'A side-by-side comparison of when to use urgent care versus the ER, including typical cost, wait time, and the kinds of conditions treated at each.',
            meta: ['Clinician-reviewed', '4 min read'],
          },
          {
            kind: 'Billing',
            url: '/billing/urgent-care',
            title: 'Insurance and Billing for Urgent Care',
            snippet: 'How [System] bills urgent care visits, what your copay or coinsurance is likely to be on common plans, and what to do if you receive a balance bill.',
            meta: ['Updated Jan 2026', 'Plans accepted'],
          },
        ]} />
      ),
    },
    {
      id: 'reserve-slots',
      tab: 'reserve',
      title: 'Available times',
      body: (ctx) => (
        <window.AppointmentSlots
          gated={!ctx.loggedIn}
          slots={[
            { time: '3:45 PM', when: 'Today',     loc: '[System] Midtown Urgent Care',    dist: '0.8 mi', wait: '~12 min wait', closes: 'closes 9 PM' },
            { time: '4:15 PM', when: 'Today',     loc: '[System] Midtown Urgent Care',    dist: '0.8 mi', wait: '~12 min wait', closes: 'closes 9 PM' },
            { time: '5:00 PM', when: 'Today',     loc: '[System] West Side Urgent Care',  dist: '1.2 mi', wait: '~28 min wait', closes: 'closes 8 PM' },
            { time: '6:30 PM', when: 'Today',     loc: '[System] Hudson Urgent Care',     dist: '2.0 mi', wait: '~45 min wait', closes: 'closes 10 PM' },
          ]}
        />
      ),
    },
    {
      id: 'what-to-bring',
      tab: 'guidance',
      title: 'What to bring',
      body: () => (
        <ul className="bullet-list">
          <li>
            <div className="bullet-list__label">Photo ID and insurance card</div>
            <div className="bullet-list__desc">Front desk will copy both. If you have a digital insurance card in your wallet app, it's accepted.</div>
          </li>
          <li>
            <div className="bullet-list__label">List of current medications</div>
            <div className="bullet-list__desc">Names and dosages — including over-the-counter and supplements. A screenshot of your pharmacy app works.</div>
          </li>
          <li>
            <div className="bullet-list__label">Form of payment for copay</div>
            <div className="bullet-list__desc">Your plan's urgent care copay is <strong>$45</strong>. Most locations accept tap-to-pay, card, or HSA/FSA.</div>
          </li>
        </ul>
      ),
    },
    {
      id: 'why-urgent',
      tab: 'guidance',
      title: 'Urgent care vs. ER',
      body: () => (
        <>
          <p>Urgent care handles things that need same-day attention but aren't life-threatening. Average visit is ~45 minutes; cost is typically 1/3 of an ER visit.<sup><a href="#src-3" className="cite">3</a></sup></p>
          <div className="callout">
            <div className="callout__icon">{Icon.Info()}</div>
            <div>
              <p className="callout__title">Good for urgent care</p>
              <p className="callout__body">Minor cuts, sprains, fevers, UTIs, ear infections, mild asthma flare-ups, rashes, dehydration.</p>
            </div>
          </div>
          <div className="callout callout--danger">
            <div className="callout__icon">{Icon.Alert()}</div>
            <div>
              <p className="callout__title">Go to ER (or call 911) for</p>
              <p className="callout__body">Chest pain, difficulty breathing, signs of stroke, severe bleeding, suspected broken bones, head injury with confusion, severe abdominal pain.</p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Locations', title: 'Real-time urgent care hours & wait times', date: 'Live', url: '#' },
    { num: 2, fav: 'S', name: '[System] Patient Portal', title: 'Reserve a spot online', date: 'May 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Urgent Care', title: 'When to use urgent care vs emergency department', date: 'Feb 2026', url: '#' },
  ],
  followups: [
    { q: "Reserve the next available slot", to: 'URGENT_CARE' },
    { q: "What does an urgent care visit cost on my plan?", to: 'URGENT_CARE' },
    { q: "Is this open 24 hours?", to: 'URGENT_CARE' },
    { q: "Find a pediatric urgent care", to: 'URGENT_CARE' },
  ],
};

/* ============================================================ */
/* === COLONOSCOPY: prep timeline ============================= */
/* ============================================================ */

function ColonoscopyInstructions() {
  return (
    <div className="instr-cards">
      <div className="instr-card">
        <div className="instr-card__title">Foods to avoid</div>
        <div className="instr-card__body">
          <ul className="instr-card__list">
            <li>Nuts and seeds</li>
            <li>Raw fruits and vegetables</li>
            <li>Whole grains</li>
            <li>Corn, beans, popcorn</li>
            <li>Red or purple liquids</li>
            <li>Alcohol</li>
          </ul>
        </div>
      </div>
      <div className="instr-card">
        <div className="instr-card__title">Clear liquids you can usually have (1 day before)</div>
        <div className="instr-card__body">
          <ul className="instr-card__list">
            <li>Water</li>
            <li>Clear broth</li>
            <li>Apple juice or white grape juice</li>
            <li>Plain coffee or tea without milk</li>
            <li>Gelatin</li>
            <li>Popsicles without red or purple dye</li>
          </ul>
        </div>
      </div>
      <div className="instr-card">
        <div className="instr-card__title">Medications to ask about</div>
        <div className="instr-card__body">
          <p className="instr-card__prose">Ask your doctor before changing any medication. Blood thinners, diabetes medications, iron supplements, and some anti-inflammatory medicines may need special instructions.</p>
        </div>
      </div>
      <div className="instr-card">
        <div className="instr-card__title">Call your clinic if</div>
        <div className="instr-card__body">
          <ul className="instr-card__list">
            <li>You cannot finish the prep solution</li>
            <li>You vomit repeatedly</li>
            <li>Your stool is not clear by procedure morning</li>
            <li>You accidentally ate solid food after starting clear liquids</li>
            <li>You do not have someone to drive you home</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ColonoscopyLocs() {
  const locs = [
    { name: '[System] Midtown Endoscopy Center',    dist: '0.8 mi', address: '245 W 38th St', checkin: '6th floor',   parking: 'Parking available',     phone: '(212) 555-0132' },
    { name: '[System] West Side Gastroenterology',  dist: '1.6 mi', address: '410 W 57th St', checkin: 'Suite 300',   parking: 'Garage parking nearby', phone: '(212) 555-0174' },
    { name: '[System] Downtown Endoscopy',          dist: '2.3 mi', address: '60 Hudson St',  checkin: 'Main lobby',  parking: 'Valet available',        phone: '(212) 555-0189' },
  ];
  return (
    <>
      <div className="proc-locs">
        {locs.map((loc, i) => (
          <div className="proc-loc" key={i}>
            <div className="proc-loc__main">
              <div className="proc-loc__name">{loc.name}</div>
              <div className="proc-loc__meta">
                <div className="meta-row">{Icon.MapPin()}<span>{loc.dist} · {loc.address}</span></div>
                <div className="meta-row">{Icon.Info()}<span>Check in: {loc.checkin}</span></div>
                <div className="meta-row">{Icon.Info()}<span>{loc.parking}</span></div>
                <div className="meta-row">{Icon.Phone()}<span>{loc.phone}</span></div>
              </div>
            </div>
            <div className="proc-loc__actions">
              <button className="btn btn--primary">Get directions</button>
              <button className="btn">Call location</button>
            </div>
          </div>
        ))}
      </div>
      <p className="proc-loc__note">Confirm your exact arrival time and location in your appointment instructions.</p>
    </>
  );
}

const COLONOSCOPY = {
  query: "How do I prepare for a colonoscopy?",
  chatLabel: "Colonoscopy prep",
  tabs: [
    { id: 'timeline',     label: 'Timeline',     icon: 'Calendar', count: 6, confidence: 'high' },
    { id: 'instructions', label: 'Instructions', icon: 'BookOpen', count: 4, confidence: 'high' },
    { id: 'locations',    label: 'Locations',    icon: 'MapPin',   count: 3, confidence: 'high' },
    { id: 'pages',        label: 'Pages',        icon: 'FileText', count: 5, confidence: 'high' },
  ],
  summary: [
    { text: "Preparation takes about " },
    { text: "5–7 days", cite: [1] },
    { text: " — mostly dietary adjustments leading up to a 24-hour bowel-cleansing routine the day before." },
    { text: " Follow your provider's instructions exactly: incomplete prep is the leading cause of repeat or canceled procedures", cite: [2] },
    { text: "." },
  ],
  sections: [
    {
      id: 'timeline',
      tab: 'timeline',
      title: 'Your prep timeline',
      body: () => (
        <window.TimelineStepper steps={[
          {
            when: '7 days before',
            title: 'Pick up your prep kit',
            detail: 'Your prep kit, laxative solution, and clear-liquid guide will be available at your [System] pharmacy. Tell your doctor about all medications — some may need to be paused.',
            list: [
              'Stop iron supplements',
              'Pause NSAIDs, such as ibuprofen or aspirin, only if your doctor approves',
              'Confirm a ride home — you cannot drive after sedation',
            ],
          },
          {
            when: '3 days before',
            title: 'Switch to a low-fiber diet',
            detail: 'Avoid nuts, seeds, raw fruits and vegetables, whole grains, and red meat.',
            list: [
              'OK: white rice, plain pasta, eggs, chicken, fish, white bread',
              'Avoid: salads, popcorn, corn, beans, brown rice, anything with seeds',
            ],
          },
          {
            when: '1 day before',
            title: 'Clear liquids only',
            detail: 'Starting the morning before your procedure, drink only clear liquids: water, broth, plain coffee or tea without milk, clear juice with no pulp, gelatin, and popsicles. Avoid red or purple liquids because they can look like blood during the procedure.',
          },
          {
            when: 'Evening before',
            title: 'Start the prep solution',
            detail: 'Drink half of your prescribed laxative solution according to your instructions, usually between 6–8 PM. Stay near a bathroom — bowel movements typically start within 1–3 hours.',
            list: [
              'Refrigerate the solution beforehand — it tastes better cold',
              'Use a straw to bypass taste buds',
              'Sip steadily, not all at once',
            ],
          },
          {
            when: 'Morning of',
            title: 'Finish prep, then stop drinking 2 hours before',
            detail: 'Finish the second half of your prep about 5 hours before the procedure. Stop all liquids 2 hours before. Wear loose, comfortable clothing.',
          },
          {
            when: 'After',
            title: 'Recovery and getting home',
            detail: "You'll need someone to drive you home because sedation effects can last for hours. Rest for the day. You can usually eat normally that evening. Some bloating and gas are normal.",
          },
        ]} />
      ),
    },
    {
      id: 'questions',
      tab: 'timeline',
      title: 'Questions to ask your doctor',
      body: () => (
        <div className="qa-list">
          <div className="qa-row">
            <div className="qa-row__q">Should I take my regular medications?</div>
            <div className="qa-row__a">Especially blood thinners, diabetes medication, and blood pressure medication.</div>
          </div>
          <div className="qa-row">
            <div className="qa-row__q">What if I have trouble with the prep?</div>
            <div className="qa-row__a">If you can't finish the solution, or your stool isn't clear by procedure morning, call the clinic — they may delay.</div>
          </div>
          <div className="qa-row">
            <div className="qa-row__q">When will I get results?</div>
            <div className="qa-row__a">Visual findings are shared right after; biopsy results typically take 5–7 days.</div>
          </div>
        </div>
      ),
    },
    {
      id: 'instructions',
      tab: 'instructions',
      title: 'Prep instructions',
      body: () => <ColonoscopyInstructions />,
    },
    {
      id: 'proc-locations',
      tab: 'locations',
      title: 'Colonoscopy locations',
      body: () => <ColonoscopyLocs />,
    },
    {
      id: 'pages-results',
      tab: 'pages',
      title: 'Related pages',
      body: () => (
        <window.PageResults items={[
          {
            kind: 'Patient instructions',
            url: '/learn/colonoscopy-prep',
            title: 'Colonoscopy preparation instructions',
            snippet: 'Step-by-step instructions for diet changes, clear liquids, bowel prep, and what to expect before your procedure.',
            meta: ['Clinician-reviewed', 'Patient instructions'],
          },
          {
            kind: 'Procedure',
            url: '/learn/colonoscopy',
            title: 'Colonoscopy',
            snippet: 'Learn why colonoscopies are done, what the procedure involves, and how results are shared.',
            meta: ['Clinician-reviewed'],
          },
          {
            kind: 'Locations',
            url: '/locations/endoscopy',
            title: 'Endoscopy locations',
            snippet: 'Find [System] endoscopy centers, addresses, parking details, and phone numbers.',
            meta: ['Directory', '3 locations'],
          },
          {
            kind: 'Patient education',
            url: '/learn/sedation-anesthesia',
            title: 'Anesthesia and sedation',
            snippet: 'Learn what to expect from sedation, why you need a ride home, and how long recovery may take.',
            meta: ['Clinician-reviewed'],
          },
          {
            kind: 'Billing and insurance',
            url: '/billing/procedures',
            title: 'Billing and insurance for procedures',
            snippet: 'Review coverage, estimates, and billing information for outpatient procedures.',
            meta: ['Updated Jan 2026'],
          },
        ]} />
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] GI Department',  title: 'Patient instructions reviewed by [System] gastroenterology team', date: 'Jan 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] GI Department',  title: 'Procedure preparation guidance from [System] endoscopy instructions', date: 'Apr 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Endoscopy',      title: 'Location data from [System] endoscopy directory', date: 'May 2026', url: '#' },
    { num: 4, fav: 'S', name: '[System] Billing',        title: 'Billing information from [System] patient financial services', date: 'Feb 2026', url: '#' },
  ],
  followups: [
    { q: "What if I can't finish the prep solution?", to: 'COLONOSCOPY' },
    { q: "Can I have coffee the morning of?", to: 'COLONOSCOPY' },
    { q: "How long does the procedure take?", to: 'COLONOSCOPY' },
  ],
};

/* ============================================================ */
/* === PT_COVERAGE: insurance answer ========================== */
/* ============================================================ */

function PTBenefitSteps() {
  return (
    <div className="benefit-steps">
      <div className="benefit-step">
        <div className="benefit-step__body">
          <div className="benefit-step__title">Choose an in-network PT provider</div>
          <div className="benefit-step__copy">You have 28 in-network physical therapy providers within 5 miles of 10001.<sup><a href="#src-1" className="cite">1</a></sup></div>
        </div>
        <div className="benefit-step__cta">
          <button className="btn btn--primary">View providers</button>
        </div>
      </div>
      <div className="benefit-step">
        <div className="benefit-step__body">
          <div className="benefit-step__title">Book your first visit</div>
          <div className="benefit-step__copy">No referral is required under your PPO plan.<sup><a href="#src-2" className="cite">2</a></sup> Most PT clinics will complete an evaluation visit before building a treatment plan.</div>
        </div>
        <div className="benefit-step__cta">
          <button className="btn">Find a location</button>
        </div>
      </div>
      <div className="benefit-step">
        <div className="benefit-step__body">
          <div className="benefit-step__title">Track your visit count</div>
          <div className="benefit-step__copy">Your plan covers up to 30 in-network PT visits per calendar year. Additional visits may require preauthorization.<sup><a href="#src-1" className="cite">1</a></sup></div>
        </div>
        <div className="benefit-step__cta">
          <button className="btn">View plan details</button>
        </div>
      </div>
      <div className="benefit-step__note">Coverage can vary by diagnosis, provider network status, and medical necessity. Confirm benefits with your plan before your visit.</div>
    </div>
  );
}

function PTProviders() {
  const providers = [
    { name: '[System] Midtown Physical Therapy',  dist: '0.7 mi', specialties: 'Orthopedic rehab, sports injuries, back and neck pain', note: 'Evening appointments', phone: '(212) 555-0181', virtual: false, primaryCta: 'Book evaluation' },
    { name: '[System] West Side Rehabilitation',  dist: '1.3 mi', specialties: 'Post-surgical rehab, balance therapy, chronic pain',    note: 'Accepting new patients',  phone: '(212) 555-0148', virtual: false, primaryCta: 'Book evaluation' },
    { name: '[System] Chelsea Sports Therapy',    dist: '1.8 mi', specialties: 'Sports injuries, running injuries, shoulder and knee rehab', note: 'Next available this week', phone: '(212) 555-0162', virtual: false, primaryCta: 'Book evaluation' },
    { name: '[System] Virtual PT Coaching',       dist: null,     specialties: 'Home exercise programs, recovery check-ins',           note: 'Good for follow-up care',  phone: '(212) 555-0117', virtual: true,  primaryCta: 'Schedule virtual visit' },
  ];
  return (
    <>
      <p style={{fontSize: 13, color: 'var(--text-muted)', marginBottom: 14}}>Showing providers within 5 miles who accept [Plan] PPO.<sup><a href="#src-1" className="cite">1</a></sup></p>
      <div className="proc-locs">
        {providers.map((p, i) => (
          <div className="proc-loc" key={i}>
            <div className="proc-loc__main">
              <div className="proc-loc__name">
                {p.name}
                <span className="pill pill--ok"><span className="pill__dot"></span><span>In-network</span></span>
              </div>
              <div className="proc-loc__meta">
                {p.virtual
                  ? <div className="meta-row">{Icon.Video()}<span>Video visits available</span></div>
                  : <div className="meta-row">{Icon.MapPin()}<span>{p.dist}</span></div>
                }
                <div className="meta-row">{Icon.BookOpen()}<span>{p.specialties}</span></div>
                <div className="meta-row">{Icon.Info()}<span>{p.note}</span></div>
                <div className="meta-row">{Icon.Phone()}<span>{p.phone}</span></div>
              </div>
            </div>
            <div className="proc-loc__actions">
              <button className="btn btn--primary">{p.primaryCta}</button>
              <button className="btn">View details</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PTLocs() {
  const locs = [
    { name: '[System] Midtown Rehabilitation Center', dist: '0.7 mi', address: '245 W 38th St', hours: 'Open today until 7:00 PM', services: 'PT, occupational therapy, sports rehab', phone: '(212) 555-0181' },
    { name: '[System] West Side Rehab Clinic',        dist: '1.3 mi', address: '410 W 57th St', hours: 'Open today until 6:00 PM', services: 'PT, post-surgical rehab, balance therapy', phone: '(212) 555-0148' },
    { name: '[System] Chelsea Sports Rehab',          dist: '1.8 mi', address: '90 8th Ave',    hours: 'Open today until 8:00 PM', services: 'PT, sports rehab, injury prevention',     phone: '(212) 555-0162' },
  ];
  return (
    <div className="proc-locs">
      {locs.map((loc, i) => (
        <div className="proc-loc" key={i}>
          <div className="proc-loc__main">
            <div className="proc-loc__name">{loc.name}</div>
            <div className="proc-loc__meta">
              <div className="meta-row">{Icon.MapPin()}<span>{loc.dist} · {loc.address}</span></div>
              <div className="meta-row">{Icon.Clock()}<span>{loc.hours}</span></div>
              <div className="meta-row">{Icon.BookOpen()}<span>{loc.services}</span></div>
              <div className="meta-row">{Icon.Phone()}<span>{loc.phone}</span></div>
            </div>
          </div>
          <div className="proc-loc__actions">
            <button className="btn btn--primary">Get directions</button>
            <button className="btn">View providers</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const PT_COVERAGE = {
  query: "Does my plan cover physical therapy?",
  chatLabel: "Does my plan cover physical therapy?",
  tabs: [
    { id: 'coverage',  label: 'Coverage',  icon: 'Shield',      confidence: 'high' },
    { id: 'providers', label: 'Providers', icon: 'Stethoscope', count: 7, confidence: 'high' },
    { id: 'locations', label: 'Locations', icon: 'MapPin',      count: 3, confidence: 'high' },
    { id: 'pages',     label: 'Pages',     icon: 'FileText',    count: 5, confidence: 'high' },
  ],
  summary: [
    { text: "Yes — your plan covers physical therapy with in-network providers. Your copay is " },
    { text: "$40 per visit", cite: [1] },
    { text: " after your annual deductible is met. You have up to " },
    { text: "30 visits per calendar year", cite: [1] },
    { text: " without preauthorization, and " },
    { text: "a referral from your primary care doctor is not required", cite: [2] },
    { text: " under your PPO plan." },
  ],
  sections: [
    {
      id: 'coverage',
      tab: 'coverage',
      title: 'Coverage at a glance',
      body: () => (
        <>
          <window.CoverageCard
            plan="[Plan] PPO — Family"
            status="covered"
            copay={40}
            deductible={{met: '$320', total: '500'}}
            visitsPerYear={30}
            referralRequired={false}
            network={28}
            preauth="Not required for first 30 visits"
          />
        </>
      ),
    },
    {
      id: 'how-to-use',
      tab: 'coverage',
      title: 'How to use this benefit',
      body: () => <PTBenefitSteps />,
    },
    {
      id: 'providers',
      tab: 'providers',
      title: 'In-network physical therapy providers',
      body: () => <PTProviders />,
    },
    {
      id: 'pt-locations',
      tab: 'locations',
      title: 'Physical therapy locations near you',
      body: () => <PTLocs />,
    },
    {
      id: 'pages-results',
      tab: 'pages',
      title: 'Related pages',
      body: () => (
        <window.PageResults items={[
          {
            kind: 'Service',
            url: '/services/physical-therapy',
            title: 'Physical therapy',
            snippet: 'Learn about physical therapy services for injury recovery, pain management, mobility, strength, and post-surgical rehabilitation.',
            meta: ['Service line', 'Patient services'],
          },
          {
            kind: 'Service line',
            url: '/services/rehabilitation',
            title: 'Rehabilitation services',
            snippet: 'Explore rehabilitation care, including physical therapy, occupational therapy, speech therapy, sports rehab, and recovery programs.',
            meta: ['Service line', 'Patient services'],
          },
          {
            kind: 'Billing and insurance',
            url: '/billing/insurance-accepted',
            title: 'Insurance accepted',
            snippet: 'Review accepted insurance plans and learn how to confirm your coverage before a visit.',
            meta: ['Updated May 2026', 'Plans accepted'],
          },
          {
            kind: 'Billing and insurance',
            url: '/billing/patient-estimates',
            title: 'Patient billing and estimates',
            snippet: 'Learn how deductibles, copays, estimates, and out-of-pocket costs work for outpatient care.',
            meta: ['Clinician-reviewed', 'Billing support'],
          },
          {
            kind: 'Patient guidance',
            url: '/learn/referrals',
            title: 'Do I need a referral?',
            snippet: 'Find out when referrals are required for specialty care, therapy services, and insurance coverage.',
            meta: ['Clinician-reviewed', '3 min read'],
          },
        ]} />
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'P', name: '[Plan]',           title: 'PPO Family plan — benefits summary',            date: 'Jan 2026', url: '#' },
    { num: 2, fav: 'P', name: '[Plan]',           title: 'Referral requirements by service',              date: 'Feb 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Billing', title: 'Understanding deductibles and copays',          date: 'Mar 2026', url: '#' },
    { num: 4, fav: 'S', name: '[System] Locations', title: 'Physical therapy location directory',         date: 'Updated May 2026', url: '#' },
  ],
  followups: [
    { q: "What about chiropractic care?", to: 'PT_COVERAGE' },
    { q: "How do I check my deductible balance?", to: 'PT_COVERAGE' },
    { q: "Find PTs with evening appointments", to: 'PHYSICAL_THERAPY' },
  ],
};


/* ============================================================ */
/* === CHEST_PAIN: placeholder for the emergency flow ========= */
/* ============================================================ */
const CHEST_PAIN = {
  query: "Chest pain and shortness of breath",
  chatLabel: "Chest pain and shortness of breath",
  tabs: [
    { id: 'emergency', label: 'Emergency guidance', icon: 'Alert', count: 1, confidence: 'high' },
    { id: 'er-locations', label: 'ER locations', icon: 'MapPin', count: 3, confidence: 'high' },
    { id: 'pages', label: 'Pages', icon: 'FileText', count: 4, confidence: 'high' },
  ],
  summary: [
    { text: "Chest pain with shortness of breath can be a " },
    { text: "medical emergency", cite: [1] },
    { text: ". If symptoms are severe, sudden, or worsening, " },
    { text: "call 911 or go to the nearest emergency department", cite: [2] },
    { text: "." },
  ],
  sections: [
    {
      id: 'when-to-call-911',
      tab: 'emergency',
      title: 'Call 911 if you have any of these',
      body: () => (
        <>
          <div className="callout callout--danger">
            <div className="callout__icon">{Icon.Alert()}</div>
            <div>
              <p className="callout__title">Do not drive yourself. Call 911 or have someone bring you to the nearest ER.</p>
              <p className="callout__body">Paramedics can start treatment on the way and the ER will be ready when you arrive.</p>
            </div>
          </div>
          <ul className="bullet-list">
            <li>
              <div className="bullet-list__label">Crushing, squeezing, or pressure-like chest pain</div>
              <div className="bullet-list__desc">Especially pain that radiates to your jaw, neck, shoulder, or down an arm.<sup><a href="#src-1" className="cite">1</a></sup></div>
            </li>
            <li>
              <div className="bullet-list__label">Sudden severe shortness of breath</div>
              <div className="bullet-list__desc">Particularly with sweating, nausea, lightheadedness, or a feeling of impending doom.</div>
            </li>
            <li>
              <div className="bullet-list__label">Pain with fainting or loss of consciousness</div>
              <div className="bullet-list__desc">Or chest pain that wakes you from sleep.</div>
            </li>
            <li>
              <div className="bullet-list__label">Symptoms that have lasted more than a few minutes</div>
              <div className="bullet-list__desc">Or that have come and gone over the last day.<sup><a href="#src-3" className="cite">3</a></sup></div>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'er-near-you',
      tab: 'er-locations',
      title: 'Emergency departments near you',
      body: () => (
        <window.UrgentCareList items={[
          {
            name: '[System] Midtown Emergency Department',
            wait: 8,
            dist: '0.9 mi',
            address: '245 W 38th St',
            closes: 'Open 24 / 7',
            phone: '(212) 555-0100',
            hourly: [22, 24, 26, 30, 35, 38, 36, 30, 28, 26, 24, 22, 20],
            nowIdx: 7,
          },
          {
            name: '[System] West Side Emergency',
            wait: 18,
            dist: '1.3 mi',
            address: '410 W 57th St',
            closes: 'Open 24 / 7',
            phone: '(212) 555-0110',
            hourly: [18, 22, 28, 36, 42, 44, 40, 35, 30, 26, 22, 20, 18],
            nowIdx: 7,
          },
          {
            name: '[System] Hudson Emergency',
            wait: 32,
            dist: '2.1 mi',
            address: '60 Hudson St',
            closes: 'Open 24 / 7',
            phone: '(212) 555-0120',
            hourly: [20, 25, 32, 40, 46, 48, 46, 42, 38, 34, 30, 26, 22],
            nowIdx: 7,
          },
        ]} />
      ),
    },
    {
      id: 'chest-pages',
      tab: 'pages',
      title: 'On [System].org',
      body: () => (
        <window.PageResults items={[
          {
            kind: 'Service line',
            url: '/services/emergency',
            title: 'Emergency Care',
            snippet: 'Around-the-clock emergency departments for life-threatening symptoms — chest pain, stroke, severe bleeding, difficulty breathing. Triage on arrival.',
            meta: ['24/7 service', 'Patient services'],
          },
          {
            kind: 'Patient education',
            url: '/learn/heart-attack-warning-signs',
            title: 'Heart attack warning signs',
            snippet: 'Symptoms vary between people and presentations differ between men and women. Learn what to look for and when to act.',
            meta: ['Clinician-reviewed', '5 min read'],
          },
          {
            kind: 'Patient education',
            url: '/learn/chest-pain-vs-anxiety',
            title: 'Chest pain vs. anxiety: how to tell',
            snippet: 'Anxiety and panic attacks can mimic cardiac symptoms. When in doubt, treat it as cardiac and get evaluated.',
            meta: ['Clinician-reviewed', '4 min read'],
          },
          {
            kind: 'Service line',
            url: '/services/cardiology',
            title: 'Cardiology',
            snippet: 'Follow-up evaluation, diagnostic testing, and ongoing management for heart conditions.',
            meta: ['Specialty', 'Outpatient'],
          },
        ]} />
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Cardiology', title: 'Chest pain — patient guide', date: 'Mar 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Emergency Medicine', title: 'When to call 911', date: 'Apr 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Clinical Library', title: 'Acute coronary syndrome — patient pathway', date: 'Feb 2026', url: '#' },
  ],
  followups: [
    { q: "What does an ER visit cost on my plan?", to: 'CHEST_PAIN' },
    { q: "Where's the closest ER right now?", to: 'HOSPITALS' },
    { q: "Is it safer to take a cab or call 911?", to: 'CHEST_PAIN' },
  ],
};

/* ============================================================ */
/* === PHARMACY: locations with late hours ==================== */
/* ============================================================ */
const PHARMACY = {
  query: "Closest pharmacy with late hours",
  chatLabel: "Pharmacies open late",
  tabs: [
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 3 },
  ],
  summary: [
    { text: "3 " },
    { text: "[System] pharmacies", cite: [1] },
    { text: " near you are open past 9 PM tonight. The closest is " },
    { text: "0.4 mi away", cite: [2] },
    { text: " and stays open until 11 PM. One location offers " },
    { text: "24-hour service", cite: [1] },
    { text: "." },
  ],
  sections: [
    {
      id: 'pharmacy-list',
      tab: 'locations',
      title: 'Open late near you',
      icon: 'MapPin',
      body: () => (
        <window.PharmacyList items={[
          { name: '[System] Pharmacy — Midtown', dist: '0.4 mi', address: '245 W 38th St', closes: '11:00 PM', phone: '(212) 555-0150', tag: 'Closes 11 PM', tagKind: 'ok' },
          { name: '[System] Pharmacy — West Side', dist: '0.9 mi', address: '410 W 57th St', closes: '10:00 PM', phone: '(212) 555-0173', tag: 'Closes 10 PM', tagKind: 'ok' },
          { name: '[System] Pharmacy — Hudson Yards', dist: '1.4 mi', address: '60 Hudson St', closes: '24 hours', phone: '(212) 555-0185', tag: '24-hour', tagKind: 'accent' },
        ]} />
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Pharmacy', title: 'Network locations and hours', date: 'Live', url: '#' },
    { num: 2, fav: 'S', name: '[System] Locations', title: 'GPS distance estimates', date: 'Live', url: '#' },
  ],
  followups: [
    { q: "Show 24-hour pharmacies", to: 'PHARMACY' },
    { q: "Can I transfer a prescription?", to: 'PHARMACY' },
    { q: "Which one is closest to my office?", to: 'PHARMACY' },
    { q: "Do they accept my insurance?", to: 'PHARMACY' },
  ],
};

/* === Generic carousels (topic-specific items passed in) === */
function ProviderCarousel({ items }) {
  return (
    <div className="carousel">
      {(items || []).map((p, i) => (
        <div className="provider-card" key={i}>
          <div className="provider-card__head">
            <div className="provider-photo">{Icon.Person()}</div>
            <div>
              <p className="provider-card__name">{p.name}</p>
              <p className="provider-card__role">{p.role}</p>
              <div className="rating" style={{marginTop: 4}}>
                <span className="rating__stars">{Icon.Star()}</span>
                <span className="rating__num">{p.rating}</span>
                <span className="rating__count">({p.count})</span>
              </div>
            </div>
          </div>
          <div className="provider-card__meta">
            <div className="meta-row">{Icon.Calendar()}<span>Next: <strong>{p.avail}</strong></span></div>
            <div className="meta-row">{Icon.MapPin()}<span>{p.dist}</span></div>
            <div className="meta-row">{Icon.Shield()}<span>Accepts most insurance</span></div>
          </div>
          <div className="provider-card__actions">
            <button className="btn btn--primary">Book</button>
            <button className="btn">Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function LocationCarousel({ items }) {
  return (
    <div className="carousel">
      {(items || []).map((p, i) => (
        <div className="provider-card" key={i}>
          <div className="provider-card__head">
            <div className="provider-photo" style={{borderRadius: 10}}>{Icon.MapPin()}</div>
            <div>
              <p className="provider-card__name">{p.name}</p>
              <p className="provider-card__role">{p.role}</p>
              <div className="rating" style={{marginTop: 4}}>
                <span className="rating__stars">{Icon.Star()}</span>
                <span className="rating__num">{p.rating}</span>
                <span className="rating__count">({p.count})</span>
              </div>
            </div>
          </div>
          <div className="provider-card__meta">
            <div className="meta-row">{Icon.Clock()}<span><strong>{p.avail}</strong></span></div>
            <div className="meta-row">{Icon.MapPin()}<span>{p.dist}</span></div>
            <div className="meta-row">{Icon.Phone()}<span>{p.phone || '(212) 555-0149'}</span></div>
          </div>
          <div className="provider-card__actions">
            <button className="btn btn--primary">Book visit</button>
            <button className="btn">Directions</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* === Mammogram & screening === */
const MAMMOGRAM = {
  query: "Schedule a mammogram screening",
  chatLabel: "Mammogram & screening",
  tabs: [
    { id: 'services', label: 'Services', icon: 'FileText', count: 2 },
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 3 },
  ],
  summary: [
    { text: "A screening mammogram takes about " },
    { text: "20 minutes", cite: [1] },
    { text: " and is recommended every 1–2 years for women starting at age 40", cite: [2] },
    { text: ". Most plans cover annual screening at no out-of-pocket cost — you can book same-week at three centers near you." },
  ],
  sections: [
    {
      id: 'mammo-expect', tab: 'services', title: 'What to expect', icon: 'Info',
      body: () => (
        <>
          <p>A screening mammogram is a low-dose X-ray used to detect changes in breast tissue before they can be felt.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Before</div><div className="bullet-list__desc">Skip deodorant, lotion, and powder the day of your exam — they can show up on the images.</div></li>
            <li><div className="bullet-list__label">During</div><div className="bullet-list__desc">Each breast is briefly compressed while images are taken. The full visit runs about 20 minutes.</div></li>
            <li><div className="bullet-list__label">After</div><div className="bullet-list__desc">Results are typically posted to your patient portal within 2–3 business days.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'mammo-who', tab: 'services', title: 'Who should screen, and when', icon: 'BookOpen',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Age 40–44</div><div className="bullet-list__desc">Option to begin annual screening.</div></li>
            <li><div className="bullet-list__label">Age 45–54</div><div className="bullet-list__desc">Annual screening recommended.</div></li>
            <li><div className="bullet-list__label">Age 55+</div><div className="bullet-list__desc">Continue every 1–2 years.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
            <li><div className="bullet-list__label">Higher risk</div><div className="bullet-list__desc">Family history or genetic factors may mean earlier or more frequent screening — ask your care team.</div></li>
          </ul>
          <div className="callout">
            <div className="callout__icon">{Icon.Shield()}</div>
            <div>
              <p className="callout__title">Usually $0 out of pocket</p>
              <p className="callout__body">Annual screening mammograms are covered as preventive care by most plans, with no copay or deductible.<sup><a href="#src-3" className="cite">3</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'mammo-book', tab: 'locations', title: 'Book at a center near you', icon: 'MapPin',
      body: () => (
        <>
          <p>Same-week screening appointments at three accredited imaging centers.</p>
          <LocationCarousel items={[
            { name: '[System] Women’s Imaging — Midtown', role: 'Breast imaging center', rating: 4.9, count: 540, avail: 'Tomorrow, 8:30 AM', dist: '0.7 mi · 245 W 38th St' },
            { name: '[System] Radiology — West Side', role: 'Imaging & screening', rating: 4.8, count: 410, avail: 'Wed, 10:15 AM', dist: '1.3 mi · 410 W 57th St' },
            { name: '[System] Hudson Imaging', role: 'Mammography & ultrasound', rating: 4.7, count: 298, avail: 'Thu, 2:00 PM', dist: '2.1 mi · 60 Hudson St' },
          ]} />
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Radiology', title: 'Screening mammography — what to expect', date: 'Mar 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Women’s Health', title: 'Breast cancer screening guidelines', date: 'Jan 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Member Services', title: 'Preventive care coverage', date: 'Feb 2026', url: '#' },
  ],
  followups: [
    { q: "Am I due for a mammogram?", to: 'MAMMOGRAM' },
    { q: "What does the screening cost on my plan?", to: 'MAMMOGRAM' },
    { q: "Find an imaging center near me", to: 'IMAGING' },
  ],
};

/* === Cardiology & heart care === */
const CARDIOLOGY = {
  query: "Find a cardiologist near me",
  chatLabel: "Cardiology & heart care",
  tabs: [
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 4 },
    { id: 'services', label: 'Services', icon: 'Heart', count: 2 },
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 2 },
  ],
  summary: [
    { text: "Four board-certified cardiologists are accepting new patients near you, with the earliest visit " },
    { text: "this week", cite: [1] },
    { text: ". A heart screening typically covers blood pressure, cholesterol, and an EKG", cite: [2] },
    { text: ". For chest pain or shortness of breath right now, call 911 — don’t wait for an appointment." },
  ],
  sections: [
    {
      id: 'cardio-docs', tab: 'doctors', title: 'Cardiologists accepting new patients', icon: 'Stethoscope',
      body: () => (
        <>
          <p>Highly rated cardiologists in your network, sorted by earliest availability.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ProviderCarousel items={[
            { name: 'Dr. Daniel Reyes', role: 'Cardiology', rating: 4.9, count: 318, avail: 'Wed, 9:20 AM', dist: '0.9 mi · Midtown' },
            { name: 'Dr. Aisha Bello', role: 'Interventional Cardiology', rating: 4.8, count: 256, avail: 'Thu, 1:30 PM', dist: '1.4 mi · West Side' },
            { name: 'Dr. Henry Cho', role: 'Cardiac Electrophysiology', rating: 4.9, count: 142, avail: 'Fri, 11:00 AM', dist: '2.0 mi · Hudson Center' },
            { name: 'Dr. Olivia Grant', role: 'Preventive Cardiology', rating: 4.7, count: 201, avail: 'Mon, 8:45 AM', dist: '1.1 mi · East Village' },
          ]} />
        </>
      ),
    },
    {
      id: 'cardio-screen', tab: 'services', title: 'Heart screening services', icon: 'Heart',
      body: () => (
        <>
          <p>A preventive heart screening establishes your baseline cardiovascular risk.<sup><a href="#src-2" className="cite">2</a></sup></p>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Blood pressure & cholesterol</div><div className="bullet-list__desc">A simple panel that flags the two biggest modifiable risk factors.</div></li>
            <li><div className="bullet-list__label">EKG</div><div className="bullet-list__desc">A few-minute recording of your heart’s rhythm to check for irregularities.</div></li>
            <li><div className="bullet-list__label">Risk review</div><div className="bullet-list__desc">Your clinician combines results with family history to set a screening cadence.</div></li>
          </ul>
          <div className="callout callout--danger">
            <div className="callout__icon">{Icon.Alert()}</div>
            <div>
              <p className="callout__title">Symptoms now? Don’t wait.</p>
              <p className="callout__body">Chest pain, pressure, or shortness of breath can signal a heart attack. Call 911 — a screening appointment is not for emergencies.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'cardio-locs', tab: 'locations', title: 'Cardiovascular institute', icon: 'MapPin',
      body: () => (
        <>
          <p>The [System] Cardiovascular Institute and a satellite location near you.</p>
          <LocationCarousel items={[
            { name: '[System] Cardiovascular Institute', role: 'Comprehensive heart center', rating: 4.9, count: 880, avail: 'Open until 6 PM', dist: '1.2 mi · 100 Park Ave' },
            { name: '[System] Heart — West Side', role: 'Cardiology & diagnostics', rating: 4.8, count: 410, avail: 'Open until 5 PM', dist: '1.6 mi · 410 W 57th St' },
          ]} />
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Cardiology', title: 'Find a cardiologist', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Heart Center', title: 'What a heart screening includes', date: 'Feb 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Clinical Library', title: 'Cardiovascular risk assessment', date: 'Dec 2025', url: '#' },
  ],
  followups: [
    { q: "What happens at a heart screening?", to: 'CARDIOLOGY' },
    { q: "Compare these cardiologists", to: 'CARDIOLOGY' },
    { q: "Chest pain and shortness of breath", to: 'CHEST_PAIN' },
  ],
};

/* === Pediatric care === */
const PEDIATRICS = {
  query: "In-network pediatricians",
  chatLabel: "Pediatric care",
  tabs: [
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 4 },
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 2 },
  ],
  summary: [
    { text: "Four in-network pediatricians are taking new patients near you", cite: [1] },
    { text: ", several with same-week well-child visits. Bring your child’s immunization record and insurance card", cite: [2] },
    { text: ". For after-hours fevers or injuries, a pediatric urgent care may be faster." },
  ],
  sections: [
    {
      id: 'peds-docs', tab: 'doctors', title: 'Pediatricians accepting new patients', icon: 'Stethoscope',
      body: () => (
        <>
          <p>Board-certified pediatricians in your network, sorted by availability.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ProviderCarousel items={[
            { name: 'Dr. Sofia Marin', role: 'Pediatrics', rating: 4.9, count: 402, avail: 'Tomorrow, 10:00 AM', dist: '0.6 mi · Midtown' },
            { name: 'Dr. Marcus Webb', role: 'Pediatrics', rating: 4.8, count: 311, avail: 'Wed, 3:15 PM', dist: '1.0 mi · West Side' },
            { name: 'Dr. Lin Zhao', role: 'Adolescent Medicine', rating: 4.9, count: 188, avail: 'Thu, 9:30 AM', dist: '1.7 mi · Hudson Center' },
            { name: 'Dr. Grace Ellis', role: 'Newborn & Pediatrics', rating: 4.7, count: 245, avail: 'Mon, 1:00 PM', dist: '0.9 mi · East Village' },
          ]} />
        </>
      ),
    },
    {
      id: 'peds-bring', tab: 'services', title: 'What to bring to the first visit', icon: 'Clipboard',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Immunization record</div><div className="bullet-list__desc">So the pediatrician can confirm your child is up to date.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
            <li><div className="bullet-list__label">Insurance card & ID</div><div className="bullet-list__desc">For registration and to confirm in-network coverage.</div></li>
            <li><div className="bullet-list__label">A list of questions</div><div className="bullet-list__desc">Sleep, feeding, development — anything you’d like to cover.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'peds-locs', tab: 'locations', title: 'Pediatric offices near you', icon: 'MapPin',
      body: () => (
        <>
          <LocationCarousel items={[
            { name: '[System] Pediatrics — Midtown', role: 'Pediatric primary care', rating: 4.8, count: 520, avail: 'Open until 6 PM', dist: '0.6 mi · 245 W 38th St' },
            { name: '[System] Children’s — West Side', role: 'Pediatrics & urgent care', rating: 4.8, count: 360, avail: 'Open until 8 PM', dist: '1.0 mi · 410 W 57th St' },
          ]} />
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Pediatrics', title: 'Find a pediatrician', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Family Medicine', title: 'Preparing for a well-child visit', date: 'Jan 2026', url: '#' },
  ],
  followups: [
    { q: "Which vaccines are due by age?", to: 'PEDIATRICS' },
    { q: "Find a pediatric urgent care", to: 'URGENT_CARE' },
    { q: "Book a well-child visit", to: 'PEDIATRICS' },
  ],
};

/* === Dermatology === */
const DERMATOLOGY = {
  query: "Top-rated dermatologists nearby",
  chatLabel: "Dermatology",
  tabs: [
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 4 },
    { id: 'services', label: 'Services', icon: 'FileText', count: 1 },
  ],
  summary: [
    { text: "Top-rated, in-network dermatologists near you have openings " },
    { text: "within two weeks", cite: [1] },
    { text: ". Most visits cover skin checks, acne, rashes, and suspicious moles", cite: [2] },
    { text: ". Annual skin exams are recommended if you have many moles or a family history of skin cancer." },
  ],
  sections: [
    {
      id: 'derm-docs', tab: 'doctors', title: 'Dermatologists accepting new patients', icon: 'Stethoscope',
      body: () => (
        <>
          <p>In-network dermatologists, sorted by rating and availability.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ProviderCarousel items={[
            { name: 'Dr. Nadia Haddad', role: 'Dermatology', rating: 4.9, count: 366, avail: 'Mon, 9:00 AM', dist: '0.8 mi · Midtown' },
            { name: 'Dr. Owen Frost', role: 'Medical & Surgical Derm', rating: 4.8, count: 289, avail: 'Wed, 2:30 PM', dist: '1.3 mi · West Side' },
            { name: 'Dr. Priya Anand', role: 'Cosmetic Dermatology', rating: 4.8, count: 174, avail: 'Thu, 11:15 AM', dist: '2.0 mi · Hudson Center' },
            { name: 'Dr. Caleb Stone', role: 'Pediatric Dermatology', rating: 4.7, count: 132, avail: 'Fri, 10:00 AM', dist: '1.1 mi · East Village' },
          ]} />
        </>
      ),
    },
    {
      id: 'derm-reasons', tab: 'services', title: 'Common reasons to visit', icon: 'FileText',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Annual skin check</div><div className="bullet-list__desc">A full-body exam to catch skin cancers early — recommended yearly if you’re higher risk.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
            <li><div className="bullet-list__label">Acne & rashes</div><div className="bullet-list__desc">Prescription-strength treatment when over-the-counter options aren’t working.</div></li>
            <li><div className="bullet-list__label">Suspicious moles</div><div className="bullet-list__desc">New, changing, or irregular spots should be evaluated promptly.</div></li>
          </ul>
          <div className="callout">
            <div className="callout__icon">{Icon.Info()}</div>
            <div>
              <p className="callout__title">The ABCDE rule</p>
              <p className="callout__body">Watch moles for Asymmetry, Border irregularity, Color variation, Diameter over 6mm, or Evolving changes — and get them checked.</p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Dermatology', title: 'Find a dermatologist', date: 'Mar 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Cancer Center', title: 'Skin cancer screening guide', date: 'Nov 2025', url: '#' },
  ],
  followups: [
    { q: "How do I book a full skin check?", to: 'DERMATOLOGY' },
    { q: "Is this mole concerning?", to: 'DERMATOLOGY' },
    { q: "Compare these dermatologists", to: 'DERMATOLOGY' },
  ],
};

/* === Imaging & MRI === */
const IMAGING = {
  query: "Imaging center for an MRI",
  chatLabel: "Imaging & MRI",
  tabs: [
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 3 },
    { id: 'services', label: 'Services', icon: 'FileText', count: 2 },
  ],
  summary: [
    { text: "Three imaging centers near you offer MRI, CT, and X-ray, with the next MRI slot " },
    { text: "this week", cite: [1] },
    { text: ". An MRI usually needs a referral, and most plans require prior authorization", cite: [2] },
    { text: ". With insurance, your share is often $0–$350 depending on your plan." },
  ],
  sections: [
    {
      id: 'imaging-locs', tab: 'locations', title: 'Imaging centers near you', icon: 'MapPin',
      body: () => (
        <>
          <p>Accredited centers for MRI, CT, ultrasound, and X-ray.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <LocationCarousel items={[
            { name: '[System] Imaging — Midtown', role: 'MRI · CT · X-ray', rating: 4.8, count: 612, avail: 'MRI: Tomorrow, 7:30 AM', dist: '0.7 mi · 245 W 38th St' },
            { name: '[System] Radiology — West Side', role: 'MRI · Ultrasound', rating: 4.8, count: 388, avail: 'MRI: Wed, 6:00 PM', dist: '1.3 mi · 410 W 57th St' },
            { name: '[System] Hudson Imaging', role: 'Open & 3T MRI', rating: 4.7, count: 274, avail: 'MRI: Thu, 9:15 AM', dist: '2.1 mi · 60 Hudson St' },
          ]} />
        </>
      ),
    },
    {
      id: 'imaging-prep', tab: 'services', title: 'How to prepare', icon: 'FileText',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Bring your referral</div><div className="bullet-list__desc">Most MRIs need an order from your clinician and prior authorization from your plan.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
            <li><div className="bullet-list__label">Leave metal at home</div><div className="bullet-list__desc">No jewelry or watches. Tell staff about implants, pacemakers, or metal fragments.</div></li>
            <li><div className="bullet-list__label">Plan ~45 minutes</div><div className="bullet-list__desc">Scan time varies by body part; you can usually eat and take medications normally.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'imaging-cost', tab: 'services', title: 'Estimating your cost', icon: 'Shield',
      body: () => (
        <>
          <div className="callout">
            <div className="callout__icon">{Icon.Shield()}</div>
            <div>
              <p className="callout__title">Check before you book</p>
              <p className="callout__body">MRI cost depends on body part, facility, and your deductible. An in-network outpatient center is usually far cheaper than a hospital. We can pull an estimate against your plan.<sup><a href="#src-3" className="cite">3</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Radiology', title: 'Imaging locations & services', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Clinical Library', title: 'Preparing for an MRI', date: 'Feb 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Member Services', title: 'Estimating imaging costs', date: 'Jan 2026', url: '#' },
  ],
  followups: [
    { q: "How much will an MRI cost on my plan?", to: 'IMAGING' },
    { q: "How do I prepare for an MRI?", to: 'IMAGING' },
    { q: "Do I need a referral?", to: 'IMAGING' },
  ],
};

/* === Hospitals near you === */
const HOSPITALS = {
  query: "Hospitals near me",
  chatLabel: "Hospitals near you",
  tabs: [
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 3 },
    { id: 'pages', label: 'Pages', icon: 'FileText', count: 1 },
  ],
  summary: [
    { text: "Three [System] hospitals are within " },
    { text: "5 miles", cite: [1] },
    { text: ", each with a 24-hour emergency department. For a life-threatening emergency, call 911", cite: [2] },
    { text: ". For minor issues, an urgent care is usually faster and cheaper than the ER." },
  ],
  sections: [
    {
      id: 'hosp-locs', tab: 'locations', title: 'Hospitals near you', icon: 'MapPin',
      body: () => (
        <>
          <p>Full-service [System] hospitals, sorted by distance.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <LocationCarousel items={[
            { name: '[System] Midtown Medical Center', role: 'Acute care · Level II trauma', rating: 4.6, count: 2140, avail: 'ER open 24 hours', dist: '1.1 mi · 245 W 38th St' },
            { name: '[System] Hudson Hospital', role: 'Acute care · Cardiac center', rating: 4.7, count: 1680, avail: 'ER open 24 hours', dist: '2.4 mi · 60 Hudson St' },
            { name: '[System] Riverside', role: 'Community hospital', rating: 4.5, count: 980, avail: 'ER open 24 hours', dist: '3.8 mi · 720 Riverside Dr' },
          ]} />
        </>
      ),
    },
    {
      id: 'hosp-er', tab: 'er-locations', title: 'Emergency vs. urgent care', icon: 'Alert',
      body: () => (
        <>
          <div className="callout callout--danger">
            <div className="callout__icon">{Icon.Alert()}</div>
            <div>
              <p className="callout__title">Call 911 for emergencies</p>
              <p className="callout__body">Chest pain, trouble breathing, severe bleeding, stroke signs, or a serious injury — go to the ER or call 911.<sup><a href="#src-2" className="cite">2</a></sup></p>
            </div>
          </div>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Use the ER for</div><div className="bullet-list__desc">Life- or limb-threatening problems that need immediate, advanced care.</div></li>
            <li><div className="bullet-list__label">Use urgent care for</div><div className="bullet-list__desc">Sprains, minor cuts, fevers, and infections — shorter waits and lower cost.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'hosp-visiting', tab: 'pages', title: 'Visiting our hospitals', icon: 'FileText',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Visiting hours</div><div className="bullet-list__desc">General visiting is 11 AM–8 PM; some units vary. Check in at the front desk for a pass.</div></li>
            <li><div className="bullet-list__label">Parking & transit</div><div className="bullet-list__desc">On-site garages at all three campuses; validated rates for patients and visitors.</div></li>
            <li><div className="bullet-list__label">Patient amenities</div><div className="bullet-list__desc">Cafeterias, pharmacy pickup, and free Wi-Fi throughout.</div></li>
          </ul>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Locations', title: 'Find a hospital', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Emergency Medicine', title: 'When to use the ER', date: 'Dec 2025', url: '#' },
  ],
  followups: [
    { q: "Where’s the closest ER right now?", to: 'HOSPITALS' },
    { q: "What are visiting hours?", to: 'HOSPITALS' },
    { q: "Find urgent care instead", to: 'URGENT_CARE' },
  ],
};

/* === Cancer care === */
const CANCER_CARE = {
  query: "Cancer care services available",
  chatLabel: "Cancer care",
  tabs: [
    { id: 'services', label: 'Services', icon: 'FileText', count: 2 },
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 3 },
  ],
  summary: [
    { text: "The [System] Cancer Center offers diagnosis, treatment, and support under one roof, with " },
    { text: "multidisciplinary teams", cite: [1] },
    { text: " for each cancer type. New-patient and second-opinion appointments are typically available within a week", cite: [2] },
    { text: ". Financial counselors can help with coverage and costs." },
  ],
  sections: [
    {
      id: 'cancer-services', tab: 'services', title: 'Cancer care services', icon: 'FileText',
      body: () => (
        <>
          <p>Comprehensive, in-network cancer care across specialties.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Diagnosis & imaging</div><div className="bullet-list__desc">Biopsy, advanced imaging, and pathology to confirm and stage a diagnosis.</div></li>
            <li><div className="bullet-list__label">Treatment</div><div className="bullet-list__desc">Medical, surgical, and radiation oncology coordinated by one team.</div></li>
            <li><div className="bullet-list__label">Clinical trials</div><div className="bullet-list__desc">Access to studies for eligible patients seeking newer therapies.</div></li>
            <li><div className="bullet-list__label">Supportive care</div><div className="bullet-list__desc">Nutrition, pain management, and counseling alongside treatment.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'cancer-docs', tab: 'doctors', title: 'Oncologists & specialists', icon: 'Stethoscope',
      body: () => (
        <>
          <ProviderCarousel items={[
            { name: 'Dr. Elena Vargas', role: 'Medical Oncology', rating: 4.9, count: 287, avail: 'Wed, 9:00 AM', dist: '1.2 mi · Cancer Center' },
            { name: 'Dr. Samuel Okafor', role: 'Surgical Oncology', rating: 4.9, count: 198, avail: 'Thu, 1:00 PM', dist: '1.2 mi · Cancer Center' },
            { name: 'Dr. Hana Kim', role: 'Radiation Oncology', rating: 4.8, count: 164, avail: 'Fri, 10:30 AM', dist: '1.2 mi · Cancer Center' },
          ]} />
        </>
      ),
    },
    {
      id: 'cancer-second', tab: 'services', title: 'Getting a second opinion', icon: 'Shield',
      body: () => (
        <>
          <div className="callout">
            <div className="callout__icon">{Icon.Shield()}</div>
            <div>
              <p className="callout__title">Second opinions are encouraged</p>
              <p className="callout__body">A second opinion can confirm a diagnosis or open new treatment options. Most plans cover it — bring your records and imaging, and our team will coordinate the review.<sup><a href="#src-2" className="cite">2</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Cancer Center', title: 'Our cancer services', date: 'Mar 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Oncology', title: 'How to request a second opinion', date: 'Jan 2026', url: '#' },
  ],
  followups: [
    { q: "How do I get a second opinion?", to: 'CANCER_CARE' },
    { q: "Find an oncologist", to: 'CANCER_CARE' },
    { q: "What support services are available?", to: 'CANCER_CARE' },
  ],
};

/* === Physical therapy (providers & programs) === */
const PHYSICAL_THERAPY = {
  query: "Physical therapy programs",
  chatLabel: "Physical therapy",
  tabs: [
    { id: 'doctors', label: 'Providers', icon: 'Stethoscope', count: 4 },
    { id: 'services', label: 'Services', icon: 'FileText', count: 1 },
    { id: 'locations', label: 'Locations', icon: 'MapPin', count: 2 },
  ],
  summary: [
    { text: "In-network physical therapists near you have evening and same-week openings", cite: [1] },
    { text: ". Programs cover orthopedic rehab, post-surgical recovery, sports injuries, and balance", cite: [2] },
    { text: ". Many plans cover PT, though some require a referral — we can check yours." },
  ],
  sections: [
    {
      id: 'pt-providers', tab: 'doctors', title: 'Physical therapists near you', icon: 'Stethoscope',
      body: () => (
        <>
          <p>Licensed PTs in your network, sorted by availability.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ProviderCarousel items={[
            { name: 'Andre Thibault, DPT', role: 'Orthopedic PT', rating: 4.9, count: 312, avail: 'Today, 5:30 PM', dist: '1.2 mi · West Side' },
            { name: 'Maya Foster, DPT', role: 'Sports Rehabilitation', rating: 4.8, count: 244, avail: 'Tomorrow, 8:00 AM', dist: '0.8 mi · Midtown' },
            { name: 'Devin Park, DPT', role: 'Post-surgical Recovery', rating: 4.8, count: 176, avail: 'Wed, 6:15 PM', dist: '1.6 mi · Hudson Center' },
            { name: 'Rosa Lim, DPT', role: 'Balance & Vestibular', rating: 4.7, count: 138, avail: 'Thu, 12:00 PM', dist: '1.1 mi · East Village' },
          ]} />
        </>
      ),
    },
    {
      id: 'pt-programs', tab: 'services', title: 'Programs offered', icon: 'FileText',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Orthopedic & spine rehab</div><div className="bullet-list__desc">Back, neck, shoulder, and knee programs built around your diagnosis.</div></li>
            <li><div className="bullet-list__label">Post-surgical recovery</div><div className="bullet-list__desc">Structured rehab after joint replacement or repair.</div></li>
            <li><div className="bullet-list__label">Sports & overuse injuries</div><div className="bullet-list__desc">Return-to-activity plans for strains, sprains, and tendinopathy.</div></li>
          </ul>
          <div className="callout">
            <div className="callout__icon">{Icon.Info()}</div>
            <div>
              <p className="callout__title">Referral & coverage</p>
              <p className="callout__body">Some plans require a referral before PT. We can confirm your benefits and whether a referral is needed.<sup><a href="#src-2" className="cite">2</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'pt-locs', tab: 'locations', title: 'PT & rehab locations', icon: 'MapPin',
      body: () => (
        <>
          <LocationCarousel items={[
            { name: '[System] Rehab — West Side', role: 'PT & rehab center', rating: 4.8, count: 612, avail: 'Open until 7 PM', dist: '1.2 mi · 410 W 57th St' },
            { name: '[System] Sports Medicine — Midtown', role: 'PT & sports rehab', rating: 4.8, count: 388, avail: 'Open until 6 PM', dist: '0.8 mi · 245 W 38th St' },
          ]} />
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Physical Therapy', title: 'Find a physical therapist', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Member Services', title: 'Physical therapy benefits & referrals', date: 'Feb 2026', url: '#' },
  ],
  followups: [
    { q: "Do I need a referral for PT?", to: 'PT_COVERAGE' },
    { q: "Find PTs with evening appointments", to: 'PHYSICAL_THERAPY' },
    { q: "What conditions does PT treat?", to: 'PHYSICAL_THERAPY' },
  ],
};

/* === Migraine care === */
const MIGRAINE = {
  query: "Managing migraine headaches",
  chatLabel: "Migraine care",
  tabs: [
    { id: 'guidance', label: 'Conditions', icon: 'BookOpen', count: 2 },
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 1 },
  ],
  summary: [
    { text: "Migraine is a neurological condition — not just a bad headache — affecting about " },
    { text: "1 in 7 people", cite: [1] },
    { text: ". Most are managed with trigger awareness, acute medication, and sometimes preventive treatment", cite: [2] },
    { text: ". See a clinician for frequent attacks or any sudden, severe “worst-ever” headache." },
  ],
  sections: [
    {
      id: 'migraine-overview', tab: 'guidance', title: 'Overview', icon: 'Brain',
      body: () => (
        <>
          <p>Migraine often brings throbbing pain on one side, nausea, and sensitivity to light or sound, lasting hours to days.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <div className="callout callout--danger">
            <div className="callout__icon">{Icon.Alert()}</div>
            <div>
              <p className="callout__title">Seek urgent care if</p>
              <p className="callout__body">A headache is sudden and severe (“thunderclap”), follows a head injury, or comes with confusion, weakness, vision loss, or a stiff neck.<sup><a href="#src-3" className="cite">3</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'migraine-triggers', tab: 'guidance', title: 'Triggers & relief', icon: 'BookOpen',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Common triggers</div><div className="bullet-list__desc">Stress, skipped meals, poor sleep, dehydration, alcohol, and hormonal changes.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
            <li><div className="bullet-list__label">At onset</div><div className="bullet-list__desc">Rest in a dark, quiet room; hydrate; take acute medication early for best effect.</div></li>
            <li><div className="bullet-list__label">Prevention</div><div className="bullet-list__desc">Consistent sleep and meals, a trigger diary, and preventive medication for frequent attacks.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'migraine-care', tab: 'doctors', title: 'When to see a neurologist', icon: 'Stethoscope',
      body: () => (
        <>
          <p>If attacks are frequent, disabling, or not responding to treatment, a neurologist can help.</p>
          <ProviderCarousel items={[
            { name: 'Dr. Iris Navarro', role: 'Neurology · Headache', rating: 4.9, count: 214, avail: 'Wed, 10:45 AM', dist: '1.0 mi · Midtown' },
            { name: 'Dr. Theo Lambert', role: 'Neurology', rating: 4.8, count: 176, avail: 'Fri, 2:15 PM', dist: '1.7 mi · Hudson Center' },
          ]} />
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Neurology', title: 'Understanding migraine', date: 'Feb 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Clinical Library', title: 'Migraine triggers & management', date: 'Nov 2025', url: '#' },
    { num: 3, fav: 'S', name: '[System] Emergency Medicine', title: 'Headache warning signs', date: 'Sep 2025', url: '#' },
  ],
  followups: [
    { q: "What are my migraine triggers?", to: 'MIGRAINE' },
    { q: "When should I see a neurologist?", to: 'MIGRAINE' },
    { q: "Find migraine care near me", to: 'MIGRAINE' },
  ],
};

/* === Type 2 diabetes === */
const DIABETES = {
  query: "Type 2 diabetes management",
  chatLabel: "Type 2 diabetes",
  tabs: [
    { id: 'guidance', label: 'Conditions', icon: 'BookOpen', count: 2 },
    { id: 'services', label: 'Services', icon: 'FileText', count: 1 },
  ],
  summary: [
    { text: "Type 2 diabetes is managed by keeping blood sugar in range through diet, activity, and medication", cite: [1] },
    { text: ". Most people aim for an A1c under 7%", cite: [2] },
    { text: ", set with their care team. A coordinated team — primary care, nutrition, and education — makes the biggest difference." },
  ],
  sections: [
    {
      id: 'diabetes-overview', tab: 'guidance', title: 'Overview', icon: 'Heart',
      body: () => (
        <>
          <p>In type 2 diabetes, the body doesn’t use insulin well, so glucose builds up in the blood. Good control lowers the risk of heart, kidney, eye, and nerve complications.<sup><a href="#src-1" className="cite">1</a></sup></p>
        </>
      ),
    },
    {
      id: 'diabetes-manage', tab: 'guidance', title: 'Managing day to day', icon: 'BookOpen',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Eating</div><div className="bullet-list__desc">Favor vegetables, lean protein, and whole grains; watch portions of refined carbs and sugary drinks.</div></li>
            <li><div className="bullet-list__label">Activity</div><div className="bullet-list__desc">Aim for ~150 minutes of moderate activity a week — even short walks help lower blood sugar.</div></li>
            <li><div className="bullet-list__label">Monitoring</div><div className="bullet-list__desc">Check glucose as advised and review your A1c with your clinician every 3–6 months.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
            <li><div className="bullet-list__label">Medication</div><div className="bullet-list__desc">Take medication as prescribed; tell your team about side effects or lows.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'diabetes-team', tab: 'services', title: 'Your care team', icon: 'FileText',
      body: () => (
        <>
          <div className="callout">
            <div className="callout__icon">{Icon.Info()}</div>
            <div>
              <p className="callout__title">Diabetes education & nutrition</p>
              <p className="callout__body">[System] offers diabetes self-management education and dietitian visits, often covered by insurance. Your primary care doctor can refer you.<sup><a href="#src-3" className="cite">3</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Endocrinology', title: 'Living with type 2 diabetes', date: 'Mar 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Clinical Library', title: 'A1c targets & monitoring', date: 'Dec 2025', url: '#' },
    { num: 3, fav: 'S', name: '[System] Nutrition Services', title: 'Diabetes education program', date: 'Oct 2025', url: '#' },
  ],
  followups: [
    { q: "How do I lower my blood sugar?", to: 'DIABETES' },
    { q: "What should my A1c be?", to: 'DIABETES' },
    { q: "Find diabetes care near me", to: 'DIABETES' },
  ],
};

/* === Orthopedic care === */
const ORTHOPEDICS = {
  query: "Find an orthopedic specialist",
  chatLabel: "Orthopedic care",
  tabs: [
    { id: 'doctors', label: 'Doctors', icon: 'Stethoscope', count: 4 },
    { id: 'services', label: 'Services', icon: 'Bone', count: 2 },
  ],
  summary: [
    { text: "Orthopedic specialists near you treat knee, hip, shoulder, and spine problems, with visits " },
    { text: "this week", cite: [1] },
    { text: ". Most issues start with non-surgical care — PT, injections, and activity changes — before surgery is considered", cite: [2] },
    { text: ". Sports medicine and joint replacement programs are available in-network." },
  ],
  sections: [
    {
      id: 'ortho-docs', tab: 'doctors', title: 'Orthopedic specialists', icon: 'Stethoscope',
      body: () => (
        <>
          <p>In-network orthopedic and sports medicine specialists, sorted by availability.<sup><a href="#src-1" className="cite">1</a></sup></p>
          <ProviderCarousel items={[
            { name: 'Dr. Priya Ramanathan', role: 'Orthopedic Spine', rating: 4.9, count: 212, avail: 'Wed, 9:30 AM', dist: '2.0 mi · Hudson Center' },
            { name: 'Dr. Lena Park', role: 'Sports Medicine', rating: 4.8, count: 248, avail: 'Tomorrow, 11:00 AM', dist: '0.5 mi · Midtown' },
            { name: 'Dr. Omar Haddad', role: 'Knee & Hip Replacement', rating: 4.9, count: 186, avail: 'Thu, 1:45 PM', dist: '1.6 mi · West Side' },
            { name: 'Dr. Claire Dunn', role: 'Shoulder & Sports', rating: 4.7, count: 154, avail: 'Fri, 10:15 AM', dist: '1.1 mi · East Village' },
          ]} />
        </>
      ),
    },
    {
      id: 'ortho-conditions', tab: 'services', title: 'Conditions treated', icon: 'Bone',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Knee & hip pain</div><div className="bullet-list__desc">Arthritis, meniscus and ligament injuries, and overuse — from bracing to surgery.</div></li>
            <li><div className="bullet-list__label">Sports injuries</div><div className="bullet-list__desc">Sprains, strains, and tendon injuries with return-to-play plans.</div></li>
            <li><div className="bullet-list__label">Shoulder & spine</div><div className="bullet-list__desc">Rotator cuff, impingement, and back or neck problems.</div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'ortho-joint', tab: 'services', title: 'Joint replacement', icon: 'Shield',
      body: () => (
        <>
          <div className="callout">
            <div className="callout__icon">{Icon.Shield()}</div>
            <div>
              <p className="callout__title">Surgery is usually a last step</p>
              <p className="callout__body">Most patients try physical therapy, anti-inflammatories, and injections first. When joint damage limits daily life, replacement can restore mobility — our team will walk you through options.<sup><a href="#src-2" className="cite">2</a></sup></p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Orthopedics', title: 'Find an orthopedic specialist', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Joint Center', title: 'Treating knee & hip arthritis', date: 'Jan 2026', url: '#' },
  ],
  followups: [
    { q: "Do I need joint replacement?", to: 'ORTHOPEDICS' },
    { q: "Find sports medicine near me", to: 'ORTHOPEDICS' },
    { q: "What stretches help knee pain?", to: 'STRETCHES' },
  ],
};

/* === Patient resources === */
const PATIENT_RESOURCES = {
  query: "Patient FAQ",
  chatLabel: "Patient resources",
  tabs: [
    { id: 'services', label: 'Services', icon: 'FileText', count: 1 },
    { id: 'pages', label: 'Pages', icon: 'FileText', count: 2 },
  ],
  summary: [
    { text: "Here’s how to get the most out of [System] — scheduling, your portal, and billing basics", cite: [1] },
    { text: ". You can book most visits online, message your care team, and view results in the patient portal", cite: [2] },
    { text: ". Financial counselors can explain costs and set up payment plans." },
  ],
  sections: [
    {
      id: 'pr-schedule', tab: 'services', title: 'How to schedule a visit', icon: 'Calendar',
      body: () => (
        <>
          <ol className="bullet-list">
            <li><div className="bullet-list__label">Pick the right type</div><div className="bullet-list__desc">Primary care for checkups, urgent care for minor same-day needs, a specialist for specific issues.</div></li>
            <li><div className="bullet-list__label">Book online or by chat</div><div className="bullet-list__desc">Most visits can be booked here or in the patient portal; some specialists need a referral.<sup><a href="#src-1" className="cite">1</a></sup></div></li>
            <li><div className="bullet-list__label">Before your visit</div><div className="bullet-list__desc">Confirm insurance, list your medications, and note your questions.</div></li>
          </ol>
        </>
      ),
    },
    {
      id: 'pr-faq', tab: 'pages', title: 'Patient FAQ', icon: 'FileText',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">How do I see my results?</div><div className="bullet-list__desc">Lab and imaging results post to the patient portal, usually within a few days.</div></li>
            <li><div className="bullet-list__label">How do I message my doctor?</div><div className="bullet-list__desc">Use secure messaging in the portal for non-urgent questions.</div></li>
            <li><div className="bullet-list__label">How do I get records or a referral?</div><div className="bullet-list__desc">Request both in the portal; referrals route to your chosen specialist.<sup><a href="#src-2" className="cite">2</a></sup></div></li>
          </ul>
        </>
      ),
    },
    {
      id: 'pr-billing', tab: 'pages', title: 'Insurance & billing basics', icon: 'Shield',
      body: () => (
        <>
          <ul className="bullet-list">
            <li><div className="bullet-list__label">Deductible vs. copay</div><div className="bullet-list__desc">A copay is a flat fee per visit; the deductible is what you pay before the plan shares costs.</div></li>
            <li><div className="bullet-list__label">In-network savings</div><div className="bullet-list__desc">Staying in-network lowers your share — we flag in-network providers automatically.</div></li>
            <li><div className="bullet-list__label">Help with bills</div><div className="bullet-list__desc">Financial counselors can set up payment plans and check for assistance.<sup><a href="#src-3" className="cite">3</a></sup></div></li>
          </ul>
          <div className="callout">
            <div className="callout__icon">{Icon.Info()}</div>
            <div>
              <p className="callout__title">Have a billing question?</p>
              <p className="callout__body">Member Services can walk through any statement line by line and estimate costs before a visit.</p>
            </div>
          </div>
        </>
      ),
    },
  ],
  sources: [
    { num: 1, fav: 'S', name: '[System] Patient Services', title: 'Scheduling a visit', date: 'Apr 2026', url: '#' },
    { num: 2, fav: 'S', name: '[System] Patient Portal', title: 'Using the portal', date: 'Mar 2026', url: '#' },
    { num: 3, fav: 'S', name: '[System] Member Services', title: 'Understanding your bill', date: 'Feb 2026', url: '#' },
  ],
  followups: [
    { q: "How do I schedule a visit?", to: 'PATIENT_RESOURCES' },
    { q: "What’s my deductible and copay?", to: 'PATIENT_RESOURCES' },
    { q: "How do I read my bill?", to: 'PATIENT_RESOURCES' },
  ],
};

window.AlmaData = { BACK_PAIN, STRETCHES, PRIMARY_CARE, URGENT_CARE, COLONOSCOPY, PT_COVERAGE, CHEST_PAIN, PHARMACY, MAMMOGRAM, CARDIOLOGY, PEDIATRICS, DERMATOLOGY, IMAGING, HOSPITALS, CANCER_CARE, PHYSICAL_THERAPY, MIGRAINE, DIABETES, ORTHOPEDICS, PATIENT_RESOURCES };
window.CarouselSpecialties = CarouselSpecialties;
window.CarouselLocations = CarouselLocations;
