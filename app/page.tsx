'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ContactForm } from "@/components/contact-form";

/* ───────────────── scroll-reveal hook ───────────────── */
function useOnScreen(ref: React.RefObject<HTMLElement | null>, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  const transforms: Record<string, string> = {
    up: 'translateY(44px)', left: 'translateX(-32px)', right: 'translateX(32px)', scale: 'scale(0.90)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ───────────────── touch-swipe hook ───────────────── */
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStart = useRef(0);
  return {
    onTouchStart: (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? onSwipeLeft() : onSwipeRight();
    },
  };
}

/* ───────────────── colour system — PURPLE + ORANGE ───────────────── */
const C = {
  // Deep purple backgrounds — rich, not black
  bg0: '#0e0720',        // deepest — near-black purple
  bg1: '#120a28',        // section base
  bg2: '#160c30',        // slightly lighter purple
  bg3: '#1c1040',        // card/panel
  bg4: '#221450',        // elevated surfaces
  bgCard: '#1a0e38',
  bgCardBorder: '#2e1e60',

  // Orange spectrum — vibrant punch
  orange: '#ff6b20',
  orangeLight: '#ff8c45',
  orangeBright: '#ff7a30',
  orangeWarm: '#ff5500',
  orangeDark: '#cc4400',
  orangeGlow: 'rgba(255,107,32,0.18)',

  // Purple spectrum — the dominant tone
  purple: '#7c3aff',
  purpleLight: '#a066ff',
  purpleMid: '#6025d4',
  purpleDark: '#4415a0',
  purpleDeep: '#2d0e7a',
  purpleBright: '#9d5cff',
  purpleGlow: 'rgba(124,58,255,0.25)',

  // Magenta-pink highlight
  pink: '#e040fb',
  pinkLight: '#f06fff',
  pinkGlow: 'rgba(224,64,251,0.15)',

  // Text
  white: '#ffffff',
  white90: 'rgba(255,255,255,0.90)',
  white70: 'rgba(255,255,255,0.70)',
  white45: 'rgba(255,255,255,0.45)',
  white20: 'rgba(255,255,255,0.20)',
  white10: 'rgba(255,255,255,0.10)',
  white06: 'rgba(255,255,255,0.06)',
};

/* ───────────────── data ───────────────── */
const objectives = [
  { icon: '🚀', title: 'TĂNG TỐC CÔNG VIỆC', items: ['Ứng dụng AI trong sáng tạo, Marketing, phân tích dữ liệu và ra chiến lược quyết định', 'Giảm 80% làm việc thủ công, tập trung vào việc tạo giá trị thực'] },
  { icon: '💡', title: 'LÀM CHỦ CÔNG NGHỆ AI', items: ['Nắm vững ChatGPT, Midjourney, Runway và hàng chục công cụ AI hàng đầu', 'Tự tin áp dụng AI vào mọi lĩnh vực từ content, design đến kinh doanh'] },
  { icon: '💰', title: 'TĂNG THU NHẬP BỀN VỮNG', items: ['Xây dựng kênh Affiliate hiệu quả với video viral AI', 'Tạo sản phẩm số, dịch vụ AI Freelance & cơ hội nghề nghiệp mới'] },
];

const testimonials = [
  { name: 'Minh Tuấn', role: 'Marketing Manager', quote: 'Sau khoá học, tôi tiết kiệm 15 giờ/tuần nhờ AI tự động hoá content.' },
  { name: 'Thanh Hà', role: 'Freelancer', quote: 'Thu nhập tăng 3x chỉ sau 2 tháng áp dụng AI vào thiết kế.' },
  { name: 'Đức Anh', role: 'Startup Founder', quote: 'AI giúp team tôi làm việc nhanh hơn gấp 5 lần so với trước.' },
  { name: 'Hồng Nhung', role: 'Content Creator', quote: 'Video AI giúp kênh TikTok của tôi đạt 500K followers.' },
  { name: 'Quang Huy', role: 'Data Analyst', quote: 'Phân tích dữ liệu bằng AI nhanh chóng, chính xác hơn rất nhiều.' },
  { name: 'Bích Ngọc', role: 'Teacher', quote: 'Tôi tạo giáo án và tài liệu giảng dạy chỉ trong vài phút.' },
  { name: 'Văn Khoa', role: 'E-commerce', quote: 'Doanh thu shop tăng 200% nhờ AI viết mô tả sản phẩm.' },
  { name: 'Phương Linh', role: 'Designer', quote: 'Midjourney đã thay đổi hoàn toàn workflow thiết kế của tôi.' },
];

const videos = [
  { id: 'XwUPz7MhvjQ', title: 'Tạo video AI từ A-Z' },
  { id: 'XwUPz7MhvjQ', title: 'Làm content với ChatGPT' },
  { id: 'XwUPz7MhvjQ', title: 'Thiết kế poster AI' },
  { id: 'XwUPz7MhvjQ', title: 'Video viral TikTok' },
  { id: 'XwUPz7MhvjQ', title: 'AI Marketing Strategy' },
  { id: 'XwUPz7MhvjQ', title: 'Midjourney nâng cao' },
];

const galleryImages = Array.from({ length: 6 });

const stats = [
  { value: '5,000+', label: 'Học viên' },
  { value: '98%', label: 'Hài lòng' },
  { value: '15h+', label: 'Tiết kiệm/tuần' },
  { value: '3x', label: 'Tăng thu nhập' },
];

/* ═══════════════════════ PAGE ═══════════════════════ */
export default function Page() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [showVideos, setShowVideos] = useState(3);
  const [activeTab, setActiveTab] = useState(0);
  const [gallerySlideIdx, setGallerySlideIdx] = useState(0);

  const nextTestimonial = useCallback(() => setTestimonialIdx(p => (p + 1) % testimonials.length), []);
  const prevTestimonial = useCallback(() => setTestimonialIdx(p => (p - 1 + testimonials.length) % testimonials.length), []);
  const testimonialSwipe = useSwipe(nextTestimonial, prevTestimonial);

  const nextGallery = useCallback(() => setGallerySlideIdx(p => (p + 1) % 8), []);
  const prevGallery = useCallback(() => setGallerySlideIdx(p => (p - 1 + 8) % 8), []);
  const gallerySwipe = useSwipe(nextGallery, prevGallery);

  useEffect(() => { const t = setInterval(nextTestimonial, 4500); return () => clearInterval(t); }, [nextTestimonial]);
  useEffect(() => { const t = setInterval(nextGallery, 3500); return () => clearInterval(t); }, [nextGallery]);
  useEffect(() => { const t = setInterval(() => setActiveTab(p => (p + 1) % 3), 5000); return () => clearInterval(t); }, []);

  return (
    <div className="max-w-[430px] mx-auto overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif", background: C.bg0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes glow-pulse-orange {
          0%,100%{box-shadow:0 0 22px rgba(255,107,32,0.35), 0 0 50px rgba(255,107,32,0.12), inset 0 1px 0 rgba(255,200,150,0.15)}
          50%{box-shadow:0 0 40px rgba(255,107,32,0.60), 0 0 80px rgba(255,107,32,0.25), inset 0 1px 0 rgba(255,200,150,0.2)}
        }
        @keyframes glow-pulse-purple {
          0%,100%{box-shadow:0 0 22px rgba(124,58,255,0.35), 0 0 50px rgba(124,58,255,0.12)}
          50%{box-shadow:0 0 40px rgba(124,58,255,0.60), 0 0 80px rgba(124,58,255,0.25)}
        }
        @keyframes aurora {
          0%{transform:translate(-30%, -30%) rotate(0deg) scale(1)}
          33%{transform:translate(20%, -10%) rotate(120deg) scale(1.2)}
          66%{transform:translate(-10%, 30%) rotate(240deg) scale(0.9)}
          100%{transform:translate(-30%, -30%) rotate(360deg) scale(1)}
        }
        @keyframes aurora2 {
          0%{transform:translate(30%, 20%) rotate(0deg) scale(1)}
          50%{transform:translate(-20%, -10%) rotate(180deg) scale(1.3)}
          100%{transform:translate(30%, 20%) rotate(360deg) scale(1)}
        }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes counter-spin { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

        .anim-float { animation: float 3.5s ease-in-out infinite; }
        .anim-shimmer { background:linear-gradient(105deg,transparent 20%,rgba(255,255,255,0.18) 50%,transparent 80%); background-size:200% 100%; animation:shimmer 2.5s infinite; }
        .anim-marquee { animation: marquee 28s linear infinite; }
        .anim-gradient { background-size:200% 200%; animation:gradient-x 4s ease infinite; }
        .anim-glow-orange { animation: glow-pulse-orange 2.5s ease-in-out infinite; }
        .anim-glow-purple { animation: glow-pulse-purple 2.5s ease-in-out infinite; }
        .anim-aurora1 { animation: aurora 18s ease-in-out infinite; }
        .anim-aurora2 { animation: aurora2 14s ease-in-out infinite; }
        .anim-spin-slow { animation: spin-slow 20s linear infinite; }

        /* Glass — purple-tinted */
        .glass-deep { backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); background:rgba(18,10,40,0.75); border:1px solid rgba(124,58,255,0.2); }
        .glass-purple { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(124,58,255,0.08); border:1px solid rgba(124,58,255,0.2); }
        .glass-orange { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(255,107,32,0.08); border:1px solid rgba(255,107,32,0.2); }
        .glass-mixed { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(26,14,56,0.8); border:1px solid rgba(255,255,255,0.1); }

        /* Noise */
        .noise::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); opacity:0.035; pointer-events:none; mix-blend-mode:overlay; }

        .scroll-hide::-webkit-scrollbar{display:none} .scroll-hide{-ms-overflow-style:none;scrollbar-width:none}

        /* Purple dot grid */
        .bg-grid { 
          background-image: 
            radial-gradient(circle, rgba(124,58,255,0.12) 1px, transparent 1px); 
          background-size: 28px 28px; 
        }
        .bg-grid-lines { 
          background-image: 
            linear-gradient(rgba(124,58,255,0.06) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(124,58,255,0.06) 1px, transparent 1px); 
          background-size: 32px 32px; 
        }
        .bg-grid-rich {
          background-image:
            radial-gradient(ellipse 80% 50% at 20% 60%, rgba(124,58,255,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 30%, rgba(255,107,32,0.1) 0%, transparent 60%),
            radial-gradient(circle, rgba(124,58,255,0.05) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 28px 28px;
        }

        /* Orange highlight line */
        .accent-line::before { content:''; display:block; width:36px; height:3px; background:linear-gradient(90deg, #ff6b20, #ff8c45); border-radius:99px; margin-bottom:12px; }
        .accent-line-center::before { content:''; display:block; width:36px; height:3px; background:linear-gradient(90deg, #7c3aff, #ff6b20); border-radius:99px; margin:0 auto 12px; }

        /* Glow border card */
        .card-glow { transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease; }
        .card-glow:hover { box-shadow: 0 8px 40px rgba(255,107,32,0.15), 0 0 0 1px rgba(255,107,32,0.25); transform: translateY(-3px); }

        /* Orange text gradient */
        .text-orange-grad { background: linear-gradient(135deg, #ff8c45, #ff6b20); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .text-purple-grad { background: linear-gradient(135deg, #a066ff, #7c3aff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* Divider */
        .divider { height:1px; background: linear-gradient(90deg, transparent, rgba(124,58,255,0.3), rgba(255,107,32,0.2), transparent); }

        /* Stat sep */
        .stat-sep { border-right: 1px solid rgba(124,58,255,0.2); }

        /* Hex decorations */
        .hex-ring { 
          position:absolute; border-radius:50%; 
          border: 1px solid rgba(124,58,255,0.12);
          pointer-events:none;
        }
      `}</style>

      {/* ════════════ HERO ════════════ */}
      <section className="relative w-full" style={{ background: C.bg0 }}>
        {/* Aurora background behind hero image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="anim-aurora1 absolute w-[400px] h-[400px] rounded-full opacity-50"
            style={{ top: '10%', left: '10%', background: `radial-gradient(circle, rgba(124,58,255,0.4) 0%, transparent 70%)` }} />
          <div className="anim-aurora2 absolute w-[300px] h-[300px] rounded-full opacity-40"
            style={{ top: '20%', right: '0%', background: `radial-gradient(circle, rgba(255,107,32,0.3) 0%, transparent 70%)` }} />
        </div>
        <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772012420/demo/45_k9GZXXLBqtavWsW3Y-original.png.png"
          alt="Hero Banner" className="w-full h-auto block relative z-10" />
        <div className="absolute bottom-0 inset-x-0 h-48 z-20"
          style={{ background: `linear-gradient(to top, ${C.bg0} 0%, transparent 100%)` }} />
      </section>

      {/* ════════════ MARQUEE ════════════ */}
      <div className="py-3 overflow-hidden relative z-10" style={{
        background: `linear-gradient(90deg, ${C.orangeWarm} 0%, ${C.orange} 40%, ${C.purpleMid} 100%)`,
      }}>
        <div className="anim-marquee whitespace-nowrap flex">
          {[0, 1].map(i => (
            <span key={i} className="inline-flex gap-10 font-semibold text-[10px] tracking-[0.2em] uppercase px-6" style={{ color: 'rgba(255,255,255,0.95)', fontFamily: "'JetBrains Mono', monospace" }}>
              <span>🔥 Ưu đãi có hạn</span><span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span><span>💡 5000+ học viên</span>
              <span>🔥 Ưu đãi có hạn</span><span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span><span>💡 5000+ học viên</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════ FORM 1 ════════════ */}
      <section className="relative px-5 pt-14 pb-14 noise bg-grid-rich overflow-hidden" style={{ background: C.bg1 }}>
        {/* Decorative rings */}
        <div className="hex-ring w-72 h-72" style={{ top: '-80px', right: '-80px', borderColor: 'rgba(255,107,32,0.1)' }} />
        <div className="hex-ring w-48 h-48" style={{ top: '-40px', right: '-40px', borderColor: 'rgba(255,107,32,0.08)' }} />
        <div className="hex-ring w-64 h-64" style={{ bottom: '-80px', left: '-80px', borderColor: 'rgba(124,58,255,0.1)' }} />
        
        {/* Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{ background: `radial-gradient(circle at 80% 10%, rgba(255,107,32,0.12) 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
          style={{ background: `radial-gradient(circle at 20% 90%, rgba(124,58,255,0.18) 0%, transparent 70%)` }} />

        <Reveal>
          <div className="text-center mb-8 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase mb-5"
              style={{ color: C.orangeLight, background: 'rgba(255,107,32,0.1)', border: '1px solid rgba(255,107,32,0.25)' }}>
              <span className="w-2 h-2 rounded-full inline-block anim-glow-orange" style={{ background: C.orange }} />
              Đăng ký ngay hôm nay
            </span>
            <h2 className="text-[28px] font-black text-white leading-[1.18] tracking-tight">
              Đăng ký nhận
            </h2>
            <h2 className="text-[28px] font-black leading-[1.18] tracking-tight mt-1">
              <span style={{
                background: `linear-gradient(135deg, ${C.orangeLight} 0%, ${C.orange} 40%, ${C.purpleBright} 100%)`,
                backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }} className="anim-gradient">nhiều ưu đãi hấp dẫn</span>
            </h2>
            <p className="text-[12px] mt-3 font-light leading-relaxed" style={{ color: C.white45, maxWidth: 260, margin: '12px auto 0' }}>
              Tham gia ngay — 39 suất cuối với giá ưu đãi đặc biệt
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
            <ContactForm />
        </Reveal>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section className="relative overflow-hidden" style={{
        background: `linear-gradient(135deg, ${C.bg3} 0%, ${C.bg4} 100%)`,
        borderTop: '1px solid rgba(124,58,255,0.2)',
        borderBottom: '1px solid rgba(124,58,255,0.2)',
      }}>
        {/* Subtle horizontal glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent 0%, rgba(255,107,32,0.04) 50%, transparent 100%)` }} />
        <div className="grid grid-cols-4 relative z-10">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} direction="scale">
              <div className={`py-5 text-center ${i < 3 ? 'stat-sep' : ''}`}>
                <div className="font-mono text-[17px] font-bold leading-none text-orange-grad">{s.value}</div>
                <div className="text-[9px] uppercase tracking-[0.15em] mt-2 font-semibold" style={{ color: C.white45, fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ OBJECTIVES ════════════ */}
      <section className="px-5 py-14 bg-grid relative overflow-hidden" style={{ background: C.bg1 }}>
        {/* Large aurora glow behind */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="anim-aurora1 absolute w-[500px] h-[500px] rounded-full opacity-20"
            style={{ top: '0%', left: '50%', transform: 'translateX(-50%)', background: `radial-gradient(circle, ${C.purple} 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="accent-line-center relative z-10">
            <p className="text-center text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: C.orange, fontFamily: "'JetBrains Mono', monospace" }}>Bạn sẽ đạt được</p>
          </div>
          <h2 className="text-center text-[25px] font-black leading-tight mb-8 text-white tracking-tight relative z-10">Mục tiêu khoá học</h2>
        </Reveal>

        {/* Tab buttons */}
        <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
          {objectives.map((obj, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="py-3 px-2 rounded-xl text-[10px] font-bold transition-all duration-300 text-center leading-snug"
              style={{
                background: activeTab === i
                  ? `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeWarm} 100%)`
                  : 'rgba(124,58,255,0.08)',
                color: activeTab === i ? 'white' : C.white45,
                border: activeTab === i ? 'none' : '1px solid rgba(124,58,255,0.2)',
                boxShadow: activeTab === i ? `0 4px 24px rgba(255,107,32,0.4), inset 0 1px 0 rgba(255,255,255,0.2)` : 'none',
                transform: activeTab === i ? 'translateY(-2px)' : 'none',
              }}>
              <span className="block text-xl mb-1.5">{obj.icon}</span>
              <span className="block leading-tight">{obj.title.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="relative z-10" style={{ minHeight: 200 }}>
          {objectives.map((obj, i) => (
            <div key={i} style={{
              position: activeTab === i ? 'relative' : 'absolute',
              top: 0, left: 0, right: 0,
              opacity: activeTab === i ? 1 : 0,
              transform: activeTab === i ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: activeTab === i ? 'auto' : 'none',
            }}>
              <div className="rounded-2xl p-5 overflow-hidden relative" style={{
                background: `linear-gradient(135deg, ${C.bg3} 0%, ${C.bgCard} 100%)`,
                border: '1px solid rgba(124,58,255,0.22)',
                boxShadow: '0 4px 32px rgba(124,58,255,0.1)',
              }}>
                {/* Glow accent top-right */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-2xl overflow-hidden"
                  style={{ background: `radial-gradient(circle at 80% 20%, rgba(255,107,32,0.12) 0%, transparent 70%)` }} />
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,107,32,0.15) 0%, rgba(124,58,255,0.15) 100%)`,
                      border: '1px solid rgba(255,107,32,0.25)',
                    }}>
                    {obj.icon}
                  </div>
                  <h3 className="text-[13px] font-bold text-white leading-tight">{obj.title}</h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {obj.items.map((item, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, boxShadow: `0 2px 8px rgba(255,107,32,0.4)` }}>
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: C.white70 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5 relative z-10">
          {objectives.map((_, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: activeTab === i ? 28 : 6,
                background: activeTab === i
                  ? `linear-gradient(90deg, ${C.orange}, ${C.purpleBright})`
                  : 'rgba(124,58,255,0.25)',
              }} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex justify-center mt-8 relative z-10">
            <button className="relative px-9 py-4 rounded-xl font-bold text-[14px] text-white overflow-hidden anim-glow-orange"
              style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeWarm} 100%)`, fontFamily: "'Outfit', sans-serif" }}>
              <span className="relative z-10 flex items-center gap-2">Đăng ký ngay <span>→</span></span>
              <div className="absolute inset-0 anim-shimmer" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="divider" />

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="relative px-5 py-14 bg-grid-rich noise overflow-hidden" style={{ background: C.bg2 }}>
        {/* Dual aurora */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="anim-aurora2 absolute w-96 h-96 rounded-full opacity-25"
            style={{ top: '-10%', left: '-10%', background: `radial-gradient(circle, ${C.purple} 0%, transparent 70%)` }} />
          <div className="anim-aurora1 absolute w-64 h-64 rounded-full opacity-20"
            style={{ bottom: '0%', right: '-5%', background: `radial-gradient(circle, ${C.orange} 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="accent-line-center">
            <p className="text-center text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: C.purpleBright, fontFamily: "'JetBrains Mono', monospace" }}>Phản hồi thực tế</p>
          </div>
          <h2 className="text-center text-[25px] font-black text-white leading-tight mb-2 tracking-tight">
            Ứng dụng AI — <span style={{ color: C.orangeLight }}>Kết quả thật</span>
          </h2>
          <p className="text-center text-[12px] mb-8 max-w-[270px] mx-auto leading-relaxed" style={{ color: C.white45 }}>
            Hàng trăm học viên đã ứng dụng AI để tiết kiệm thời gian và tăng thu nhập
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative" {...testimonialSwipe}>
            <div className="overflow-hidden rounded-2xl" style={{
              boxShadow: `0 8px 48px rgba(124,58,255,0.2), 0 0 0 1px rgba(124,58,255,0.15)`,
            }}>
              <div className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-0.5">
                    <div className="rounded-2xl overflow-hidden">
                      <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/9fb42a7a2eb8a0e6f9a9.jpg.jpg"
                        alt="Testimonial" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: testimonialIdx === i ? 28 : 6,
                    background: testimonialIdx === i
                      ? `linear-gradient(90deg, ${C.purple}, ${C.purpleBright})`
                      : 'rgba(124,58,255,0.25)',
                  }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex justify-center mt-7">
            <button className="px-9 py-3.5 rounded-xl font-bold text-[14px] anim-glow-purple transition-all"
              style={{
                background: `linear-gradient(135deg, ${C.purpleMid} 0%, ${C.purple} 100%)`,
                color: 'white',
                boxShadow: `0 4px 24px rgba(124,58,255,0.4)`,
              }}>
              Đăng ký ngay
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ FORM 2 ════════════ */}
      <section className="relative px-5 py-14 overflow-hidden" style={{
        background: `linear-gradient(145deg, ${C.bg3} 0%, ${C.bg2} 100%)`,
        borderTop: '1px solid rgba(124,58,255,0.15)',
      }}>
        {/* Orange accent top bar */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${C.orange} 50%, transparent 100%)` }} />

        <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(255,107,32,0.1) 0%, transparent 70%)` }} />
        <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(124,58,255,0.12) 0%, transparent 70%)` }} />

        <Reveal>
          <div className="text-center mb-8 relative z-10">
            <div className="anim-float inline-block text-5xl mb-4">📚</div>
            <h2 className="text-[24px] font-black text-white leading-tight tracking-tight">Điền thông tin bên dưới</h2>
            <p className="text-[13px] mt-2 font-light" style={{ color: C.white45 }}>để nhận tài liệu miễn phí</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </section>

      {/* ════════════ VIDEOS ════════════ */}
      <section className="px-5 py-14 bg-grid-lines relative overflow-hidden" style={{ background: C.bg1 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,255,0.08) 0%, transparent 70%)` }} />

        <Reveal>
          <div className="accent-line-center relative z-10">
            <p className="text-center text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: C.purpleBright, fontFamily: "'JetBrains Mono', monospace" }}>MAXEDU Studio</p>
          </div>
          <h2 className="text-center text-[25px] font-black leading-tight mb-1 tracking-tight text-white relative z-10">
            Video AI <span className="text-orange-grad">mọi chủ đề</span>
          </h2>
          <p className="text-center text-[11px] mb-8 relative z-10" style={{ color: C.white45 }}>Học viên MAXEDU tạo ra bằng kỹ năng AI</p>
        </Reveal>

        <div className="space-y-4 relative z-10">
          {videos.slice(0, showVideos).map((v, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="rounded-2xl overflow-hidden card-glow" style={{
                border: '1px solid rgba(124,58,255,0.18)',
                background: C.bgCard,
              }}>
                <div style={{ background: C.bg0 }}>
                  <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy" className="block" />
                </div>
                <div className="px-4 py-3.5 flex items-center gap-3" style={{
                  background: `linear-gradient(135deg, ${C.bg3} 0%, ${C.bgCard} 100%)`,
                  borderTop: '1px solid rgba(124,58,255,0.12)',
                }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeWarm} 100%)`,
                      boxShadow: '0 2px 12px rgba(255,107,32,0.4)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-[13px] font-semibold" style={{ color: C.white90 }}>{v.title}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {showVideos < videos.length && (
          <Reveal>
            <div className="flex justify-center mt-7 relative z-10">
              <button onClick={() => setShowVideos(videos.length)}
                className="px-7 py-3 rounded-xl text-[12px] font-bold transition-all"
                style={{
                  background: 'transparent',
                  color: C.purpleBright,
                  border: `1.5px solid rgba(124,58,255,0.35)`,
                }}>
                Xem thêm {videos.length - showVideos} video ↓
              </button>
            </div>
          </Reveal>
        )}
      </section>

      {/* ════════════ GALLERY GRID ════════════ */}
      <section className="relative px-5 py-14 noise overflow-hidden" style={{ background: C.bg2 }}>
        {/* Purple accent top */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${C.purple} 50%, transparent 100%)` }} />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="anim-aurora2 absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, rgba(124,58,255,0.6) 0%, transparent 70%)` }} />
          <div className="anim-aurora1 absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, rgba(255,107,32,0.5) 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="accent-line-center">
            <p className="text-center text-[10px] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: C.purpleLight, fontFamily: "'JetBrains Mono', monospace" }}>Portfolio</p>
          </div>
          <h2 className="text-center text-[22px] font-black text-white leading-tight mb-8 tracking-tight">
            Tạo ảnh xây nhân hiệu,<br />
            <span className="text-orange-grad">poster & phục vụ công việc</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 relative z-10">
          {galleryImages.map((_, i) => (
            <Reveal key={i} delay={i * 0.06} direction="scale">
              <div className="rounded-2xl overflow-hidden card-glow" style={{
                aspectRatio: '1/1',
                border: '1px solid rgba(124,58,255,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}>
                <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014034/demo/212973ed772ff971a03e.jpg.jpg"
                  alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="flex justify-center mt-8 relative z-10">
            <button className="relative px-9 py-4 rounded-xl font-bold text-[14px] overflow-hidden anim-glow-orange"
              style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeWarm} 100%)`, color: 'white' }}>
              <span className="relative z-10">Thực chiến tạo video viral 🔥</span>
              <div className="absolute inset-0 anim-shimmer" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ GALLERY SLIDER ════════════ */}
      <section className="relative py-6 overflow-hidden" style={{ background: C.bg0 }} {...gallerySwipe}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 100% 100% at 50% 50%, rgba(124,58,255,0.06) 0%, transparent 70%)` }} />
        <div className="overflow-hidden px-5 relative z-10">
          <div className="flex transition-transform duration-600 ease-[cubic-bezier(.16,1,.3,1)] gap-4"
            style={{ transform: `translateX(calc(-${gallerySlideIdx * 100}% - ${gallerySlideIdx * 16}px))` }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full flex-shrink-0 rounded-2xl overflow-hidden" style={{
                border: '1px solid rgba(124,58,255,0.18)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}>
                <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/d5afc963f3a17dff24b0.jpg.jpg"
                  alt={`Gallery Slide ${i + 1}`} className="w-full h-auto block" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 pt-5 pb-1 relative z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} onClick={() => setGallerySlideIdx(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: gallerySlideIdx === i ? 28 : 6,
                background: gallerySlideIdx === i
                  ? `linear-gradient(90deg, ${C.orange}, ${C.purpleBright})`
                  : 'rgba(124,58,255,0.2)',
              }} />
          ))}
        </div>
      </section>

      {/* ════════════ GUIDE IMAGE ════════════ */}
      <section style={{ background: C.bg1 }}>
        <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014590/demo/khoa_co_ban_video_399k_ypvGvvLkRBS79hp5F-original.jpg.jpg"
          alt="Hướng dẫn đăng ký" className="w-full h-auto block" />
      </section>

      {/* ════════════ ORANGE CTA + FORM 3 ════════════ */}
      <section className="relative px-5 py-14 overflow-hidden noise" style={{
        background: `linear-gradient(145deg, ${C.bg3} 0%, ${C.bg4} 100%)`,
        borderTop: '1px solid rgba(255,107,32,0.15)',
      }}>
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${C.orange} 50%, transparent 100%)` }} />

        {/* Big orange glow corner */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(255,107,32,0.15) 0%, transparent 70%)` }} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(124,58,255,0.12) 0%, transparent 70%)` }} />

        {/* Decorative ring */}
        <div className="hex-ring w-48 h-48" style={{ top: '-60px', left: '-60px', borderColor: 'rgba(255,107,32,0.12)' }} />
        <div className="hex-ring w-32 h-32" style={{ top: '-32px', left: '-32px', borderColor: 'rgba(255,107,32,0.08)' }} />

        <Reveal>
          <div className="text-center mb-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase mb-5"
              style={{ background: 'rgba(255,107,32,0.12)', color: C.orangeLight, border: '1px solid rgba(255,107,32,0.25)' }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: C.orange, boxShadow: `0 0 8px ${C.orange}` }} />
              ⏰ Cơ hội cuối cùng
            </span>
            <h2 className="text-[26px] font-black text-white leading-tight tracking-tight">
              39 XUẤT HỌC VỚI GIÁ<br />
              <span className="text-orange-grad">ƯU ĐÃI & QUÀ TẶNG</span>
            </h2>
            <p className="text-[14px] font-semibold mt-3" style={{ color: C.white45 }}>Chỉ còn 39 xuất cuối cùng</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
        <ContactForm />
        </Reveal>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="relative px-5 py-20 text-center bg-grid-rich noise overflow-hidden" style={{ background: C.bg0 }}>
        <div className="absolute top-0 inset-x-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${C.purple} 50%, transparent 100%)` }} />

        {/* Deep aurora background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="anim-aurora1 absolute w-[500px] h-[500px] rounded-full opacity-20"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: `radial-gradient(circle, ${C.purple} 0%, transparent 70%)` }} />
          <div className="anim-aurora2 absolute w-64 h-64 rounded-full opacity-15"
            style={{ bottom: '-5%', right: '-5%', background: `radial-gradient(circle, ${C.orange} 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="anim-float inline-block text-6xl mb-7 relative z-10">🎯</div>
          <h2 className="text-[28px] font-black text-white leading-[1.2] mb-3 tracking-tight relative z-10">
            Bắt đầu hành trình
          </h2>
          <h2 className="text-[28px] font-black leading-[1.2] mb-4 tracking-tight relative z-10">
            <span className="anim-gradient" style={{
              background: `linear-gradient(135deg, ${C.orangeLight} 0%, ${C.orange} 35%, ${C.purpleBright} 65%, ${C.pink} 100%)`,
              backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>làm chủ AI ngay hôm nay</span>
          </h2>
          <p className="text-[12px] mb-10 font-light relative z-10" style={{ color: C.white45 }}>Đừng bỏ lỡ cơ hội thay đổi sự nghiệp</p>

          <button className="w-full py-4.5 py-[18px] rounded-xl font-bold text-[15px] text-white relative z-10 anim-glow-orange overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeWarm} 50%, ${C.purple} 100%)`,
              backgroundSize: '200% 200%',
            }}>
            <span className="relative z-10">Đăng ký khoá học ngay →</span>
            <div className="absolute inset-0 anim-shimmer" />
          </button>
        </Reveal>

        <div className="mt-14 pt-6 relative z-10" style={{ borderTop: '1px solid rgba(124,58,255,0.15)' }}>
          <p className="text-[10px] tracking-widest" style={{ color: C.white20, fontFamily: "'JetBrains Mono', monospace" }}>
            © 2025 MAXEDU · All rights reserved
          </p>
        </div>
      </section>
    </div>
  );
}
