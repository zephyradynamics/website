'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0A0A0A] py-16 px-6 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#0A0A0A]/50 border border-[#0F62FE]/20 rounded-2xl p-8 lg:p-12 backdrop-blur-md">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-widest text-white">
                Get In Touch
              </h2>
              <p className="text-[#BFC5CC] text-sm">
                Have questions? Send us a message and we'll respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1">
                    Name <span className="text-[#0F62FE]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-[#0A0A0A] border border-[#0F62FE]/30 rounded px-3 py-2 text-white text-sm placeholder-[#BFC5CC]/40 focus:outline-none focus:border-[#0F62FE]/70 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1">
                    Email <span className="text-[#0F62FE]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-[#0A0A0A] border border-[#0F62FE]/30 rounded px-3 py-2 text-white text-sm placeholder-[#BFC5CC]/40 focus:outline-none focus:border-[#0F62FE]/70 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1">
                    Phone <span className="text-[#0F62FE]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#0A0A0A] border border-[#0F62FE]/30 rounded px-3 py-2 text-white text-sm placeholder-[#BFC5CC]/40 focus:outline-none focus:border-[#0F62FE]/70 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1">
                    Subject <span className="text-[#0F62FE]">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full bg-[#0A0A0A] border border-[#0F62FE]/30 rounded px-3 py-2 text-white text-sm placeholder-[#BFC5CC]/40 focus:outline-none focus:border-[#0F62FE]/70 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-xs font-semibold uppercase tracking-wide mb-1">
                  Message <span className="text-[#0F62FE]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={3}
                  className="w-full bg-[#0A0A0A] border border-[#0F62FE]/30 rounded px-3 py-2 text-white text-sm placeholder-[#BFC5CC]/40 focus:outline-none focus:border-[#0F62FE]/70 transition-colors resize-none"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded px-3 py-2">
                  <p className="text-green-400 text-xs">Message sent successfully! We'll respond within 24 hours.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F62FE] hover:bg-[#0F62FE]/90 disabled:bg-[#0F62FE]/50 text-white font-semibold uppercase tracking-wider py-2 rounded text-sm transition-colors duration-300"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
