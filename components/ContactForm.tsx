'use client';

import { useState, useCallback } from 'react';
import Select from '@/components/Select';

const enquiryTypes = ['General', 'Investor', 'Partnership', 'Media', 'Technical'];

const initialState = {
  name: '',
  organisation: '',
  role: '',
  email: '',
  enquiryType: 'General',
  message: '',
};

const label = 'meta mb-2 block';
const field =
  'h-11 w-full border-0 border-b border-field bg-transparent text-base text-ink placeholder:text-ink-faint transition-colors focus:border-signal focus:outline-none';

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
      if (!response.ok) throw new Error('Failed to send message.');
      setSuccess(true);
      setFormData(initialState);
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="border-t border-rule bg-band py-(--spacing-section)">
      <div className="mx-auto max-w-[1440px] px-(--spacing-gutter)">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="max-w-[17ch] text-section text-ink">The era begins with a single seat.</h2>
            <p className="mt-6 max-w-[44ch] text-lede text-ink-soft">
              Kestrel X2 is accepting expressions of interest from early access partners,
              institutional collaborators and potential operators.
            </p>
            <div className="mt-9 flex flex-col gap-2 text-[15px]">
              <span className="font-medium text-ink">Srinagar, India</span>
              <a
                href="mailto:info@zephyradynamics.com"
                className="text-signal transition-colors hover:text-signal-dark"
              >
                info@zephyradynamics.com
              </a>
              <p className="meta mt-1.5">We respond within 24 hours</p>
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
              <textarea id="cf-message" name="message" rows={3} value={formData.message}
                onChange={handleChange} placeholder="Tell us what you have in mind" required
                className="w-full resize-none border-0 border-b border-field bg-transparent py-2.5 text-base text-ink placeholder:text-ink-faint transition-colors focus:border-signal focus:outline-none" />
            </div>

            {error && <p role="alert" className="text-sm text-error">{error}</p>}
            {success && (
              <p role="status" className="text-sm text-ok">
                Message sent. We will respond within 24 hours.
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-[50px] items-center bg-signal px-8 text-sm font-medium text-plate transition-colors hover:bg-signal-dark disabled:bg-rule-strong disabled:text-ink-muted"
              >
                {loading ? 'Sending' : 'Send message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
