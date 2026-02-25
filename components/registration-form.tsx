"use client";

import { useState } from "react";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    childName: "",
    childAge: "",
    branch: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.parentName && formData.phone && formData.childName) {
      setSubmitted(true);
    }
  };

  return (
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
  );
}
