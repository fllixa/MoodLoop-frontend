import { useState } from 'react'

const DEPARTMENTS = [
    'Accounting Department',
    'Maintenance Department',
    'Human Resources',
    'IT Department',
    'Sales Department',
    'Marketing Department',
    'Operations Department',
    'Finance Department',
]

export default function EmployeeLogin({ onLogin }) {
    const [lang, setLang] = useState('en')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dept, setDept] = useState('')
    const [deptOpen, setDeptOpen] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const isAr = lang === 'ar'

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        if (!name || !email || !password || !dept) {
            setError(isAr ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
            return
        }
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onLogin({ name, email, dept, role: 'employee' })
        }, 800)
    }

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        background: '#FFFFFF',
        border: '1px solid #E2E4ED',
        borderRadius: 12,
        color: '#2C2A4A',
        fontSize: 14,
        outline: 'none',
        fontFamily: "'Inter', sans-serif",
        transition: 'border-color 0.2s',
    }

    const labelStyle = {
        display: 'block',
        fontSize: 12,
        fontWeight: 500,
        color: '#2C2A4A',
        marginBottom: 7,
        letterSpacing: 0.3,
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(-45deg, #C3B4FF, #D4CCFF, #E8EAF6, #EDE9FF, #B8AEEE)',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 8s ease infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            padding: 24,
            position: 'relative',
        }}>

            {/* زر اللغة */}
            <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                style={{
                    position: 'fixed', top: 20, right: 20, zIndex: 100,
                    padding: '7px 16px', borderRadius: 20,
                    border: '1px solid #E2E4ED',
                    background: 'rgba(255,255,255,0.8)',
                    color: '#6B7280', fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    backdropFilter: 'blur(10px)',
                }}
            >
                {isAr ? 'English' : 'العربية'}
            </button>

            {/* الكارد */}
            <div style={{
                background: '#FFFFFF',
                border: '1px solid #E2E4ED',
                borderRadius: 24,
                padding: '40px 36px',
                width: '100%',
                maxWidth: 420,
                boxShadow: '0 8px 40px rgba(97,78,169,0.12)',
                animation: 'fadeUp 0.6s ease forwards',
            }}>

                {/* الشعار */}
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 26, fontWeight: 700,
                        color: '#2C2A4A', marginBottom: 6,
                    }}>
                        Mood<span style={{ color: '#614EA9' }}>Loop</span>
                    </div>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        background: '#F3F0FF',
                        border: '1px solid #C3B4FF',
                        borderRadius: 20,
                        fontSize: 12,
                        color: '#614EA9',
                        fontWeight: 500,
                    }}>
                        {isAr ? 'بوابة الموظف' : 'Employee Portal'}
                    </div>
                </div>

                <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 18, fontWeight: 600,
                    color: '#2C2A4A', textAlign: 'center',
                    marginBottom: 6,
                }}>
                    {isAr ? 'أهلاً بك' : 'Welcome back'}
                </h2>
                <p style={{
                    fontSize: 13, color: '#6B7280',
                    textAlign: 'center', marginBottom: 28,
                }}>
                    {isAr ? 'سجّل دخولك للمتابعة' : 'Sign in to continue'}
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* الاسم */}
                    <div>
                        <label style={labelStyle}>{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                        <input
                            style={inputStyle}
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={isAr ? 'أدخل اسمك' : 'Enter your name'}
                            onFocus={e => e.target.style.borderColor = '#614EA9'}
                            onBlur={e => e.target.style.borderColor = '#E2E4ED'}
                        />
                    </div>

                    {/* الإيميل */}
                    <div>
                        <label style={labelStyle}>{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                        <input
                            style={inputStyle}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@company.com"
                            onFocus={e => e.target.style.borderColor = '#614EA9'}
                            onBlur={e => e.target.style.borderColor = '#E2E4ED'}
                        />
                    </div>

                    {/* الباسوورد */}
                    <div>
                        <label style={labelStyle}>{isAr ? 'كلمة المرور' : 'Password'}</label>
                        <input
                            style={inputStyle}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            onFocus={e => e.target.style.borderColor = '#614EA9'}
                            onBlur={e => e.target.style.borderColor = '#E2E4ED'}
                        />
                    </div>

                    {/* الديبارتمنت */}
                    <div style={{ position: 'relative' }}>
                        <label style={labelStyle}>{isAr ? 'القسم' : 'Department'}</label>
                        <div
                            onClick={() => setDeptOpen(!deptOpen)}
                            style={{
                                ...inputStyle,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                borderColor: deptOpen ? '#614EA9' : '#E2E4ED',
                                userSelect: 'none',
                            }}
                        >
                            <span style={{ color: dept ? '#2C2A4A' : '#6B7280' }}>
                                {dept || (isAr ? 'اختر قسمك' : 'Select your department')}
                            </span>
                            <span style={{
                                color: '#614EA9', fontSize: 11,
                                transform: deptOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}>▼</span>
                        </div>

                        {deptOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 6px)',
                                left: 0, right: 0, zIndex: 100,
                                background: '#FFFFFF',
                                border: '1px solid #E2E4ED',
                                borderRadius: 12, overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(97,78,169,0.12)',
                                animation: 'fadeUp 0.2s ease forwards',
                            }}>
                                {DEPARTMENTS.map((d, i) => (
                                    <div
                                        key={d}
                                        onClick={() => { setDept(d); setDeptOpen(false) }}
                                        style={{
                                            padding: '11px 16px', fontSize: 13,
                                            color: dept === d ? '#614EA9' : '#2C2A4A',
                                            background: dept === d ? '#F3F0FF' : 'transparent',
                                            cursor: 'pointer',
                                            borderBottom: i < DEPARTMENTS.length - 1 ? '1px solid #E2E4ED' : 'none',
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#F3F0FF'}
                                        onMouseLeave={e => e.currentTarget.style.background = dept === d ? '#F3F0FF' : 'transparent'}
                                    >
                                        <span style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: dept === d ? '#614EA9' : '#E2E4ED',
                                            flexShrink: 0,
                                        }} />
                                        {d}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* خطأ */}
                    {error && (
                        <div style={{
                            fontSize: 13, color: '#EF4444',
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: 8, padding: '10px 14px',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* زر الدخول */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '13px',
                            background: 'linear-gradient(-45deg, #614EA9, #8B6FD4, #C3B4FF, #614EA9)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientShift 4s ease infinite',
                            color: 'white', border: 'none',
                            borderRadius: 12,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 14, fontWeight: 500,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.8 : 1,
                            transition: 'opacity 0.2s',
                            marginTop: 4,
                        }}
                    >
                        {loading
                            ? (isAr ? 'جاري الدخول...' : 'Signing in...')
                            : (isAr ? 'تسجيل الدخول' : 'Sign In')}
                    </button>

                </form>

                {/* Privacy */}
                <div style={{
                    textAlign: 'center', marginTop: 20,
                    fontSize: 11, color: '#6B7280',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 6,
                }}>
                    🔐 {isAr ? 'بياناتك مشفرة وآمنة' : 'Your data is encrypted and secure'}
                </div>

            </div>
        </div>
    )
}