'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        setMessage('Gửi thành công!');
        setFormData({ fullName: '', email: '', phone: '' });
      } else {
        setMessage('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Liên Hệ</CardTitle>
          <CardDescription className="text-base">
            Điền thông tin của bạn bên dưới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 px-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ tên</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Nhập họ tên của bạn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ'}
            </Button>

            {message && (
              <div
                className={`text-center p-3 rounded-lg ${
                  message.includes('thành công')
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
