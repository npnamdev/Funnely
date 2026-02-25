import { useState, useEffect, useRef } from "react";

const COURSES = [
  {
    icon: "🧒",
    age: "3 – 6 tuổi",
    title: "Little Stars",
    desc: "Khám phá tiếng Anh qua trò chơi, âm nhạc & nghệ thuật. Xây dựng nền tảng phát âm chuẩn quốc tế.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: "📚",
    age: "6 – 10 tuổi",
    title: "Young Explorers",
    desc: "Phát triển 4 kỹ năng Nghe – Nói – Đọc – Viết. Tích hợp Toán, Khoa học & Địa lý bằng tiếng Anh.",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: "🚀",
    age: "10 – 15 tuổi",
    title: "Global Leaders",
    desc: "Luyện thi Cambridge, thuyết trình & phản biện. Chuẩn bị hành trang du học quốc tế.",
    color: "from-violet-400 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
];

const STATS = [
  { value: "10,000+", label: "Học viên", icon: "👨‍🎓" },
  { value: "15+", label: "Chi nhánh", icon: "🏫" },
  { value: "98%", label: "Phụ huynh hài lòng", icon: "⭐" },
  { value: "200+", label: "Chủ đề học tập", icon: "📖" },
];

const TESTIMONIALS = [
  {
    name: "Chị Thanh Hà",
    role: "Phụ huynh bé Minh Anh (5 tuổi)",
    text: "Bé nhà mình sau 3 tháng học đã tự tin chào hỏi bằng tiếng Anh. Giáo viên rất tận tâm và phương pháp dạy rất sáng tạo!",
    avatar: "TH",
  },
  {
    name: "Anh Đức Trung",
    role: "Phụ huynh bé Gia Hân (8 tuổi)",
    text: "Con gái tôi đã đạt giải Nhất cuộc thi Olympic English Fes. MAX English thực sự giúp con phát triển toàn diện.",
    avatar: "ĐT",
  },
  {
    name: "Chị Phương Linh",
    role: "Phụ huynh bé Bảo Nam (12 tuổi)",
    text: "Bé đạt chứng chỉ Cambridge Flyers chỉ sau 1 năm học. Chương trình rất bài bản và khoa học.",
    avatar: "PL",
  },
];

const PARTNERS = ["Cambridge", "Macmillan", "Richmond", "National Geographic"];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    if (isNaN(num)) {
      setDisplay(target);
      return;
    }
    let current = 0;
    const step = Math.ceil(num / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= num) {
        current = num;
        clearInterval(interval);
      }
      const formatted = current.toLocaleString();
      setDisplay(target.includes("+") ? formatted + "+" : target.includes("%") ? formatted + "%" : formatted);
    }, 30);
    return () => clearInterval(interval);
  }, [visible, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function MaxEduLanding() {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    childName: "",
    childAge: "",
    branch: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (formData.parentName && formData.phone && formData.childName) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Lexend', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap');

        .font-display { font-family: 'Playfair Display', serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 5s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .noise {
          position: relative;
        }
        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .text-gradient {
          background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-gradient {
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(52, 211, 153, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, #fffbf5 0%, #ffffff 100%);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }

        input:focus, select:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
        }

        .scroll-indicator {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(249, 115, 22, 0.4);
          border-radius: 12px;
          position: relative;
        }
        .scroll-indicator::after {
          content: '';
          width: 4px;
          height: 8px;
          background: #f97316;
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: float 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 ? "glass shadow-lg shadow-orange-100/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-200">
                M
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 tracking-tight">MAX</span>
                <span className="text-lg font-light text-orange-500 ml-1">English</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["Về chúng tôi", "Khóa học", "Đánh giá", "Liên hệ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="#dang-ky"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/50 transition-all hover:-translate-y-0.5"
              >
                Đăng ký miễn phí
              </a>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-gray-800 rounded transition-all ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-gray-800 rounded transition-all ${mobileMenu ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-gray-800 rounded transition-all ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden glass border-t border-orange-100 animate-slide-up">
            <div className="px-4 py-6 space-y-4">
              {["Về chúng tôi", "Khóa học", "Đánh giá", "Liên hệ"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-700 font-medium py-2" onClick={() => setMobileMenu(false)}>
                  {item}
                </a>
              ))}
              <a href="#dang-ky" className="block w-full text-center py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-xl" onClick={() => setMobileMenu(false)}>
                Đăng ký miễn phí
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient noise relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Decorative elements */}
        <div className="absolute top-32 left-8 w-20 h-20 rounded-full bg-orange-200/40 animate-float" />
        <div className="absolute top-48 right-16 w-14 h-14 rounded-2xl bg-purple-200/40 animate-float-reverse" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-emerald-200/40 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-lg bg-pink-200/50 animate-float-reverse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-48 right-12 text-6xl animate-float opacity-20">🌍</div>
        <div className="absolute top-40 left-1/3 text-4xl animate-float-reverse opacity-20">✨</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200/60 mb-8">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-sm font-medium text-orange-700">Đăng ký học thử miễn phí – 02 buổi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-800 text-gray-900 leading-tight mb-6">
                Mở cánh cửa
                <br />
                <span className="font-display italic text-gradient">Thế giới</span>
                <br />
                cho con bạn
              </h1>

              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg font-light">
                Hệ thống Anh ngữ Quốc tế hàng đầu Việt Nam. Giáo trình chuẩn Cambridge, Macmillan — giúp trẻ tự tin giao tiếp toàn cầu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#dang-ky"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-semibold rounded-2xl shadow-xl shadow-orange-300/40 hover:shadow-2xl hover:shadow-orange-400/50 transition-all hover:-translate-y-1 animate-pulse-glow"
                >
                  <span>Đăng ký học thử miễn phí</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#khóa-học"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-orange-300 hover:text-orange-600 transition-all"
                >
                  <span>Xem khóa học</span>
                </a>
              </div>

              {/* Social proof */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["bg-orange-400", "bg-pink-400", "bg-purple-400", "bg-emerald-400"].map((bg, i) => (
                    <div key={i} className={`w-10 h-10 ${bg} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {["TH", "ML", "ĐT", "PL"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                    <span className="text-sm font-semibold text-gray-700 ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs text-gray-400">Từ 2,000+ đánh giá của phụ huynh</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-slide-up delay-200 hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main circle */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 shadow-2xl shadow-orange-200/30" />
                
                {/* Orbiting elements */}
                <div className="absolute top-4 right-16 bg-white rounded-2xl shadow-xl p-4 animate-float z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl">🎓</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Cambridge</p>
                      <p className="text-xs text-gray-400">Chứng chỉ Quốc tế</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-xl p-4 animate-float-reverse z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-2xl">🌍</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">15+ Chi nhánh</p>
                      <p className="text-xs text-gray-400">Toàn quốc</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-0 bg-white rounded-2xl shadow-xl p-3 animate-float z-10" style={{ animationDelay: "1.5s" }}>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-500">98%</p>
                    <p className="text-xs text-gray-400">Hài lòng</p>
                  </div>
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-wiggle">👧🏻</div>
                    <div className="bg-white/80 backdrop-blur rounded-xl px-6 py-3 shadow-lg">
                      <p className="text-sm font-bold text-gray-800">Hello, World! 🌟</p>
                      <p className="text-xs text-gray-400 mt-1">Con bạn sẵn sàng chưa?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-8 bg-gray-50/80 border-y border-gray-100 overflow-hidden">
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i} className="mx-12 flex items-center gap-3 text-gray-300">
              <span className="text-lg font-bold tracking-wider uppercase">{p}</span>
              <span className="text-gray-200">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl mb-3 transition-transform group-hover:scale-125">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-800 text-gray-900 mb-1">
                  <AnimatedCounter target={stat.value} />
                </div>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MAX */}
      <section id="về-chúng-tôi" className="py-24 bg-gradient-to-b from-white to-orange-50/30 noise relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4">
              Tại sao chọn MAX
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-800 text-gray-900">
              Phương pháp <span className="font-display italic text-gradient">khác biệt</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Lấy học sinh làm trung tâm",
                desc: "Mỗi em có kế hoạch học tập riêng biệt, tối đa 8 học viên/lớp. Giáo viên sát sao từng điểm mạnh – yếu.",
                gradient: "from-orange-400 to-rose-400",
              },
              {
                icon: "📖",
                title: "Giáo trình chuẩn quốc tế",
                desc: "200+ chủ đề từ Cambridge, Macmillan, Richmond. Tích hợp Toán, Khoa học, Địa lý, Nghệ thuật bằng tiếng Anh.",
                gradient: "from-blue-400 to-cyan-400",
              },
              {
                icon: "👩‍🏫",
                title: "Giáo viên giàu kinh nghiệm",
                desc: "Đội ngũ được đào tạo chuyên môn cao, giàu kinh nghiệm thực tiễn, thân thiện và tận tâm với từng học viên.",
                gradient: "from-emerald-400 to-teal-400",
              },
              {
                icon: "🧠",
                title: "Phát triển toàn diện",
                desc: "Không chỉ ngôn ngữ – còn kỹ năng sống, tư duy phản biện, khả năng lãnh đạo và sự tự tin.",
                gradient: "from-violet-400 to-purple-400",
              },
              {
                icon: "🏆",
                title: "Thành tích nổi bật",
                desc: "Học viên đạt chứng chỉ Cambridge, giải thưởng Olympic English, học bổng du học quốc tế.",
                gradient: "from-amber-400 to-orange-400",
              },
              {
                icon: "🌱",
                title: "Môi trường học tập mở",
                desc: "Không gian sáng tạo, trẻ tự do khám phá. Học qua trò chơi, workshop, cuộc thi và hoạt động ngoại khóa.",
                gradient: "from-pink-400 to-rose-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="khóa-học" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold uppercase tracking-wider mb-4">
              Chương trình học
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-800 text-gray-900">
              Lộ trình phù hợp <span className="font-display italic text-gradient">mọi độ tuổi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURSES.map((course, i) => (
              <div key={i} className={`card-hover relative group rounded-3xl ${course.bg} border ${course.border} p-8 overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${course.color} opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
                
                <div className="relative">
                  <span className="text-5xl block mb-6">{course.icon}</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${course.color} text-white mb-4`}>
                    {course.age}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{course.desc}</p>
                  <a href="#dang-ky" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 group/link">
                    <span>Tìm hiểu thêm</span>
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="đánh-giá" className="py-24 bg-gradient-to-b from-orange-50/30 to-white noise relative overflow-hidden">
        <div className="absolute top-20 left-10 text-8xl opacity-5">❝</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-5">❞</div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-4">
              Phụ huynh nói gì
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-800 text-gray-900">
              Được <span className="font-display italic text-gradient">tin tưởng</span> bởi hàng ngàn gia đình
            </h2>
          </div>

          <div className="relative">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === activeTestimonial ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-orange-100/30 border border-orange-100/50">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-amber-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 font-light">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeTestimonial ? "bg-orange-400 w-8" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="dang-ky" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 animate-gradient" />
        <div className="absolute inset-0 noise opacity-40" />

        {/* Decorative */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/5 animate-float-reverse" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white/5 animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur">
              Ưu đãi đặc biệt
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-800 text-white mb-4">
              Đăng ký học thử <span className="font-display italic">MIỄN PHÍ</span>
            </h2>
            <p className="text-lg text-white/70 font-light max-w-lg mx-auto">
              Trải nghiệm ngay 02 buổi học tiếng Anh cùng giáo viên quốc tế. Hoàn toàn miễn phí, không ràng buộc.
            </p>
          </div>

          {!submitted ? (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl max-w-2xl mx-auto">
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên phụ huynh *</label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên bé *</label>
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="Tên bé"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 placeholder-gray-300 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Độ tuổi của bé</label>
                    <select
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 transition-all text-sm appearance-none bg-white"
                    >
                      <option value="">Chọn độ tuổi</option>
                      <option value="3-6">3 – 6 tuổi</option>
                      <option value="6-10">6 – 10 tuổi</option>
                      <option value="10-15">10 – 15 tuổi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chi nhánh gần bạn</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 transition-all text-sm appearance-none bg-white"
                  >
                    <option value="">Chọn chi nhánh</option>
                    <option value="hoang-mai">Hoàng Mai – Hà Nội</option>
                    <option value="cau-giay">Cầu Giấy – Hà Nội</option>
                    <option value="thanh-xuan">Thanh Xuân – Hà Nội</option>
                    <option value="hai-ba-trung">Hai Bà Trưng – Hà Nội</option>
                    <option value="other">Chi nhánh khác</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-xl shadow-orange-300/30 hover:shadow-2xl hover:shadow-orange-400/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  🎁 Đăng ký học thử miễn phí
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Bằng việc đăng ký, bạn đồng ý với{" "}
                  <a href="#" className="text-orange-500 underline">điều khoản</a> và{" "}
                  <a href="#" className="text-orange-500 underline">chính sách bảo mật</a> của chúng tôi.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl max-w-lg mx-auto text-center animate-scale-in">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-gray-500 mb-6">
                Cảm ơn bạn đã đăng ký! Đội ngũ tư vấn của MAX English sẽ liên hệ trong vòng 24h để xếp lịch học thử cho bé.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Đã ghi nhận thông tin
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="liên-hệ" className="bg-gray-950 text-white py-20 noise relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight">MAX</span>
                  <span className="text-lg font-light text-orange-400 ml-1">English</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md text-sm mb-6">
                Hệ thống đào tạo Tiếng Anh Quốc tế — Nơi ươm mầm thế hệ công dân toàn cầu. Chương trình chuẩn quốc tế, giáo viên tận tâm, phương pháp hiện đại.
              </p>
              <div className="flex gap-3">
                {["facebook", "youtube", "tiktok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all hover:-translate-y-1"
                  >
                    <span className="text-sm font-bold uppercase">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6">Khóa học</h4>
              <ul className="space-y-3">
                {["Little Stars (3-6 tuổi)", "Young Explorers (6-10)", "Global Leaders (10-15)", "Luyện thi Cambridge"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-6">Liên hệ</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>Tầng 2, Green Park, số 1 Trần Thủ Độ, Hoàng Mai, Hà Nội</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>0912 345 678</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@maxedunetwork.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🕐</span>
                  <span>T2 – CN: 8:00 – 21:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2026 MAX English – Hệ thống Anh ngữ Quốc tế. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Điều khoản</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Bảo mật</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}