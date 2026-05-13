import { useState } from 'react'

const emotions = [
    { key: 'satisfaction', emoji: '😊', label: 'Happiness / Satisfaction', labelAr: 'سعادة / رضا', color: '#4ade80' },
    { key: 'motivation', emoji: '🤩', label: 'Motivation / Excitement', labelAr: 'تحفيز / حماس', color: '#f59e0b' },
    { key: 'cooperation', emoji: '🥰', label: 'Cooperation / Team Spirit', labelAr: 'تعاون / روح الفريق', color: '#fb923c' },
    { key: 'calmness', emoji: '😌', label: 'Calmness / Neutral', labelAr: 'هدوء / محايد', color: '#94a3b8' },
    { key: 'stress', emoji: '😤', label: 'Stress / Anxiety', labelAr: 'توتر / قلق', color: '#f43f5e' },
    { key: 'frustration', emoji: '😡', label: 'Frustration / Anger', labelAr: 'إحباط / غضب', color: '#ef4444' },
    { key: 'sadness', emoji: '😔', label: 'Sadness / Burnout', labelAr: 'حزن / إرهاق', color: '#6b7280' },
]

const aiResponses = {
    satisfaction: { en: "Great mindset! Consider tackling your most challenging task today while your energy is high.", ar: "رائع! استغلي طاقتك الإيجابية لإنجاز أصعب مهامك اليوم." },
    motivation: { en: "Channel this energy! Break down your goal into 3 actionable steps you can complete today.", ar: "وجّهي هذه الطاقة! قسّمي هدفك إلى ٣ خطوات قابلة للتنفيذ اليوم." },
    cooperation: { en: "Team spirit is everything. Reach out to a colleague for a brief chat — small connections matter.", ar: "روح الفريق هي الأساس. تواصلي مع زميل — الروابط الصغيرة تصنع فرقاً." },
    calmness: { en: "A calm mind is powerful. This is a great time for deep work and thoughtful decisions.", ar: "العقل الهادئ قوة. هذا وقت مثالي للعمل العميق واتخاذ قرارات مدروسة." },
    stress: { en: "Try the 4-7-8 breathing: inhale 4 sec, hold 7, exhale 8. Break big tasks into smaller steps.", ar: "جربي تقنية التنفس ٤-٧-٨: شهيق ٤ ثوان، احتجاز ٧، زفير ٨." },
    frustration: { en: "Step away for 5 minutes. Return with a fresh perspective to address the issue constructively.", ar: "ابتعدي ٥ دقائق ثم عودي بنظرة جديدة للتعامل مع الأمر بشكل بنّاء." },
    sadness: { en: "It's okay to not be okay. Consider talking to someone you trust or scheduling a lighter workday.", ar: "من الطبيعي أن تشعري بالحزن. تحدثي مع شخص تثقين به أو خففي عبء يومك." },
}

const getStyles = (isDark) => `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

  @keyframes gradientShift {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }
  @keyframes dropIn {
    from { opacity:0; transform:translateY(-40px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes orbPulse {
    0%,100% { opacity:.4; transform:scale(1); }
    50%     { opacity:.7; transform:scale(1.06); }
  }

  .dash-bg {
    background: ${isDark
        ? 'linear-gradient(135deg,#2C2A4A,#3d3580,#614EA9,#2C2A4A)'
        : 'linear-gradient(135deg,#EEE8FF,#DDD4FA,#C3B4FF,#EEE8FF)'};
    background-size: 300% 300%;
    animation: gradientShift 8s ease infinite;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  .dash-orb {
    position:absolute; border-radius:50%; pointer-events:none;
    animation:orbPulse 6s ease-in-out infinite;
  }
  .dash-nav {
    background: ${isDark ? 'rgba(15,14,26,0.5)' : 'rgba(255,255,255,0.6)'};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid ${isDark ? 'rgba(195,179,255,0.1)' : 'rgba(97,78,169,0.1)'};
    position: sticky; top:0; z-index:50;
  }
  .dash-card {
    background: ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.75)'};
    border: 1px solid ${isDark ? 'rgba(195,179,255,0.18)' : 'rgba(97,78,169,0.15)'};
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 20px;
    animation: dropIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .emotion-chip {
    border-radius: 14px;
    padding: 14px 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1.5px solid ${isDark ? 'rgba(195,179,255,0.12)' : 'rgba(97,78,169,0.12)'};
    background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)'};
    display: flex; flex-direction: column;
    align-items: center; gap: 6px;
  }
  .emotion-chip:hover {
    transform: translateY(-3px);
    background: ${isDark ? 'rgba(195,179,255,0.08)' : 'rgba(97,78,169,0.08)'};
  }
  .dash-textarea {
    width: 100%;
    background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)'};
    border: 1px solid ${isDark ? 'rgba(195,179,255,0.2)' : 'rgba(97,78,169,0.2)'};
    border-radius: 14px;
    color: ${isDark ? '#e8eaf6' : '#2C2A4A'};
    font-family: 'Lora', serif;
    font-size: 14px;
    padding: 14px 16px;
    resize: none; outline: none;
    transition: border-color 0.2s;
    line-height: 1.7;
  }
  .dash-textarea:focus { border-color: #8b7fd4; }
  .dash-textarea::placeholder { color: ${isDark ? 'rgba(232,234,246,0.25)' : 'rgba(44,42,74,0.3)'}; }
  .submit-btn {
    background: linear-gradient(135deg,#614ea9,#8b7fd4);
    border: none; border-radius: 14px;
    color: white; font-size: 14px; font-weight: 700;
    font-family: 'Lora', serif;
    padding: 13px 32px; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .submit-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(97,78,169,0.45); }
  .submit-btn:disabled { opacity:0.4; cursor:default; transform:none; box-shadow:none; }
  .privacy-note {
    background: ${isDark ? 'rgba(97,78,169,0.12)' : 'rgba(97,78,169,0.07)'};
    border: 1px solid ${isDark ? 'rgba(97,78,169,0.25)' : 'rgba(97,78,169,0.18)'};
    border-radius: 10px; padding: 10px 14px; font-size: 11px;
    color: ${isDark ? 'rgba(195,179,255,0.7)' : 'rgba(97,78,169,0.8)'};
    display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;
  }
  .info-box {
    background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)'};
    border: 1px solid ${isDark ? 'rgba(195,179,255,0.12)' : 'rgba(97,78,169,0.12)'};
    border-radius: 14px; padding: 16px 20px;
  }
  .success-card {
    background: ${isDark ? 'rgba(74,222,128,0.06)' : 'rgba(74,222,128,0.08)'};
    border: 1px solid rgba(74,222,128,0.2);
    border-radius: 20px; padding: 32px; text-align: center;
    animation: dropIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .ai-box {
    background: ${isDark ? 'rgba(139,127,212,0.1)' : 'rgba(139,127,212,0.08)'};
    border: 1px solid rgba(139,127,212,0.25);
    border-radius: 14px; padding: 18px 20px; margin-top: 16px; text-align: left;
  }
  .lang-btn {
    background:${isDark ? 'rgba(195,179,255,0.08)' : 'rgba(97,78,169,0.08)'};
    border:1px solid ${isDark ? 'rgba(195,179,255,0.2)' : 'rgba(97,78,169,0.2)'};
    color:${isDark ? '#c3b3ff' : '#614EA9'}; font-size:12px; padding:4px 10px; border-radius:20px;
    cursor:pointer; transition:all 0.2s; font-family:'Lora',serif;
  }
  .lang-btn:hover { background:${isDark ? 'rgba(195,179,255,0.15)' : 'rgba(97,78,169,0.15)'}; }
  .logout-btn {
    background: none;
    border: 1px solid ${isDark ? 'rgba(195,179,255,0.2)' : 'rgba(97,78,169,0.2)'};
    color: ${isDark ? 'rgba(195,179,255,0.6)' : 'rgba(97,78,169,0.6)'}; font-size: 12px;
    padding: 4px 12px; border-radius: 20px; cursor: pointer; transition: all 0.2s;
    font-family: 'Lora', serif;
  }
  .logout-btn:hover {
    border-color:${isDark ? 'rgba(195,179,255,0.5)' : 'rgba(97,78,169,0.5)'};
    color:${isDark ? '#c3b3ff' : '#614EA9'};
  }
  .reset-btn {
    background: ${isDark ? 'rgba(195,179,255,0.08)' : 'rgba(97,78,169,0.08)'};
    border: 1px solid ${isDark ? 'rgba(195,179,255,0.2)' : 'rgba(97,78,169,0.2)'};
    color: ${isDark ? '#c3b3ff' : '#614EA9'}; font-size: 13px;
    padding: 10px 28px; border-radius: 20px; cursor: pointer; transition: all 0.2s;
    font-family: 'Lora', serif; margin-top: 20px;
  }
  .reset-btn:hover { background: ${isDark ? 'rgba(195,179,255,0.15)' : 'rgba(97,78,169,0.15)'}; }
`

export default function EmployeeDashboard({ user, onLogout, theme }) {
    const isDark = theme !== 'light'
    const [lang, setLang] = useState(user?.lang || 'en')
    const [selectedEmotion, setEmotion] = useState(null)
    const [reflection, setReflection] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [charCount, setCharCount] = useState(0)

    const ar = lang === 'ar'

    const textColor = isDark ? '#e8eaf6' : '#2C2A4A'
    const subColor = isDark ? 'rgba(232,234,246,0.45)' : 'rgba(44,42,74,0.55)'
    const labelColor = isDark ? '#c3b3ff' : '#614EA9'
    const logoAccent = isDark ? '#8b7fd4' : '#614EA9'
    const orbColor1 = isDark ? 'rgba(195,179,255,0.15)' : 'rgba(97,78,169,0.12)'
    const orbColor2 = isDark ? 'rgba(195,179,255,0.1)' : 'rgba(97,78,169,0.08)'
    const aiLabelColor = isDark ? '#a093d4' : '#614EA9'
    const successText = isDark ? 'rgba(74,222,128,0.65)' : 'rgba(44,120,80,0.8)'
    const infoSubColor = isDark ? 'rgba(232,234,246,0.25)' : 'rgba(44,42,74,0.35)'

    const handleReset = () => {
        setSubmitted(false)
        setEmotion(null)
        setReflection('')
        setCharCount(0)
    }

    const aiMsg = selectedEmotion ? aiResponses[selectedEmotion][ar ? 'ar' : 'en'] : ''

    return (
        <div className="dash-bg" dir={ar ? 'rtl' : 'ltr'}>
            <style>{getStyles(isDark)}</style>

            <div className="dash-orb" style={{ width: 500, height: 500, top: '-150px', left: '-100px', background: `radial-gradient(ellipse,${orbColor1} 0%,transparent 65%)` }} />
            <div className="dash-orb" style={{ width: 350, height: 350, bottom: '-80px', right: '-60px', background: `radial-gradient(ellipse,${orbColor2} 0%,transparent 65%)`, animationDelay: '1.5s' }} />

            {/* navbar */}
            <div className="dash-nav">
                <div style={{ maxWidth: 720, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: '17px', color: labelColor }}>
                        Mood<span style={{ color: logoAccent }}>L∞p</span>
                        <span style={{ color: subColor, fontSize: '12px', fontWeight: 400, marginLeft: 10, fontFamily: "'Lora',serif" }}>
                            {ar ? `مرحباً، ${user?.name}` : `Welcome, ${user?.name}`}
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button className="lang-btn" onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}>
                            {ar ? 'English 🌐' : 'العربية 🌐'}
                        </button>
                        <button className="logout-btn" onClick={onLogout}>
                            ⏻ {ar ? 'خروج' : 'Logout'}
                        </button>
                    </div>
                </div>
            </div>

            {/* content */}
            <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px', position: 'relative', zIndex: 10 }}>

                {!submitted ? (
                    <div className="dash-card" style={{ padding: '36px 32px' }}>

                        <h1 style={{ fontFamily: "'Lora',serif", fontSize: '22px', fontWeight: 700, color: textColor, marginBottom: '6px' }}>
                            {ar ? 'كيف تشعر اليوم؟' : 'How are you feeling today?'}
                        </h1>
                        <p style={{ color: subColor, fontSize: '13px', marginBottom: '28px', fontFamily: "'Lora',serif" }}>
                            {ar ? 'اختر مشاعراً يصف حالتك الراهنة' : 'Select an emotion that best describes your current state'}
                        </p>

                        {!selectedEmotion && (
                            <p style={{ color: isDark ? 'rgba(232,234,246,0.35)' : 'rgba(44,42,74,0.4)', fontSize: '11px', marginBottom: '12px', fontFamily: "'Lora',serif" }}>
                                {ar ? 'الرجاء اختيار مشاعر أولاً' : 'Please select an emotion first'}
                            </p>
                        )}

                        {/* emotion chips */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '28px' }}>
                            {emotions.map(em => (
                                <div key={em.key} className="emotion-chip"
                                    style={{
                                        borderColor: selectedEmotion === em.key ? em.color : (isDark ? 'rgba(195,179,255,0.12)' : 'rgba(97,78,169,0.12)'),
                                        background: selectedEmotion === em.key ? `${em.color}18` : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)'),
                                        boxShadow: selectedEmotion === em.key ? `0 0 16px ${em.color}30` : 'none',
                                    }}
                                    onClick={() => setEmotion(em.key)}
                                >
                                    <span style={{ fontSize: '26px' }}>{em.emoji}</span>
                                    <span style={{ fontSize: '10px', color: selectedEmotion === em.key ? em.color : subColor, fontWeight: 600, textAlign: 'center', lineHeight: 1.3, fontFamily: "'Lora',serif" }}>
                                        {ar ? em.labelAr : em.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* textarea */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', color: labelColor, fontSize: '10.5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600, fontFamily: "'Lora',serif" }}>
                                {ar ? 'شارك أفكارك' : 'Share your thoughts'}
                            </label>
                            <textarea className="dash-textarea" rows={5}
                                placeholder={ar ? 'اكتب رسالتك هنا (عربي أو إنجليزي)...' : 'Write your message here (Arabic or English)...'}
                                value={reflection}
                                onChange={e => { setReflection(e.target.value); setCharCount(e.target.value.length) }}
                                maxLength={1000} />
                            <div style={{ textAlign: 'right', fontSize: '11px', color: infoSubColor, marginTop: '4px', fontFamily: "'Lora',serif" }}>
                                {charCount}/1000
                            </div>
                        </div>

                        {/* privacy */}
                        <div className="privacy-note" style={{ marginBottom: '20px' }}>
                            <span>🔒</span>
                            <span>
                                {ar
                                    ? 'مشاركتك مجهولة تماماً. سيكون قسمك مرئياً للموارد البشرية للسياق، لكن هويتك ستبقى سرية.'
                                    : 'Your submission is completely anonymous. Your department will be visible to HR for context, but your identity will remain confidential.'}
                            </span>
                        </div>

                        {/* submit row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                            <div className="info-box" style={{ flex: 1, minWidth: 200 }}>
                                <div style={{ color: infoSubColor, fontSize: '10px', marginBottom: '4px', fontFamily: "'Lora',serif" }}>
                                    {ar ? 'معلوماتك' : 'Your Information'}
                                </div>
                                <div style={{ color: aiLabelColor, fontSize: '13px', fontWeight: 600, fontFamily: "'Lora',serif" }}>
                                    {ar ? 'القسم:' : 'Department:'} {user?.department || '—'}
                                </div>
                                <div style={{ color: infoSubColor, fontSize: '10px', marginTop: '3px', fontFamily: "'Lora',serif" }}>
                                    {ar ? 'هذه المعلومات تساعد الموارد البشرية مع الحفاظ على سريتك.' : 'This information helps HR understand trends while maintaining your anonymity.'}
                                </div>
                            </div>
                            <button className="submit-btn" onClick={() => selectedEmotion && setSubmitted(true)} disabled={!selectedEmotion}>
                                ✈ {ar ? 'إرسال التعليق' : 'Submit Feedback'}
                            </button>
                        </div>
                    </div>

                ) : (
                    <div className="success-card">
                        <div style={{ fontSize: '44px', marginBottom: '12px' }}>✅</div>
                        <h2 style={{ fontFamily: "'Lora',serif", fontSize: '22px', fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>
                            {ar ? 'شكراً لمشاركتك!' : 'Thank you for sharing!'}
                        </h2>
                        <p style={{ color: successText, fontSize: '13px', fontFamily: "'Lora',serif" }}>
                            {ar ? 'تم إرسال تعليقك بشكل مجهول' : 'Your feedback has been submitted anonymously'}
                        </p>

                        <div className="ai-box">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <span style={{ fontSize: 16 }}>🤖</span>
                                <span style={{ color: aiLabelColor, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'Lora',serif" }}>
                                    {ar ? 'استجابة الذكاء الاصطناعي' : 'AI Response'}
                                </span>
                            </div>
                            <p style={{ color: textColor, fontSize: '14px', lineHeight: 1.7, fontFamily: "'Lora',serif" }}>
                                {aiMsg}
                            </p>
                        </div>

                        <div className="info-box" style={{ marginTop: 16, textAlign: 'left' }}>
                            <div style={{ color: infoSubColor, fontSize: '10px', marginBottom: '4px', fontFamily: "'Lora',serif" }}>
                                {ar ? 'معلوماتك' : 'Your Information'}
                            </div>
                            <div style={{ color: aiLabelColor, fontSize: '13px', fontWeight: 600, fontFamily: "'Lora',serif" }}>
                                {ar ? 'القسم:' : 'Department:'} {user?.department || '—'}
                            </div>
                            <div style={{ color: infoSubColor, fontSize: '10px', marginTop: '3px', fontFamily: "'Lora',serif" }}>
                                {ar ? 'هذه المعلومات تساعد الموارد البشرية مع الحفاظ على سريتك.' : 'This information helps HR understand trends while maintaining your anonymity.'}
                            </div>
                        </div>

                        <button className="reset-btn" onClick={handleReset}>
                            ↩ {ar ? 'إرسال تعليق آخر' : 'Submit Another'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}