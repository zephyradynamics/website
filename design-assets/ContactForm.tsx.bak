'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    role: '',
    email: '',
    enquiryType: 'General',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (!formData.name || !formData.email || !formData.message) {
      setError('Name, email, and message are required');
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
        organisation: '',
        role: '',
        email: '',
        enquiryType: 'General',
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
    <section className="bg-deep-space py-20 px-6 lg:px-24 relative overflow-hidden">
      <div className="absolute bottom-20 right-0 opacity-[0.08] text-9xl font-light pointer-events-none -mr-20">05</div>
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-orbital-blue/20 border border-horizon-cyan/30 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-cloud-white">
                Connect With Zephyra Dynamics
              </h2>
              <p className="text-stratosphere-silver text-base">
                Let's Build This Together
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                  Full Name <span className="text-horizon-cyan">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-deep-space border border-horizon-cyan/40 rounded px-4 py-2 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full bg-deep-space border border-horizon-cyan/40 rounded px-4 py-2 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Your role"
                    className="w-full bg-deep-space border border-horizon-cyan/40 rounded px-4 py-2 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                    Email Address <span className="text-horizon-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-deep-space border border-horizon-cyan/40 rounded px-4 py-2 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                    Enquiry Type <span className="text-horizon-cyan">*</span>
                  </label>
                  <select
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full bg-deep-space border border-horizon-cyan/40 rounded px-4 py-2 text-cloud-white text-sm focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Investor">Investor</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Media">Media</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                  Message <span className="text-horizon-cyan">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full bg-deep-space border border-horizon-cyan/40 rounded px-4 py-2 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all resize-none"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded px-4 py-3">
                  <p className="text-green-400 text-sm">Message sent successfully! We'll respond within 24 hours.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-horizon-cyan hover:bg-horizon-cyan/95 disabled:bg-horizon-cyan/50 text-deep-space font-bold uppercase tracking-wider py-4 px-6 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-horizon-cyan/30 cursor-pointer border-2 border-horizon-cyan active:scale-95"
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
