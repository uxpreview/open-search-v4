/* === [System] — main App === */
const Icon = window.Icon;
const Message = window.AlmaMessage;
const { useState: useS, useEffect: useE, useRef: useR, useCallback } = React;

// Resets on full page reload — staged landing intro plays once per session.
let introPlayed = false;

/* Animated placeholder texts (cycles when unfocused and empty) */
const PLACEHOLDER_TEXTS = [
'cardiologist accepting new patients near me',
'urgent care open now',
'schedule primary care visit today'];


/* Focused-empty suggestions (exactly 3, no heading) */
const RECOMMENDATIONS = [
'Primary care options near me',
'Does my plan cover physical therapy?',
'How do I prepare for a colonoscopy?'];


/* Tagged search index — every suggestion carries the category we surface at the
   right edge of each dropdown row, plus the scope it belongs to so an active
   scope pill can filter the pool. */
const SEARCH_INDEX = [
// Doctors
{ text: 'Cardiologist accepting new patients', category: 'Doctor', scope: 'doctors' },
{ text: 'Cardiologist for heart screening', category: 'Doctor', scope: 'doctors' },
{ text: 'Find an oncologist', category: 'Doctor', scope: 'doctors' },
{ text: 'Find an orthopedic specialist', category: 'Doctor', scope: 'doctors' },
{ text: 'Find a primary care doctor', category: 'Doctor', scope: 'doctors' },
{ text: 'Primary care doctors accepting new patients', category: 'Doctor', scope: 'doctors' },
{ text: 'Pediatrician taking new patients', category: 'Doctor', scope: 'doctors' },
{ text: 'Dermatologist in-network', category: 'Doctor', scope: 'doctors' },
{ text: 'Physical therapy in-network providers', category: 'Doctor', scope: 'doctors' },
// Locations
{ text: 'Urgent care open right now', category: 'Location', scope: 'locations' },
{ text: 'Urgent care near me', category: 'Location', scope: 'locations' },
{ text: 'Hospitals near me', category: 'Location', scope: 'locations' },
{ text: 'Lab and imaging locations', category: 'Location', scope: 'locations' },
{ text: 'Pharmacy locations in my plan', category: 'Location', scope: 'locations' },
{ text: 'Closest pharmacy with late hours', category: 'Location', scope: 'locations' },
{ text: '24-hour pharmacies near me', category: 'Location', scope: 'locations' },
{ text: 'Transfer my prescription', category: 'Service', scope: 'services' },
{ text: 'Emergency departments near me', category: 'Location', scope: 'locations' },
{ text: 'Pediatric urgent care near me', category: 'Location', scope: 'locations' },
{ text: 'Physical therapy locations near me', category: 'Location', scope: 'locations' },
// Services
{ text: 'Cancer care second opinion', category: 'Service', scope: 'services' },
{ text: 'Cancer treatment options', category: 'Service', scope: 'services' },
{ text: 'Breast cancer care', category: 'Service', scope: 'services' },
{ text: 'Heart screening with a cardiologist', category: 'Service', scope: 'services' },
{ text: 'Orthopedic care for knee pain', category: 'Service', scope: 'services' },
{ text: 'Sports medicine near me', category: 'Service', scope: 'services' },
{ text: 'Joint replacement options', category: 'Service', scope: 'services' },
{ text: 'Colonoscopy preparation instructions', category: 'Service', scope: 'services' },
{ text: 'Colonoscopy prep timeline', category: 'Service', scope: 'services' },
{ text: 'Physical therapy locations and providers', category: 'Service', scope: 'services' },
// Conditions
{ text: 'Chest pain and shortness of breath', category: 'Condition', scope: 'conditions' },
{ text: 'Chest pain symptoms', category: 'Condition', scope: 'conditions' },
{ text: 'Heart attack warning signs', category: 'Condition', scope: 'conditions' },
{ text: 'Lower back pain causes', category: 'Condition', scope: 'conditions' },
{ text: 'Migraine treatment options', category: 'Condition', scope: 'conditions' },
{ text: 'Type 2 diabetes management', category: 'Condition', scope: 'conditions' },
// Coverage
{ text: 'Physical therapy coverage', category: 'Coverage', scope: 'services' },
{ text: 'Does my plan cover physical therapy?', category: 'Coverage', scope: 'services' },
{ text: 'How much will an MRI cost?', category: 'Coverage' },
{ text: "What's my deductible and copay?", category: 'Coverage' },
{ text: 'Find in-network specialists', category: 'Coverage' },
{ text: 'Do I need a referral for physical therapy?', category: 'Coverage', scope: 'services' },
{ text: 'Can I have coffee before a colonoscopy?', category: 'Coverage', scope: 'conditions' }];


/* The five established demo chats navigable from search */
const DEMO_QUERIES = new Set(['Urgent care open right now', 'Chest pain and shortness of breath', 'Primary care options near me', 'Colonoscopy prep timeline', 'Physical therapy coverage']);

function getSuggestions(text, scope) {
  const t = text.toLowerCase().trim();
  if (!t) return [];
  // "pt" is a two-char special case; all others require 3+ chars
  const isPt = t === 'pt' || t.startsWith('pt ');
  if (!isPt && t.length < 3) return [];

  // Typeahead is INDEPENDENT of the active scope chip — the chip is a filter
  // that applies to results, not a constraint on what the user can search for.
  // We still let scope softly re-rank: scope-matching items float to the top,
  // but everything matching the query is searchable.
  const starts = [],contains = [];
  for (const s of SEARCH_INDEX) {
    const lo = s.text.toLowerCase();
    if (lo.startsWith(t)) starts.push(s);else
    if (lo.includes(t)) contains.push(s);
  }
  const ranked = [...starts, ...contains];
  if (scope && scope.id !== 'ask') {
    const inScope = ranked.filter((s) => s.scope === scope.id);
    const outScope = ranked.filter((s) => s.scope !== scope.id);
    return [...inScope, ...outScope].slice(0, 6);
  }
  return ranked.slice(0, 6);
}

/* Primary nav (the "categories" of search) */
const PRIMARY_NAV = [
{ id: 'find-care', icon: 'Stethoscope', label: 'Find care', kind: 'agent' },
{ id: 'immediate-care', icon: 'Clock', label: 'Get seen now', kind: 'agent', requiresAuth: true, promo: { title: 'Hold your spot in one tap', desc: 'Sign in to reserve a walk-in spot and skip the waiting room.' } },
{ id: 'check-symptoms', icon: 'Clipboard', label: 'Check symptoms', kind: 'agent' },
{ id: 'schedule', icon: 'Calendar', label: 'Schedule appointment', kind: 'agent', requiresAuth: true, promo: { title: 'Save your slot in one chat', desc: 'Sign in to book, reschedule, and sync visits to your calendar.' } },
{ id: 'virtual-visit', icon: 'Video', label: 'Virtual visit', kind: 'agent', requiresAuth: true, promo: { title: 'See a clinician from anywhere', desc: 'Sign in to start a same-day video visit with an in-network provider.' } }];


/* Recent chats — every entry maps to one of our existing result flows */
const HISTORY = [
{ id: 'h1', q: 'Urgent care open right now', query: 'Urgent care open right now' },
{ id: 'h2', q: 'Chest pain and shortness of breath', query: 'Chest pain and shortness of breath' },
{ id: 'h3', q: 'Primary care options near me', query: 'Find a primary care doctor near me' },
{ id: 'h4', q: 'Colonoscopy prep timeline', query: 'How do I prepare for a colonoscopy?' },
{ id: 'h5', q: 'Physical therapy coverage', query: 'Does my plan cover physical therapy?' },
{ id: 'h6', q: 'Pharmacies open late', query: 'Closest pharmacy with late hours' }];


const RESPONSE_MODES = [
{ id: 'Quick', desc: 'Concise answer with the most relevant next step' },
{ id: 'Detailed', desc: 'Broader answer with more context, related results, and more complete coverage' }];

/* Agents listed in the chat input's "+" menu. IDs map to pickAgent(). */
const ADD_MENU_AGENTS = [
{ id: 'find-care', icon: 'Stethoscope', label: 'Find care' },
{ id: 'immediate-care', icon: 'Clock', label: 'Get seen now' },
{ id: 'check-symptoms', icon: 'Clipboard', label: 'Check symptoms' },
{ id: 'schedule', icon: 'Calendar', label: 'Schedule appointment' },
{ id: 'virtual-visit', icon: 'Video', label: 'Virtual visit' }];





/* Category scopes — tabs above the search input. `all` is the default and
   behaves as no scope filter. `suggestions` are the 4 example queries shown
   below the input when the field is empty. */
const SCOPES = [
{ id: 'ask', label: 'Ask', icon: 'Sparkle',
  placeholder: 'Ask anything',
  suggestions: [
  'Primary care doctors near me',
  'Schedule a mammogram appointment',
  'Find me an immediate care with walk-in availability',
  'Where is the cardiovascular institute?'] },
{ id: 'doctors', label: 'Doctors', icon: 'Person',
  placeholder: 'Find the right doctor for you',
  suggestions: [
  'Find a cardiologist near me',
  'Primary care doctors accepting new patients',
  'In-network pediatricians',
  'Top-rated dermatologists nearby'] },
{ id: 'locations', label: 'Locations', icon: 'MapPin',
  placeholder: 'Find care near you',
  suggestions: [
  'Urgent care open right now',
  'Hospitals near me',
  'Closest pharmacy with late hours',
  'Imaging center for an MRI'] },
{ id: 'services', label: 'Services', icon: 'FileText',
  placeholder: 'Explore care services and procedures',
  suggestions: [
  'Schedule a mammogram screening',
  'Heart screening services',
  'Physical therapy programs',
  'Cancer care services available'] },
{ id: 'conditions', label: 'Conditions', icon: 'BookOpen',
  placeholder: 'Describe what you’re feeling',
  suggestions: [
  'Chest pain and shortness of breath',
  'Lower back pain that won’t go away',
  'Managing migraine headaches',
  'Type 2 diabetes management'] },
{ id: 'pages', label: 'Pages', icon: 'FileText',
  placeholder: 'Browse pages and patient resources',
  suggestions: [
  'Patient FAQ',
  'How to schedule a visit',
  'Visiting our hospitals',
  'Insurance and billing basics'] }];

const DEFAULT_SCOPE = SCOPES[0];

/* Map per-section `tab` ids (defined in data.jsx) to the 6 canonical scope ids.
   Used by ChatHeader (to decide which tabs to render) and by Message (to filter
   sections by active scope). */
const TAB_TO_SCOPE = {
  pages: 'pages',
  locations: 'locations',
  'er-locations': 'locations',
  doctors: 'doctors',
  providers: 'doctors',
  services: 'services',
  appointments: 'services',
  reserve: 'services',
  timeline: 'services',
  instructions: 'services',
  guidance: 'conditions',
  emergency: 'conditions',
  coverage: 'ask',
};
const sectionScope = (s) => (s && s.tab && TAB_TO_SCOPE[s.tab]) || 'ask';
window.sectionScope = sectionScope;



/* === Input bar === */
function InputBar({ value, onChange, onSubmit, large, placeholder, autoFocus, onFocus, onBlur, onPickAgent }) {
  const ta = useR(null);
  const [mode, setMode] = useS('Quick');
  const [modeOpen, setModeOpen] = useS(false);
  const modeRef = useR(null);
  const suppressNextFocus = useR(false);
  const [taFocused, setTaFocused] = useS(false);
  const [phIdx, setPhIdx] = useS(0);
  const [phVisible, setPhVisible] = useS(true);
  const [addOpen, setAddOpen] = useS(false);
  const addRef = useR(null);
  const fileInputRef = useR(null);
  const photoInputRef = useR(null);
  const [attachments, setAttachments] = useS([]);

  const addFiles = (fileList, kind) => {
    if (!fileList || fileList.length === 0) return;
    const next = Array.from(fileList).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      kind }));

    setAttachments((prev) => [...prev, ...next]);
  };
  const onFilePicked = (e, kind) => {
    addFiles(e.target.files, kind);
    e.target.value = '';
  };
  const removeAttachment = (id) => setAttachments((prev) => prev.filter((x) => x.id !== id));
  const pickAgentItem = (id) => {
    if (onPickAgent) onPickAgent(id);
    setAddOpen(false);
  };

  useE(() => {
    if (ta.current) {
      ta.current.style.height = 'auto';
      ta.current.style.height = Math.min(ta.current.scrollHeight, 180) + 'px';
    }
  }, [value]);
  useE(() => {
    if (autoFocus && ta.current) {
      suppressNextFocus.current = true;
      ta.current.focus();
    }
  }, [autoFocus]);
  useE(() => {
    if (!modeOpen) return;
    const close = (e) => {
      if (modeRef.current && !modeRef.current.contains(e.target)) setModeOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [modeOpen]);
  useE(() => {
    if (!addOpen) return;
    const close = (e) => {
      if (addRef.current && !addRef.current.contains(e.target)) setAddOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [addOpen]);
  // Static placeholder — no animated cycling in this layout
  const showAnimPh = false;

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSubmit(value.trim());
    }
  };
  const handleTextareaFocus = () => {
    if (suppressNextFocus.current) {suppressNextFocus.current = false;return;}
    setTaFocused(true);
    if (onFocus) onFocus();
  };
  const handleTextareaBlur = (e) => {
    setTaFocused(false);
    if (onBlur) onBlur(e);
  };
  return (
    <div className={'input-shell' + (large ? ' input-shell--large' : '')}>
      <div className="input__textarea-wrap">
        <textarea
          ref={ta}
          className="input__textarea"
          placeholder={placeholder || 'Search doctors, locations, services, symptoms, or questions…'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          rows={1} />
      </div>

      {attachments.length > 0 &&
      <div className="input__chips">
          {attachments.map((a) =>
        <span key={a.id} className="input__chip">
              <span className="input__chip-icon">{a.kind === 'photo' ? Icon.Image() : Icon.FileText()}</span>
              <span className="input__chip-name">{a.name}</span>
              <button
            type="button"
            className="input__chip-x"
            title="Remove"
            onClick={() => removeAttachment(a.id)}>
                {Icon.X()}
              </button>
            </span>
        )}
        </div>
      }

      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => onFilePicked(e, 'file')} />

      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => onFilePicked(e, 'photo')} />


      <div className="input__row">
        <div className="input__tools">
          <div className="input__add-wrap" ref={addRef}>
            <button
              type="button"
              className={'icon-btn' + (addOpen ? ' icon-btn--open' : '')}
              title="Add"
              onClick={() => setAddOpen((o) => !o)}>
              {Icon.Plus()}
            </button>
            {addOpen &&
            <div className="input__add-menu">
                <button
                className="input__add-item"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {fileInputRef.current?.click();setAddOpen(false);}}>
                  <span className="input__add-item-icon">{Icon.FileText()}</span>
                  <span className="input__add-item-label">Add files</span>
                </button>
                <button
                className="input__add-item"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {photoInputRef.current?.click();setAddOpen(false);}}>
                  <span className="input__add-item-icon">{Icon.Image()}</span>
                  <span className="input__add-item-label">Add photo</span>
                </button>
                <div className="input__add-divider" />
                {ADD_MENU_AGENTS.map((a) =>
              <button
                key={a.id}
                className="input__add-item"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickAgentItem(a.id)}>
                    <span className="input__add-item-icon">{Icon[a.icon]()}</span>
                    <span className="input__add-item-label">{a.label}</span>
                  </button>
              )}
              </div>
            }
          </div>
          <button className="icon-btn" title="Voice">{Icon.Mic()}</button>
        </div>
        <div className="input__right">
          <div className="input__mode-wrap" ref={modeRef}>
            <button className={'input__mode' + (modeOpen ? ' input__mode--open' : '')} onClick={() => setModeOpen((o) => !o)}>
              <span>{mode}</span>
              <span className="input__mode-caret">{Icon.ChevronDown()}</span>
            </button>
            {modeOpen &&
            <div className="input__mode-menu">
                {RESPONSE_MODES.map((m) =>
              <button
                key={m.id}
                className={'input__mode-item' + (mode === m.id ? ' input__mode-item--active' : '')}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {setMode(m.id);setModeOpen(false);}}>
                    <span className="input__mode-item-label">{m.id}</span>
                    <span className="input__mode-item-desc">{m.desc}</span>
                  </button>
              )}
              </div>
            }
          </div>
          <button
            className="input__send"
            disabled={!value.trim()}
            onClick={() => value.trim() && onSubmit(value.trim())}
            title="Send">
            {Icon.ArrowRight()}
          </button>
        </div>
      </div>
    </div>);

}

/* === Search suggestion / recommendation panel ===
   Clean typeahead — plain list of matches with the typed portion muted and
   the rest bold. No category labels, no pinned rows. */
function SearchPanel({ draft, onSelect, onFillDraft, scope, unboxed }) {
  const t = draft.trim();
  const suggestions = t ? getSuggestions(draft, scope) : [];

  if (!t || suggestions.length === 0) return null;

  const pick = (e, s) => {
    e.preventDefault();
    if (DEMO_QUERIES.has(s)) onSelect(s);else
    onFillDraft(s);
  };

  return (
    <div className={'search-panel search-panel--typeahead' + (unboxed ? ' search-panel--unboxed' : '')}>
      {suggestions.map((s, i) => {
        const lo = s.text.toLowerCase();
        const q = t.toLowerCase();
        const isPrefix = lo.startsWith(q);
        const idx = isPrefix ? 0 : lo.indexOf(q);
        return (
          <button key={i} className="search-panel__item" onMouseDown={(e) => pick(e, s.text)}>
            <span className="search-panel__item-icon">{Icon.Search()}</span>
            <span className="search-panel__item-text">
              {isPrefix ?
              <>
                  <span className="search-panel__match">{s.text.slice(0, q.length)}</span>
                  <span className="search-panel__rest">{s.text.slice(q.length)}</span>
                </> :
              idx > -1 ?
              <>
                  <span className="search-panel__match">{s.text.slice(0, idx)}</span>
                  <span className="search-panel__rest">{s.text.slice(idx, idx + q.length)}</span>
                  <span className="search-panel__match">{s.text.slice(idx + q.length)}</span>
                </> :
              <span className="search-panel__rest">{s.text}</span>
              }
            </span>
          </button>);
      })}
    </div>);
}

/* === Default suggestions (shown below the input when draft is empty) === */
function DefaultSuggestions({ items, onPick }) {
  return (
    <div className="default-suggestions">
      {items.map((q, i) =>
      <button
        key={i}
        type="button"
        className="default-suggestions__item"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onPick(q)}>
          <span className="default-suggestions__icon">{Icon.Search()}</span>
          <span className="default-suggestions__text">{q}</span>
        </button>
      )}
    </div>);

}

/* === Landing state === */
function Landing({ onAsk, draft, setDraft, loggedIn, onSignIn, intro, onPickAgent }) {
  const [focused, setFocused] = useS(false);
  const [scope, setScope] = useS(DEFAULT_SCOPE);
  const wrapRef = useR(null);
  const tabsRef = useR(null);
  const mountedWithIntroRef = useR(intro);

  // Keep the active tab in view on phone (the strip scrolls horizontally)
  useE(() => {
    const el = tabsRef.current?.querySelector('.search-tab--active');
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [scope.id]);

  // onClick fires only on real user interaction, never on programmatic .focus()
  const handleOpen = () => setFocused(true);
  const handleBlur = (e) => {
    // Keep panel open if focus moves to another element within the wrapper
    if (wrapRef.current && wrapRef.current.contains(e.relatedTarget)) return;
    setFocused(false);
  };

  const hasDraft = draft.trim().length > 0;
  const typeahead = hasDraft ? getSuggestions(draft, scope) : [];
  const showPanel = hasDraft && typeahead.length > 0;

  return (
    <div className={'landing ' + (intro ? 'landing--intro' : (mountedWithIntroRef.current ? '' : 'fade-in'))}>
      {!loggedIn &&
      <button className="landing__banner" onClick={onSignIn}>
          <span className="landing__banner-icon">{Icon.Sparkle()}</span>
          <span className="landing__banner-text">
            <strong>Log in</strong> for personalized care recommendations and saved chats.
          </span>
          <span className="landing__banner-arrow">{Icon.ArrowRight()}</span>
        </button>
      }
      <h1 className="landing__title">How can we help you feel better?
      </h1>
      <div className="search-tabs" role="tablist" ref={tabsRef}>
        {SCOPES.map((s) => {
          const active = scope.id === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={'search-tab' + (active ? ' search-tab--active' : '')}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setScope(s)}>
              <span className="search-tab__icon">{Icon[s.icon]()}</span>
              <span className="search-tab__label">{s.label}</span>
            </button>);

        })}
      </div>
      <div className="landing__input" ref={wrapRef} onBlur={handleBlur}>
        <InputBar value={draft}
        onChange={setDraft}
        onSubmit={(q) => onAsk(q, scope)}
        large
        autoFocus
        onFocus={handleOpen}
        onPickAgent={onPickAgent}
        placeholder={scope.placeholder || 'Ask anything'} />
        {showPanel ?
        <SearchPanel
          draft={draft}
          scope={scope}
          unboxed
          onSelect={(q) => {setFocused(false);onAsk(q, scope);}}
          onFillDraft={(q) => setDraft(q)} /> :
        !hasDraft &&
        <DefaultSuggestions items={scope.suggestions} onPick={(q) => setDraft(q)} />
        }
      </div>
    </div>);

}

function AlmaMark() {
  // Soft four-petal spark — a small bloom evoking care + conversation.
  // Filled curves rather than thin lines so it reads at any size.
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      {/* Four teardrop petals arranged radially around the center */}
      <path d="M16 4 C 17.6 9, 17.6 11.5, 16 14 C 14.4 11.5, 14.4 9, 16 4 Z" />
      <path d="M28 16 C 23 17.6, 20.5 17.6, 18 16 C 20.5 14.4, 23 14.4, 28 16 Z" />
      <path d="M16 28 C 14.4 23, 14.4 20.5, 16 18 C 17.6 20.5, 17.6 23, 16 28 Z" />
      <path d="M4 16 C 9 14.4, 11.5 14.4, 14 16 C 11.5 17.6, 9 17.6, 4 16 Z" />
      {/* Small offset center dot for warmth */}
      <circle cx="16" cy="16" r="1.6" />
    </svg>);

}

/* === Auth modal — appears for "Log in" / "Sign up" === */
const GoogleG = () =>
<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="#4285F4" d="M21.6 12.23c0-.7-.06-1.22-.2-1.77H12v3.21h5.5c-.11.83-.71 2.07-2.04 2.91l-.02.12 2.96 2.3.2.02c1.88-1.74 2.97-4.29 2.97-7.31" />
    <path fill="#34A853" d="M12 21.6c2.7 0 4.96-.89 6.6-2.41l-3.15-2.44c-.84.59-1.97 1-3.45 1-2.64 0-4.88-1.74-5.68-4.14l-.12.01-3.08 2.38-.04.11C4.72 19.39 8.08 21.6 12 21.6" />
    <path fill="#FBBC04" d="M6.32 13.61A5.95 5.95 0 0 1 6 12c0-.56.1-1.1.31-1.6L6.3 10.27 3.18 7.85l-.1.05A9.59 9.59 0 0 0 2.4 12c0 1.55.37 3.02 1.03 4.32l3.08-2.38" />
    <path fill="#EA4335" d="M12 5.86c1.88 0 3.14.81 3.86 1.49l2.82-2.75C16.96 3.04 14.7 2.4 12 2.4 8.08 2.4 4.72 4.61 3.08 7.85l3.23 2.45C7.12 8.16 9.36 5.86 12 5.86" />
  </svg>;


const AppleLogo = () =>
<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M17.07 12.41c-.03-2.51 2.05-3.72 2.14-3.78-1.17-1.71-2.99-1.94-3.63-1.97-1.55-.16-3.02.91-3.81.91-.79 0-2-.89-3.29-.86-1.69.03-3.25.98-4.12 2.5-1.76 3.05-.45 7.57 1.27 10.05.84 1.21 1.84 2.57 3.15 2.52 1.27-.05 1.75-.82 3.28-.82s1.96.82 3.3.79c1.36-.02 2.22-1.23 3.05-2.45.96-1.41 1.36-2.78 1.38-2.85-.03-.01-2.65-1.01-2.68-4.04zM14.7 5.07c.69-.84 1.16-2 1.03-3.16-1 .04-2.22.67-2.93 1.5-.64.74-1.2 1.93-1.05 3.06 1.12.09 2.26-.57 2.95-1.4z" />
  </svg>;


const PhoneIcon = () =>
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>;


function AuthModal({ open, onClose, onComplete }) {
  const [email, setEmail] = React.useState('');
  const [mode, setMode] = React.useState('default'); // 'default' | 'sso'
  const [ssoDomain, setSsoDomain] = React.useState('');

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  React.useEffect(() => {if (!open) {setEmail('');setMode('default');setSsoDomain('');}}, [open]);

  if (!open) return null;

  const finish = () => onComplete();
  const emailValid = /\S+@\S+\.\S+/.test(email.trim());

  return (
    <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onClick={onClose}>
      <div className="auth-modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose} aria-label="Close">{Icon.X()}</button>
        {mode === 'default' &&
        <>
            <div className="auth-modal__mark"><AlmaMark /></div>
            <h2 className="auth-modal__title" id="auth-modal-title">Log in or sign up</h2>
            <p className="auth-modal__sub">You'll get smarter responses and can save chats, sync your health data, and schedule visits.</p>
            <div className="auth-modal__providers">
              <button className="auth-provider" onClick={finish}>
                <span className="auth-provider__icon"><GoogleG /></span>
                <span>Continue with Google</span>
              </button>
              <button className="auth-provider" onClick={finish}>
                <span className="auth-provider__icon"><AppleLogo /></span>
                <span>Continue with Apple</span>
              </button>
              <button className="auth-provider" onClick={finish}>
                <span className="auth-provider__icon"><PhoneIcon /></span>
                <span>Continue with phone</span>
              </button>
            </div>
            <div className="auth-modal__divider"><span>OR</span></div>
            <form className="auth-modal__email" onSubmit={(e) => {e.preventDefault();if (emailValid) finish();}}>
              <input
              type="email"
              className="auth-modal__input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus />
            
              <button
              type="submit"
              className="auth-modal__continue"
              disabled={!emailValid}>
                Continue
              </button>
            </form>
            <button className="auth-modal__sso" onClick={() => setMode('sso')}>
              Single sign-on (SSO)
            </button>
            <div className="auth-modal__legal">
              By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
            </div>
          </>
        }
        {mode === 'sso' &&
        <>
            <button className="auth-modal__back" onClick={() => setMode('default')} aria-label="Back">←</button>
            <h2 className="auth-modal__title">Single sign-on</h2>
            <p className="auth-modal__sub">Enter your organization's SSO domain to continue.</p>
            <form className="auth-modal__email" onSubmit={(e) => {e.preventDefault();if (ssoDomain.trim()) finish();}}>
              <input
              type="text"
              className="auth-modal__input"
              placeholder="company.com"
              value={ssoDomain}
              onChange={(e) => setSsoDomain(e.target.value)}
              autoFocus />
            
              <button
              type="submit"
              className="auth-modal__continue"
              disabled={!ssoDomain.trim()}>
                Continue with SSO
              </button>
            </form>
          </>
        }
      </div>
    </div>);

}

/* Locked rail item — disabled state + hover promo card prompting sign-in */
function RailLockedItem({ icon, label, title, desc, collapsed, onSignIn }) {
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef(null);
  const timer = React.useRef(null);
  const show = () => {
    clearTimeout(timer.current);
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ top: r.top, left: r.right + 6 });
    }
    setHover(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHover(false), 120);
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="rail__locked"
    ref={ref}
    onMouseEnter={show}
    onMouseLeave={hide}
    onFocus={show}
    onBlur={hide}>
      <div className={'rail__item rail__item--locked' + (hover ? ' rail__item--locked-hover' : '')} aria-disabled="true" tabIndex={0}>
        <span className="rail__item-icon">{Icon[icon]()}</span>
        <span className="rail__text">{label}</span>
        <span className="rail__item-trail rail__item-trail--lock">{Icon.Lock()}</span>
      </div>
      {hover &&
      <div className="rail__promo"
      role="tooltip"
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{ top: pos.top, left: pos.left }}>
          <div className="rail__promo-title">{title}</div>
          <div className="rail__promo-desc">{desc}</div>
          <button
          className="rail__promo-btn"
          onClick={(e) => {e.stopPropagation();onSignIn && onSignIn();}}>
            Sign up
          </button>
        </div>
      }
    </div>);

}

/* Collapsed-rail tooltip — single floating element driven by [data-rail-tip]
   attributes on rail items. Active only while the rail is collapsed; uses
   fixed positioning so it escapes the rail's overflow clipping. */
function CollapsedRailTip({ collapsed }) {
  const [tip, setTip] = useS(null);
  useE(() => {
    if (!collapsed) { setTip(null); return; }
    const enter = (e) => {
      const el = e.target.closest && e.target.closest('[data-rail-tip]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      setTip({ label: el.getAttribute('data-rail-tip'), top: r.top + r.height / 2, left: r.right + 10 });
    };
    const leave = (e) => {
      const el = e.target.closest && e.target.closest('[data-rail-tip]');
      if (!el) return;
      const next = e.relatedTarget;
      if (next && next.closest && next.closest('[data-rail-tip]') === el) return;
      setTip(null);
    };
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    return () => {
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, [collapsed]);
  if (!collapsed || !tip) return null;
  return (
    <div className="rail-tip" style={{ top: tip.top, left: tip.left }}>
      {tip.label}
    </div>);
}

/* === Left rail === */
function LeftRail({ history, onNewConv, onPickHistory, collapsed, onToggleCollapsed, onPickAgent, loggedIn, onSetLoggedIn, onOpenAuth, userMenuOpen, onToggleMenu, onCloseMenu, drawerOpen }) {
  return (
    <aside className={'rail' + (collapsed ? ' rail--collapsed' : '') + (drawerOpen ? ' rail--open' : '')}>
      <CollapsedRailTip collapsed={collapsed} />

      {/* Header: brand + collapse control on same row (expanded); stacked column (collapsed) */}
      <div className="rail__header">
        <button className="rail__brand" onClick={onNewConv} data-rail-tip="Home">
          <span className="rail__brand-mark"><Icon.Shield /></span>
          <span className="rail__text">Ask Meridian</span>
        </button>
        <button className="rail__icon-btn" data-rail-tip={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={onToggleCollapsed}>
          {Icon.Sidebar()}
        </button>
      </div>

      {/* Divider below toggle — visible only when collapsed */}
      <div className="rail__divider rail__divider--header"></div>

      {/* Nav section — New chat, Saved, Projects */}
      <div className="rail__section">
        <button className="rail__item" onClick={onNewConv} data-rail-tip="New chat">
          <span className="rail__item-icon">{Icon.NewChat()}</span>
          <span className="rail__text">New chat</span>
        </button>
        {loggedIn ?
        <>
            <button className="rail__item" data-rail-tip="Saved" onClick={() => onPickAgent('saved')}>
              <span className="rail__item-icon">{Icon.Bookmark()}</span>
              <span className="rail__text">Saved</span>
            </button>
            <button className="rail__item" data-rail-tip="Projects" onClick={() => onPickAgent('projects')}>
              <span className="rail__item-icon">{Icon.Folder()}</span>
              <span className="rail__text">Projects</span>
              <span className="rail__item-trail" onClick={(e) => { e.stopPropagation(); onPickAgent('projects:new'); }}>{Icon.PlusCircle()}</span>
            </button>
          </> :
        <>
            <RailLockedItem
            icon="Bookmark" label="Saved"
            title="Save anything you find"
            desc="Bookmark doctors, visits, and answers to revisit them later."
            collapsed={collapsed}
            onSignIn={onOpenAuth} />
            <RailLockedItem
            icon="Folder" label="Projects"
            title="Organize care by project"
            desc="Group chats by condition, family member, or upcoming visit."
            collapsed={collapsed}
            onSignIn={onOpenAuth} />
          </>
        }
      </div>

      <div className="rail__divider"></div>

      {/* Agents section */}
      <div className="rail__section">
        <div className="rail__label rail__section-head">Agents</div>
        {PRIMARY_NAV.map((n, i) => {
          if (n.requiresAuth && !loggedIn) {
            return (
              <RailLockedItem
                key={i} icon={n.icon} label={n.label}
                title={n.promo?.title || `Log in to use ${n.label}`}
                desc={n.promo?.desc || 'Sign up to unlock this agent.'}
                collapsed={collapsed}
                onSignIn={onOpenAuth} />);

          }
          return (
            <button
              key={i}
              className="rail__item"
              data-rail-tip={n.label}
              onClick={() => n.kind === 'agent' ? onPickAgent(n.id) : n.query && onPickHistory(n.query)}>
              <span className="rail__item-icon">{Icon[n.icon]()}</span>
              <span className="rail__text">{n.label}</span>
            </button>);

        })}
      </div>

      <div className="rail__divider"></div>

      {/* Recent section — hidden when collapsed */}
      {loggedIn &&
      <div className="rail__section rail__section--recent">
          <div className="rail__label rail__section-head">Recent</div>
          {history.map((h) =>
        <button
          key={h.id}
          className={'rail__recent' + (h.active ? ' rail__recent--active' : '')}
          onClick={() => onPickHistory(h.query)}>
              <span className="rail__recent-text">{h.q}</span>
              {h.active && <span className="rail__recent-more" onClick={(e) => e.stopPropagation()}>{Icon.MoreHorizontal()}</span>}
            </button>
        )}
        </div>
      }

      <div style={{ flex: 1 }}></div>

      {/* Logged-out: callout (expanded) or login button (collapsed) */}
      {!loggedIn &&
      <>
          <div className="signin-callout">
            <div className="signin-callout__title">Save your chats</div>
            <div className="signin-callout__desc">
              Log in to get personalized recommendations, save your health data, and revisit past conversations.
            </div>
            <div className="signin-callout__actions">
              <button className="signin-callout__primary" onClick={onOpenAuth}>Log in</button>
              <button className="signin-callout__secondary" onClick={onOpenAuth}>Sign up</button>
            </div>
          </div>
          <button className="rail__item rail__item--login" data-rail-tip="Log in" onClick={onOpenAuth}>
            <span className="rail__item-icon">{Icon.Person()}</span>
            <span className="rail__text">Log in</span>
          </button>
        </>
      }

      {/* Logged-in: user row */}
      {loggedIn &&
      <div className="rail__user-wrap">
          {userMenuOpen &&
        <div className="user-menu">
              <button className="user-menu__item" onClick={() => {onCloseMenu();onPickAgent('profile');}}>
                <span className="user-menu__icon">{Icon.Person()}</span>
                <span>Profile</span>
              </button>
              <button className="user-menu__item" onClick={() => {onCloseMenu();onPickAgent('care-profile');}}>
                <span className="user-menu__icon">{Icon.Heart()}</span>
                <span>Health data</span>
              </button>
              <button className="user-menu__item" onClick={() => {onCloseMenu();onPickAgent('preferences');}}>
                <span className="user-menu__icon">{Icon.Sliders()}</span>
                <span>Search preferences</span>
              </button>
              <button className="user-menu__item" onClick={() => {onCloseMenu();onPickAgent('settings');}}>
                <span className="user-menu__icon">{Icon.Settings()}</span>
                <span>Settings</span>
              </button>
              <button className="user-menu__item">
                <span className="user-menu__icon">{Icon.Globe()}</span>
                <span>Language</span>
                <span className="user-menu__trail">English</span>
              </button>
              <div className="user-menu__divider"></div>
              <button className="user-menu__item user-menu__item--danger" onClick={() => {onCloseMenu();onSetLoggedIn(false);}}>
                <span className="user-menu__icon">{Icon.LogOut()}</span>
                <span>Log out</span>
              </button>
            </div>
        }
          <div className={'rail__user' + (userMenuOpen ? ' rail__user--open' : '')} onClick={onToggleMenu}>
            <div className="rail__user-avatar">BM</div>
            <div className="rail__user-text">
              <div className="rail__user-name">Bryan McCarthy</div>
              <div className="rail__user-sub">Signed in</div>
            </div>
            <button className="rail__user-action">{Icon.ChevronUpDown()}</button>
          </div>
        </div>
      }
    </aside>);

}

/* === Main header (Search ⌄ left) === */
function MainHeader({ mode, onModeChange }) {
  const labels = { search: 'Search', 'check-symptoms': 'Check symptoms', 'find-care': 'Find care', 'immediate-care': 'Get seen now', 'schedule': 'Schedule appointment', 'virtual-visit': 'Virtual visit', 'profile': 'Profile', 'care-profile': 'Health data', 'preferences': 'Search preferences', 'settings': 'Settings', 'saved': 'Saved', 'projects': 'Projects', 'projects:new': 'Projects' };
  let label = labels[mode];
  if (!label && mode && mode.startsWith && mode.startsWith('project:')) {
    label = window.projectAgentLabel ? window.projectAgentLabel(mode) : 'Project';
    if (!label) label = 'Project';
  }
  return (
    <div className="main__header">
      <button className="main__mode">
        <span>{label || 'Search'}</span>
        <span className="main__mode-caret">{Icon.ChevronDown()}</span>
      </button>
    </div>);

}

/* === Role selector (shared between landing header and chat header) === */
const ROLE_OPTIONS = [
{ id: 'patient', label: "I'm a patient" },
{ id: 'caregiver', label: "I'm a caregiver" },
{ id: 'physician', label: "I'm a physician" },
{ id: 'researcher', label: "I'm a researcher" }];

function RoleSelect({ role, onRoleChange }) {
  const [open, setOpen] = useS(false);
  const ref = useR(null);
  useE(() => {
    if (!open) return;
    const close = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  const label = ROLE_OPTIONS.find((r) => r.id === role)?.label || "I'm a patient";
  return (
    <div className="role-wrap" ref={ref}>
      <button className={'role-select' + (open ? ' role-select--open' : '')} onClick={() => setOpen((o) => !o)}>
        <span>{label}</span>
        <span className="role-select__caret">{Icon.ChevronDown()}</span>
      </button>
      {open &&
      <div className="role-menu">
          <div className="role-menu__header">View results for</div>
          {ROLE_OPTIONS.map((r) =>
        <button
          key={r.id}
          className={'role-menu__item' + (role === r.id ? ' role-menu__item--active' : '')}
          onClick={() => {onRoleChange(r.id);setOpen(false);}}>
              <span>{r.label}</span>
              {role === r.id && <span className="role-menu__check">{Icon.Check()}</span>}
            </button>
        )}
          <div className="role-menu__footer">Personalizes language, sources, and detail level.</div>
        </div>
      }
    </div>);

}

/* === Chat header — name + unified scope tabs + role dropdown ===
   Renders the same 6 scope tabs as the landing page, filtered to those
   that have at least one section of content for this chat (plus Ask, which
   is always shown). The active tab drives section filtering in Message. */
function ChatHeader({ chatLabel, sections, activeScope, onScopeChange, role, onRoleChange }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const tabsRef = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  React.useEffect(() => {
    const el = tabsRef.current?.querySelector('.chat-tab--active');
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [activeScope]);

  const scopesWithContent = React.useMemo(() => {
    const present = new Set(['ask']);
    (sections || []).forEach((s) => present.add(sectionScope(s)));
    return SCOPES.filter((sc) => present.has(sc.id));
  }, [sections]);

  return (
    <div className="chat-header">
      <div className="chat-header__left" ref={menuRef}>
        <div className="chat-header__name" title={chatLabel}>{chatLabel}</div>
        <button
          className={'chat-header__more' + (menuOpen ? ' chat-header__more--open' : '')}
          onClick={() => setMenuOpen((o) => !o)}
          title="Chat options">
          {Icon.MoreHorizontal()}
        </button>
        {menuOpen &&
        <div className="chat-menu">
            <button className="chat-menu__item">Rename</button>
            <button className="chat-menu__item">Save chat</button>
            <button className="chat-menu__item">Export</button>
            <div className="chat-menu__divider"></div>
            <button className="chat-menu__item chat-menu__item--danger">Delete</button>
          </div>
        }
      </div>

      <div className="chat-header__tabs" role="tablist" ref={tabsRef}>
        {scopesWithContent.map((sc) => {
          const active = sc.id === activeScope;
          return (
            <button
              key={sc.id}
              role="tab"
              aria-selected={active}
              className={'chat-tab' + (active ? ' chat-tab--active' : '')}
              onClick={() => onScopeChange && onScopeChange(sc.id)}>
              <span className="chat-tab__icon">{Icon[sc.icon]()}</span>
              <span className="chat-tab__label">{sc.label}</span>
            </button>);
        })}
      </div>

      <div className="chat-header__right">
        <RoleSelect role={role} onRoleChange={onRoleChange} />
      </div>
    </div>);

}

/* === Check Symptoms — first screen of agent === */
const SYMPTOM_BODY_AREAS = [
{ id: 'head', label: 'Head & face', sub: 'Headache, sinus, eye, ear' },
{ id: 'chest', label: 'Chest & breathing', sub: 'Cough, breath, heart' },
{ id: 'abdomen', label: 'Stomach & digestion', sub: 'Nausea, pain, bowel' },
{ id: 'back', label: 'Back & spine', sub: 'Upper, lower, neck' },
{ id: 'joints', label: 'Joints & muscles', sub: 'Knee, shoulder, sprain' },
{ id: 'skin', label: 'Skin & rash', sub: 'Itch, bump, discoloration' },
{ id: 'mental', label: 'Mood & sleep', sub: 'Anxiety, stress, sleep' },
{ id: 'general', label: 'General feeling', sub: 'Fever, fatigue, cold' }];


function SymptomChecker({ onStart, onAsk }) {
  const [area, setArea] = React.useState(null);
  const [draft, setDraft] = React.useState('');

  const begin = () => {
    if (draft.trim()) onAsk(draft.trim());else
    if (area) onAsk(`I have a ${area.label.toLowerCase()} concern`);
  };

  return (
    <div className="agent fade-in">
      <div className="agent__head">
        <div className="agent__badge">
          <span className="agent__badge-icon">{Icon.Clipboard()}</span>
          <span>Symptom Checker</span>
        </div>
        <h1 className="agent__title">What's bothering you today?</h1>
        <p className="agent__sub">
          A few quick questions, then we'll suggest possible causes, what to do next, and whether you should see a clinician. This isn't a diagnosis — it's a starting point.
        </p>
      </div>

      <div className="agent__section">
        <div className="agent__label">1 · Pick a body area</div>
        <div className="body-grid">
          {SYMPTOM_BODY_AREAS.map((a) =>
          <button
            key={a.id}
            className={'body-card' + (area?.id === a.id ? ' body-card--active' : '')}
            onClick={() => setArea(a)}>
              <span className="body-card__label">{a.label}</span>
              <span className="body-card__sub">{a.sub}</span>
            </button>
          )}
        </div>
      </div>

      <div className="agent__section">
        <div className="agent__label">2 · Or describe what you're feeling</div>
        <div className="agent__input">
          <textarea
            className="input__textarea"
            placeholder="e.g. Sharp pain in my lower back when I bend forward, started 3 days ago…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            style={{ minHeight: 80 }} />
          
        </div>
      </div>

      <div className="agent__actions">
        <div className="agent__note">
          {Icon.Alert()}
          <span>If you're experiencing chest pain, severe bleeding, signs of stroke, or thoughts of harm — call 911 or go to an ER.</span>
        </div>
        <button
          className="agent__begin"
          disabled={!area && !draft.trim()}
          onClick={begin}>
          <span>Begin assessment</span>
          <span>{Icon.ArrowRight()}</span>
        </button>
      </div>
    </div>);

}

/* === Schedule Appointment — two-pane scheduling assistant === */
/* Plain-language, first-person reason chips. Tapping one prefills the text
   field (editable). Clinical service-types (Lab/Imaging) are intentionally
   omitted — patients describe the symptom; specialty falls out of it. */
const SCHEDULE_REASONS = [
{ id: 'physical', label: 'Routine checkup',     sample: "I'm due for a routine checkup.",                       specialties: ['Internal Medicine', 'Family Medicine'] },
{ id: 'sick',     label: 'Not feeling well',    sample: "I haven't been feeling well lately.",                  specialties: ['Internal Medicine', 'Family Medicine'] },
{ id: 'followup', label: 'Follow-up visit',     sample: 'I need a follow-up on my last visit.',                 specialties: ['Internal Medicine', 'Family Medicine', 'Cardiology'] },
{ id: 'refill',   label: 'Prescription refill', sample: 'I need a refill on one of my medications.',            specialties: ['Internal Medicine', 'Family Medicine'] },
{ id: 'skin',     label: 'Skin issue',          sample: "I'd like someone to look at a skin issue.",            specialties: ['Dermatology', 'Family Medicine'] },
{ id: 'mental',   label: 'Mental health',       sample: "I'd like to talk to someone about my mental health.",  specialties: ['Psychiatry'] }];


const SCHEDULE_SLOTS = [
{ time: '4:30 PM',  when: 'Today',     day: 'this-week', specialty: 'Internal Medicine', modality: 'in-person', providerId: 'reyes',   loc: 'Dr. Samuel Reyes · Internal Medicine', dist: '0.5 mi · Midtown',    wait: 'In-person',  closes: '30-min appt' },
{ time: '5:20 PM',  when: 'Today',     day: 'this-week', specialty: 'Family Medicine',   modality: 'in-person', providerId: 'brooks',  loc: 'Dr. Nina Brooks · Family Medicine',    dist: '1.1 mi · Midtown',    wait: 'In-person',  closes: '30-min appt' },
{ time: '6:00 PM',  when: 'Today',     day: 'this-week', specialty: 'Family Medicine',   modality: 'telehealth', providerId: 'brooks',  loc: 'Dr. Nina Brooks · Family Medicine',    dist: 'Online',              wait: 'Video visit', closes: '20-min appt' },
{ time: '8:15 AM',  when: 'Tomorrow',  day: 'this-week', specialty: 'Internal Medicine', modality: 'in-person', providerId: 'reyes',   loc: 'Dr. Samuel Reyes · Internal Medicine', dist: '0.5 mi · Midtown',    wait: 'In-person',  closes: '30-min appt' },
{ time: '9:40 AM',  when: 'Tomorrow',  day: 'this-week', specialty: 'Family Medicine',   modality: 'in-person', providerId: 'okonjo',  loc: 'Dr. Maya Okonjo · Family Medicine',    dist: '0.8 mi · Midtown',    wait: 'In-person',  closes: '30-min appt' },
{ time: '11:00 AM', when: 'Tomorrow',  day: 'this-week', specialty: 'Cardiology',        modality: 'in-person', providerId: 'patel',   loc: 'Dr. Aaron Patel · Cardiology',         dist: '1.4 mi · Midtown',    wait: 'In-person',  closes: '45-min consult' },
{ time: '2:10 PM',  when: 'Tomorrow',  day: 'this-week', specialty: 'Family Medicine',   modality: 'in-person', providerId: 'moore',   loc: 'Dr. Elena Moore · Family Medicine',    dist: '1.7 mi · West Side',  wait: 'In-person',  closes: '30-min appt' },
{ time: '3:30 PM',  when: 'Tomorrow',  day: 'this-week', specialty: 'Dermatology',       modality: 'telehealth', providerId: 'hadid',   loc: 'Dr. Yara Hadid · Dermatology',         dist: 'Online',              wait: 'Video visit', closes: '20-min appt' },
{ time: '11:20 AM', when: 'Thursday',  day: 'this-week', specialty: 'Family Medicine',   modality: 'telehealth', providerId: 'okonjo',  loc: 'Dr. Maya Okonjo · Family Medicine',    dist: 'Online',              wait: 'Video visit', closes: '20-min appt' },
{ time: '3:00 PM',  when: 'Thursday',  day: 'this-week', specialty: 'Internal Medicine', modality: 'in-person', providerId: 'carter',  loc: 'Dr. Ben Carter · Internal Medicine',   dist: '1.9 mi · Chelsea',    wait: 'In-person',  closes: '30-min appt' },
{ time: '7:45 AM',  when: 'Friday',    day: 'next-week', specialty: 'Lab',               modality: 'in-person', providerId: 'lab-mid', loc: 'Midtown Lab · Quest Diagnostics',      dist: '0.4 mi · Midtown',    wait: 'Walk-in',    closes: '15-min draw' },
{ time: '8:30 AM',  when: 'Friday',    day: 'next-week', specialty: 'Radiology',         modality: 'in-person', providerId: 'rad-img', loc: 'West Side Imaging · MRI suite',        dist: '1.6 mi · West Side',  wait: 'In-person',  closes: '60-min scan' },
{ time: '10:00 AM', when: 'Friday',    day: 'next-week', specialty: 'Psychiatry',        modality: 'telehealth', providerId: 'lin-psy', loc: 'Dr. Jamie Lin · Psychiatry',           dist: 'Online',              wait: 'Video visit', closes: '50-min session' },
{ time: '1:15 PM',  when: 'Friday',    day: 'next-week', specialty: 'Cardiology',        modality: 'in-person', providerId: 'patel',   loc: 'Dr. Aaron Patel · Cardiology',         dist: '1.4 mi · Midtown',    wait: 'In-person',  closes: '45-min consult' },
{ time: '8:00 AM',  when: 'Mon, May 26',day:'next-week', specialty: 'Internal Medicine', modality: 'in-person', providerId: 'reyes',   loc: 'Dr. Samuel Reyes · Internal Medicine', dist: '0.5 mi · Midtown',    wait: 'In-person',  closes: '45-min physical' },
{ time: '10:40 AM', when: 'Mon, May 26',day:'next-week', specialty: 'Dermatology',       modality: 'in-person', providerId: 'hadid',   loc: 'Dr. Yara Hadid · Dermatology',         dist: '2.1 mi · Chelsea',    wait: 'In-person',  closes: '30-min consult' },
{ time: '2:30 PM',  when: 'Tue, May 27',day:'next-week', specialty: 'Psychiatry',        modality: 'telehealth', providerId: 'lin-psy', loc: 'Dr. Jamie Lin · Psychiatry',           dist: 'Online',              wait: 'Video visit', closes: '50-min session' },
{ time: '4:00 PM',  when: 'Wed, May 28',day:'next-week', specialty: 'Family Medicine',   modality: 'in-person', providerId: 'okonjo',  loc: 'Dr. Maya Okonjo · Family Medicine',    dist: '0.8 mi · Midtown',    wait: 'In-person',  closes: '30-min appt' }];


const SCHEDULE_WHEN_OPTIONS = [
{ id: 'asap',      label: 'As soon as possible' },
{ id: 'this-week', label: 'This week' },
{ id: 'next-week', label: 'Next week' },
{ id: 'flexible',  label: "I'm flexible" }];

const SCHEDULE_WHERE_OPTIONS = [
{ id: 'in-person', label: 'In-person near me' },
{ id: 'telehealth',label: 'Telehealth' },
{ id: 'any',       label: 'Either is fine' }];


const SCHEDULE_STEPS = ['Reason', "Who you'd like to see", 'When & how'];

function ScheduleAppointment({ onAsk }) {
  const [step, setStep] = React.useState(1); // 1 | 2 | 3 | 'result'
  const [reason, setReason] = React.useState(null);
  const [reasonText, setReasonText] = React.useState('');
  const [providerPref, setProviderPref] = React.useState('mine');
  const [when, setWhen] = React.useState('flexible');
  const [where, setWhere] = React.useState('any');
  const [notes, setNotes] = React.useState('');
  const [reserved, setReserved] = React.useState(null);

  // Reason chip narrows specialty; free text alone leaves all specialties
  // eligible (the text is captured for booking context).
  const filteredSlots = React.useMemo(() => {
    return SCHEDULE_SLOTS.filter((s) => {
      if (reason) {
        if (!reason.specialties.includes(s.specialty)) return false;
        if (providerPref === 'mine' && s.providerId !== 'reyes') {
          if (['Internal Medicine', 'Family Medicine'].includes(s.specialty)) return false;
        }
      }
      if (when === 'asap' && s.when !== 'Today') return false;
      if (when === 'this-week' && s.day !== 'this-week') return false;
      if (when === 'next-week' && s.day !== 'next-week') return false;
      if (where === 'in-person' && s.modality !== 'in-person') return false;
      if (where === 'telehealth' && s.modality !== 'telehealth') return false;
      return true;
    });
  }, [reason, providerPref, when, where]);

  // One smart pick: prefer the patient's PCP (Dr. Reyes) when "my PCP" is
  // chosen and a matching slot exists; otherwise the soonest filtered slot.
  // SCHEDULE_SLOTS is authored in chronological order, so first = soonest.
  const recommended = React.useMemo(() => {
    if (!filteredSlots.length) return null;
    if (providerPref === 'mine') {
      const mine = filteredSlots.find((s) => s.providerId === 'reyes');
      if (mine) return mine;
    }
    return filteredSlots[0];
  }, [filteredSlots, providerPref]);

  const alternates = React.useMemo(
    () => (recommended ? filteredSlots.filter((s) => s !== recommended).slice(0, 3) : []),
    [filteredSlots, recommended]
  );

  const cancelReservation = () => setReserved(null);

  const pickChip = (chip) => {
    setReason((cur) => (cur?.id === chip.id ? cur : chip));
    setReasonText(chip.sample);
  };

  const goResult = () => { setReserved(null); setStep('result'); };
  const relaxFilters = () => { setWhen('flexible'); setWhere('any'); };

  const followUps = [
    "What should I bring to this appointment?",
    "Will I owe anything at the visit?",
    "Walk me through what to expect"];

  const whenLabel = (SCHEDULE_WHEN_OPTIONS.find((o) => o.id === when) || {}).label;
  const whereLabel = (SCHEDULE_WHERE_OPTIONS.find((o) => o.id === where) || {}).label;

  const slotMeta = (s) => (
    <div className="confirm-card__meta rec-card__meta">
      {s.modality === 'telehealth' ?
        <span className="confirm-card__meta-item">{Icon.Video()}<span>Video visit</span></span> :
        <span className="confirm-card__meta-item">{Icon.MapPin()}<span>{s.dist}</span></span>
      }
      <span className="confirm-card__meta-dot">·</span>
      <span className="confirm-card__meta-item">{Icon.Clock()}<span>{s.closes}</span></span>
    </div>
  );

  return (
    <div className="agent schedule fade-in">
      <div className="agent__head">
        <div className="agent__badge">
          <span className="agent__badge-icon">{Icon.Calendar()}</span>
          <span>Scheduling assistant</span>
        </div>
        <h1 className="agent__title">Book a visit.</h1>
        <p className="agent__sub">
          A few quick questions and we'll find the best time for you.
        </p>
      </div>

      <div className="wizard">
        {step !== 'result' &&
        <div className="wizard__steps" role="list" aria-label="Steps">
          {SCHEDULE_STEPS.map((label, i) => {
            const n = i + 1;
            const state = n === step ? ' wizard__step-dot--active' : n < step ? ' wizard__step-dot--done' : '';
            return (
              <React.Fragment key={label}>
                {i > 0 && <span className="wizard__step-bar" aria-hidden="true"></span>}
                <span className={'wizard__step-dot' + state} role="listitem" aria-current={n === step ? 'step' : undefined}>
                  {n < step ? Icon.Check() : n}
                </span>
              </React.Fragment>);
          })}
          <span className="wizard__step-count">Step {step} of 3</span>
        </div>
        }

        {/* Step 1 — Reason */}
        {step === 1 &&
        <div className="wizard__step fade-in">
          <h2 className="wizard__q">What brings you in today?</h2>
          <div className="agent__input">
            <textarea
              className="input__textarea"
              placeholder="Describe what's going on, in your own words."
              value={reasonText}
              onChange={(e) => { setReasonText(e.target.value); }}
              rows={3}
              style={{ minHeight: 92 }}
              autoFocus />
          </div>
          <div className="wizard__hint">Or start with a common reason:</div>
          <div className="reason-chips" role="list" aria-label="Common reasons">
            {SCHEDULE_REASONS.map((r) =>
            <button
              key={r.id}
              type="button"
              role="listitem"
              className={'choice-chip reason-chip' + (reason?.id === r.id ? ' choice-chip--active' : '')}
              onClick={() => pickChip(r)}>
              {r.label}
            </button>
            )}
          </div>

          <details className="wizard__more">
            <summary>Anything else to share? <span className="wizard__more-opt">Optional</span></summary>
            <div className="agent__input">
              <textarea
                className="input__textarea"
                placeholder="Insurance changes, accessibility needs, who's coming with you."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                style={{ minHeight: 60 }} />
            </div>
          </details>

          <div className="wizard__nav">
            <button
              type="button"
              className="btn btn--primary wizard__next"
              disabled={!reasonText.trim()}
              onClick={() => setStep(2)}>
              <span>Continue</span>{Icon.ArrowRight()}
            </button>
          </div>
        </div>
        }

        {/* Step 2 — Who */}
        {step === 2 &&
        <div className="wizard__step fade-in">
          <h2 className="wizard__q">Who would you like to see?</h2>
          <div className="who-picks">
            <button
              type="button"
              className={'who-pick' + (providerPref === 'mine' ? ' who-pick--active' : '')}
              onClick={() => setProviderPref('mine')}>
              <span className="who-pick__avatar who-pick__avatar--initials">SR</span>
              <span className="who-pick__body">
                <span className="who-pick__name">Dr. Samuel Reyes</span>
                <span className="who-pick__meta">Internal Medicine · Your PCP</span>
              </span>
              {providerPref === 'mine' && <span className="who-pick__check">{Icon.Check()}</span>}
            </button>
            <button
              type="button"
              className={'who-pick' + (providerPref === 'any' ? ' who-pick--active' : '')}
              onClick={() => setProviderPref('any')}>
              <span className="who-pick__avatar who-pick__avatar--any" aria-hidden="true"></span>
              <span className="who-pick__body">
                <span className="who-pick__name">Soonest available</span>
                <span className="who-pick__meta">Any in-network provider</span>
              </span>
              {providerPref === 'any' && <span className="who-pick__check">{Icon.Check()}</span>}
            </button>
            <button type="button" className="who-pick who-pick--disabled" disabled>
              <span className="who-pick__avatar who-pick__avatar--ghost" aria-hidden="true"></span>
              <span className="who-pick__body">
                <span className="who-pick__name">Browse new providers</span>
                <span className="who-pick__meta">Filter by specialty, language, ratings</span>
              </span>
              <span className="who-pick__soon">Coming soon</span>
            </button>
          </div>
          <div className="wizard__nav">
            <button type="button" className="btn wizard__back" onClick={() => setStep(1)}><span aria-hidden="true">←</span><span>Back</span></button>
            <button type="button" className="btn btn--primary wizard__next" onClick={() => setStep(3)}><span>Continue</span>{Icon.ArrowRight()}</button>
          </div>
        </div>
        }

        {/* Step 3 — When & how */}
        {step === 3 &&
        <div className="wizard__step fade-in">
          <h2 className="wizard__q">When works best?</h2>
          <div className="choice-chips">
            {SCHEDULE_WHEN_OPTIONS.map((o) =>
            <button
              key={o.id}
              type="button"
              className={'choice-chip' + (when === o.id ? ' choice-chip--active' : '')}
              onClick={() => setWhen(o.id)}>
              {o.label}
            </button>
            )}
          </div>
          <h2 className="wizard__q wizard__q--sub">How would you like to be seen?</h2>
          <div className="choice-chips">
            {SCHEDULE_WHERE_OPTIONS.map((o) =>
            <button
              key={o.id}
              type="button"
              className={'choice-chip' + (where === o.id ? ' choice-chip--active' : '')}
              onClick={() => setWhere(o.id)}>
              {o.label}
            </button>
            )}
          </div>
          <div className="wizard__nav">
            <button type="button" className="btn wizard__back" onClick={() => setStep(2)}><span aria-hidden="true">←</span><span>Back</span></button>
            <button type="button" className="btn btn--primary wizard__next" onClick={goResult}><span>Find my appointment</span>{Icon.ArrowRight()}</button>
          </div>
        </div>
        }

        {/* Result */}
        {step === 'result' && reserved &&
        <div className="wizard__step fade-in">
          <div className="confirm-card">
            <div className="confirm-card__badge">
              <span className="confirm-card__check">{Icon.Check()}</span>
              <span>Slot held for 10 minutes</span>
            </div>
            <div className="confirm-card__when">
              <span className="confirm-card__day">{reserved.when}</span>
              <span className="confirm-card__time">{reserved.time}</span>
            </div>
            <div className="confirm-card__loc">{reserved.loc}</div>
            <div className="confirm-card__meta">
              {reserved.modality === 'telehealth' ?
                <span className="confirm-card__meta-item">{Icon.Video()}<span>Video visit</span></span> :
                <span className="confirm-card__meta-item">{Icon.MapPin()}<span>{reserved.dist}</span></span>
              }
              <span className="confirm-card__meta-dot">·</span>
              <span className="confirm-card__meta-item">{Icon.Clock()}<span>{reserved.closes}</span></span>
            </div>
            <div className="confirm-card__bring">
              <span className="confirm-card__bring-label">Bring to your visit</span>
              <span>Insurance card, photo ID, list of current medications.</span>
            </div>
            <div className="confirm-card__actions">
              <button type="button" className="confirm-card__action">{Icon.Calendar()}<span>Add to calendar</span></button>
              <button type="button" className="confirm-card__action">{Icon.MapPin()}<span>Directions</span></button>
              <button type="button" className="confirm-card__action">{Icon.FileText()}<span>Message clinic</span></button>
              <button type="button" className="confirm-card__action confirm-card__action--ghost" onClick={cancelReservation}>Cancel hold</button>
            </div>
            <div className="confirm-card__followups">
              <div className="confirm-card__followups-label">Ask a follow-up</div>
              <div className="confirm-card__chip-row">
                {followUps.map((q, i) =>
                <button key={i} type="button" className="confirm-card__chip" onClick={() => onAsk(q)}>
                  <span>{q}</span><span>{Icon.ArrowRight()}</span>
                </button>
                )}
              </div>
            </div>
          </div>
        </div>
        }

        {step === 'result' && !reserved && recommended &&
        <div className="wizard__step fade-in">
          <button type="button" className="wizard__result-back" onClick={() => setStep(3)}>
            <span aria-hidden="true">←</span><span>Change my answers</span>
          </button>
          <div className="rec-card">
            <div className="rec-card__top">
              <span className="pill pill--ok"><span className="pill__dot"></span><span>Recommended</span></span>
              <span className="rec-card__rationale">
                {providerPref === 'mine' && recommended.providerId === 'reyes' ? 'Soonest with your PCP' : 'Soonest that fits your preferences'}
              </span>
            </div>
            <div className="confirm-card__when">
              <span className="confirm-card__day">{recommended.when}</span>
              <span className="confirm-card__time">{recommended.time}</span>
            </div>
            <div className="rec-card__name">{recommended.loc}</div>
            {slotMeta(recommended)}
            <div className="rec-card__actions confirm-card__actions">
              <button type="button" className="confirm-card__action confirm-card__action--go" onClick={() => setReserved(recommended)}>{Icon.Check()}<span>Reserve this time</span></button>
              <button type="button" className="confirm-card__action">{Icon.Calendar()}<span>Add to calendar</span></button>
            </div>
          </div>

          {alternates.length > 0 &&
          <div className="rec-card__others schedule__alts">
            <div className="rec-card__others-label">Other good options</div>
            {alternates.map((s, i) =>
            <button type="button" className="schedule__alt" key={i} onClick={() => setReserved(s)}>
              <span className="schedule__alt-when">
                <span className="schedule__alt-day">{s.when}</span>
                <span className="schedule__alt-time">{s.time}</span>
              </span>
              <span className="schedule__alt-body">
                <span className="schedule__alt-loc">{s.loc}</span>
                <span className="schedule__alt-meta">{s.modality === 'telehealth' ? 'Video visit' : s.dist} · {s.closes}</span>
              </span>
              <span className="schedule__alt-cta">{Icon.ArrowRight()}</span>
            </button>
            )}
          </div>
          }
        </div>
        }

        {step === 'result' && !reserved && !recommended &&
        <div className="wizard__step fade-in">
          <button type="button" className="wizard__result-back" onClick={() => setStep(3)}>
            <span aria-hidden="true">←</span><span>Change my answers</span>
          </button>
          <div className="schedule__empty">
            <div className="schedule__empty-title">No times match those preferences.</div>
            <div className="schedule__empty-sub">Try loosening when or how you'd like to be seen.</div>
            <button type="button" className="btn btn--primary schedule__empty-cta" onClick={relaxFilters}>Show me anything</button>
          </div>
        </div>
        }
      </div>
    </div>);

}

/* === Get seen now — immediate care walk-in spot-saver === */
/* travelMin (drive/transit) is separate from distMi: the recommended clinic is
   ranked by travelMin + waitMin combined, so it is NOT the closest one. */
const IMMEDIATE_CARE_CLINICS = [
{ id: 'midtown-uc',   name: 'Midtown Urgent Care',            type: 'Urgent care',   dist: '0.6 mi · Midtown',   distMi: 0.6, travelMin: 6,  waitMin: 22, ahead: 6, nextSeen: '2:55 PM', openUntil: '10:00 PM',      features: ['X-ray', 'Labs'],            openNow: true,  phone: '(212) 555-0142' },
{ id: 'downtown-247', name: 'Downtown 24/7 Urgent Care',      type: 'Urgent care',   dist: '3.1 mi · FiDi',      distMi: 3.1, travelMin: 17, waitMin: 6,  ahead: 1, nextSeen: '2:42 PM', openUntil: 'Open 24 hours',  features: ['X-ray', 'Labs'],            openNow: true,  phone: '(212) 555-0210' },
{ id: 'quickcare',    name: 'QuickCare Retail Clinic',        type: 'Retail clinic', dist: '0.4 mi · Midtown',   distMi: 0.4, travelMin: 4,  waitMin: 30, ahead: 8, nextSeen: '3:10 PM', openUntil: '9:00 PM',       features: ['Labs'],                     openNow: true,  phone: '(212) 555-0188' },
{ id: 'westside',     name: 'West Side Walk-In Clinic',       type: 'Walk-in clinic', dist: '1.1 mi · West Side', distMi: 1.1, travelMin: 9,  waitMin: 8,  ahead: 2, nextSeen: '2:45 PM', openUntil: '8:00 PM',       features: ['Pediatric', 'X-ray'],       openNow: true,  phone: '(212) 555-0173' },
{ id: 'eastside-peds',name: 'Eastside Pediatric Urgent Care', type: 'Urgent care',   dist: '2.0 mi · East Side', distMi: 2.0, travelMin: 13, waitMin: 24, ahead: 5, nextSeen: '3:15 PM', openUntil: '9:30 PM',       features: ['Pediatric'],                openNow: true,  phone: '(212) 555-0166' },
{ id: 'chelsea-fam',  name: 'Chelsea Family Urgent Care',     type: 'Urgent care',   dist: '1.7 mi · Chelsea',   distMi: 1.7, travelMin: 12, waitMin: 28, ahead: 7, nextSeen: '3:20 PM', openUntil: '11:00 PM',      features: ['Pediatric', 'X-ray', 'Labs'], openNow: true, phone: '(212) 555-0119' },
{ id: 'lakeview',     name: 'Lakeview Walk-In Clinic',        type: 'Walk-in clinic', dist: '1.4 mi · Midtown',   distMi: 1.4, travelMin: null, waitMin: null, ahead: null, nextSeen: null, openUntil: null, opensAt: '8:00 AM', features: ['Labs'],            openNow: false, phone: '(212) 555-0150' }];


const IMMEDIATE_CARE_FILTERS = [
{ id: 'open',      label: 'Open now' },
{ id: 'xray',      label: 'X-ray on site' },
{ id: 'pediatric', label: 'Pediatric' }];

/* Profile-aware "who is this care for" + family the visit can be shared to. */
const IMMEDIATE_CARE_PATIENTS = [
{ id: 'bryan', name: 'Bryan McCarthy', relation: 'Myself',  initials: 'BM' },
{ id: 'mateo', name: 'Mateo McCarthy', relation: 'Son · 9', initials: 'MM' },
{ id: 'elena', name: 'Elena McCarthy', relation: 'Spouse',  initials: 'EM' }];

const IMMEDIATE_CARE_CONTACTS = [
{ id: 'elena',  name: 'Elena McCarthy',  relation: 'Spouse', initials: 'EM', channel: 'Text · (212) 555-0190' },
{ id: 'robert', name: 'Robert McCarthy', relation: 'Father', initials: 'RM', channel: 'Text · (212) 555-0177' }];

const IMMEDIATE_CARE_PARKING = 'This location is drop-off / valet friendly — pull up to the main entrance and staff will help you in.';


function ImmediateCare({ onAsk }) {
  const [filters, setFilters] = React.useState({ open: true, xray: false, pediatric: false });
  const [reasonText, setReasonText] = React.useState('');
  const [reserved, setReserved] = React.useState(null);
  const [onWay, setOnWay] = React.useState(false);
  const [patientId, setPatientId] = React.useState('bryan');
  const [whoOpen, setWhoOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [sharedTo, setSharedTo] = React.useState(null);

  const whoRef = React.useRef(null);
  const shareRef = React.useRef(null);
  React.useEffect(() => {
    if (!whoOpen && !shareOpen) return;
    const close = (e) => {
      if (whoRef.current && !whoRef.current.contains(e.target)) setWhoOpen(false);
      if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [whoOpen, shareOpen]);

  const toggleFilter = (id) => setFilters((f) => ({ ...f, [id]: !f[id] }));

  const filtered = React.useMemo(() => {
    const list = IMMEDIATE_CARE_CLINICS.filter((c) => {
      if (filters.open && !c.openNow) return false;
      if (filters.xray && !c.features.includes('X-ray')) return false;
      if (filters.pediatric && !c.features.includes('Pediatric')) return false;
      return true;
    });
    return list.slice().sort((a, b) => {
      if (a.openNow !== b.openNow) return a.openNow ? -1 : 1;
      return (a.waitMin == null ? 999 : a.waitMin) - (b.waitMin == null ? 999 : b.waitMin);
    });
  }, [filters]);

  const openCount = filtered.filter((c) => c.openNow).length;

  // Recommended = open clinic with the best travel + wait combined (not the
  // closest). Rationale compares it to the closest open clinic by distance.
  const total = (c) => (c.travelMin || 0) + (c.waitMin || 0);
  const openClinics = filtered.filter((c) => c.openNow);
  const recommended = openClinics.slice().sort((a, b) => total(a) - total(b))[0] || null;
  const closest = openClinics.slice().sort((a, b) => a.distMi - b.distMi)[0] || null;
  const savedMin = recommended && closest ? total(closest) - total(recommended) : 0;
  const others = filtered.filter((c) => !recommended || c.id !== recommended.id);

  const patient = IMMEDIATE_CARE_PATIENTS.find((p) => p.id === patientId) || IMMEDIATE_CARE_PATIENTS[0];
  const forFirst = patient.relation === 'Myself' ? 'my visit' : patient.name.split(' ')[0];
  const shareContacts = IMMEDIATE_CARE_CONTACTS.filter((c) => c.id !== patientId);

  const followUps = [
    `What should I bring for ${forFirst}?`,
    "Is this covered by my insurance?",
    "When should I go to the ER instead?"];

  const enRouteFollowUps = [
    "What if I'm running late?",
    "How long until I'm seen?",
    "Is there parking at the clinic?"];

  return (
    <div className="agent gsn fade-in">
      <div className="agent__head">
        <div className="agent__badge">
          <span className="agent__badge-icon">{Icon.Clock()}</span>
          <span>Immediate care</span>
        </div>
        <h1 className="agent__title">Let's get you seen.</h1>
        <p className="agent__sub">
          Tell us who needs care and what's going on. We'll recommend the fastest place to be seen — by travel and wait time combined.
        </p>
        <div className="gsn__safety">
          {Icon.Shield()}
          <span>Medical emergency? <strong>Call 911.</strong></span>
        </div>
      </div>

      {reserved ?
      <div className="gsn__held">
          <button type="button" className="gsn__back" onClick={() => { setReserved(null); setOnWay(false); }}>
            <span aria-hidden="true">←</span><span>See other clinics</span>
          </button>

          {onWay ?
          <div className="confirm-card gsn__enroute">
            <div className="confirm-card__badge">
              <span className="confirm-card__check">{Icon.Check()}</span>
              <span>You're on your way</span>
            </div>
            <h2 className="gsn__enroute-title">See you soon.</h2>
            <p className="gsn__enroute-sub">
              We let {reserved.name} know you're coming. Your spot is held until {reserved.nextSeen}, so try to arrive a few minutes early.
            </p>

            <div className="gsn__notif">
              {Icon.Phone()}
              <span className="gsn__notif-body">
                <span className="gsn__notif-title">Confirmation sent to your phone</span>
                <span className="gsn__notif-sub">We texted your hold details and directions so you can check in fast.</span>
              </span>
            </div>

            <div className="gsn__expect">
              <div className="gsn__expect-label">What to expect</div>
              <ul className="gsn__steps">
                <li>{Icon.MapPin()}<span>Head to {reserved.name}, {reserved.dist}.</span></li>
                <li>{Icon.Person()}<span>Check in at the front desk under your name. Bring your insurance card and photo ID.</span></li>
                <li>{Icon.Clock()}<span>The wait is about {reserved.waitMin} minutes right now. We'll text you if it changes.</span></li>
              </ul>
            </div>

            <div className="confirm-card__actions">
              <button type="button" className="confirm-card__action confirm-card__action--go">{Icon.MapPin()}<span>Directions</span></button>
              <button type="button" className="confirm-card__action">{Icon.Phone()}<span>Call clinic</span></button>
              <button type="button" className="confirm-card__action confirm-card__action--ghost" onClick={() => setOnWay(false)}>Not leaving yet?</button>
            </div>

            <div className="confirm-card__followups">
              <div className="confirm-card__followups-label">Ask a follow-up</div>
              <div className="confirm-card__chip-row">
                {enRouteFollowUps.map((q, i) =>
                <button key={i} type="button" className="confirm-card__chip" onClick={() => onAsk(q)}>
                    <span>{q}</span><span>{Icon.ArrowRight()}</span>
                  </button>
                )}
              </div>
            </div>
          </div> :

          <div className="confirm-card">
            <div className="confirm-card__badge">
              <span className="confirm-card__check">{Icon.Check()}</span>
              <span>Spot held · 15 min</span>
            </div>
            <div className="confirm-card__when">
              <span className="confirm-card__day">Arrive by</span>
              <span className="confirm-card__time">{reserved.nextSeen}</span>
            </div>
            <div className="confirm-card__loc">{reserved.name}</div>
            <div className="confirm-card__meta">
              <span className="confirm-card__meta-item">{Icon.MapPin()}<span>{reserved.dist}</span></span>
              <span className="confirm-card__meta-dot">·</span>
              <span className="confirm-card__meta-item">{Icon.Clock()}<span>~{reserved.waitMin}-min wait on arrival</span></span>
            </div>
            {reserved.reason &&
            <div className="gsn__reason-recap">
              <span className="gsn__reason-recap-label">Reason for visit</span>
              <span>{reserved.reason}</span>
            </div>
            }
            <div className="confirm-card__bring">
              <span className="confirm-card__bring-label">Check in</span>
              <span>Head over now, check in at the front desk under your name, and show this confirmation. Bring your insurance card and photo ID.</span>
            </div>
            <div className="confirm-card__actions">
              <button type="button" className="confirm-card__action confirm-card__action--go" onClick={() => setOnWay(true)}>{Icon.Compass()}<span>I'm on my way</span></button>
              <button type="button" className="confirm-card__action">{Icon.MapPin()}<span>Directions</span></button>
              <button type="button" className="confirm-card__action">{Icon.Phone()}<span>Call clinic</span></button>
              <button type="button" className="confirm-card__action confirm-card__action--ghost" onClick={() => { setReserved(null); setOnWay(false); }}>Cancel hold</button>
            </div>
            <div className="confirm-card__followups">
              <div className="confirm-card__followups-label">Ask a follow-up</div>
              <div className="confirm-card__chip-row">
                {followUps.map((q, i) =>
                <button key={i} type="button" className="confirm-card__chip" onClick={() => onAsk(q)}>
                    <span>{q}</span><span>{Icon.ArrowRight()}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          }
        </div> :

      <>
          <div className="gsn__who">
            <span className="gsn__who-label">Who is this care for?</span>
            <div className="who-for" ref={whoRef}>
              <button
                type="button"
                className={'who-for__trigger' + (whoOpen ? ' who-for__trigger--open' : '')}
                onClick={() => setWhoOpen((o) => !o)}>
                <span className="who-for__avatar">{patient.initials}</span>
                <span className="who-for__text">
                  <span className="who-for__name">{patient.name}</span>
                  <span className="who-for__meta">{patient.relation}</span>
                </span>
                <span className="who-for__caret">{Icon.ChevronDown()}</span>
              </button>
              {whoOpen &&
              <div className="who-for__menu">
                {IMMEDIATE_CARE_PATIENTS.map((p) =>
                <button
                  key={p.id}
                  type="button"
                  className={'who-for__item' + (p.id === patientId ? ' who-for__item--active' : '')}
                  onClick={() => { setPatientId(p.id); setWhoOpen(false); setSharedTo(null); }}>
                    <span className="who-for__avatar">{p.initials}</span>
                    <span className="who-for__text">
                      <span className="who-for__name">{p.name}</span>
                      <span className="who-for__meta">{p.relation}</span>
                    </span>
                    {p.id === patientId && <span className="who-for__check">{Icon.Check()}</span>}
                  </button>
                )}
              </div>
              }
            </div>
          </div>

          <div className="gsn__controls">
            <button type="button" className="gsn__loc">
              {Icon.MapPin()}<span>Near Midtown</span><span className="gsn__loc-change">Change</span>
            </button>
            <div className="gsn__filters">
              {IMMEDIATE_CARE_FILTERS.map((f) =>
              <button
                key={f.id}
                type="button"
                aria-pressed={!!filters[f.id]}
                className={'choice-chip' + (filters[f.id] ? ' choice-chip--active' : '')}
                onClick={() => toggleFilter(f.id)}>
                {f.label}
              </button>
              )}
            </div>
          </div>

          <div className="agent__input gsn__reason">
            <textarea
            className="input__textarea"
            aria-label="Reason for visit (optional)"
            placeholder="Reason for visit (optional), e.g. sore throat and fever"
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
            rows={1} />

          </div>

          {recommended &&
          <div className="rec-card">
            <div className="rec-card__top">
              <span className="pill pill--ok"><span className="pill__dot"></span><span>Recommended</span></span>
              {recommended.id !== (closest || {}).id && savedMin > 0 &&
              <span className="rec-card__rationale">~{savedMin} min sooner overall than the closest</span>
              }
            </div>

            <div className="rec-card__map" aria-hidden="true">
              <div className="rec-card__map-pin">{Icon.MapPin()}</div>
            </div>

            <div className="rec-card__name">{recommended.name}</div>
            <div className="rec-card__for">For {patient.name} · {patient.relation}</div>
            <div className="confirm-card__meta rec-card__meta">
              <span className="confirm-card__meta-item">{Icon.MapPin()}<span>{recommended.travelMin} min away · {recommended.dist}</span></span>
              <span className="confirm-card__meta-dot">·</span>
              <span className="confirm-card__meta-item">{Icon.Clock()}<span>~{recommended.waitMin} min wait · {recommended.ahead} ahead</span></span>
            </div>
            <div className="rec-card__total">≈ {recommended.travelMin + recommended.waitMin} min total to be seen</div>

            <div className="rec-card__parking">
              <span className="rec-card__parking-icon">{Icon.MapPin()}</span>
              <span>{IMMEDIATE_CARE_PARKING}</span>
            </div>

            <div className="rec-card__actions confirm-card__actions">
              <button type="button" className="confirm-card__action confirm-card__action--go" onClick={() => { setReserved({ ...recommended, reason: reasonText.trim() }); setOnWay(false); }}>{Icon.Check()}<span>Reserve spot</span></button>
              <button type="button" className="confirm-card__action">{Icon.MapPin()}<span>Directions</span></button>
              <div className="rec-card__share-wrap" ref={shareRef}>
                <button type="button" className="confirm-card__action" onClick={() => setShareOpen((o) => !o)}>
                  {Icon.Share()}<span>Share</span>
                </button>
                {shareOpen &&
                <div className="rec-card__share-pop">
                  <div className="rec-card__share-head">Share visit details with</div>
                  {shareContacts.length === 0 &&
                  <div className="rec-card__share-empty">No other contacts to share with.</div>
                  }
                  {shareContacts.map((c) =>
                  <button
                    key={c.id}
                    type="button"
                    className="rec-card__share-item"
                    onClick={() => { setSharedTo(c.name); setShareOpen(false); }}>
                      <span className="who-for__avatar">{c.initials}</span>
                      <span className="who-for__text">
                        <span className="who-for__name">{c.name}</span>
                        <span className="who-for__meta">{c.relation} · {c.channel}</span>
                      </span>
                      <span className="rec-card__share-send">{Icon.Send()}</span>
                    </button>
                  )}
                </div>
                }
              </div>
            </div>

            {sharedTo &&
            <div className="rec-card__sent">
              <span className="rec-card__sent-check">{Icon.Check()}</span>
              <span>Sent to {sharedTo} — {recommended.name}{reasonText.trim() ? `, “${reasonText.trim()}”` : ''}</span>
            </div>
            }
          </div>
          }

          <div className="gsn__count">
            <span className="gsn__count-dot"></span>
            <span>{recommended ? 'Other clinics nearby' : <><strong>{openCount}</strong> {openCount === 1 ? 'clinic' : 'clinics'} open near you</>} · sorted by soonest availability</span>
          </div>

          {others.length > 0 ?
          <div className="gsn__list">
              {others.map((c) => {
              return (
                <div key={c.id} className={'gsn-clinic' + (!c.openNow ? ' gsn-clinic--closed' : '')}>

                    <div className="gsn-clinic__main">
                      <div className="gsn-clinic__head">
                        <h2 className="gsn-clinic__name">{c.name}</h2>
                        <span className="gsn-clinic__type">{c.type} · {c.dist}</span>
                      </div>
                      <div className="gsn-clinic__status">
                        {c.openNow ?
                      <span className={'pill ' + (c.waitMin < 15 ? 'pill--ok' : c.waitMin < 40 ? '' : 'pill--neutral')}>
                            <span className="pill__dot"></span>
                            <span>{c.waitMin}-min wait · {c.ahead} ahead</span>
                          </span> :
                      <span className="pill pill--neutral"><span className="pill__dot"></span><span>Opens {c.opensAt}</span></span>
                      }
                        <span className="gsn-clinic__open">
                          {Icon.Clock()}<span>{c.openNow ? (c.openUntil.indexOf('Open') === 0 ? c.openUntil : 'Open until ' + c.openUntil) : 'Closed now'}</span>
                        </span>
                      </div>
                      <div className="gsn-clinic__feats">
                        {c.features.map((f) => <span key={f} className="gsn-tag">{f}</span>)}
                      </div>
                    </div>
                    <div className="gsn-clinic__cta-wrap">
                      {c.openNow &&
                    <div className="gsn-clinic__next">Next spot<strong>{c.nextSeen}</strong></div>
                    }
                      <button
                      type="button"
                      className="gsn-clinic__cta"
                      disabled={!c.openNow}
                      aria-label={c.openNow ? 'Reserve a spot at ' + c.name : c.name + ' opens at ' + c.opensAt}
                      onClick={() => { if (c.openNow) { setReserved({ ...c, reason: reasonText.trim() }); setOnWay(false); } }}>
                        {c.openNow ? <><span>Reserve spot</span>{Icon.ArrowRight()}</> : <span>Opens {c.opensAt}</span>}
                      </button>
                    </div>
                  </div>);

            })}
            </div> :

          <div className="schedule__empty">
              <div className="schedule__empty-title">No clinics match these filters.</div>
              <div className="schedule__empty-sub">Turn off a filter to see more nearby options.</div>
            </div>
          }
        </>
      }
    </div>);

}

/* === App === */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "rightRail": false,
  "density": "comfortable",
  "loggedIn": true
} /*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [messages, setMessages] = useS([]);
  const [draft, setDraft] = useS('');
  const [role, setRole] = useS('patient');
  const [collapsed, setCollapsed] = useS(true);
  const [agent, setAgent] = useS(null); // null | 'check-symptoms' | 'preferences' | 'settings'
  const [loggedIn, setLoggedIn] = useS(tweaks.loggedIn !== false);
  const [userMenuOpen, setUserMenuOpen] = useS(false);
  const [authOpen, setAuthOpen] = useS(false);
  const [activeTab, setActiveTab] = useS('ask');
  const [drawerOpen, setDrawerOpen] = useS(false);
  const [scrollEl, setScrollEl] = useS(null);
  const scrollRef = useR(null);
  const attachScroll = useCallback((el) => {scrollRef.current = el;setScrollEl(el);}, []);

  // Staged landing intro — plays once per page load, then settles so
  // returning to the landing (e.g. "New conversation") feels instantaneous.
  // After the cascade finishes, the rail expands from collapsed to its full
  // width as a final beat.
  const [intro, setIntro] = useS(!introPlayed);
  useE(() => {
    if (!intro) return;
    const tEnd = setTimeout(() => {introPlayed = true;setIntro(false);}, 2300);
    const tExpand = setTimeout(() => setCollapsed(false), 2500);
    return () => {clearTimeout(tEnd);clearTimeout(tExpand);};
  }, []);

  // Sync tweak → state
  useE(() => {setLoggedIn(tweaks.loggedIn !== false);}, [tweaks.loggedIn]);

  // Lock body scroll while mobile drawer is open
  useE(() => {
    document.body.classList.toggle('body--locked', drawerOpen);
    return () => document.body.classList.remove('body--locked');
  }, [drawerOpen]);

  // Auto-close drawer when route/agent/conversation changes
  useE(() => {setDrawerOpen(false);}, [agent, messages.length]);

  // Close user menu on outside click
  useE(() => {
    if (!userMenuOpen) return;
    const close = (e) => {
      if (!e.target.closest('.rail__user-wrap') && !e.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [userMenuOpen]);

  // Resolve which mock answer to use. Ordered most-specific -> generic so
  // specialties win before the generic "doctor" catch and emergencies win
  // before electives. Follow-ups carry an explicit target (see onFollowUp),
  // so this only needs to robustly handle suggestion/typeahead phrasings.
  const resolveAnswer = (q) => {
    const ql = q.toLowerCase();
    const has = (...kw) => kw.some((k) => ql.includes(k));
    const D = window.AlmaData;

    if (has('pharmac', 'drugstore', 'rx ', 'prescription', 'refill')) return D.PHARMACY;
    if (has('chest', 'shortness', 'breath', 'heart attack')) return D.CHEST_PAIN;
    if (has('colonoscopy', 'procedure prep')) return D.COLONOSCOPY;
    if (has('urgent', 'walk-in', 'walk in', 'open right now', 'open now')) return D.URGENT_CARE;
    if (has('mammogram', 'mammography', 'breast screening')) return D.MAMMOGRAM;
    if (has('cancer', 'oncolog', 'tumor')) return D.CANCER_CARE;
    if (has('cardiolog', 'cardiovascular', 'heart screening', 'heart care')) return D.CARDIOLOGY;
    if (has('pediatric', 'pediatrician')) return D.PEDIATRICS;
    if (has('dermatolog', 'skin')) return D.DERMATOLOGY;
    if (has('orthoped', 'knee', 'joint replacement', 'sports medicine')) return D.ORTHOPEDICS;
    if (has('imaging', 'mri', 'ct scan', 'x-ray', 'radiology', ' scan')) return D.IMAGING;
    if (has('hospital', 'emergency department', 'visiting')) return D.HOSPITALS;
    if (has('migraine', 'headache')) return D.MIGRAINE;
    if (has('diabetes', 'blood sugar', 'a1c', 'glucose')) return D.DIABETES;
    if (has('physical therap', 'physical therapist', 'pt ', ' pt')) {
      return has('cover', 'coverage', 'referral', 'deductible', 'copay', 'insurance')
        ? D.PT_COVERAGE : D.PHYSICAL_THERAPY;
    }
    if (has('stretch', 'exercise')) return D.STRETCHES;
    if (has('faq', 'how to schedule', 'schedule a visit', 'billing', ' bill', 'patient resource', 'patient faq')) return D.PATIENT_RESOURCES;
    if (has('cover', 'coverage', 'my plan', 'insurance', 'copay', 'deductible')) return D.PT_COVERAGE;
    if (has('primary care', 'pcp')) return D.PRIMARY_CARE;
    if (has('find a', 'doctor', 'physician', 'specialist')) return D.PRIMARY_CARE;
    return D.BACK_PAIN;
  };

  const ask = useCallback((q, scope, forceKey) => {
    const data = forceKey && window.AlmaData[forceKey] ? window.AlmaData[forceKey] : resolveAnswer(q);
    // Stable per-message id so async updates aren't sensitive to array index
    // (which broke when newConv() cleared the list between click and ask).
    const msgId = 'm-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    const newMsg = {
      id: msgId,
      query: q,
      data: { ...data, query: q },
      status: 'thinking',
      sectionsVisible: 0
    };
    setMessages((m) => [...m, newMsg]);
    setDraft('');

    // Honor scope intent: if the resulting chat has content for the selected
    // scope (any section maps to it), land on that scope's filtered view.
    // Otherwise default to Ask (the AI summary + all non-page sections).
    const hasScopeContent = scope && data.sections &&
      data.sections.some((s) => sectionScope(s) === scope.id);
    setActiveTab(hasScopeContent ? scope.id : 'ask');

    const update = (changes) =>
    setMessages((m) => m.map((mm) => mm.id === msgId ? { ...mm, ...changes } : mm));

    // Step through phases
    setTimeout(() => update({ status: 'summary' }), 1100);

    // After summary streams, reveal sections one by one
    const summaryDur = data.summary.length * 220 + 400;
    setTimeout(() => update({ status: 'sections', sectionsVisible: 1 }), 1100 + summaryDur);

    data.sections.forEach((_, idx) => {
      setTimeout(() => update({ sectionsVisible: idx + 1 }), 1100 + summaryDur + idx * 600);
    });

    setTimeout(
      () => update({ status: 'done', sectionsVisible: data.sections.length }),
      1100 + summaryDur + data.sections.length * 600 + 200
    );

    // Scroll to the new message
    setTimeout(() => {
      const el = document.querySelector(`[data-msg-id="${msgId}"]`);
      if (el && scrollRef.current) {
        scrollRef.current.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const newConv = () => {
    setMessages([]);
    setDraft('');
    setActiveTab('ask');
    setAgent(null);
  };

  const pickAgent = (id) => {
    // Only built-out agents take action. Everything else (find-care, schedule,
    // virtual-visit) is a no-op for now — the icon stays in the rail as a
    // placeholder. Account screens still route as before.
    if (id === 'check-symptoms') {
      setMessages([]);
      setDraft('');
      setActiveTab(null);
      setAgent('check-symptoms');
      return;
    }
    if (id === 'schedule') {
      setMessages([]);
      setDraft('');
      setActiveTab(null);
      setAgent('schedule');
      return;
    }
    if (id === 'immediate-care') {
      setMessages([]);
      setDraft('');
      setActiveTab(null);
      setAgent('immediate-care');
      return;
    }
    if (id === 'profile' || id === 'care-profile' || id === 'preferences' || id === 'settings') {
      setMessages([]);
      setDraft('');
      setActiveTab(null);
      setAgent(id);
      return;
    }
    if (id === 'saved' || id === 'projects' || id === 'projects:new' || (typeof id === 'string' && id.startsWith('project:'))) {
      setMessages([]);
      setDraft('');
      setActiveTab(null);
      setAgent(id);
      return;
    }
    // find-care, schedule, virtual-visit — intentionally no-op
  };

  const handleSetLoggedIn = (v) => {
    setLoggedIn(v);
    setTweak('loggedIn', v);
    setUserMenuOpen(false);
    if (!v) {setMessages([]);setAgent(null);}
  };

  const onFollowUp = (c) => ask((c && c.q) || c, null, c && c.to);
  const onSubmit = (q) => ask(q);

  // Inline citation popover — keeps sources discoverable in-context
  const [citePop, setCitePop] = useS(null); // {n, source, x, y}
  useE(() => {
    const handler = (e) => {
      const a = e.target.closest && e.target.closest('a.cite');
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      const msg = a.closest('.message');
      if (!msg) return;
      let sources = [];
      try {sources = JSON.parse(msg.getAttribute('data-sources') || '[]');}
      catch (_) {sources = [];}
      const text = (a.textContent || '').trim();
      const n = Number(text) || Number((a.getAttribute('href') || '').replace('#src-', ''));
      const source = sources.find((s) => s.num === n);
      if (!source) return;
      const r = a.getBoundingClientRect();
      setCitePop({ n, source, x: r.left + r.width / 2, y: r.bottom + 6 });
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);
  useE(() => {
    if (!citePop) return;
    const close = (e) => {
      if (e.target.closest && (e.target.closest('.cite-pop') || e.target.closest('a.cite'))) return;
      setCitePop(null);
    };
    const esc = (e) => {if (e.key === 'Escape') setCitePop(null);};
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [citePop]);

  const hasMessages = messages.length > 0;

  // Active recent item — derived from the current chat's chatLabel so it
  // always matches the open conversation. Falls back to no-active on landing.
  const activeChatLabel = messages[0]?.data?.chatLabel || null;
  const historyWithActive = HISTORY.map((h) => ({
    ...h,
    active: activeChatLabel ? resolveAnswer(h.query).chatLabel === activeChatLabel : false
  }));

  return (
    <div className={'app' + (collapsed ? ' app--collapsed' : '') + (intro ? ' app--intro' : '')}>
      <LeftRail
        history={historyWithActive}
        onNewConv={newConv}
        onPickHistory={(q) => {newConv();setTimeout(() => ask(q), 60);}}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        onPickAgent={pickAgent}
        loggedIn={loggedIn}
        onSetLoggedIn={handleSetLoggedIn}
        onOpenAuth={() => setAuthOpen(true)}
        userMenuOpen={userMenuOpen}
        onToggleMenu={() => setUserMenuOpen((v) => !v)}
        onCloseMenu={() => setUserMenuOpen(false)}
        drawerOpen={drawerOpen} />

      {drawerOpen && <div className="rail__backdrop" onClick={() => setDrawerOpen(false)} />}

      <button
        className="mobile-menu-btn"
        aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setDrawerOpen((v) => !v)}>
        {drawerOpen ? Icon.X() : Icon.Menu()}
      </button>

      <main className="main">
        {hasMessages ?
        <ChatHeader
          chatLabel={messages[0]?.data?.chatLabel || messages[0]?.query || 'Chat'}
          sections={messages[0]?.data?.sections}
          activeScope={activeTab || 'ask'}
          onScopeChange={setActiveTab}
          role={role}
          onRoleChange={setRole} /> :

        agent ? <MainHeader mode={agent} /> :
        <div className="landing-header">
          <RoleSelect role={role} onRoleChange={setRole} />
        </div>
        }
        <div className="main__scroll" ref={attachScroll}>
          {!hasMessages && agent === 'check-symptoms' &&
          <SymptomChecker
            onAsk={(q) => {setAgent(null);ask(q);}} />

          }
          {!hasMessages && agent === 'schedule' &&
          <ScheduleAppointment
            onAsk={(q) => {setAgent(null);ask(q);}} />

          }
          {!hasMessages && agent === 'immediate-care' &&
          <ImmediateCare
            onAsk={(q) => {setAgent(null);ask(q);}} />

          }
          {!hasMessages && agent === 'profile' &&
          <window.AccountProfile
            onDone={() => setAgent(null)}
            onOpenHealthData={() => setAgent('care-profile')} />
          }
          {!hasMessages && agent === 'care-profile' &&
          <window.CareProfile onDone={() => setAgent(null)} />
          }
          {!hasMessages && agent === 'preferences' &&
          <window.SearchPreferences
            onSave={() => setAgent(null)}
            onCancel={() => setAgent(null)} />

          }
          {!hasMessages && agent === 'settings' &&
          <window.SearchPreferences
            onSave={() => setAgent(null)}
            onCancel={() => setAgent(null)} />

          }
          {!hasMessages && agent === 'saved' &&
          <window.SavedPage
            onDone={() => setAgent(null)}
            onPickAgent={setAgent} />

          }
          {!hasMessages && (agent === 'projects' || agent === 'projects:new') &&
          <window.ProjectsListPage
            onDone={() => setAgent(null)}
            onPickAgent={setAgent}
            openNewModal={agent === 'projects:new'} />

          }
          {!hasMessages && agent && agent.startsWith && agent.startsWith('project:') &&
          <window.ProjectDetailPage
            projectId={agent.slice('project:'.length)}
            onBack={() => setAgent('projects')}
            onPickAgent={setAgent} />

          }
          {!hasMessages && !agent &&
          <Landing
            onAsk={ask}
            draft={draft}
            setDraft={setDraft}
            loggedIn={loggedIn}
            onSignIn={() => setAuthOpen(true)}
            onPickAgent={pickAgent}
            intro={intro} />

          }
          {hasMessages &&
          <div className="col">
              {messages.map((m, i) =>
            <Message
              key={m.id || i}
              msg={m}
              idx={i}
              isLast={i === messages.length - 1 && m.status === 'done'}
              isCurrent={i === messages.length - 1}
              activeScope={activeTab || 'ask'}
              onFollowUp={onFollowUp}
              loggedIn={loggedIn} />
            )}
            </div>
          }
        </div>
        {hasMessages &&
        <div className="composer">
            <div className="composer__inner">
              <InputBar
              value={draft}
              onChange={setDraft}
              onSubmit={onSubmit}
              onPickAgent={pickAgent}
              placeholder="Ask a follow-up question…" />
            
            </div>
          </div>
        }
      </main>

      {/* Tweaks panel */}
      {window.TweaksPanel &&
      <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="State">
            <window.TweakToggle
            label="Signed in"
            hint="Toggle the logged-in / logged-out state"
            value={loggedIn}
            onChange={(v) => handleSetLoggedIn(v)} />
          
            <window.TweakToggle
            label="Right rail"
            hint="Show related media beside the answer"
            value={tweaks.rightRail}
            onChange={(v) => setTweak('rightRail', v)} />
          
            <window.TweakRadio
            label="Density"
            value={tweaks.density}
            options={[
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'compact', label: 'Compact' }]
            }
            onChange={(v) => setTweak('density', v)} />
          
          </window.TweakSection>
          <window.TweakSection title="Try a screen">
            <window.TweakButton label="Profile" onClick={() => pickAgent('profile')} />
            <window.TweakButton label="Health data" onClick={() => pickAgent('care-profile')} />
            <window.TweakButton label="Search preferences" onClick={() => pickAgent('preferences')} />
            <window.TweakButton label="Check symptoms" onClick={() => pickAgent('check-symptoms')} />
            <window.TweakButton label="Ask: Lower back pain" onClick={() => {newConv();setTimeout(() => ask('What causes lower back pain?'), 80);}} />
            <window.TweakButton label="Reset to landing" onClick={newConv} secondary />
          </window.TweakSection>
        </window.TweaksPanel>
      }

      {/* Auth modal (logged-out flows) */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onComplete={() => {setAuthOpen(false);handleSetLoggedIn(true);}} />

      {/* Right rail tweak surface */}
      {tweaks.rightRail && hasMessages && <RightRail />}

      {/* Inline citation popover */}
      {citePop &&
      <div
        className="cite-pop"
        role="dialog"
        style={{ left: Math.max(16, Math.min(citePop.x - 160, window.innerWidth - 336)), top: citePop.y }}
        onMouseDown={(e) => e.stopPropagation()}>
          <div className="cite-pop__head">
            <span className="cite-pop__num">{citePop.n}</span>
            <span className="cite-pop__source">{citePop.source.name}</span>
            <button className="cite-pop__close" onClick={() => setCitePop(null)} aria-label="Close">{Icon.X()}</button>
          </div>
          <div className="cite-pop__title">{citePop.source.title}</div>
          <div className="cite-pop__meta">
            <span className="cite-pop__date">{citePop.source.date}</span>
            <a className="cite-pop__open" href={citePop.source.url || '#'}>
              <span>Open source</span>
              <span>{Icon.ArrowRight()}</span>
            </a>
          </div>
        </div>
      }
    </div>);

}

function RightRail() {
  return (
    <aside className="right-rail" style={{
      position: 'fixed',
      right: 0, top: 0, bottom: 0,
      width: 280,
      borderLeft: '1px solid var(--border)',
      background: 'var(--bg)',
      padding: 18,
      overflowY: 'auto',
      zIndex: 5
    }}>
      <div className="rail__label">Nearby locations</div>
      <div style={{
        height: 160,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <svg width="100%" height="100%" viewBox="0 0 280 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <path d="M0 100 Q 80 60 140 90 T 280 70" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" />
          <path d="M40 0 L 60 160" stroke="var(--border-strong)" strokeWidth="1" fill="none" />
          <path d="M180 0 L 200 160" stroke="var(--border-strong)" strokeWidth="1" fill="none" />
        </svg>
        <div style={{ position: 'absolute', top: 40, left: 60, width: 16, height: 16, borderRadius: '50% 50% 50% 0', background: 'var(--warm)', transform: 'rotate(-45deg)' }}></div>
        <div style={{ position: 'absolute', top: 80, left: 130, width: 14, height: 14, borderRadius: '50% 50% 50% 0', background: 'var(--accent)', transform: 'rotate(-45deg)' }}></div>
        <div style={{ position: 'absolute', top: 60, left: 200, width: 14, height: 14, borderRadius: '50% 50% 50% 0', background: 'var(--accent)', transform: 'rotate(-45deg)' }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {['[System] Midtown', '[System] West Side', '[System] Hudson Spine'].map((n, i) =>
        <div key={i} style={{ padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}>
            <div style={{ fontWeight: 500 }}>{n}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{['0.8 mi · Open', '1.2 mi · Open', '2.0 mi · By appt'][i]}</div>
          </div>
        )}
      </div>
    </aside>);

}

window.App = App;
// Root render lives in search-modal.jsx (loads last), which mounts <App /> inside the search modal.