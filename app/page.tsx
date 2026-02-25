'use client';

import { useState, useEffect, useRef } from 'react';
import { ContactForm } from "@/components/contact-form";

/* ───────────────────────────── helpers ───────────────────────────── */
function useOnScreen(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ───────────────────────── colour tokens ─────────────────────────── */
const C = {
  purple: '#5712a8',
  purpleLight: '#7b3fe0',
  purpleDark: '#3d0b78',
  orange: '#f06223',
  orangeLight: '#ff8a50',
  orangeDark: '#c44a15',
  cream: '#faf6f1',
  dark: '#1a1025',
};

/* ───────────────────────── objectives data ───────────────────────── */
const objectives = [
  {
    icon: '🚀',
    title: 'TĂNG TỐC CÔNG VIỆC',
    items: [
      'Ứng dụng AI trong sáng tạo, Marketing, phân tích dữ liệu và ra chiến lược quyết định',
      'Giảm 80% làm việc thủ công, tập trung vào việc tạo giá trị thực',
    ],
  },
  {
    icon: '💡',
    title: 'LÀM CHỦ CÔNG NGHỆ AI',
    items: [
      'Nắm vững ChatGPT, Midjourney, Runway và hàng chục công cụ AI hàng đầu',
      'Tự tin áp dụng AI vào mọi lĩnh vực từ content, design đến kinh doanh',
    ],
  },
  {
    icon: '💰',
    title: 'TĂNG THU NHẬP BỀN VỮNG',
    items: [
      'Xây dựng kênh Affiliate hiệu quả với video viral AI',
      'Tạo sản phẩm số, dịch vụ AI Freelance & cơ hội nghề nghiệp mới',
    ],
  },
];

/* ───────────────────────── testimonials ──────────────────────────── */
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

/* ───────────────────────── videos data ───────────────────────────── */
const videos = [
  { id: 'XwUPz7MhvjQ', title: 'Tạo video AI từ A-Z' },
  { id: 'XwUPz7MhvjQ', title: 'Làm content với ChatGPT' },
  { id: 'XwUPz7MhvjQ', title: 'Thiết kế poster AI' },
  { id: 'XwUPz7MhvjQ', title: 'Video viral TikTok' },
  { id: 'XwUPz7MhvjQ', title: 'AI Marketing Strategy' },
  { id: 'XwUPz7MhvjQ', title: 'Midjourney nâng cao' },
];

/* ───────────────────────── gallery images ────────────────────────── */
const galleryImages = [
  'https://via.placeholder.com/400x500/5712a8/ffffff?text=Poster+1',
  'https://via.placeholder.com/400x350/f06223/ffffff?text=Brand+2',
  'https://via.placeholder.com/400x450/7b3fe0/ffffff?text=Design+3',
  'https://via.placeholder.com/400x380/c44a15/ffffff?text=Banner+4',
  'https://via.placeholder.com/400x420/3d0b78/ffffff?text=Social+5',
  'https://via.placeholder.com/400x360/ff8a50/ffffff?text=Cover+6',
];

/* ───────────────────────── stats ─────────────────────────────────── */
const stats = [
  { value: '5,000+', label: 'Học viên' },
  { value: '98%', label: 'Hài lòng' },
  { value: '15h+', label: 'Tiết kiệm/tuần' },
  { value: '3x', label: 'Tăng thu nhập' },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */
export default function Page() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [showVideos, setShowVideos] = useState(3); // show 3 initially
  const [activeTab, setActiveTab] = useState(0);
  const [gallerySlideIdx, setGallerySlideIdx] = useState(0);

  // Auto-play testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Auto-play gallery slider
  useEffect(() => {
    const g = setInterval(() => setGallerySlideIdx(p => (p + 1) % 8), 3000);
    return () => clearInterval(g);
  }, []);

  return (
    <div className="max-w-[430px] mx-auto overflow-hidden" style={{ fontFamily: "'Lexend', sans-serif" }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        .font-mono-alt { font-family: 'Space Mono', monospace; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        .glass {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .card-hover {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
        }
        .card-hover:active {
          transform: scale(0.97);
        }

        .dot-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .noise-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="relative w-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772012420/demo/45_k9GZXXLBqtavWsW3Y-original.png.png"
          alt="Hero Banner"
          className="w-full h-auto object-cover"
        />
        {/* Gradient overlay at bottom for smooth transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: `linear-gradient(to top, ${C.purple}, transparent)` }}
        />
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div style={{ background: C.orange }} className="py-2.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex gap-8 text-white font-bold text-xs tracking-widest uppercase">
              <span>🔥 Ưu đãi có hạn</span>
              <span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span>
              <span>💡 5000+ học viên</span>
              <span>🔥 Ưu đãi có hạn</span>
              <span>⚡ Học AI thực chiến</span>
              <span>🚀 Tăng thu nhập 3x</span>
              <span>💡 5000+ học viên</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── CONTACT FORM 1 ─── */}
      <section
        className="relative px-5 py-10 noise-overlay"
        style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleDark} 100%)` }}
      >
        <FadeIn>
          <div className="text-center mb-8">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
              style={{ background: 'rgba(255,255,255,0.12)', color: C.orangeLight, border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Đăng ký ngay hôm nay
            </span>
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              Đăng ký nhận <br />
              <span style={{ color: C.orangeLight }}>nhiều ưu đãi hấp dẫn</span>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="glass rounded-2xl p-5">
            <ContactForm />
          </div>
        </FadeIn>
      </section>

      {/* ─── STATS BAR ─── */}
      <section
        className="grid grid-cols-4 gap-0"
        style={{ background: C.dark }}
      >
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="py-5 text-center border-r border-white/10 last:border-r-0">
              <div className="font-mono-alt text-lg font-bold" style={{ color: C.orangeLight }}>{s.value}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* ─── OBJECTIVES (No slider — stacked cards with tabs) ─── */}
      <section className="relative px-5 py-10" style={{ background: C.cream }}>
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold leading-tight" style={{ color: C.dark }}>
              Mục tiêu <span style={{ color: C.purple }}>khoá học</span>
            </h2>
            <div className="w-12 h-1 rounded-full mx-auto mt-3" style={{ background: C.orange }} />
          </div>
        </FadeIn>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
          {objectives.map((obj, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300"
              style={{
                background: activeTab === i ? C.purple : 'white',
                color: activeTab === i ? 'white' : C.purple,
                border: `2px solid ${C.purple}`,
              }}
            >
              {obj.icon} {obj.title.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        {objectives.map((obj, i) => (
          <div
            key={i}
            className="transition-all duration-500"
            style={{
              display: activeTab === i ? 'block' : 'none',
              opacity: activeTab === i ? 1 : 0,
            }}
          >
            <div
              className="rounded-2xl p-6 card-hover"
              style={{
                background: 'white',
                boxShadow: '0 4px 24px rgba(87,18,168,0.08)',
                borderLeft: `4px solid ${C.purple}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{obj.icon}</span>
                <h3 className="text-base font-extrabold" style={{ color: C.dark }}>{obj.title}</h3>
              </div>
              <div className="space-y-3">
                {obj.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${C.purple}15` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <FadeIn delay={0.2}>
          <div className="flex justify-center mt-8">
            <button
              className="group relative px-8 py-3.5 rounded-full font-bold text-sm text-white overflow-hidden animate-gradient"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight}, ${C.orange})`, backgroundSize: '200% 200%' }}
            >
              <span className="relative z-10">Đăng ký ngay →</span>
              <div className="absolute inset-0 animate-shimmer" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ─── TESTIMONIALS (Slider — makes sense for 8 items) ─── */}
      <section
        className="relative px-5 py-10 noise-overlay dot-pattern"
        style={{ background: `linear-gradient(180deg, ${C.dark} 0%, ${C.purpleDark} 100%)` }}
      >
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              Ứng dụng AI — <span style={{ color: C.orangeLight }}>Kết quả thật</span>
            </h2>
            <p className="text-sm text-white/50 mt-3 leading-relaxed">
              Hàng trăm học viên đã ứng dụng AI để tiết kiệm thời gian và tăng thu nhập
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1">
                    <div className="glass rounded-2xl overflow-hidden">
                      <img
                        src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/9fb42a7a2eb8a0e6f9a9.jpg.jpg"
                        alt="Testimonial"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: testimonialIdx === i ? 24 : 6,
                    background: testimonialIdx === i ? C.orange : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── CONTACT FORM 2 ─── */}
      <section
        className="relative px-5 py-10"
        style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)` }}
      >
        <FadeIn>
          <div className="text-center mb-8">
            <div className="animate-float inline-block text-4xl mb-3">📚</div>
            <h2 className="text-xl font-extrabold text-white leading-tight">
              Điền thông tin bên dưới<br />
              <span className="font-light opacity-80">để nhận tài liệu miễn phí</span>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <ContactForm />
          </div>
        </FadeIn>
      </section>

      {/* ─── VIDEOS (Grid with "show more" — no slider) ─── */}
      <section className="px-5 py-10" style={{ background: C.cream }}>
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold leading-tight" style={{ color: C.dark }}>
              Video AI <span style={{ color: C.orange }}>mọi chủ đề</span>
            </h2>
            <p className="text-xs text-gray-500 mt-2">Học viên MAXEDU tạo ra bằng kỹ năng AI</p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {videos.slice(0, showVideos).map((v, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="rounded-2xl overflow-hidden card-hover" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div className="relative bg-black">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="block"
                  />
                </div>
                <div className="bg-white px-4 py-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: C.purple }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: C.dark }}>{v.title}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {showVideos < videos.length && (
          <FadeIn>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowVideos(videos.length)}
                className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-300"
                style={{ background: 'white', color: C.purple, border: `2px solid ${C.purple}`, boxShadow: '0 2px 12px rgba(87,18,168,0.1)' }}
              >
                Xem thêm {videos.length - showVideos} video ↓
              </button>
            </div>
          </FadeIn>
        )}
      </section>

      {/* ─── GALLERY (Masonry grid — no slider) ─── */}
      <section
        className="relative px-5 py-10 noise-overlay"
        style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleDark} 100%)` }}
      >
        <FadeIn>
          <div className="text-center mb-8">
            <h2 className="text-xl font-extrabold text-white leading-tight">
              Tạo ảnh xây nhân hiệu cá nhân,<br />
              <span style={{ color: C.orangeLight }}>poster & phục vụ công việc</span>
            </h2>
          </div>
        </FadeIn>

        {/* Masonry-ish 2 col grid */}
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((_, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="rounded-xl overflow-hidden card-hover" style={{ aspectRatio: '3/4' }}>
                <img
                  src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014034/demo/212973ed772ff971a03e.jpg.jpg"
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-8">
            <button
              className="group relative px-8 py-3.5 rounded-full font-bold text-sm overflow-hidden"
              style={{ background: C.orange, color: 'white' }}
            >
              <span className="relative z-10">Thực chiến tạo video viral 🔥</span>
              <div className="absolute inset-0 animate-shimmer" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ─── GALLERY SLIDER ─── */}
      <section className="relative overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${gallerySlideIdx * 100}%)` }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014033/demo/d5afc963f3a17dff24b0.jpg.jpg"
                alt={`Gallery Slide ${i + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setGallerySlideIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                gallerySlideIdx === i ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── GUIDE IMAGE SECTION ─── */}
      <section className="relative overflow-hidden">
        <img
          src="https://res.cloudinary.com/dpufemrnq/image/upload/v1772014590/demo/khoa_co_ban_video_399k_ypvGvvLkRBS79hp5F-original.jpg.jpg"
          alt="Hướng dẫn đăng ký"
          className="w-full h-auto"
        />
        <div className="flex justify-center py-6" style={{ background: C.dark }}>
          <button
            className="px-8 py-3 font-bold text-sm rounded-xl animate-gradient"
            style={{ background: `linear-gradient(135deg, #FFD700, #FFA500, #FFD700)`, backgroundSize: '200% 200%', color: '#1a1025' }}
          >
            HƯỚNG DẪN CHI TIẾT CÁC BƯỚC ĐĂNG KÝ NHẬN TÀI LIỆU MIỄN PHÍ TẠI MAXEDU
          </button>
        </div>
      </section>

      {/* ─── ORANGE CTA SECTION ─── */}
      <section
        className="relative px-5 py-10"
        style={{ background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDark} 100%)` }}
      >
        <FadeIn>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              39 XUẤT HỌC VỚI GIÁ ƯU ĐÃI VÀ QUÀ TẶNG ĐẶC BIỆT
            </h2>
            <p className="text-lg font-bold text-white/90">Chỉ còn 39 xuất cuối cùng</p>
          </div>
        </FadeIn>

        <img
          src="https://www.facebook.com/HongNguyenAI16"
          alt="Facebook"
          className="w-full h-auto rounded-xl mb-6"
        />

        <FadeIn delay={0.15}>
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <ContactForm />
          </div>
        </FadeIn>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section
        className="relative px-5 py-12 text-center"
        style={{ background: C.dark }}
      >
        <FadeIn>
          <div className="animate-float inline-block text-5xl mb-4">🎯</div>
          <h2 className="text-2xl font-extrabold text-white leading-tight mb-3">
            Bắt đầu hành trình<br />
            <span style={{ color: C.orangeLight }}>làm chủ AI ngay hôm nay</span>
          </h2>
          <p className="text-sm text-white/40 mb-8">Đừng bỏ lỡ cơ hội thay đổi sự nghiệp</p>
          <button
            className="w-full py-4 rounded-2xl font-bold text-base text-white animate-gradient"
            style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.purpleLight}, ${C.orange})`, backgroundSize: '200% 200%' }}
          >
            Đăng ký khoá học ngay →
          </button>
        </FadeIn>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-[11px] text-white/30 font-mono-alt">© 2025 MAXEDU. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}