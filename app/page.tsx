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
  purple: '#5712a8', purpleLight: '#7b3fe0', purpleDark: '#3d0b78', purpleDeep: '#2a0660',
  orange: '#f06223', orangeLight: '#ff8a50', orangeWarm: '#ff6b35', orangeDark: '#c44a15',
  cream: '#fdfaf6', dark: '#0f0a18', darkCard: '#1a1025',
};

/* ───────────────── data (unchanged) ───────────────── */
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
    <div className="max-w-[430px] mx-auto overflow-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .font-mono { font-family: 'DM Mono', monospace; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(240,98,35,0.3)} 50%{box-shadow:0 0 40px rgba(240,98,35,0.6)} }
        @keyframes border-glow { 0%,100%{border-color:rgba(255,138,80,0.3)} 50%{border-color:rgba(255,138,80,0.7)} }

        .anim-float { animation: float 3s ease-in-out infinite; }
        .anim-shimmer { background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent); background-size:200% 100%; animation:shimmer 2.5s infinite; }
        .anim-marquee { animation: marquee 25s linear infinite; }
        .anim-gradient { background-size:200% 200%; animation:gradient-x 4s ease infinite; }
        .anim-glow { animation: glow-pulse 2s ease-in-out infinite; }
        .anim-border-glow { animation: border-glow 2s ease-in-out infinite; }

        .glass { backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1); }
        .glass-strong { backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.15); }

        .scroll-hide::-webkit-scrollbar{display:none} .scroll-hide{-ms-overflow-style:none;scrollbar-width:none}

        .bg-dots { background-image:radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px); background-size:24px 24px; }

        .tab-active { box-shadow:0 8px 32px rgba(240,98,35,0.15), 0 0 0 1px rgba(240,98,35,0.2); }
      `}</style>

      {/* ════════════ HERO ════════════ */}
      <section className="relative w-full">
        <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772012420/demo/45_k9GZXXLBqtavWsW3Y-original.png.png"
          alt="Hero Banner" className="w-full h-auto block" />
        <div className="absolute bottom-0 inset-x-0 h-32" style={{ background: `linear-gradient(to top, ${C.dark}, transparent)` }} />
      </section>

      {/* ════════════ MARQUEE ════════════ */}
      <div style={{ background: C.orange }} className="py-2 overflow-hidden">
        <div className="anim-marquee whitespace-nowrap flex">
          {[0,1].map(i => (
            <span key={i} className="inline-flex gap-6 text-white font-semibold text-[11px] tracking-[0.15em] uppercase px-3">
              <span>🔥 Ưu đãi có hạn</span><span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span><span>💡 5000+ học viên</span>
              <span>🔥 Ưu đãi có hạn</span><span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span><span>💡 5000+ học viên</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════ FORM 1 ════════════ */}
      <section className="relative px-5 pt-10 pb-12 bg-dots" style={{ background: C.dark }}>
        <div className="absolute top-10 -left-20 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: C.purple }} />
        <div className="absolute bottom-10 -right-16 w-36 h-36 rounded-full opacity-15 blur-3xl" style={{ background: C.orange }} />

        <Reveal>
          <div className="text-center mb-8 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase mb-5 anim-border-glow"
              style={{ color: C.orangeLight, border: '1.5px solid rgba(255,138,80,0.4)', background: 'rgba(240,98,35,0.08)' }}>
              Đăng ký ngay hôm nay
            </span>
            <h2 className="text-[26px] font-extrabold text-white leading-[1.25]">
              Đăng ký nhận<br />
              <span className="anim-gradient" style={{
                background: `linear-gradient(135deg, ${C.orangeLight}, ${C.orange}, ${C.orangeLight})`,
                backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>nhiều ưu đãi hấp dẫn</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass rounded-3xl p-5 relative z-10"><ContactForm /></div>
        </Reveal>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section className="grid grid-cols-4" style={{ background: C.purpleDark }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.06} direction="scale">
            <div className="py-5 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div className="font-mono text-[17px] font-bold" style={{ color: C.orangeLight }}>{s.value}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-[0.15em] mt-1.5 font-medium">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ════════════ OBJECTIVES ════════════ */}
      <section className="px-5 py-10" style={{ background: C.cream }}>
        <Reveal>
          <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: C.orange }}>Bạn sẽ đạt được</p>
          <h2 className="text-center text-[24px] font-extrabold leading-tight mb-8" style={{ color: C.dark }}>Mục tiêu khoá học</h2>
        </Reveal>

        <div className="flex gap-2 mb-6 overflow-x-auto scroll-hide pb-1">
          {objectives.map((obj, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="flex-shrink-0 px-4 py-2.5 rounded-2xl text-[11px] font-bold transition-all duration-400 whitespace-nowrap"
              style={{
                background: activeTab === i ? `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})` : 'white',
                color: activeTab === i ? 'white' : C.purple,
                boxShadow: activeTab === i ? '0 4px 16px rgba(87,18,168,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
              }}>
              {obj.icon} {obj.title.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        <div className="relative" style={{ minHeight: 180 }}>
          {objectives.map((obj, i) => (
            <div key={i} style={{
              position: activeTab === i ? 'relative' : 'absolute', top: 0, left: 0, right: 0,
              opacity: activeTab === i ? 1 : 0, transform: activeTab === i ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease', pointerEvents: activeTab === i ? 'auto' : 'none',
            }}>
              <div className="rounded-3xl p-6 tab-active" style={{ background: 'white' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `linear-gradient(135deg, ${C.purple}15, ${C.orange}10)` }}>{obj.icon}</div>
                  <h3 className="text-[15px] font-extrabold" style={{ color: C.dark }}>{obj.title}</h3>
                </div>
                <div className="space-y-3.5">
                  {obj.items.map((item, j) => (
                    <div key={j} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})` }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="flex justify-center mt-8">
            <button className="relative px-8 py-3.5 rounded-2xl font-bold text-[13px] text-white overflow-hidden anim-glow"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeWarm})` }}>
              <span className="relative z-10">Đăng ký ngay →</span>
              <div className="absolute inset-0 anim-shimmer" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="relative px-5 py-10 bg-dots" style={{ background: `linear-gradient(170deg, ${C.dark} 0%, ${C.purpleDeep} 100%)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-[80px]" style={{ background: C.purple }} />

        <Reveal>
          <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: C.orangeLight }}>Phản hồi thực tế</p>
          <h2 className="text-center text-[24px] font-extrabold text-white leading-tight mb-2">Ứng dụng AI — Kết quả thật</h2>
          <p className="text-center text-[12px] text-white/40 mb-8 max-w-[300px] mx-auto leading-relaxed">
            Hàng trăm học viên đã ứng dụng AI để tiết kiệm thời gian và tăng thu nhập
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative" {...testimonialSwipe}>
            <div className="overflow-hidden rounded-3xl">
              <div className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-0.5">
                    <div className="glass-strong rounded-3xl overflow-hidden">
                      <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/9fb42a7a2eb8a0e6f9a9.jpg.jpg"
                        alt="Testimonial" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-1.5 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} className="h-[5px] rounded-full transition-all duration-500"
                  style={{
                    width: testimonialIdx === i ? 28 : 5,
                    background: testimonialIdx === i ? `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})` : 'rgba(255,255,255,0.15)',
                  }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex justify-center mt-7">
            <button className="px-8 py-3 rounded-2xl font-bold text-[13px] transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.15)' }}>
              Đăng ký ngay
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ FORM 2 ════════════ */}
      <section className="relative px-5 py-10 overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${C.orange} 0%, ${C.orangeDark} 100%)` }}>
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-20" style={{ background: 'white' }} />
        <Reveal>
          <div className="text-center mb-8 relative z-10">
            <div className="anim-float inline-block text-4xl mb-3">📚</div>
            <h2 className="text-[22px] font-extrabold text-white leading-tight">Điền thông tin bên dưới</h2>
            <p className="text-[14px] text-white/70 mt-1 font-light">để nhận tài liệu miễn phí</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass-strong rounded-3xl p-5 relative z-10"><ContactForm /></div>
        </Reveal>
      </section>

      {/* ════════════ VIDEOS ════════════ */}
      <section className="px-5 py-10" style={{ background: C.cream }}>
        <Reveal>
          <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: C.purple }}>MAXEDU Studio</p>
          <h2 className="text-center text-[24px] font-extrabold leading-tight mb-1" style={{ color: C.dark }}>
            Video AI <span style={{ color: C.orange }}>mọi chủ đề</span>
          </h2>
          <p className="text-center text-[11px] text-gray-400 mb-8">Học viên MAXEDU tạo ra bằng kỹ năng AI</p>
        </Reveal>

        <div className="space-y-4">
          {videos.slice(0, showVideos).map((v, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                <div className="bg-black">
                  <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy" className="block" />
                </div>
                <div className="bg-white px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})` }}>{i + 1}</div>
                  <span className="text-[13px] font-semibold" style={{ color: C.dark }}>{v.title}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {showVideos < videos.length && (
          <Reveal>
            <div className="flex justify-center mt-6">
              <button onClick={() => setShowVideos(videos.length)}
                className="px-6 py-3 rounded-2xl text-[12px] font-bold transition-all"
                style={{ background: 'white', color: C.purple, border: `2px solid ${C.purple}20`, boxShadow: '0 2px 12px rgba(87,18,168,0.08)' }}>
                Xem thêm {videos.length - showVideos} video ↓
              </button>
            </div>
          </Reveal>
        )}
      </section>

      {/* ════════════ GALLERY GRID ════════════ */}
      <section className="relative px-5 py-10 bg-dots"
        style={{ background: `linear-gradient(160deg, ${C.purple} 0%, ${C.purpleDeep} 100%)` }}>
        <Reveal>
          <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: C.orangeLight }}>Portfolio</p>
          <h2 className="text-center text-[22px] font-extrabold text-white leading-tight mb-8">
            Tạo ảnh xây nhân hiệu,<br /><span style={{ color: C.orangeLight }}>poster & phục vụ công việc</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((_, i) => (
            <Reveal key={i} delay={i * 0.06} direction="scale">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: i % 2 === 0 ? '3/4' : '1/1', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014034/demo/212973ed772ff971a03e.jpg.jpg"
                  alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="flex justify-center mt-8">
            <button className="relative px-8 py-3.5 rounded-2xl font-bold text-[13px] overflow-hidden"
              style={{ background: C.orange, color: 'white', boxShadow: '0 4px 20px rgba(240,98,35,0.4)' }}>
              <span className="relative z-10">Thực chiến tạo video viral 🔥</span>
              <div className="absolute inset-0 anim-shimmer" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* ════════════ GALLERY SLIDER ════════════ */}
      <section className="relative" style={{ background: C.dark }} {...gallerySwipe}>
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
        <div className="flex justify-center gap-1.5 py-5" style={{ background: C.dark }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i} onClick={() => setGallerySlideIdx(i)} className="h-[5px] rounded-full transition-all duration-500"
              style={{
                width: gallerySlideIdx === i ? 28 : 5,
                background: gallerySlideIdx === i ? `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})` : 'rgba(255,255,255,0.12)',
              }} />
          ))}
        </div>
      </section>

      {/* ════════════ GUIDE IMAGE ════════════ */}
      <section style={{ background: C.dark }}>
        <img src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014590/demo/khoa_co_ban_video_399k_ypvGvvLkRBS79hp5F-original.jpg.jpg"
          alt="Hướng dẫn đăng ký" className="w-full h-auto block" />
        <div className="px-5 py-6" style={{ background: C.dark }}>
          <Reveal>
            <button className="w-full py-4 rounded-2xl font-bold text-[12px] leading-snug anim-gradient"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)', backgroundSize: '200% 200%', color: C.dark }}>
              HƯỚNG DẪN CHI TIẾT CÁC BƯỚC ĐĂNG KÝ<br />NHẬN TÀI LIỆU MIỄN PHÍ TẠI MAXEDU
            </button>
          </Reveal>
        </div>
      </section>

      {/* ════════════ ORANGE CTA + FORM 3 ════════════ */}
      <section className="relative px-5 py-10 overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${C.orange} 0%, ${C.orangeDark} 60%, ${C.purpleDark} 100%)` }}>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-15 blur-3xl" style={{ background: C.purple }} />

        <Reveal>
          <div className="text-center mb-4 relative z-10">
            <span className="inline-block px-5 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
              ⏰ Cơ hội cuối cùng
            </span>
            <h2 className="text-[24px] font-extrabold text-white leading-tight">
              39 XUẤT HỌC VỚI GIÁ<br />ƯU ĐÃI & QUÀ TẶNG
            </h2>
            <p className="text-[15px] font-semibold text-white/80 mt-3">Chỉ còn 39 xuất cuối cùng</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass-strong rounded-3xl p-5 relative z-10 mt-6"><ContactForm /></div>
        </Reveal>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="relative px-5 py-14 text-center bg-dots" style={{ background: C.dark }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-10 blur-[60px]" style={{ background: C.orange }} />

        <Reveal>
          <div className="anim-float inline-block text-5xl mb-5">🎯</div>
          <h2 className="text-[26px] font-extrabold text-white leading-[1.2] mb-3">
            Bắt đầu hành trình<br />
            <span className="anim-gradient" style={{
              background: `linear-gradient(135deg, ${C.orangeLight}, ${C.orange}, ${C.orangeLight})`,
              backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>làm chủ AI ngay hôm nay</span>
          </h2>
          <p className="text-[12px] text-white/35 mb-8 font-light">Đừng bỏ lỡ cơ hội thay đổi sự nghiệp</p>

          <button className="w-full py-4 rounded-2xl font-bold text-[15px] text-white anim-gradient anim-glow"
            style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.purpleLight}, ${C.orange})`, backgroundSize: '200% 200%' }}>
            Đăng ký khoá học ngay →
          </button>
        </Reveal>

        <div className="mt-12 pt-6 border-t border-white/[0.06]">
          <p className="text-[10px] text-white/20 font-mono tracking-wider">© 2025 MAXEDU · All rights reserved</p>
        </div>
      </section>
    </div>
  );
}