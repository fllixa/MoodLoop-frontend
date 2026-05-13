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
        processingNote: "AI is processing your feedback to ensure complete anonymity",
        logout: "Logout",
        welcome: "Welcome",
        processing: "Processing...",
        newReflection: "+ New Reflection",
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
        processingNote: "يقوم الذكاء الاصطناعي بمعالجة ملاحظاتك لضمان السرية الكاملة",
        logout: "خروج",
        welcome: "أهلاً",
        processing: "جاري المعالجة...",
        newReflection: "+ تأمل جديد",
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

export default function EmployeePortal({ user, onLogout }) {
    const [lang, setLang] = useState('en')
    const [selectedEmotion, setSelectedEmotion] = useState(null)
    const [message, setMessage] = useState('')
    const [portalState, setPortalState] = useState('form') // 'form' | 'processing' | 'success'
    const [aiResponse, setAiResponse] = useState('')
    const [darkMode, setDarkMode] = useState(false)

    const isAr = lang === 'ar'
    const t = TRANSLATIONS[lang]
    const selectedEmotionObj = EMOTIONS.find(e => e.id === selectedEmotion)

    const theme = {
        bg: darkMode ? '#0F0D1A' : '#F0F1F8',
        card: darkMode ? '#1A1726' : '#FFFFFF',
        innerCard: darkMode ? '#242132' : '#FFFFFF',
        itemBg: darkMode ? '#2D2A3D' : '#FFFFFF',
        text: darkMode ? '#EDE9FF' : '#2C2A4A',
        muted: darkMode ? '#8B85A8' : '#6B7280',
        border: darkMode ? '#2C2850' : '#E2E4ED',
    }

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

    // مكون زر الخروج المشترك
    const LogoutButton = () => (
        <button onClick={onLogout} style={{
            position: 'fixed', top: 20, left: 20, zIndex: 100, padding: '7px 16px',
            borderRadius: 20, border: `1px solid ${theme.border}`, background: theme.card,
            color: theme.muted, cursor: 'pointer', fontSize: 13, display: 'flex',
            alignItems: 'center', gap: 5, fontFamily: "'Inter', sans-serif"
        }}>
            <span>↪️</span>
            <span>{t.logout}</span>
        </button>
    )

    // ===== شاشة المعالجة =====
    if (portalState === 'processing') {
        return (
            <div style={{
                minHeight: '100vh', background: theme.bg, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif",
                padding: 24, transition: 'all 0.3s'
            }}>
                <LogoutButton />

                <div style={{
                    background: theme.card, border: `1px solid ${theme.border}`,
                    borderRadius: 24, padding: '48px 40px', maxWidth: 440, width: '100%',
                    textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: darkMode ? 'rgba(97, 78, 169, 0.1)' : '#F3F0FF',
                        border: '2px solid #614EA9', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 24, margin: '0 auto 24px',
                        animation: 'spin 2s linear infinite'
                    }}>
                        ⚙️
                    </div>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600,
                        color: theme.text, marginBottom: 10
                    }}>
                        {t.processingMessage}
                    </h2>
                    <p style={{ fontSize: 13, color: theme.muted, lineHeight: 1.7 }}>
                        {t.processingNote}
                    </p>
                </div>

                <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    // ===== شاشة النجاح =====
    if (portalState === 'success') {
        return (
            <div style={{
                minHeight: '100vh', background: theme.bg, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif",
                padding: 24, transition: 'all 0.3s'
            }}>
                <LogoutButton />

                <div style={{
                    background: theme.card, border: `1px solid ${theme.border}`,
                    borderRadius: 24, padding: '48px 40px', maxWidth: 520, width: '100%',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                }}>
                    {/* أيقونة النجاح */}
                    <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: darkMode ? selectedEmotionObj?.darkBg : selectedEmotionObj?.bg,
                        border: `2px solid ${selectedEmotionObj?.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 40, margin: '0 auto 24px'
                    }}>
                        {selectedEmotionObj?.emoji}
                    </div>

                    <h2 style={{
                        textAlign: 'center', fontFamily: "'Outfit', sans-serif", fontSize: 24,
                        fontWeight: 600, color: theme.text, marginBottom: 8
                    }}>
                        {t.thankYou}
                    </h2>
                    <p style={{
                        fontSize: 13, color: theme.muted, textAlign: 'center',
                        lineHeight: 1.7, marginBottom: 28
                    }}>
                        {t.feedbackSubmitted}
                    </p>

                    {/* رد الذكاء الاصطناعي */}
                    <div style={{
                        background: darkMode ? 'rgba(97, 78, 169, 0.1)' : '#F3F0FF',
                        border: `1px solid ${darkMode ? '#3D365F' : '#E0D9F7'}`,
                        borderRadius: 14, padding: '16px 18px', marginBottom: 28
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <span style={{ fontSize: 18 }}>🤖</span>
                            <h3 style={{
                                fontWeight: 600, color: '#614EA9', fontSize: 12,
                                margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px'
                            }}>
                                {t.aiResponse}
                            </h3>
                        </div>
                        <p style={{
                            fontSize: 13, color: theme.text, lineHeight: 1.6, margin: 0
                        }}>
                            {aiResponse}
                        </p>
                    </div>

                    {/* معلومات المستخدم */}
                    <div style={{
                        background: theme.itemBg, border: `1px solid ${theme.border}`,
                        borderRadius: 14, padding: '16px 18px', marginBottom: 28
                    }}>
                        <h3 style={{
                            fontWeight: 600, color: theme.text, fontSize: 13,
                            margin: '0 0 10px 0'
                        }}>
                            {t.yourInfo}
                        </h3>
                        <p style={{ fontSize: 12, color: theme.muted, margin: 0 }}>
                            {t.department}: <strong style={{ color: theme.text }}>{user?.dept || 'N/A'}</strong>
                        </p>
                        <p style={{
                            fontSize: 11, color: '#614EA9', marginTop: 8, margin: '8px 0 0 0'
                        }}>
                            {t.deptInfo}
                        </p>
                    </div>

                    <button onClick={handleReset} style={{
                        width: '100%', padding: '14px', background: '#614EA9',
                        color: 'white', border: 'none', borderRadius: 12, fontSize: 14,
                        fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
                    }}>
                        {t.newReflection}
                    </button>
                </div>
            </div>
        )
    }

    // ===== شاشة النموذج الرئيسية =====
    return (
        <div style={{
            minHeight: '100vh', background: theme.bg,
            fontFamily: "'Inter', sans-serif", padding: '80px 24px 40px',
            transition: 'all 0.3s'
        }}>
            <LogoutButton />

            {/* أزرار التحكم العلوية */}
            <div style={{
                position: 'fixed', top: 20, right: 20, zIndex: 100,
                display: 'flex', gap: 8
            }}>
                <button onClick={() => setDarkMode(!darkMode)} style={{
                    padding: '7px 12px', borderRadius: 20,
                    border: `1px solid ${theme.border}`,
                    background: theme.card, color: theme.muted,
                    cursor: 'pointer', fontSize: 13, fontFamily: "'Inter', sans-serif"
                }}>
                    {darkMode ? '☀️' : '🌙'}
                </button>
                <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{
                    padding: '7px 16px', borderRadius: 20,
                    border: `1px solid ${theme.border}`,
                    background: theme.card, color: theme.muted,
                    cursor: 'pointer', fontSize: 13, fontFamily: "'Inter', sans-serif"
                }}>
                    {isAr ? 'English' : 'العربية'}
                </button>
            </div>

            {/* الحاوية الرئيسية */}
            <div style={{
                maxWidth: 800, margin: '0 auto',
                background: theme.innerCard, borderRadius: 24,
                padding: '40px', boxShadow: darkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.border}`
            }}>
                {/* الرأس */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700,
                        color: theme.text, marginBottom: 8
                    }}>
                        Mood<span style={{ color: '#614EA9' }}>Loop</span>
                    </div>
                    <h1 style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600,
                        color: theme.text, margin: '0 0 6px 0'
                    }}>
                        {t.howFeeling}
                    </h1>
                    <p style={{
                        fontSize: 13, color: theme.muted, margin: 0, lineHeight: 1.6
                    }}>
                        {t.selectEmotion}
                    </p>
                </div>

                {/* شبكة المشاعر */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: 12, marginBottom: 28
                }}>
                    {EMOTIONS.map(emotion => (
                        <button key={emotion.id} onClick={() => setSelectedEmotion(emotion.id)} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', padding: '18px 10px', borderRadius: 14,
                            border: selectedEmotion === emotion.id ? `2px solid ${emotion.color}` : `1px solid ${theme.border}`,
                            background: selectedEmotion === emotion.id
                                ? (darkMode ? emotion.darkBg : emotion.bg)
                                : theme.itemBg,
                            cursor: 'pointer',
                            transform: selectedEmotion === emotion.id ? 'translateY(-4px)' : 'translateY(0)',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedEmotion === emotion.id ? `0 8px 24px ${emotion.color}30` : 'none',
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            <span style={{ fontSize: 28, marginBottom: 8 }}>{emotion.emoji}</span>
                            <span style={{
                                fontSize: 11, fontWeight: 500,
                                color: selectedEmotion === emotion.id ? emotion.color : theme.muted,
                                textAlign: 'center', lineHeight: 1.3
                            }}>
                                {isAr ? emotion.labelAr : emotion.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* حقل الرسالة */}
                <div style={{ marginBottom: 22 }}>
                    <label style={{
                        display: 'block', fontSize: 12, fontWeight: 600, color: theme.text,
                        marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px'
                    }}>
                        {t.shareThoughts}
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                        placeholder={t.writePlaceholder}
                        rows={4}
                        dir={isAr ? 'rtl' : 'ltr'}
                        style={{
                            width: '100%', padding: '14px', background: theme.itemBg,
                            border: `1px solid ${theme.border}`, borderRadius: 12,
                            resize: 'none', fontFamily: "'Inter', sans-serif", fontSize: 13,
                            color: theme.text, outline: 'none', transition: 'border-color 0.2s'
                        }}
                    />
                </div>

                {/* صندوق الخصوصية */}
                <div style={{
                    background: darkMode ? 'rgba(97, 78, 169, 0.1)' : '#F3F0FF',
                    padding: '14px 16px', borderRadius: 12, display: 'flex',
                    alignItems: 'flex-start', gap: 12, marginBottom: 24,
                    border: `1px solid ${darkMode ? '#3D365F' : '#E0D9F7'}`
                }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
                    <p style={{
                        fontSize: 12, color: darkMode ? '#A599D9' : '#614EA9',
                        margin: 0, lineHeight: 1.5
                    }}>
                        {t.anonymousNote}
                    </p>
                </div>

                {/* زر الإرسال */}
                <button onClick={handleSubmit} disabled={!selectedEmotion} style={{
                    width: '100%', padding: '14px', background: selectedEmotion ? '#614EA9' : theme.border,
                    color: selectedEmotion ? 'white' : theme.muted, border: 'none',
                    borderRadius: 12, fontSize: 14, fontWeight: 600,
                    cursor: selectedEmotion ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s', fontFamily: "'Inter', sans-serif"
                }}>
                    {t.submitFeedback}
                </button>
            </div>
        </div>
    )
}
