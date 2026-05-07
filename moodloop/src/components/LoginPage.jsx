import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DEPT_KEYS = [
    'accountingDept', 'maintenanceDept', 'humanResources',
    'itDepartment', 'salesDepartment', 'marketingDept',
];

function getStrength(pw) {
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Lora',serif; }

  @keyframes gradientShift {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }
  @keyframes formDrop {
    from { transform:translateY(-80px); opacity:0; }
    to   { transform:translateY(0); opacity:1; }
  }
  @keyframes fieldIn {
    from { opacity:0; transform:translateX(-14px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes orbPulse {
    0%,100% { opacity:.4; transform:scale(1); }
    50%     { opacity:.7; transform:scale(1.06); }
  }
  .ml-bg {
    background:linear-gradient(135deg,#2C2A4A,#3d3580,#614EA9,#2C2A4A);
    background-size:300% 300%;
    animation:gradientShift 8s ease infinite;
  }
  .ml-noise::after {
    content:''; position:fixed; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events:none; z-index:1; opacity:.4;
  }
  .card-glass {
    background:rgba(255,255,255,0.07);
    border:1px solid rgba(195,179,255,0.18);
    backdrop-filter:blur(24px);
    -webkit-backdrop-filter:blur(24px);
  }
  .role-card {
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(195,179,255,0.1);
    transition:all 0.25s ease; cursor:pointer;
  }
  .role-card:hover {
    background:rgba(195,179,255,0.08);
    border-color:rgba(195,179,255,0.3);
    transform:translateY(-2px);
  }
  .reg-card { animation:formDrop 0.8s cubic-bezier(0.34,1.56,0.64,1) both; }
  .f1 { animation:fieldIn 0.4s 0.08s both; }
  .f2 { animation:fieldIn 0.4s 0.16s both; }
  .f3 { animation:fieldIn 0.4s 0.24s both; }
  .f4 { animation:fieldIn 0.4s 0.32s both; }
  .reg-input { transition:border-color 0.25s, background 0.25s; }
  .reg-input:focus {
    border-color:#8b7fd4 !important;
    background:rgba(255,255,255,0.11) !important;
    outline:none;
  }
  .reg-input::placeholder { color:rgba(232,234,246,0.28); }
  .reg-select { cursor:pointer; }
  .reg-select:focus { border-color:#8b7fd4 !important; outline:none; }
  .reg-select option { background:#1a1830; color:#e8eaf6; }
  .reg-btn { transition:transform 0.2s, box-shadow 0.2s, background 0.5s; }
  .reg-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(97,78,169,0.45); }
  .reg-btn:active { transform:translateY(0); }
  .back-btn { transition:color 0.2s, opacity 0.2s; }
  .back-btn:hover { opacity:1 !important; color:#e8eaf6 !important; }
  .lang-btn {
    background:rgba(195,179,255,0.08); border:1px solid rgba(195,179,255,0.2);
    color:#c3b3ff; font-size:12px; padding:4px 10px; border-radius:20px;
    cursor:pointer; transition:all 0.2s; font-family:'Lora',serif;
  }
  .lang-btn:hover { background:rgba(195,179,255,0.15); }
  .orb {
    position:absolute; border-radius:50%; pointer-events:none;
    animation:orbPulse 6s ease-in-out infinite;
  }
  .strength-fill { transition:width 0.4s ease, background 0.4s ease; }
  .fade-in { animation:fadeUp 0.5s ease both; }
  .security-badge {
    color:rgba(195,179,255,0.5); font-size:11px;
    display:flex; align-items:center; gap:4px;
  }
  .bubbles {
    --c1:#2C2A4A; --c2:#C3B4FF;
    padding:0.9em 2.2em; font-size:13px;
    background-color:transparent; border:2px solid var(--c2);
    border-radius:4px; cursor:pointer; overflow:hidden;
    position:relative; transition:300ms cubic-bezier(0.83,0,0.17,1);
    font-family:'Lora',serif;
  }
  .bubbles > .text {
    font-weight:700; color:var(--c2); position:relative; z-index:1;
    transition:color 700ms cubic-bezier(0.83,0,0.17,1);
    letter-spacing:2px; text-transform:uppercase;
  }
  .bubbles::before { top:0; left:0; }
  .bubbles::after  { top:100%; left:100%; }
  .bubbles::before, .bubbles::after {
    content:""; width:150%; aspect-ratio:1/1; scale:0;
    transition:1000ms cubic-bezier(0.76,0,0.24,1);
    background-color:var(--c2); border-radius:50%;
    position:absolute; translate:-50% -50%;
  }
  .bubbles:hover .text { color:var(--c1); }
  .bubbles:hover::before, .bubbles:hover::after { scale:1; }
  .bubbles:active { scale:0.98; }
  .bubbles-hr { --c1:#614EA9; --c2:#E8EAF6; }
  .field-input {
    width:100%; padding:13px 16px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.2);
    border-radius:10px; color:white; font-size:14px;
    outline:none; font-family:'Lora',serif;
    transition:border-color 0.3s, background 0.3s;
  }
  .field-input:focus { border-color:rgba(255,255,255,0.7); background:rgba(255,255,255,0.12); }
  .field-input::placeholder { color:rgba(255,255,255,0.25); }
`;

const labelSt = {
    display: 'block', color: '#c3b3ff',
    fontSize: '10.5px', letterSpacing: '1.5px',
    textTransform: 'uppercase', marginBottom: '7px',
    fontWeight: 600, fontFamily: "'Lora',serif",
};

const inputSt = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(195,179,255,0.25)',
    borderRadius: '12px', color: '#e8eaf6',
    fontSize: '14px', fontFamily: "'Lora',serif",
    outline: 'none',
};

const errSt = {
    color: '#f87171', fontSize: '11px',
    marginTop: '5px', fontFamily: "'Lora',serif",
};

export function LoginPage({ onLogin }) {
    const { t, language, setLanguage, isRTL } = useLanguage();
    const isAr = language === 'ar';

    const [step, setStep] = useState('home');
    const [form, setForm] = useState({ name: '', email: '', password: '', department: '' });
    const [showPw, setShowPw] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const setField = (key, val) => {
        setForm(f => ({ ...f, [key]: val }));
        setErrors(e => ({ ...e, [key]: '' }));
    };

    const validate = (isEmployee) => {
        const e = {};
        if (!form.name.trim()) e.name = isAr ? 'مطلوب' : 'Required';
        if (!form.email.trim() || !form.email.includes('@')) e.email = isAr ? 'بريد غير صحيح' : 'Invalid email';
        if (form.password.length < 6) e.password = isAr ? '٦ أحرف على الأقل' : 'Min 6 characters';
        if (isEmployee && !form.department) e.dept = isAr ? 'اختر القسم' : 'Select a department';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (isEmployee) => {
        if (!validate(isEmployee)) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onLogin({
                    id: Date.now().toString(),
                    name: form.name,
                    email: form.email,
                    role: isEmployee ? 'employee' : 'management',
                    department: isEmployee ? form.department : undefined,
                });
            }, 900);
        }, 1000);
    };

    const goHome = () => {
        setStep('home');
        setForm({ name: '', email: '', password: '', department: '' });
        setErrors({});
        setShowPw(false);
        setLoading(false);
        setSuccess(false);
    };

    const strengthPct = (getStrength(form.password) / 5) * 100;
    const strengthColor = strengthPct <= 20 ? '#ef4444'
        : strengthPct <= 40 ? '#f59e0b'
            : strengthPct <= 60 ? '#8b7fd4'
                : '#4ade80';

    const btnLabel = success ? (isAr ? '✓ تم بنجاح!' : '✓ Account Created!')
        : loading ? (isAr ? '⏳ جاري الإنشاء...' : '⏳ Creating...')
            : t('createAccountBtn');

    const btnBg = success
        ? 'linear-gradient(135deg,#2d7a4f,#4ade80)'
        : 'linear-gradient(135deg,#614ea9,#8b7fd4)';

    function RegisterForm({ isEmployee }) {
        return (
            <div className="card-glass reg-card" style={{ borderRadius: '24px', padding: '44px 40px', width: '100%', maxWidth: '420px', zIndex: 2, boxShadow: '0 8px 48px rgba(44,36,74,0.25)' }}>

                {/* زر رجوع */}
                <button className="back-btn" onClick={goHome}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(195,179,255,0.6)', fontSize: '13px', marginBottom: '28px', fontFamily: "'Lora',serif", padding: 0, display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.8 }}>
                    {isRTL ? '→' : '←'} {isAr ? 'رجوع' : 'Back'}
                </button>

                {/* أيقونة */}
                <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(195,179,255,0.1)', border: '1px solid rgba(195,179,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    {isEmployee ? (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c3b3ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    ) : (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c3b3ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                    )}
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#e8eaf6', textAlign: 'center', marginBottom: '6px', fontFamily: "'Lora',serif" }}>
                    {isEmployee ? t('empRegistration') : t('hrRegistration')}
                </h2>
                <p style={{ fontSize: '12px', color: 'rgba(232,234,246,0.4)', textAlign: 'center', marginBottom: '32px', fontFamily: "'Lora',serif" }}>
                    {t('createAccount')}
                </p>

                {/* Full Name */}
                <div className="f1" style={{ marginBottom: '18px' }}>
                    <label style={labelSt}>{t('fullName')}</label>
                    <input className="reg-input"
                        style={{ ...inputSt, borderColor: errors.name ? '#f87171' : 'rgba(195,179,255,0.25)' }}
                        type="text" placeholder={t('enterName')} value={form.name}
                        onChange={e => setField('name', e.target.value)} />
                    {errors.name && <div style={errSt}>⚠ {errors.name}</div>}
                </div>

                {/* Email */}
                <div className="f2" style={{ marginBottom: '18px' }}>
                    <label style={labelSt}>{t('email')}</label>
                    <input className="reg-input"
                        style={{ ...inputSt, borderColor: errors.email ? '#f87171' : 'rgba(195,179,255,0.25)' }}
                        type="email" placeholder={t('emailPlaceholder')} value={form.email}
                        onChange={e => setField('email', e.target.value)} />
                    {errors.email && <div style={errSt}>⚠ {errors.email}</div>}
                </div>

                {/* Password */}
                <div className="f3" style={{ marginBottom: '18px' }}>
                    <label style={labelSt}>{t('password')}</label>
                    <div style={{ position: 'relative' }}>
                        <input className="reg-input"
                            style={{ ...inputSt, paddingRight: isRTL ? '16px' : '44px', paddingLeft: isRTL ? '44px' : '16px', borderColor: errors.password ? '#f87171' : 'rgba(195,179,255,0.25)' }}
                            type={showPw ? 'text' : 'password'}
                            placeholder={t('createPassword')}
                            value={form.password}
                            onChange={e => setField('password', e.target.value)} />
                        <button onClick={() => setShowPw(s => !s)}
                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: isRTL ? 'auto' : '12px', left: isRTL ? '12px' : 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', opacity: showPw ? 0.9 : 0.4, transition: 'opacity 0.2s', lineHeight: 1, padding: 0 }}>
                            {showPw ? '🙈' : '👁'}
                        </button>
                    </div>
                    {form.password.length > 0 && (
                        <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(195,179,255,0.12)', marginTop: '8px', overflow: 'hidden' }}>
                            <div className="strength-fill" style={{ height: '100%', borderRadius: '2px', width: `${strengthPct}%`, background: strengthColor }} />
                        </div>
                    )}
                    {errors.password && <div style={errSt}>⚠ {errors.password}</div>}
                </div>

                {/* Department — للموظف فقط */}
                {isEmployee && (
                    <div className="f4" style={{ marginBottom: '28px' }}>
                        <label style={labelSt}>{t('department')}</label>
                        <div style={{ position: 'relative' }}>
                            <select className="reg-select"
                                style={{ ...inputSt, paddingRight: isRTL ? '16px' : '40px', paddingLeft: isRTL ? '40px' : '16px', WebkitAppearance: 'none', appearance: 'none', borderColor: errors.dept ? '#f87171' : 'rgba(195,179,255,0.25)', cursor: 'pointer' }}
                                value={form.department}
                                onChange={e => setField('department', e.target.value)}>
                                <option value="" disabled>{isAr ? 'اختر قسمك' : 'Select your department'}</option>
                                {DEPT_KEYS.map(k => (
                                    <option key={k} value={t(k)}>{t(k)}</option>
                                ))}
                            </select>
                            <svg style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: isRTL ? 'auto' : '13px', left: isRTL ? '13px' : 'auto', pointerEvents: 'none', opacity: 0.6 }}
                                width="10" height="6" viewBox="0 0 10 6">
                                <path d="M0 0l5 6 5-6z" fill="#c3b3ff" />
                            </svg>
                        </div>
                        {errors.dept && <div style={errSt}>⚠ {errors.dept}</div>}
                    </div>
                )}

                {!isEmployee && <div style={{ marginBottom: '28px' }} />}

                {/* security note */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', marginBottom: '20px', background: 'rgba(195,179,255,0.06)', border: '1px solid rgba(195,179,255,0.12)', borderRadius: '10px', fontSize: '11px', color: 'rgba(195,179,255,0.65)', lineHeight: 1.5 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c3b3ff" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, opacity: 0.7 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{t('secureEncrypted')}</span>
                </div>

                {/* زر الإرسال */}
                <button className="reg-btn" onClick={() => handleSubmit(isEmployee)} disabled={loading || success}
                    style={{ width: '100%', padding: '13px', background: btnBg, border: 'none', borderRadius: '14px', color: 'white', fontSize: '14px', fontWeight: 700, fontFamily: "'Lora',serif", cursor: loading || success ? 'default' : 'pointer', opacity: loading ? 0.8 : 1, boxShadow: success ? '0 8px 28px rgba(74,222,128,0.35)' : 'none' }}>
                    {btnLabel}
                </button>

                <div style={{ height: '1px', background: 'rgba(195,179,255,0.12)', margin: '20px 0' }} />
                <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(195,179,255,0.5)', fontFamily: "'Lora',serif" }}>
                    {isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
                    <span onClick={goHome} style={{ color: '#c3b3ff', cursor: 'pointer', fontWeight: 600 }}>
                        {isAr ? 'تسجيل الدخول' : 'Sign In'}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Lora',serif" }}>
            <style>{STYLES}</style>

            <div className="ml-bg ml-noise" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

                {/* orbs */}
                <div className="orb" style={{ width: 500, height: 500, top: '-120px', left: '-100px', background: 'radial-gradient(ellipse,rgba(195,179,255,0.18) 0%,transparent 65%)' }} />
                <div className="orb" style={{ width: 350, height: 350, bottom: '-80px', right: '-60px', background: 'radial-gradient(ellipse,rgba(195,179,255,0.12) 0%,transparent 65%)', animationDelay: '1.5s', animationDuration: '8s' }} />

                {/* top bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', position: 'relative', zIndex: 10 }}>
                    <div style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: '18px', color: '#c3b3ff', letterSpacing: '-0.02em' }}>
                        Mood<span style={{ color: '#8b7fd4' }}>L∞p</span>
                    </div>
                    <button className="lang-btn" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
                        {language === 'en' ? 'العربية 🌐' : 'English 🌐'}
                    </button>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', position: 'relative', zIndex: 10 }}>

                    {/* HOME */}
                    {step === 'home' && (
                        <div className="fade-in" style={{ width: '100%', maxWidth: '860px', display: 'flex', gap: '32px', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>

                            <div style={{ flex: 1, padding: '0 20px' }}>
                                <h1 style={{ fontFamily: "'Lora',serif", fontSize: '38px', fontWeight: 700, color: '#e8eaf6', lineHeight: 1.2, marginBottom: '16px' }}>{t('welcome')}</h1>
                                <p style={{ color: 'rgba(232,234,246,0.55)', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px', fontFamily: "'Lora',serif" }}>{t('tagline')}</p>
                                {[
                                    { key: 'anonymous', desc: 'anonymousDesc', emoji: '🔒' },
                                    { key: 'realtime', desc: 'realtimeDesc', emoji: '📊' },
                                    { key: 'teamSpirit', desc: 'teamSpiritDesc', emoji: '💜' },
                                ].map(item => (
                                    <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
                                        <span style={{ fontSize: '16px', marginTop: '1px' }}>{item.emoji}</span>
                                        <div>
                                            <div style={{ color: '#c3b3ff', fontSize: '13px', fontWeight: 600 }}>{t(item.key)}</div>
                                            <div style={{ color: 'rgba(232,234,246,0.4)', fontSize: '12px' }}>{t(item.desc)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="card-glass" style={{ borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '360px', minWidth: '300px' }}>
                                <h2 style={{ fontFamily: "'Lora',serif", fontSize: '24px', fontWeight: 600, color: '#e8eaf6', textAlign: 'center', marginBottom: '4px' }}>
                                    Mood<span style={{ color: '#8b7fd4' }}>L∞p</span>
                                </h2>
                                <p style={{ color: 'rgba(232,234,246,0.4)', fontSize: '13px', textAlign: 'center', marginBottom: '24px' }}>
                                    {t('chooseRole')}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { role: 'employee-register', icon: '👤', label: t('employeePortal'), sub: t('employeePortalDesc') },
                                        { role: 'hr-register', icon: '🏢', label: t('hrPortal'), sub: t('hrPortalDesc') },
                                    ].map(item => (
                                        <div key={item.role} className="role-card"
                                            style={{ borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                            onClick={() => setStep(item.role)}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(139,127,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div style={{ color: '#e8eaf6', fontSize: '13px', fontWeight: 600 }}>{item.label}</div>
                                                    <div style={{ color: 'rgba(232,234,246,0.4)', fontSize: '11px' }}>{item.sub}</div>
                                                </div>
                                            </div>
                                            <span style={{ color: '#8b7fd4', fontSize: '18px' }}>{isRTL ? '←' : '→'}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="security-badge" style={{ justifyContent: 'center', marginTop: '16px' }}>
                                    🔒 {t('encrypted')}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'employee-register' && <RegisterForm isEmployee={true} />}
                    {step === 'hr-register' && <RegisterForm isEmployee={false} />}

                </div>
            </div>
        </div>
    );
}