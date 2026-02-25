'use client';

import { useState } from 'react';

const C = {
  // Orange background spectrum
  orangeBg: '#f06223',
  orangeBgLight: '#f57840',
  orangeBgDark: '#d44e14',
  orangeDeep: '#b83d08',

  // Purple for button & accents
  purple: '#5712a8',
  purpleLight: '#7b3fe0',
  purpleBright: '#9d5cff',
  purpleDark: '#3d0d80',

  // Text on orange
  white: '#ffffff',
  whiteHigh: 'rgba(255,255,255,0.95)',
  whiteMid: 'rgba(255,255,255,0.65)',
  whiteLow: 'rgba(255,255,255,0.35)',
  whiteTint: 'rgba(255,255,255,0.12)',
  whiteTintLow: 'rgba(255,255,255,0.07)',
  whiteBorder: 'rgba(255,255,255,0.22)',
  whiteBorderHigh: 'rgba(255,255,255,0.45)',
};

export function ContactForm() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('success');
        setFormData({ fullName: '', email: '', phone: '' });
        setTimeout(() => {
          window.open('https://www.maxedunetwork.vn/course/khoa-hoc-vip-ai-pro-nhan-ban-1jf0eqn75', '_blank', 'noopener,noreferrer');
        }, 500);
      } else {
        setMessage('error');
      }
    } catch {
      setMessage('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      id: 'fullName', label: 'Họ & tên', type: 'text', placeholder: 'Nhập họ tên của bạn',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: 'phone', label: 'Số điện thoại', type: 'tel', placeholder: 'Nhập số điện thoại',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl" style={{
      background: `linear-gradient(145deg, ${C.orangeBgLight} 0%, ${C.orangeBg} 45%, ${C.orangeBgDark} 100%)`,
      boxShadow: `0 8px 48px rgba(240,98,35,0.45), 0 2px 0 rgba(255,255,255,0.15) inset`,
      padding: '1.75rem 1.5rem 1.5rem',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        .cf-wrap * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

        .cf-input::placeholder { color: rgba(255,255,255,0.38); }
        .cf-input:-webkit-autofill,
        .cf-input:-webkit-autofill:hover,
        .cf-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0.1) inset;
          transition: background-color 5000s ease-in-out 0s;
        }

        @keyframes btn-shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes float-bg {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%,-50%) scale(1.15); opacity: 0.9; }
        }
        @keyframes check-pop {
          0% { transform: scale(0) rotate(-10deg); opacity:0; }
          70% { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); opacity:1; }
        }
        @keyframes input-success {
          0% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .btn-shimmer-line {
          position: absolute; top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          animation: btn-shimmer 2.8s ease-in-out infinite;
        }
        .check-pop { animation: check-pop 0.35s cubic-bezier(.34,1.56,.64,1) forwards; }
      `}</style>

      <div className="cf-wrap relative z-10">
        {/* Floating glow blobs behind form content */}
        <div className="absolute pointer-events-none" style={{
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          top: '10%', right: '-10%',
          animation: 'float-bg 6s ease-in-out infinite',
        }} />
        <div className="absolute pointer-events-none" style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          bottom: '5%', left: '-5%',
          animation: 'float-bg 8s ease-in-out infinite 2s',
        }} />

        {/* Header */}
        <div className="text-center mb-5 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" style={{ boxShadow: '0 0 6px white' }} />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white">Đăng ký miễn phí</span>
          </div>
          <p className="text-[13px] font-light" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Điền thông tin để nhận ưu đãi đặc biệt
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {fields.map((field) => {
            const isFocused = focusedField === field.id;
            const hasValue = formData[field.id as keyof typeof formData].length > 0;
            return (
              <div key={field.id}>
                {/* Label */}
                <label htmlFor={field.id} className="block text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5"
                  style={{ color: isFocused ? C.white : 'rgba(255,255,255,0.6)' }}>
                  {field.label}
                </label>

                <div className="relative">
                  {/* Left icon */}
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                    style={{ color: isFocused ? C.white : 'rgba(255,255,255,0.45)' }}>
                    {field.icon}
                  </div>

<input
  id={field.id}
  type={field.type}
  required
  value={formData[field.id as keyof typeof formData]}
  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
  onFocus={() => setFocusedField(field.id)}
  onBlur={() => setFocusedField(null)}
  placeholder={field.placeholder}
  className="cf-input w-full pl-10 pr-10 py-3.5 rounded-xl 
  text-[14px] font-medium text-black 
  outline-none transition-all duration-300 bg-white"
  style={{
    border: `1.5px solid ${
      isFocused ? '#111111' : hasValue ? '#9ca3af' : '#e5e7eb'
    }`,
    boxShadow: isFocused
      ? '0 0 0 3px rgba(0,0,0,0.05), 0 6px 18px rgba(0,0,0,0.08)'
      : 'none',
  }}
/>
                  {/* Check icon when filled */}
                  {hasValue && !isFocused && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 check-pop">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.25)' }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* CTA Button — deep purple */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full py-4 rounded-xl font-bold text-[15px] text-white overflow-hidden transition-all duration-300 disabled:opacity-60"
              style={{
                background: isSubmitting
                  ? 'rgba(87,18,168,0.6)'
                  : `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleLight} 60%, ${C.purpleBright} 100%)`,
                boxShadow: isSubmitting
                  ? 'none'
                  : `0 6px 28px rgba(87,18,168,0.6), 0 1px 0 rgba(255,255,255,0.15) inset`,
                letterSpacing: '0.02em',
              }}
            >
              {/* Shimmer line */}
              {!isSubmitting && <div className="btn-shimmer-line" />}

              <span className="relative z-10 flex items-center justify-center gap-2.5">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Đăng ký ngay
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Status message */}
          {message && (
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[13px] font-semibold transition-all duration-500"
              style={{
                background: message === 'success' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${message === 'success' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
                color: C.white,
              }}>
              {message === 'success' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
                    <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Gửi thành công! Đang chuyển hướng...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
                    <path d="M6 6l4 4M10 6l-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Có lỗi xảy ra, vui lòng thử lại.
                </>
              )}
            </div>
          )}
        </form>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-[10px] font-medium">Bảo mật SSL</span>
          </div>
          <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
          <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span className="text-[10px] font-medium">An toàn 100%</span>
          </div>
          <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
          <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-[10px] font-medium">5,000+ học viên</span>
          </div>
        </div>
      </div>
    </div>
  );
}
