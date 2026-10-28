'use client';

import { useState, useCallback } from 'react';
import Select from '@/components/Select';

const enquiryTypes = ['General', 'Investor', 'Partnership', 'Media', 'Careers', 'Technical'];

const initialState = {
  name: '',
  organisation: '',
  role: '',
  email: '',
  enquiryType: 'General',
  message: '',
};

const label = 'mb-2 block text-[13px] font-medium text-slate';
const field =
  'h-12 w-full rounded-xl border-0 bg-cloud px-4 text-base text-carbon ring-1 ring-line placeholder:text-steel transition-shadow focus:ring-2 focus:ring-kestrel focus:outline-none';

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Name, email and message are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'The message could not be sent. Email info@zephyradynamics.com instead.');
      }
      setSuccess(true);
      setFormData(initialState);
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The message could not be sent. Email info@zephyradynamics.com instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line bg-mist py-(--spacing-section)">
      <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="kicker mb-5">Contact</p>
            <h2 className="font-wide max-w-[20ch] text-section text-balance text-carbon">Talk to us about the future of flight in your city.</h2>
            <p className="mt-6 max-w-[44ch] text-lede text-slate">
              We are talking with investors, operators, cities and research partners. Tell us
              what you have in mind and the right person will reply.
            </p>
            <div className="mt-9 flex flex-col gap-2 text-[15px]">
              <span className="font-medium text-carbon">Bengaluru, India</span>
              <a
                href="mailto:info@zephyradynamics.com"
                className="text-kestrel transition-colors hover:text-kestrel-deep"
              >
                info@zephyradynamics.com
              </a>
              <p className="mt-1.5 text-[14px] text-slate">We usually reply within two working days.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
            <div>
              <label htmlFor="cf-name" className={label}>Full name</label>
              <input id="cf-name" name="name" type="text" value={formData.name} onChange={handleChange}
                placeholder="Your full name" required className={field} />
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-org" className={label}>Organisation</label>
                <input id="cf-org" name="organisation" type="text" value={formData.organisation}
                  onChange={handleChange} placeholder="Your company" className={field} />
              </div>
              <div>
                <label htmlFor="cf-role" className={label}>Role</label>
                <input id="cf-role" name="role" type="text" value={formData.role}
                  onChange={handleChange} placeholder="Your role" className={field} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-email" className={label}>Email address</label>
                <input id="cf-email" name="email" type="email" value={formData.email}
                  onChange={handleChange} placeholder="you@company.com" required className={field} />
              </div>
              <Select
                label="Enquiry type"
                name="enquiryType"
                value={formData.enquiryType}
                options={enquiryTypes}
                onChange={handleSelect}
              />
            </div>

            <div>
              <label htmlFor="cf-message" className={label}>Message</label>
              <textarea id="cf-message" name="message" rows={5} value={formData.message}
                onChange={handleChange} placeholder="Tell us what you have in mind" required
                className="w-full resize-none rounded-xl border-0 bg-cloud px-4 py-3 text-base text-carbon ring-1 ring-line placeholder:text-steel transition-shadow focus:ring-2 focus:ring-kestrel focus:outline-none" />
            </div>

            {error && <p role="alert" className="text-sm text-error">{error}</p>}
            {success && (
              <p role="status" className="text-sm text-ok">
                Message sent. We&apos;ll reply within two working days.
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center rounded-full bg-kestrel px-7 text-[15px] font-semibold text-white transition-colors hover:bg-kestrel-deep disabled:bg-line-strong disabled:text-slate"
              >
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
