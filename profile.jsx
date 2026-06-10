/* === Care Profile & Search Preferences === */
const Icon = window.Icon;
const { useState: useS } = React;

/* ─── Shared field helpers ─── */

function PRow({ label, value }) {
  return (
    <div className="prow">
      <div className="prow__label">{label}</div>
      <div className={'prow__value' + (!value ? ' prow__value--empty' : '')}>{value || 'Not added'}</div>
    </div>
  );
}

function PGrid({ children }) {
  return <div className="prow-grid">{children}</div>;
}

function FLabel({ children, req, opt }) {
  return (
    <span className="pf-label">
      {children}
      {req && <span className="pf-badge pf-badge--req">Required</span>}
      {opt && <span className="pf-badge pf-badge--opt">Optional</span>}
    </span>
  );
}

function PField({ label, value, onChange, placeholder, req, opt, hint, textarea }) {
  return (
    <label className="pfield">
      <FLabel req={req} opt={opt}>{label}</FLabel>
      {textarea
        ? <textarea className="pinput pinput--ta" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} />
        : <input className="pinput" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      }
      {hint && <span className="pfield__hint">{hint}</span>}
    </label>
  );
}

function PRadio({ label, value, onChange, options, req, opt, wrap }) {
  return (
    <div className="pfield">
      <FLabel req={req} opt={opt}>{label}</FLabel>
      <div className={'pradio-row' + (wrap ? ' pradio-row--wrap' : '')}>
        {options.map(o => (
          <button key={o.value} type="button"
            className={'pradio' + (value === o.value ? ' pradio--on' : '')}
            onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PChips({ label, values, onToggle, options, opt }) {
  return (
    <div className="pfield">
      <FLabel opt={opt}>{label}</FLabel>
      <div className="pchip-row">
        {options.map(o => (
          <button key={o} type="button"
            className={'pchip' + (values.includes(o) ? ' pchip--on' : '')}
            onClick={() => onToggle(o)}>
            {values.includes(o) && <span className="pchip__check">{Icon.Check()}</span>}
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function PToggle({ label, value, onChange, hint }) {
  return (
    <div className="pfield pfield--row">
      <div className="pfield__text">
        <span className="pf-label">{label}</span>
        {hint && <div className="pfield__hint" style={{ marginTop: 3 }}>{hint}</div>}
      </div>
      <button type="button"
        className={'ptoggle' + (value ? ' ptoggle--on' : '')}
        onClick={() => onChange(!value)}>
        <span className="ptoggle__knob" />
      </button>
    </div>
  );
}

function TabToolbar({ editing, onEdit, onSave, onCancel }) {
  return (
    <div className="tab-toolbar">
      {!editing
        ? <button className="tab-edit-btn" onClick={onEdit}>{Icon.Edit()} Edit</button>
        : <>
            <button className="btn" onClick={onCancel}>Cancel</button>
            <button className="btn btn--primary" onClick={onSave}>Save changes</button>
          </>
      }
    </div>
  );
}

/* ─── Completion banner ─── */

function calcCompletion(p) {
  const checks = [
    p.basics.name, p.basics.dob, p.basics.email,
    p.location.homeZip,
    p.insurance.carrier, p.insurance.planName, p.insurance.memberId,
    p.careTeam.pcp,
    p.preferences.visitType,
    p.basics.phone,
    p.location.homeAddress,
    p.careTeam.pharmacy,
    !!(p.healthInfo.conditions || p.healthInfo.medications || p.healthInfo.allergies),
  ];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
}

function CompletionBanner({ pct, profile, onNav }) {
  const hints = [
    !profile.basics.phone           && ['Add your phone number for appointment reminders.',          'basics'],
    !profile.location.homeAddress   && ['Add your home address to improve nearby results.',          'location'],
    !profile.careTeam.pharmacy      && ['Add your pharmacy to streamline prescription coordination.', 'care-team'],
    !profile.healthInfo.allergies   && ['Add allergies and medications to personalize prep instructions.', 'health-info'],
  ].filter(Boolean).slice(0, 2);

  return (
    <div className="completion">
      <div className="completion__head">
        <span className="completion__label">Profile completion</span>
        <span className="completion__pct">{pct}%</span>
      </div>
      <div className="completion__bar"><div className="completion__fill" style={{ width: pct + '%' }} /></div>
      {hints.length > 0 && (
        <ul className="completion__hints">
          {hints.map(([text, tab], i) => (
            <li key={i}>
              <button className="completion__hint" onClick={() => onNav(tab)}>
                <span className="completion__plus">{Icon.Plus()}</span>
                <span>{text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Basics tab ─── */

function BasicsTab({ data, onSave }) {
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS(() => ({ ...data }));
  const s = (k, v) => setD(p => ({ ...p, [k]: v }));
  const save = () => { onSave(d); setEditing(false); };
  const cancel = () => { setD({ ...data }); setEditing(false); };

  return (
    <div className="ptab">
      <TabToolbar editing={editing} onEdit={() => setEditing(true)} onSave={save} onCancel={cancel} />
      {!editing ? (
        <PGrid>
          <PRow label="Full name" value={data.name} />
          <PRow label="Date of birth" value={data.dob} />
          <PRow label="Pronouns" value={data.pronouns} />
          <PRow label="Gender" value={data.gender} />
          <PRow label="Email" value={data.email} />
          <PRow label="Phone" value={data.phone} />
          <PRow label="Preferred contact" value={data.contactMethod} />
        </PGrid>
      ) : (
        <div className="pform">
          <div className="pform__row">
            <PField label="Full name" req value={d.name} onChange={v => s('name', v)} />
            <PField label="Date of birth" req value={d.dob} onChange={v => s('dob', v)} placeholder="YYYY-MM-DD" />
          </div>
          <div className="pform__row">
            <PField label="Pronouns" opt value={d.pronouns} onChange={v => s('pronouns', v)} placeholder="e.g. she/her" />
            <PField label="Gender" opt value={d.gender} onChange={v => s('gender', v)} placeholder="e.g. Female, Male, Non-binary" />
          </div>
          <div className="pform__row">
            <PField label="Email" value={d.email} onChange={v => s('email', v)} placeholder="you@example.com" />
            <PField label="Phone" opt value={d.phone} onChange={v => s('phone', v)} placeholder="(212) 555-0100" />
          </div>
          <PRadio label="Preferred contact" value={d.contactMethod} onChange={v => s('contactMethod', v)}
            options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'Text' }, { value: 'call', label: 'Call' }]} />
        </div>
      )}
    </div>
  );
}

/* ─── Location tab ─── */

function LocationTab({ data, onSave }) {
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS(() => ({ ...data }));
  const s = (k, v) => setD(p => ({ ...p, [k]: v }));
  const save = () => { onSave(d); setEditing(false); };
  const cancel = () => { setD({ ...data }); setEditing(false); };

  return (
    <div className="ptab">
      <div className="ptab__helper">Location helps us rank nearby doctors, urgent care centers, labs, imaging locations, and appointment options.</div>
      <TabToolbar editing={editing} onEdit={() => setEditing(true)} onSave={save} onCancel={cancel} />
      {!editing ? (
        <PGrid>
          <PRow label="Home ZIP code" value={data.homeZip} />
          <PRow label="Home address" value={data.homeAddress} />
          <PRow label="Work / school ZIP" value={data.workZip} />
          <PRow label="Search radius" value={data.searchRadius ? data.searchRadius + ' miles' : null} />
          <PRow label="Default 'near me'" value={data.defaultLocation} />
          <PRow label="Use current location" value={data.useCurrentLocation ? 'Yes' : 'No'} />
          <PRow label="Preferred facilities" value={data.facilities} />
          <PRow label="Transportation" value={data.transportation} />
          <PRow label="Parking / accessibility" value={data.parkingNotes} />
        </PGrid>
      ) : (
        <div className="pform">
          <div className="pform__row">
            <PField label="Home ZIP code" req value={d.homeZip} onChange={v => s('homeZip', v)} placeholder="10001" />
            <PField label="Home address" opt value={d.homeAddress} onChange={v => s('homeAddress', v)} placeholder="123 Main St, City, State" />
          </div>
          <div className="pform__row">
            <PField label="Work or school ZIP" opt value={d.workZip} onChange={v => s('workZip', v)} placeholder="10018" />
            <PField label="Search radius" value={d.searchRadius} onChange={v => s('searchRadius', v)} placeholder="5" hint="Miles from your default location" />
          </div>
          <PRadio label="Default 'near me' uses" value={d.defaultLocation} onChange={v => s('defaultLocation', v)}
            options={[{ value: 'home', label: 'Home' }, { value: 'work', label: 'Work' }, { value: 'current', label: 'Current location' }]} />
          <PToggle label="Use current device location by default"
            value={d.useCurrentLocation} onChange={v => s('useCurrentLocation', v)}
            hint="We'll request permission before using your device location." />
          <div className="pform__row">
            <PField label="Preferred facilities or regions" opt value={d.facilities} onChange={v => s('facilities', v)} placeholder="e.g. [System] Midtown" />
            <PField label="Transportation preference" opt value={d.transportation} onChange={v => s('transportation', v)} placeholder="e.g. Public transit" />
          </div>
          <PField label="Parking / accessibility notes" opt value={d.parkingNotes} onChange={v => s('parkingNotes', v)} placeholder="e.g. Needs wheelchair-accessible entrance" />
        </div>
      )}
    </div>
  );
}

/* ─── Insurance tab ─── */

const INS_STATUS = { verified: 'Verified', review: 'Needs review', unverified: 'Not verified' };
const INS_STATUS_CLS = { verified: 'ins-badge--ok', review: 'ins-badge--warn', unverified: 'ins-badge--neutral' };

function InsuranceTab({ data, onSave }) {
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS(() => ({ ...data }));
  const s = (k, v) => setD(p => ({ ...p, [k]: v }));
  const save = () => { onSave(d); setEditing(false); };
  const cancel = () => { setD({ ...data }); setEditing(false); };

  return (
    <div className="ptab">
      <div className="ins-status-row">
        <span className={'ins-badge ' + (INS_STATUS_CLS[data.coverageStatus] || 'ins-badge--neutral')}>
          {Icon.ShieldCheck()}
          <span>{INS_STATUS[data.coverageStatus] || 'Not verified'}</span>
        </span>
      </div>
      <TabToolbar editing={editing} onEdit={() => setEditing(true)} onSave={save} onCancel={cancel} />
      {!editing ? (
        <PGrid>
          <PRow label="Insurance carrier" value={data.carrier} />
          <PRow label="Plan name" value={data.planName} />
          <PRow label="Plan type" value={data.planType} />
          <PRow label="Member ID" value={data.memberId} />
          <PRow label="Group number" value={data.groupNumber} />
          <PRow label="Subscriber relationship" value={data.subscriberRelationship} />
        </PGrid>
      ) : (
        <div className="pform">
          <div className="pform__row">
            <PField label="Insurance carrier" req value={d.carrier} onChange={v => s('carrier', v)} placeholder="e.g. Aetna, UnitedHealth" />
            <PField label="Plan name" req value={d.planName} onChange={v => s('planName', v)} placeholder="e.g. PPO Family Plus" />
          </div>
          <div className="pform__row">
            <PRadio label="Plan type" value={d.planType} onChange={v => s('planType', v)}
              options={[{ value: 'PPO', label: 'PPO' }, { value: 'HMO', label: 'HMO' }, { value: 'EPO', label: 'EPO' }, { value: 'HDHP', label: 'HDHP' }]} />
            <PField label="Member ID" req value={d.memberId} onChange={v => s('memberId', v)} placeholder="P-00000-000" />
          </div>
          <div className="pform__row">
            <PField label="Group number" opt value={d.groupNumber} onChange={v => s('groupNumber', v)} />
            <PRadio label="Subscriber relationship" value={d.subscriberRelationship} onChange={v => s('subscriberRelationship', v)}
              options={[{ value: 'self', label: 'Self' }, { value: 'spouse', label: 'Spouse' }, { value: 'dependent', label: 'Dependent' }]} />
          </div>
          <PRadio label="Coverage status" value={d.coverageStatus} onChange={v => s('coverageStatus', v)}
            options={Object.entries(INS_STATUS).map(([value, label]) => ({ value, label }))} />
          <div className="pfield">
            <FLabel opt>Insurance card</FLabel>
            <button type="button" className="upload-btn">{Icon.Image()}<span>Upload card image</span></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Care team tab ─── */

function CareTeamTab({ data, onSave }) {
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS(() => ({ ...data }));
  const s = (k, v) => setD(p => ({ ...p, [k]: v }));
  const save = () => { onSave(d); setEditing(false); };
  const cancel = () => { setD({ ...data }); setEditing(false); };

  return (
    <div className="ptab">
      <TabToolbar editing={editing} onEdit={() => setEditing(true)} onSave={save} onCancel={cancel} />
      {!editing ? (
        <PGrid>
          <PRow label="Primary care doctor" value={data.pcp} />
          <PRow label="Preferred specialists" value={data.specialists} />
          <PRow label="Preferred facility" value={data.preferredFacility} />
          <PRow label="Pharmacy" value={data.pharmacy} />
          <PRow label="Caregiver / proxy access" value={data.caregiverAccess} />
        </PGrid>
      ) : (
        <div className="pform">
          <PField label="Primary care doctor" value={d.pcp} onChange={v => s('pcp', v)}
            placeholder="Dr. Name"
            hint="We'll prioritize them when you ask 'who should I see for…'" />
          <PField label="Preferred specialists" opt value={d.specialists} onChange={v => s('specialists', v)}
            placeholder="e.g. Dr. Ramanathan — Orthopedic Spine" textarea />
          <div className="pform__row">
            <PField label="Preferred facility" opt value={d.preferredFacility} onChange={v => s('preferredFacility', v)}
              placeholder="e.g. [System] Midtown" />
            <PField label="Pharmacy" opt value={d.pharmacy} onChange={v => s('pharmacy', v)}
              placeholder="e.g. [System] Midtown Pharmacy" />
          </div>
          <PField label="Caregiver or proxy access" opt value={d.caregiverAccess} onChange={v => s('caregiverAccess', v)}
            placeholder="Name and relationship" hint="Grants this person access to view and manage your care on your behalf." />
        </div>
      )}
    </div>
  );
}

/* ─── Preferences tab ─── */

const APPT_TIMES = ['Early morning', 'Morning', 'Afternoon', 'Evening', 'Weekends'];
const ACCESS_OPTS = ['Wheelchair access', 'ASL interpreter', 'Sensory-friendly room', 'Sign-language video'];

function PreferencesTab({ data, onSave }) {
  const init = () => ({ ...data, appointmentTimes: data.appointmentTimes || [], accessibility: data.accessibility || [] });
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS(init);
  const s = (k, v) => setD(p => ({ ...p, [k]: v }));
  const tog = (k, v) => setD(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  const save = () => { onSave(d); setEditing(false); };
  const cancel = () => { setD(init()); setEditing(false); };

  return (
    <div className="ptab">
      <TabToolbar editing={editing} onEdit={() => setEditing(true)} onSave={save} onCancel={cancel} />
      {!editing ? (
        <PGrid>
          <PRow label="Visit type" value={data.visitType} />
          <PRow label="Preferred times" value={(data.appointmentTimes || []).join(', ') || null} />
          <PRow label="Language for care" value={data.careLanguage} />
          <PRow label="Provider gender preference" value={data.providerGender || 'No preference'} />
          <PRow label="Accessibility needs" value={(data.accessibility || []).join(', ') || null} />
          <PRow label="Communication preference" value={data.communicationPref} />
        </PGrid>
      ) : (
        <div className="pform">
          <PRadio label="Visit type preference" value={d.visitType} onChange={v => s('visitType', v)}
            options={[{ value: 'in-person', label: 'In-person' }, { value: 'telehealth', label: 'Telehealth' }, { value: 'either', label: 'Either' }]} />
          <PChips label="Preferred appointment times" values={d.appointmentTimes} onToggle={v => tog('appointmentTimes', v)}
            options={APPT_TIMES} opt />
          <div className="pform__row">
            <PRadio label="Language for care" value={d.careLanguage} onChange={v => s('careLanguage', v)} wrap
              options={['English', 'Spanish', 'French', 'Mandarin', 'Hindi', 'Arabic'].map(l => ({ value: l, label: l }))} />
            <PRadio label="Provider gender preference" opt value={d.providerGender} onChange={v => s('providerGender', v)}
              options={[{ value: '', label: 'No preference' }, { value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }]} />
          </div>
          <PChips label="Accessibility needs" values={d.accessibility} onToggle={v => tog('accessibility', v)}
            options={ACCESS_OPTS} opt />
          <PRadio label="Communication preference" value={d.communicationPref} onChange={v => s('communicationPref', v)}
            options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'Text' }, { value: 'portal', label: 'Patient portal' }]} />
        </div>
      )}
    </div>
  );
}

/* ─── Health info tab ─── */

function HealthInfoTab({ data, onSave }) {
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS(() => ({ ...data }));
  const s = (k, v) => setD(p => ({ ...p, [k]: v }));
  const save = () => { onSave(d); setEditing(false); };
  const cancel = () => { setD({ ...data }); setEditing(false); };

  return (
    <div className="ptab">
      <div className="ptab__notice">
        {Icon.Info()}
        <span>This information is optional. It may be used to tailor care guidance, preparation instructions, and safety reminders.</span>
      </div>
      <TabToolbar editing={editing} onEdit={() => setEditing(true)} onSave={save} onCancel={cancel} />
      {!editing ? (
        <PGrid>
          <PRow label="Ongoing conditions" value={data.conditions} />
          <PRow label="Current medications" value={data.medications} />
          <PRow label="Allergies" value={data.allergies} />
          <PRow label="Pregnancy status" value={data.pregnancyStatus} />
          <PRow label="Recent surgeries" value={data.recentSurgeries} />
          <PRow label="Medical devices / implants" value={data.devices} />
        </PGrid>
      ) : (
        <div className="pform">
          <PField label="Ongoing conditions" opt value={d.conditions} onChange={v => s('conditions', v)}
            placeholder="e.g. Type 2 diabetes, seasonal allergies" textarea
            hint="So we don't surface care that conflicts with what you're managing" />
          <PField label="Current medications" opt value={d.medications} onChange={v => s('medications', v)}
            placeholder="Name and dosage — including OTC and supplements" textarea />
          <PField label="Allergies" opt value={d.allergies} onChange={v => s('allergies', v)}
            placeholder="e.g. Penicillin (rash), latex" />
          <PRadio label="Pregnancy status" opt value={d.pregnancyStatus} onChange={v => s('pregnancyStatus', v)}
            options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }, { value: 'trying', label: 'Trying' }, { value: 'na', label: 'Prefer not to say' }]} />
          <div className="pform__row">
            <PField label="Recent surgeries" opt value={d.recentSurgeries} onChange={v => s('recentSurgeries', v)}
              placeholder="Procedure and approximate date" />
            <PField label="Medical devices or implants" opt value={d.devices} onChange={v => s('devices', v)}
              placeholder="e.g. Pacemaker, hip replacement" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Privacy tab ─── */

function PrivacyTab({ onDelete }) {
  const [personalizeOn, setPersonalizeOn] = useS(true);
  return (
    <div className="ptab">
      <div className="privacy-block">
        <h3 className="privacy-block__title">How your profile is used</h3>
        <ul className="privacy-list">
          <li><strong>Search personalization</strong> — Your location, insurance, and care preferences rank results and filter providers.</li>
          <li><strong>Coverage checks</strong> — Your insurance details let us estimate costs and confirm in-network status before you book.</li>
          <li><strong>Scheduling</strong> — Your availability and visit preferences surface the right appointment slots.</li>
          <li><strong>Health guidance</strong> — Medications, allergies, and conditions tailor preparation instructions and safety reminders.</li>
        </ul>
      </div>
      <div className="privacy-block">
        <h3 className="privacy-block__title">Who can see this information</h3>
        <p className="privacy-block__body">Your health data is visible only to you and is never sold. If you choose to book an appointment, relevant details may be shared with that facility's care team to streamline your visit.</p>
      </div>
      <div className="privacy-block">
        <PToggle
          label="Use health data to personalize search results"
          value={personalizeOn}
          onChange={setPersonalizeOn}
          hint="Turning this off keeps your profile saved but stops it from influencing search results." />
      </div>
      <div className="privacy-block privacy-block--last">
        <h3 className="privacy-block__title">Your data</h3>
        <div className="privacy-actions">
          <button className="btn">Export health data</button>
          <button className="btn privacy-btn--danger"
            onClick={() => window.confirm('Delete all health data? This cannot be undone.') && onDelete()}>
            Delete health data
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main CareProfile ─── */

const PROFILE_DEFAULTS = {
  basics:      { name: 'Bryan McCarthy', dob: '1989-04-12', pronouns: 'he/him', gender: 'Male', email: 'bryan.mccarthy@icloud.com', phone: '', contactMethod: 'email' },
  location:    { homeZip: '10001', homeAddress: '', workZip: '', defaultLocation: 'home', searchRadius: '5', useCurrentLocation: false, facilities: '', transportation: '', parkingNotes: '' },
  insurance:   { carrier: '[Plan]', planName: '[Plan] PPO — Family', planType: 'PPO', memberId: 'P-44829-001', groupNumber: '', subscriberRelationship: 'self', coverageStatus: 'verified' },
  careTeam:    { pcp: 'Dr. Maya Okonjo', specialists: '', preferredFacility: '[System] Midtown', pharmacy: '', caregiverAccess: '' },
  preferences: { visitType: 'either', appointmentTimes: [], careLanguage: 'English', providerGender: '', accessibility: [], communicationPref: 'email' },
  healthInfo:  { conditions: 'Mild seasonal allergies', medications: 'Loratadine 10mg, daily', allergies: 'Penicillin (rash)', pregnancyStatus: 'no', recentSurgeries: '', devices: '' },
};

const PROFILE_TABS = [
  { id: 'basics',       label: 'Basics' },
  { id: 'location',     label: 'Location' },
  { id: 'insurance',    label: 'Insurance' },
  { id: 'care-team',    label: 'Care team' },
  { id: 'preferences',  label: 'Preferences' },
  { id: 'health-info',  label: 'Health info' },
  { id: 'privacy',      label: 'Privacy' },
];

function CareProfile({ onDone }) {
  const [tab, setTab] = useS('basics');
  const [profile, setProfile] = useS(PROFILE_DEFAULTS);
  const pct = calcCompletion(profile);
  const upd = (section, data) => setProfile(p => ({ ...p, [section]: data }));

  return (
    <div className="care-profile fade-in">
      <div className="care-profile__head">
        <div className="care-profile__badge">
          {Icon.Heart()}
          <span>Health data</span>
        </div>
        <h1 className="care-profile__title">Health data</h1>
        <p className="care-profile__sub">
          Keep your care details up to date so [System] can personalize search results, check coverage, surface nearby options, and help you schedule faster. You control what is saved and can update this at any time.
        </p>
      </div>

      {pct < 90 && <CompletionBanner pct={pct} profile={profile} onNav={setTab} />}

      <div className="care-profile__tabnav">
        {PROFILE_TABS.map(t => (
          <button key={t.id}
            className={'ptab-btn' + (tab === t.id ? ' ptab-btn--active' : '')}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'basics'       && <BasicsTab      data={profile.basics}      onSave={d => upd('basics', d)} />}
      {tab === 'location'     && <LocationTab    data={profile.location}    onSave={d => upd('location', d)} />}
      {tab === 'insurance'    && <InsuranceTab   data={profile.insurance}   onSave={d => upd('insurance', d)} />}
      {tab === 'care-team'    && <CareTeamTab    data={profile.careTeam}    onSave={d => upd('careTeam', d)} />}
      {tab === 'preferences'  && <PreferencesTab data={profile.preferences} onSave={d => upd('preferences', d)} />}
      {tab === 'health-info'  && <HealthInfoTab  data={profile.healthInfo}  onSave={d => upd('healthInfo', d)} />}
      {tab === 'privacy'      && <PrivacyTab onDelete={onDone} />}
    </div>
  );
}

/* ─── Search preferences (lightweight) ─── */

function SearchPreferences({ onSave, onCancel }) {
  const [prefs, setPrefs] = useS({
    sortDefault: 'relevance',
    density: 'comfortable',
    resultTypes: ['care', 'doctors', 'locations', 'pages'],
    prioritizeScheduling: true,
    showEducational: true,
  });
  const s = (k, v) => setPrefs(p => ({ ...p, [k]: v }));
  const tog = (k, v) => setPrefs(p => ({
    ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v]
  }));

  const RESULT_TYPES = [
    { v: 'care',     l: 'Care options' },
    { v: 'doctors',  l: 'Doctors' },
    { v: 'locations',l: 'Locations' },
    { v: 'pages',    l: 'Educational pages' },
  ];

  return (
    <div className="prefs fade-in">
      <div className="prefs__head">
        <div className="prefs__badge">
          <span className="prefs__badge-icon">{Icon.Sliders()}</span>
          <span>Search preferences</span>
        </div>
        <h1 className="prefs__title">Search preferences</h1>
        <p className="prefs__sub">
          Control how results are ranked, displayed, and filtered. For personal health information, insurance, and care team details, visit your{' '}
          <button className="prefs__link" onClick={onCancel}>Health data</button>.
        </p>
      </div>

      <PrefSection title="Results" num="01">
        <div className="prefs__field">
          <span className="prefs__field-label">Default sort</span>
          <div className="prefs__radio-row">
            {[
              { value: 'relevance',    label: 'Relevance' },
              { value: 'distance',     label: 'Distance' },
              { value: 'availability', label: 'Availability' },
              { value: 'rating',       label: 'Rating' },
            ].map(o => (
              <button key={o.value} type="button"
                className={'prefs__radio' + (prefs.sortDefault === o.value ? ' prefs__radio--active' : '')}
                onClick={() => s('sortDefault', o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="prefs__field">
          <span className="prefs__field-label">Display density</span>
          <div className="prefs__radio-row">
            {[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }].map(o => (
              <button key={o.value} type="button"
                className={'prefs__radio' + (prefs.density === o.value ? ' prefs__radio--active' : '')}
                onClick={() => s('density', o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div className="prefs__field">
          <span className="prefs__field-label">Result types to include</span>
          <div className="prefs__chip-row">
            {RESULT_TYPES.map(o => (
              <button key={o.v} type="button"
                className={'prefs__chip' + (prefs.resultTypes.includes(o.v) ? ' prefs__chip--active' : '')}
                onClick={() => tog('resultTypes', o.v)}>
                {prefs.resultTypes.includes(o.v) && <span className="prefs__chip-check">{Icon.Check()}</span>}
                {o.l}
              </button>
            ))}
          </div>
        </div>
      </PrefSection>

      <PrefSection title="Behavior" num="02">
        <div className="prefs__field prefs__field--row">
          <div>
            <span className="prefs__field-label">Prioritize online scheduling</span>
            <div className="prefs__field-hint">Surface providers and locations that offer online booking first.</div>
          </div>
          <button type="button"
            className={'ptoggle' + (prefs.prioritizeScheduling ? ' ptoggle--on' : '')}
            onClick={() => s('prioritizeScheduling', !prefs.prioritizeScheduling)}>
            <span className="ptoggle__knob" />
          </button>
        </div>
        <div className="prefs__field prefs__field--row">
          <div>
            <span className="prefs__field-label">Show educational content alongside results</span>
            <div className="prefs__field-hint">Include patient education pages and clinical guides in results.</div>
          </div>
          <button type="button"
            className={'ptoggle' + (prefs.showEducational ? ' ptoggle--on' : '')}
            onClick={() => s('showEducational', !prefs.showEducational)}>
            <span className="ptoggle__knob" />
          </button>
        </div>
      </PrefSection>

      <div className="prefs__footer">
        <div className="prefs__footer-note">
          Visible only to you. Personal care information lives in your{' '}
          <button className="prefs__link" onClick={onCancel}>Health data</button>.
        </div>
        <div className="prefs__footer-actions">
          <button className="prefs__btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="prefs__btn-primary" onClick={() => onSave(prefs)}>
            <span>{Icon.Check()}</span>
            <span>Save preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PrefSection({ title, num, children }) {
  return (
    <section className="prefs__section">
      <header className="prefs__section-head">
        <span className="prefs__section-num">{num}</span>
        <h2 className="prefs__section-title">{title}</h2>
      </header>
      <div className="prefs__section-body">{children}</div>
    </section>
  );
}

window.CareProfile = CareProfile;
window.SearchPreferences = SearchPreferences;

/* ─── Account Profile (separate from Health data) ─── */
function AccountProfile({ onDone, onOpenHealthData }) {
  const [editing, setEditing] = useS(false);
  const [d, setD] = useS({
    name: 'Bryan McCarthy',
    email: 'bryan.mccarthy@icloud.com',
    phone: '',
    timezone: 'America/New_York',
  });
  const [draft, setDraft] = useS(d);
  const s = (k, v) => setDraft(p => ({ ...p, [k]: v }));
  const save = () => { setD(draft); setEditing(false); };
  const cancel = () => { setDraft(d); setEditing(false); };

  return (
    <div className="care-profile fade-in">
      <div className="care-profile__head">
        <div className="care-profile__badge">
          {Icon.Person()}
          <span>Profile</span>
        </div>
        <h1 className="care-profile__title">Profile</h1>
        <p className="care-profile__sub">
          Account-level details for your [System] account. Health-specific information lives in{' '}
          <button className="prefs__link" onClick={onOpenHealthData}>Health data</button>.
        </p>
      </div>

      <section className="prefs__section">
        <div className="prefs__section-head"><h2 className="prefs__section-title">Account</h2></div>
        <div className="prefs__section-body">
          <div className="account-id">
            <div className="account-id__avatar">BM</div>
            <div className="account-id__text">
              <div className="account-id__name">{d.name}</div>
              <div className="account-id__email">{d.email}</div>
            </div>
            <button className="btn" onClick={() => setEditing(true)} disabled={editing}>Edit</button>
          </div>
          {editing ? (
            <div className="pform" style={{ marginTop: 16 }}>
              <div className="pform__row">
                <PField label="Full name" req value={draft.name} onChange={v => s('name', v)} />
                <PField label="Email" req value={draft.email} onChange={v => s('email', v)} placeholder="you@example.com" />
              </div>
              <div className="pform__row">
                <PField label="Phone" opt value={draft.phone} onChange={v => s('phone', v)} placeholder="(212) 555-0100" />
                <PField label="Time zone" value={draft.timezone} onChange={v => s('timezone', v)} placeholder="America/New_York" />
              </div>
              <div className="pform__actions">
                <button className="btn" onClick={cancel}>Cancel</button>
                <button className="btn btn--primary" onClick={save}>Save changes</button>
              </div>
            </div>
          ) : (
            <PGrid>
              <PRow label="Full name" value={d.name} />
              <PRow label="Email" value={d.email} />
              <PRow label="Phone" value={d.phone} />
              <PRow label="Time zone" value={d.timezone} />
            </PGrid>
          )}
        </div>
      </section>

      <section className="prefs__section">
        <div className="prefs__section-head"><h2 className="prefs__section-title">Sign-in & security</h2></div>
        <div className="prefs__section-body">
          <div className="account-row">
            <div className="account-row__text">
              <div className="account-row__label">Password</div>
              <div className="account-row__hint">Last changed 4 months ago</div>
            </div>
            <button className="btn">Change password</button>
          </div>
          <div className="account-row">
            <div className="account-row__text">
              <div className="account-row__label">Two-factor authentication</div>
              <div className="account-row__hint">Add an extra step when signing in.</div>
            </div>
            <button className="btn">Set up</button>
          </div>
          <div className="account-row">
            <div className="account-row__text">
              <div className="account-row__label">Connected accounts</div>
              <div className="account-row__hint">Google, Apple, single sign-on</div>
            </div>
            <button className="btn">Manage</button>
          </div>
        </div>
      </section>

      <section className="prefs__section">
        <div className="prefs__section-head"><h2 className="prefs__section-title">Account actions</h2></div>
        <div className="prefs__section-body">
          <div className="privacy-actions">
            <button className="btn">Export account data</button>
            <button className="btn privacy-btn--danger">Delete account</button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.AccountProfile = AccountProfile;
