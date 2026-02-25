'use client';

import { useState } from 'react';

const C = {
  purple: '#5712a8',
  purpleLight: '#7b3fe0',
  orange: '#f06223',
  orangeLight: '#ff8a50',
  dark: '#1a1025',
};

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
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
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('success');
        setFormData({ fullName: '', email: '', phone: '' });
        setTimeout(() => {
          window.location.href =
            'https://www.maxedunetwork.vn/course/khoa-hoc-vip-ai-pro-nhan-ban-1jf0eqn75';
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
      id: 'fullName',
      label: 'Họ tên',
      type: 'text',
      placeholder: 'Nhập họ tên của bạn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'email@example.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: 'phone',
      label: 'Số điện thoại',
      type: 'tel',
      placeholder: 'Nhập số điện thoại',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <style>{`
        .cf-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .cf-input:-webkit-autofill,
        .cf-input:-webkit-autofill:hover,
        .cf-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff;
          -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0.08) inset;
          transition: background-color 5000s ease-in-out 0s;
        }
        @keyframes btn-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-border {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes check-draw {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: btn-shimmer 2.5s infinite;
          border-radius: inherit;
        }
      `}</style>

      {fields.map((field) => {
        const isFocused = focusedField === field.id;
        const hasValue = formData[field.id as keyof typeof formData].length > 0;

        return (
          <div key={field.id} className="relative">
            {/* Floating label */}
            <label
              htmlFor={field.id}
              className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5 transition-colors duration-300"
              style={{ color: isFocused ? C.orangeLight : 'rgba(255,255,255,0.5)' }}
            >
              {field.label}
            </label>

            <div className="relative">
              {/* Icon */}
              <div
                className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none"
                style={{ color: isFocused ? C.orangeLight : 'rgba(255,255,255,0.25)' }}
              >
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
                className="cf-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white font-medium outline-none transition-all duration-300"
                style={{
                  background: isFocused ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                  border: `1.5px solid ${isFocused ? C.orangeLight : hasValue ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isFocused ? `0 0 0 3px ${C.orange}20, 0 4px 12px rgba(0,0,0,0.1)` : 'none',
                }}
              />

              {/* Filled check */}
              {hasValue && !isFocused && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill={C.orange} opacity="0.2" />
                    <path
                      d="M5 8L7 10L11 6"
                      stroke={C.orangeLight}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ strokeDasharray: 20, animation: 'check-draw 0.3s ease forwards' }}
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-shimmer relative w-full py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 overflow-hidden disabled:opacity-60"
        style={{
          background: isSubmitting
            ? 'rgba(255,255,255,0.1)'
            : `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeLight} 50%, ${C.orange} 100%)`,
          backgroundSize: '200% 200%',
          boxShadow: isSubmitting ? 'none' : `0 4px 20px ${C.orange}40`,
          marginTop: '8px',
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Đang gửi...
            </>
          ) : (
            <>
              Đăng ký ngay
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </>
          )}
        </span>
      </button>

      {/* Message */}
      {message && (
        <div
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-500"
          style={{
            background: message === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${message === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: message === 'success' ? '#4ade80' : '#f87171',
          }}
        >
          {message === 'success' ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#4ade80" strokeWidth="1.5" />
                <path d="M5 8L7 10L11 6" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Gửi thành công! Đang chuyển hướng...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5" />
                <path d="M6 6l4 4M10 6l-4 4" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Có lỗi xảy ra, vui lòng thử lại.
            </>
          )}
        </div>
      )}

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Bảo mật SSL
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          An toàn 100%
        </div>
      </div>
    </form>
  );
}