import { useState } from 'react'

const EMOTIONS = [
    { id: 'happiness', emoji: '😊', label: 'Happiness', labelAr: 'سعادة', color: '#614EA9', bg: '#F3F0FF', darkBg: '#2D2550' },
    { id: 'motivation', emoji: '🚀', label: 'Motivation', labelAr: 'تحفّز', color: '#8B6FD4', bg: '#EDE9FF', darkBg: '#261F45' },
    { id: 'cooperation', emoji: '🤝', label: 'Cooperation', labelAr: 'تعاون', color: '#10B981', bg: '#ECFDF5', darkBg: '#0D2E22' },
    { id: 'calmness', emoji: '😌', label: 'Calmness', labelAr: 'هدوء', color: '#6B7280', bg: '#F9FAFB', darkBg: '#1E2028' },
    { id: 'stress', emoji: '😰', label: 'Stress', labelAr: 'توتر', color: '#EF4444', bg: '#FEF2F2', darkBg: '#2E1515' },
    { id: 'frustration', emoji: '😤', label: 'Frustration', labelAr: 'إحباط', color: '#F59E0B', bg: '#FFFBEB', darkBg: '#2E2210' },
    { id: 'sadness', emoji: '😔', label: 'Sadness', labelAr: 'حزن', color: '#6B7280', bg: '#F3F4F6', darkBg: '#1A1F2A' },
]

const TRANSLATIONS = {
    en: {
        howFeeling: "How are you feeling today?",
        selectEmotion: "Select the emotion that best describes your current mood",
        selectEmotionFirst: "Please select an emotion first",
        shareThoughts: "Share your thoughts (optional)",
        writePlaceholder: "Write anything you'd like to share...",
        anonymousNote: "🔒 Your data is encrypted and secure. Your feedback will be rewritten for complete anonymity before HR review.",
        submitFeedback: "Submit Feedback",
        yourInfo: "Your Information",
        department: "Department",
        deptInfo: "This information helps us categorize feedback by department",
        thankYou: "Thank You!",
        feedbackSubmitted: "Your feedback has been submitted successfully",
        aiResponse: "AI Response",
        processingMessage: "Rewriting for Anonymity...",
        processingNote: "AI is processing your feedback to ensure complete anonymity"
    },
    ar: {
        howFeeling: "كيف تشعر اليوم؟",
        selectEmotion: "اختر المشاعر التي تعكس حالتك الحالية",
        selectEmotionFirst: "يرجى اختيار المشاعر أولاً",
        shareThoughts: "شارك أفكارك (اختياري)",
        writePlaceholder: "اكتب أي شيء تود مشاركته...",
        anonymousNote: "🔒 بيانات مشفرة وآمنة. سيتم إعادة كتابة ملاحظاتك لضمان السرية الكاملة قبل مراجعتها.",
        submitFeedback: "إرسال الملاحظات",
        yourInfo: "معلوماتك",
        department: "القسم",
        deptInfo: "تساعدنا هذه المعلومات في تصنيف الملاحظات حسب القسم",
        thankYou: "شكراً لك!",
        feedbackSubmitted: "تم إرسال ملاحظاتك بنجاح",
        aiResponse: "رد الذكاء الاصطناعي",
        processingMessage: "جاري إعادة الكتابة للسرية...",
        processingNote: "يقوم الذكاء الاصطناعي بمعالجة ملاحظاتك لضمان السرية الكاملة"
    }
}

const AI_RESPONSES = {
    happiness: {
        en: "We're thrilled to hear you're feeling positive! Your enthusiasm contributes to our workplace culture. Thank you for sharing the good vibes!",
        ar: "نحن سعداء جداً برؤية شعورك الإيجابي! حماسك يساهم في ثقافة مكان العمل. شكراً لتشاركك هذه الطاقة!"
    },
    motivation: {
        en: "Your motivation is inspiring! We appreciate your drive and energy. Keep up the great work!",
        ar: "تحفزك ملهم! نحن نقدر حماسك وطاقتك. استمر في العمل الرائع!"
    },
    cooperation: {
        en: "It's wonderful to hear about positive teamwork! Strong collaboration makes our organization thrive.",
        ar: "رائع أن نسمع عن الفريق الإيجابي! التعاون القوي يساعد منظمتنا على الازدهار."
    },
    calmness: {
        en: "Thank you for sharing. We value your balanced perspective and appreciate your feedback.",
        ar: "شكراً لمشاركتك. نحن نقدر وجهة نظرك المتوازنة."
    },
    stress: {
        en: "We're sorry to hear you're experiencing stress. Your well-being matters to us. Our management team will review your feedback to identify ways to help reduce workplace pressure.",
        ar: "نأسف لسماع أنك تعاني من التوتر. رفاهيتك مهمة لنا. سيراجع فريق الإدارة ملاحظاتك للعثور على طرق للمساعدة."
    },
    frustration: {
        en: "We're sorry to hear you're experiencing frustration. Your feelings are valid, and we take this seriously. Our management team will review your feedback to address the underlying issues.",
        ar: "نأسف لسماع إحباطك. مشاعرك مهمة. سيراجع فريق الإدارة ملاحظاتك لمعالجة الأسباب الجذرية."
    },
    sadness: {
        en: "We're concerned about your well-being. Please know that support is available. Our HR team will review this feedback to understand how we can better support you.",
        ar: "نحن قلقون على رفاهيتك. تذكر أن الدعم متاح. سيراجع فريق الموارد البشرية ملاحظاتك."
    }
}

export default function MoodForm({ user, onLogout }) {
    const [lang, setLang] = useState('en')
    const [selectedEmotion, setSelectedEmotion] = useState(null)
    const [message, setMessage] = useState('')
    const [portalState, setPortalState] = useState('form') // 'form' | 'processing' | 'success'
    const [aiResponse, setAiResponse] = useState('')
    const [darkMode, setDarkMode] = useState(false)

    const isAr = lang === 'ar'
    const t = TRANSLATIONS[lang]

    const handleSubmit = async () => {
        if (!selectedEmotion) return

        setPortalState('processing')

        // محاكاة معالجة AI
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // إنشاء رد AI بناءً على المشاعر
        const response = AI_RESPONSES[selectedEmotion]?.[lang] || t.thankYou
        setAiResponse(response)
        setPortalState('success')
    }

    const handleReset = () => {
        setSelectedEmotion(null)
        setMessage('')
        setPortalState('form')
        setAiResponse('')
    }
        setNote('')
    }

    // مكون زر الخروج المشترك
    const LogoutButton = () => (
        <button onClick={onLogout} style={{ position: 'fixed', top: 20, left: 20, zIndex: 100, padding: '7px 16px', borderRadius: 20, border: `1px solid ${theme.border}`, background: theme.card, color: theme.muted, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span>{isAr ? 'خروج' : 'Logout'}</span>
        </button>
    )

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: 24, transition: 'all 0.3s' }}>
                <LogoutButton /> {/* إضافة زر الخروج في شاشة الشكر */}

                <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 24, padding: '48px 40px', maxWidth: 440, width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: darkMode ? em?.darkBg : em?.bg, border: `2px solid ${em?.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>
                        {em?.emoji}
                    </div>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 10 }}>
                        {isAr ? 'شكراً على مشاركتك!' : 'Thank you for sharing!'}
                    </h2>
                    <p style={{ fontSize: 13, color: theme.muted, lineHeight: 1.7, marginBottom: 28 }}>
                        {isAr ? 'تم إرسال تأملك بشكل مجهول.' : 'Your reflection was submitted anonymously.'}
                    </p>
                    <div style={{ background: darkMode ? '#12101E' : '#F3F0FF', border: `1px solid ${theme.border}`, borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: isAr ? 'right' : 'left', marginBottom: 28 }}>
                        <div style={{ fontSize: 18 }}>💡</div>
                        <div>
                            <div style={{ fontSize: 10, color: '#8B6FD4', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>AI Wellness Tip</div>
                            <div style={{ fontSize: 13, color: theme.text, lineHeight: 1.7 }}>{isAr ? TIPS[selected]?.ar : TIPS[selected]?.en}</div>
                        </div>
                    </div>
                    <button onClick={handleReset} style={{ width: '100%', padding: '13px', background: '#614EA9', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                        {isAr ? '+ تأمل جديد' : '+ New Reflection'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, fontFamily: "'Inter', sans-serif", padding: '80px 24px', transition: 'all 0.3s' }}>
            <LogoutButton />

            <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100, display: 'flex', gap: 8 }}>
                <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '7px 12px', borderRadius: 20, border: `1px solid ${theme.border}`, background: theme.card, color: theme.muted, cursor: 'pointer', fontSize: 13 }}>
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
                <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{ padding: '7px 16px', borderRadius: 20, border: `1px solid ${theme.border}`, background: theme.card, color: theme.muted, cursor: 'pointer', fontSize: 13 }}>
                    {isAr ? 'English' : 'العربية'}
                </button>
            </div>

            {/* الحاوية البيضاء الكبيرة (Inner Card) */}
            <div style={{
                maxWidth: 800,
                margin: '0 auto',
                background: theme.innerCard,
                borderRadius: 24,
                padding: '40px',
                boxShadow: darkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.border}`
            }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700, color: theme.text, marginBottom: 4 }}>
                        Mood<span style={{ color: '#614EA9' }}>Loop</span>
                    </div>
                    <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 500, color: theme.text, marginBottom: 6 }}>
                        {isAr ? `مرحباً ${user?.name || 'ريم'} 👋` : `Hey ${user?.name || 'reeman'} 👋`}
                    </h1>
                    <p style={{ fontSize: 14, color: theme.muted }}>{isAr ? 'كيف تشعر اليوم؟' : 'How are you feeling today?'}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 15, marginBottom: 30 }}>
                    {EMOTIONS.map(e => (
                        <button key={e.id} onClick={() => setSelected(e.id)} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 10px', borderRadius: 16,
                            border: selected === e.id ? `2px solid ${e.color}` : `1px solid ${theme.border}`,
                            background: selected === e.id ? (darkMode ? e.darkBg : e.bg) : theme.itemBg,
                            cursor: 'pointer', transform: selected === e.id ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.3s ease',
                            boxShadow: selected === e.id ? `0 8px 24px ${e.color}30` : 'none',
                        }}>
                            <span style={{ fontSize: 30, marginBottom: 8 }}>{e.emoji}</span>
                            <span style={{ fontSize: 11, fontWeight: 500, color: selected === e.id ? (darkMode ? '#FFF' : e.color) : theme.muted, textAlign: 'center', lineHeight: 1.3 }}>
                                {isAr ? e.labelAr : e.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div style={{ marginBottom: 25 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {isAr ? 'شاركنا أفكارك' : 'Share your thoughts'}
                    </label>
                    <textarea
                        value={note}
                        onChange={e => setNote(e.target.value.slice(0, 500))}
                        placeholder={isAr ? 'اكتب رسالتك هنا (بالعربية أو الإنجليزية)...' : 'Write your message here (Arabic or English)...'}
                        rows={4}
                        style={{ width: '100%', padding: '15px', background: theme.itemBg, border: `1px solid ${theme.border}`, borderRadius: 12, resize: 'none', fontFamily: "'Inter', sans-serif", fontSize: 14, color: theme.text, outline: 'none', transition: 'border-color 0.2s' }}
                    />
                </div>

                {/* صندوق الخصوصية المنسق */}
                <div style={{
                    background: darkMode ? 'rgba(97, 78, 169, 0.1)' : '#F3F0FF',
                    padding: '15px 20px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 25,
                    border: `1px solid ${darkMode ? '#3D365F' : '#E0D9F7'}`
                }}>
                    <span style={{ fontSize: 18 }}>🔒</span>
                    <p style={{ fontSize: 12, color: darkMode ? '#A599D9' : '#614EA9', margin: 0, lineHeight: 1.5 }}>
                        {isAr
                            ? "مشاركتك مجهولة تماماً. سيظهر قسمك فقط للموارد البشرية لمعرفة السياق، لكن هويتك ستبقى سرية."
                            : "Your submission is completely anonymous. Your department will be visible to HR for context, but your identity will remain confidential."}
                    </p>
                </div>

                <button onClick={handleSubmit} disabled={!selected} style={{ width: '100%', padding: '16px', background: selected ? '#614EA9' : theme.border, color: selected ? 'white' : theme.muted, border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: selected ? 'pointer' : 'not-allowed', transition: 'all 0.3s' }}>
                    {isAr ? 'إرسال التأمل ↑' : 'Submit Feedback'}
                </button>
            </div>
        </div>
    )
}