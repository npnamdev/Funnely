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
    up: 'translateY(40px)', left: 'translateX(-30px)', right: 'translateX(30px)', scale: 'scale(0.92)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
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

/* ───────────────── colour system ───────────────── */
const C = {
  // Pure blacks & darks
  black: '#000000',
  darkest: '#080808',
  dark1: '#0d0d0d',
  dark2: '#111111',
  dark3: '#161616',
  dark4: '#1c1c1c',
  darkCard: '#141414',
  darkCardBorder: '#1f1f1f',

  // Orange spectrum
  orange: '#f06223',
  orangeLight: '#ff8040',
  orangeWarm: '#ff6b35',
  orangeBright: '#ff7040',
  orangeDark: '#c44a15',
  orangeGlow: 'rgba(240,98,35,0.15)',

  // Purple spectrum
  purple: '#7b2fff',
  purpleLight: '#9d5cff',
  purpleMid: '#6020d0',
  purpleDark: '#4010a0',
  purpleDeep: '#2a0870',
  purpleGlow: 'rgba(123,47,255,0.15)',

  // Text
  white: '#ffffff',
  white80: 'rgba(255,255,255,0.80)',
  white50: 'rgba(255,255,255,0.50)',
  white30: 'rgba(255,255,255,0.30)',
  white10: 'rgba(255,255,255,0.10)',
  white06: 'rgba(255,255,255,0.06)',
  white04: 'rgba(255,255,255,0.04)',
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
    <div className="max-w-[430px] mx-auto overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif", background: C.black }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes glow-pulse-orange { 0%,100%{box-shadow:0 0 20px rgba(240,98,35,0.25), 0 0 40px rgba(240,98,35,0.1)} 50%{box-shadow:0 0 35px rgba(240,98,35,0.5), 0 0 60px rgba(240,98,35,0.2)} }
        @keyframes glow-pulse-purple { 0%,100%{box-shadow:0 0 20px rgba(123,47,255,0.25)} 50%{box-shadow:0 0 35px rgba(123,47,255,0.5)} }
        @keyframes border-rotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes scan-line { 0%{top:0%} 100%{top:100%} }
        @keyframes noise-flicker { 0%,100%{opacity:0.03} 50%{opacity:0.06} }

        .anim-float { animation: float 3s ease-in-out infinite; }
        .anim-shimmer { background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent); background-size:200% 100%; animation:shimmer 2.5s infinite; }
        .anim-marquee { animation: marquee 25s linear infinite; }
        .anim-gradient { background-size:200% 200%; animation:gradient-x 4s ease infinite; }
        .anim-glow-orange { animation: glow-pulse-orange 2.5s ease-in-out infinite; }
        .anim-glow-purple { animation: glow-pulse-purple 2.5s ease-in-out infinite; }

        /* Glass variants */
        .glass-dark { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
        .glass-orange { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(240,98,35,0.06); border:1px solid rgba(240,98,35,0.15); }
        .glass-purple { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(123,47,255,0.06); border:1px solid rgba(123,47,255,0.15); }

        /* Noise texture overlay */
        .noise::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); opacity:0.04; pointer-events:none; mix-blend-mode:overlay; }

        .scroll-hide::-webkit-scrollbar{display:none} .scroll-hide{-ms-overflow-style:none;scrollbar-width:none}

        /* Grid dot pattern */
        .bg-grid { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; }

        /* Orange accent line */
        .accent-line::before { content:''; display:block; width:40px; height:3px; background:linear-gradient(90deg, #f06223, #ff8040); border-radius:2px; margin-bottom:12px; }
        .accent-line-center::before { content:''; display:block; width:40px; height:3px; background:linear-gradient(90deg, #f06223, #7b2fff); border-radius:2px; margin:0 auto 12px; }

        /* Tab underline indicator */
        .tab-pill { position: relative; }
        .tab-pill.active::after { content:''; position:absolute; bottom:-2px; left:50%; transform:translateX(-50%); width:20px; height:2px; background:#f06223; border-radius:2px; }

        /* Card hover glow */
        .card-hover { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        .card-hover:hover { box-shadow: 0 8px 32px rgba(240,98,35,0.1); transform: translateY(-2px); }

        /* Number badge */
        .num-badge { background: linear-gradient(135deg, #f06223, #ff8040); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        /* Divider */
        .divider { height:1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); }

        /* Stat separator */
        .stat-sep { border-right: 1px solid rgba(255,255,255,0.07); }
      `}</style>

      {/* ════════════ HERO ════════════ */}
      <section className="relative w-full" style={{ background: C.black }}>
        <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772012420/demo/45_k9GZXXLBqtavWsW3Y-original.png.png"
          alt="Hero Banner" className="w-full h-auto block" />
        <div className="absolute bottom-0 inset-x-0 h-40" style={{ background: `linear-gradient(to top, ${C.black}, transparent)` }} />
      </section>

      {/* ════════════ MARQUEE ════════════ */}
      <div className="py-2.5 overflow-hidden relative" style={{ background: `linear-gradient(90deg, ${C.orange}, ${C.orangeDark})` }}>
        <div className="anim-marquee whitespace-nowrap flex">
          {[0,1].map(i => (
            <span key={i} className="inline-flex gap-8 font-semibold text-[10px] tracking-[0.18em] uppercase px-4" style={{ color: 'rgba(255,255,255,0.95)' }}>
              <span>🔥 Ưu đãi có hạn</span><span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span><span>💡 5000+ học viên</span>
              <span>🔥 Ưu đãi có hạn</span><span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span><span>💡 5000+ học viên</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════ FORM 1 ════════════ */}
      <section className="relative px-5 pt-12 pb-12 noise bg-grid" style={{ background: C.dark1 }}>
        {/* Glow blobs */}
        <div className="absolute top-0 left-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)`, transform: 'translate(-40%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(240,98,35,0.1) 0%, transparent 70%)`, transform: 'translate(30%, 20%)' }} />

        <Reveal>
          <div className="text-center mb-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: C.orangeLight, background: 'rgba(240,98,35,0.1)', border: '1px solid rgba(240,98,35,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: C.orange }} />
              Đăng ký ngay hôm nay
            </span>
            <h2 className="text-[27px] font-black text-white leading-[1.2] tracking-tight">
              Đăng ký nhận
            </h2>
            <h2 className="text-[27px] font-black leading-[1.2] tracking-tight mt-1">
              <span style={{
                background: `linear-gradient(135deg, ${C.orangeLight}, ${C.orange}, ${C.purple})`,
                backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }} className="anim-gradient">nhiều ưu đãi hấp dẫn</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass-dark rounded-2xl p-5 relative z-10" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section style={{ background: C.dark2, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="grid grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} direction="scale">
              <div className={`py-5 text-center ${i < 3 ? 'stat-sep' : ''}`}>
                <div className="font-mono text-[16px] font-bold leading-none" style={{ color: C.orangeLight }}>{s.value}</div>
                <div className="text-[9px] uppercase tracking-[0.14em] mt-2 font-medium" style={{ color: C.white30 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ OBJECTIVES ════════════ */}
      <section className="px-5 py-12 bg-grid" style={{ background: C.dark1 }}>
        <Reveal>
          <div className="accent-line-center">
            <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: C.orange }}>Bạn sẽ đạt được</p>
          </div>
          <h2 className="text-center text-[24px] font-black leading-tight mb-8 text-white tracking-tight">Mục tiêu khoá học</h2>
        </Reveal>

        {/* Tab buttons — full width, no overflow scroll, evenly spaced */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {objectives.map((obj, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="tab-pill py-2.5 px-2 rounded-xl text-[10px] font-bold transition-all duration-300 text-center leading-snug"
              style={{
                background: activeTab === i
                  ? `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`
                  : 'rgba(255,255,255,0.05)',
                color: activeTab === i ? 'white' : C.white50,
                border: activeTab === i ? 'none' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: activeTab === i ? `0 4px 20px rgba(240,98,35,0.3)` : 'none',
              }}>
              <span className="block text-lg mb-1">{obj.icon}</span>
              <span className="block">{obj.title.split(' ').slice(0,2).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="relative" style={{ minHeight: 190 }}>
          {objectives.map((obj, i) => (
            <div key={i} style={{
              position: activeTab === i ? 'relative' : 'absolute',
              top: 0, left: 0, right: 0,
              opacity: activeTab === i ? 1 : 0,
              transform: activeTab === i ? 'translateX(0)' : 'translateX(16px)',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              pointerEvents: activeTab === i ? 'auto' : 'none',
            }}>
              <div className="rounded-2xl p-5" style={{ background: C.dark3, border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'rgba(240,98,35,0.12)', border: '1px solid rgba(240,98,35,0.2)' }}>
                    {obj.icon}
                  </div>
                  <h3 className="text-[13px] font-bold text-white leading-tight">{obj.title}</h3>
                </div>
                <div className="space-y-3.5">
                  {obj.items.map((item, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})` }}>
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[12.5px] leading-relaxed" style={{ color: C.white50 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {objectives.map((_, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="h-1 rounded-full transition-all duration-400"
              style={{
                width: activeTab === i ? 24 : 5,
                background: activeTab === i ? C.orange : 'rgba(255,255,255,0.15)',
              }} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex justify-center mt-8">
            <button className="relative px-8 py-3.5 rounded-xl font-bold text-[13px] text-white overflow-hidden anim-glow-orange"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})` }}>
              <span className="relative z-10">Đăng ký ngay →</span>
              <div className="absolute inset-0 anim-shimmer" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ DIVIDER ════════════ */}
      <div className="divider" />

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="relative px-5 py-12 bg-grid noise" style={{ background: C.dark1 }}>
        {/* Purple glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full" style={{ background: `radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="accent-line-center">
            <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: C.purpleLight }}>Phản hồi thực tế</p>
          </div>
          <h2 className="text-center text-[24px] font-black text-white leading-tight mb-2 tracking-tight">Ứng dụng AI — Kết quả thật</h2>
          <p className="text-center text-[12px] mb-8 max-w-[280px] mx-auto leading-relaxed" style={{ color: C.white30 }}>
            Hàng trăm học viên đã ứng dụng AI để tiết kiệm thời gian và tăng thu nhập
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative" {...testimonialSwipe}>
            <div className="overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-0.5">
                    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                      <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/9fb42a7a2eb8a0e6f9a9.jpg.jpg"
                        alt="Testimonial" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-1.5 mt-5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className="h-1 rounded-full transition-all duration-400"
                  style={{
                    width: testimonialIdx === i ? 24 : 5,
                    background: testimonialIdx === i ? C.purple : 'rgba(255,255,255,0.12)',
                  }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex justify-center mt-7">
            <button className="px-8 py-3 rounded-xl font-bold text-[13px] transition-all anim-glow-purple"
              style={{ background: `linear-gradient(135deg, ${C.purpleMid}, ${C.purple})`, color: 'white' }}>
              Đăng ký ngay
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ FORM 2 ════════════ */}
      <section className="relative px-5 py-12 overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${C.dark2} 0%, ${C.dark3} 100%)`, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Orange accent top bar */}
        <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${C.orange}, transparent)` }} />

        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(240,98,35,0.08) 0%, transparent 70%)` }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%)` }} />

        <Reveal>
          <div className="text-center mb-8 relative z-10">
            <div className="anim-float inline-block text-4xl mb-4">📚</div>
            <h2 className="text-[23px] font-black text-white leading-tight tracking-tight">Điền thông tin bên dưới</h2>
            <p className="text-[13px] mt-1.5 font-light" style={{ color: C.white30 }}>để nhận tài liệu miễn phí</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass-dark rounded-2xl p-5 relative z-10" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* ════════════ VIDEOS ════════════ */}
      <section className="px-5 py-12 bg-grid" style={{ background: C.dark1 }}>
        <Reveal>
          <div className="accent-line-center">
            <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: C.purple }}>MAXEDU Studio</p>
          </div>
          <h2 className="text-center text-[24px] font-black leading-tight mb-1 tracking-tight" style={{ color: C.white }}>
            Video AI <span style={{ color: C.orangeLight }}>mọi chủ đề</span>
          </h2>
          <p className="text-center text-[11px] mb-8" style={{ color: C.white30 }}>Học viên MAXEDU tạo ra bằng kỹ năng AI</p>
        </Reveal>

        <div className="space-y-4">
          {videos.slice(0, showVideos).map((v, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl overflow-hidden card-hover" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ background: C.black }}>
                  <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy" className="block" />
                </div>
                <div className="px-4 py-3 flex items-center gap-3" style={{ background: C.dark3 }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 font-mono"
                    style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})` }}>
                    {String(i + 1).padStart(2,'0')}
                  </div>
                  <span className="text-[13px] font-semibold" style={{ color: C.white80 }}>{v.title}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {showVideos < videos.length && (
          <Reveal>
            <div className="flex justify-center mt-6">
              <button onClick={() => setShowVideos(videos.length)}
                className="px-6 py-3 rounded-xl text-[12px] font-bold transition-all"
                style={{ background: 'transparent', color: C.orange, border: `1.5px solid rgba(240,98,35,0.3)` }}>
                Xem thêm {videos.length - showVideos} video ↓
              </button>
            </div>
          </Reveal>
        )}
      </section>

      {/* ════════════ GALLERY GRID ════════════ */}
      <section className="relative px-5 py-12 noise" style={{ background: C.dark2 }}>
        {/* Purple accent top */}
        <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${C.purple}, transparent)` }} />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-20 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)` }} />
          <div className="absolute -bottom-10 -left-20 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, rgba(240,98,35,0.06) 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="accent-line-center">
            <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: C.purpleLight }}>Portfolio</p>
          </div>
          <h2 className="text-center text-[22px] font-black text-white leading-tight mb-8 tracking-tight">
            Tạo ảnh xây nhân hiệu,<br />
            <span style={{ color: C.orangeLight }}>poster & phục vụ công việc</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((_, i) => (
            <Reveal key={i} delay={i * 0.06} direction="scale">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: i % 2 === 0 ? '3/4' : '1/1', border: '1px solid rgba(255,255,255,0.07)' }}>
                <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014034/demo/212973ed772ff971a03e.jpg.jpg"
                  alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="flex justify-center mt-8">
            <button className="relative px-8 py-3.5 rounded-xl font-bold text-[13px] overflow-hidden anim-glow-orange"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`, color: 'white' }}>
              <span className="relative z-10">Thực chiến tạo video viral 🔥</span>
              <div className="absolute inset-0 anim-shimmer" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ GALLERY SLIDER ════════════ */}
      <section className="relative" style={{ background: C.black }} {...gallerySwipe}>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-600 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ transform: `translateX(-${gallerySlideIdx * 100}%)` }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/d5afc963f3a17dff24b0.jpg.jpg"
                  alt={`Gallery Slide ${i + 1}`} className="w-full h-auto block" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-1.5 py-5" style={{ background: C.dark1 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} onClick={() => setGallerySlideIdx(i)}
              className="h-1 rounded-full transition-all duration-400"
              style={{
                width: gallerySlideIdx === i ? 24 : 5,
                background: gallerySlideIdx === i ? C.orange : 'rgba(255,255,255,0.12)',
              }} />
          ))}
        </div>
      </section>

      {/* ════════════ GUIDE IMAGE ════════════ */}
      <section style={{ background: C.dark1 }}>
        <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014590/demo/khoa_co_ban_video_399k_ypvGvvLkRBS79hp5F-original.jpg.jpg"
          alt="Hướng dẫn đăng ký" className="w-full h-auto block" />
        <div className="px-5 py-6" style={{ background: C.dark1 }}>
          <Reveal>
            <button className="w-full py-4 rounded-xl font-bold text-[12px] leading-snug anim-gradient"
              style={{
                background: `linear-gradient(135deg, ${C.orange}, #FFB800, ${C.orange})`,
                backgroundSize: '200% 200%', color: C.black
              }}>
              HƯỚNG DẪN CHI TIẾT CÁC BƯỚC ĐĂNG KÝ<br />NHẬN TÀI LIỆU MIỄN PHÍ TẠI MAXEDU
            </button>
          </Reveal>
        </div>
      </section>

      {/* ════════════ ORANGE CTA + FORM 3 ════════════ */}
      <section className="relative px-5 py-12 overflow-hidden noise"
        style={{ background: C.dark2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Orange glow top left */}
        <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${C.orange}, transparent)` }} />
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(240,98,35,0.1) 0%, transparent 70%)` }} />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%)` }} />

        <Reveal>
          <div className="text-center mb-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase mb-5"
              style={{ background: 'rgba(240,98,35,0.12)', color: C.orangeLight, border: '1px solid rgba(240,98,35,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block anim-glow-orange" style={{ background: C.orange }} />
              ⏰ Cơ hội cuối cùng
            </span>
            <h2 className="text-[25px] font-black text-white leading-tight tracking-tight">
              39 XUẤT HỌC VỚI GIÁ<br />
              <span style={{ color: C.orangeLight }}>ƯU ĐÃI & QUÀ TẶNG</span>
            </h2>
            <p className="text-[14px] font-semibold mt-3" style={{ color: C.white50 }}>Chỉ còn 39 xuất cuối cùng</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass-dark rounded-2xl p-5 relative z-10 mt-6" style={{ border: '1px solid rgba(240,98,35,0.15)' }}>
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="relative px-5 py-16 text-center bg-grid noise" style={{ background: C.black }}>
        <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${C.purple}, transparent)` }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, rgba(123,47,255,0.08) 0%, transparent 70%)` }} />
        </div>

        <Reveal>
          <div className="anim-float inline-block text-5xl mb-6">🎯</div>
          <h2 className="text-[27px] font-black text-white leading-[1.2] mb-3 tracking-tight">
            Bắt đầu hành trình
          </h2>
          <h2 className="text-[27px] font-black leading-[1.2] mb-3 tracking-tight">
            <span className="anim-gradient" style={{
              background: `linear-gradient(135deg, ${C.orangeLight}, ${C.orange}, ${C.purpleLight}, ${C.orange})`,
              backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>làm chủ AI ngay hôm nay</span>
          </h2>
          <p className="text-[12px] mb-8 font-light" style={{ color: C.white30 }}>Đừng bỏ lỡ cơ hội thay đổi sự nghiệp</p>

          <button className="w-full py-4 rounded-xl font-bold text-[15px] text-white anim-gradient anim-glow-orange"
            style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.purple}, ${C.orange})`, backgroundSize: '200% 200%' }}>
            Đăng ký khoá học ngay →
          </button>
        </Reveal>

        <div className="mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[10px] font-mono tracking-widest" style={{ color: C.white30 }}>© 2025 MAXEDU · All rights reserved</p>
        </div>
      </section>
    </div>
  );
}
