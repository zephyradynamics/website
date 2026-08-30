'use client';

import { useEffect, useId, useState } from 'react';
import { X } from 'lucide-react';

interface Position {
  id: number;
  title: string;
  description?: string;
}

interface CareerApplyModalProps {
  position: Position;
}

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  education: '',
  experience: '',
  portfolio: '',
  message: '',
};

const labelClass = 'meta mb-2 block text-ink';
const fieldClass =
  'h-11 w-full border-0 border-b border-field bg-transparent text-base text-ink placeholder:text-ink-faint transition-colors focus:border-signal focus:outline-none';

export default function CareerApplyModal({ position }: CareerApplyModalProps) {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResumeFile(event.target.files?.[0] ?? null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.phone || !resumeFile) {
      setError('Name, email, phone and resume are required.');
      setLoading(false);
      return;
    }

    try {
      const application = new FormData();
      Object.entries(formData).forEach(([key, value]) => application.append(key, value));
      application.append('position', position.title);
      application.append('resume', resumeFile);

      const response = await fetch('/api/apply-career', {
        method: 'POST',
        body: application,
      });

      if (!response.ok) throw new Error('Failed to submit application.');

      setSuccess(true);
      setFormData(initialFormData);
      setResumeFile(null);

      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error ? submissionError.message : 'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-[46px] shrink-0 items-center justify-center bg-signal px-7 text-sm font-medium text-plate transition-colors hover:bg-signal-dark"
      >
        Apply now
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/65 px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) handleClose();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto border border-rule-strong bg-plate shadow-2xl"
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-rule bg-plate px-6 py-5 sm:px-8">
              <div>
                <p className="tag">Application form</p>
                <h2 id={titleId} className="mt-2 text-[23px] font-medium tracking-tight text-ink">
                  {position.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close application form"
                className="-mr-2 p-2 text-ink-soft transition-colors hover:text-ink"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7 px-6 py-7 sm:px-8 sm:py-8">
              <div>
                <label htmlFor={`career-name-${position.id}`} className={labelClass}>Full name</label>
                <input id={`career-name-${position.id}`} name="name" type="text" required
                  value={formData.name} onChange={handleChange} placeholder="Your full name"
                  className={fieldClass} />
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor={`career-email-${position.id}`} className={labelClass}>Email address</label>
                  <input id={`career-email-${position.id}`} name="email" type="email" required
                    value={formData.email} onChange={handleChange} placeholder="you@email.com"
                    className={fieldClass} />
                </div>
                <div>
                  <label htmlFor={`career-phone-${position.id}`} className={labelClass}>Phone number</label>
                  <input id={`career-phone-${position.id}`} name="phone" type="tel" required
                    value={formData.phone} onChange={handleChange} placeholder="Your phone number"
                    className={fieldClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor={`career-education-${position.id}`} className={labelClass}>Education</label>
                  <input id={`career-education-${position.id}`} name="education" type="text"
                    value={formData.education} onChange={handleChange} placeholder="Degree or qualification"
                    className={fieldClass} />
                </div>
                <div>
                  <label htmlFor={`career-experience-${position.id}`} className={labelClass}>Experience</label>
                  <input id={`career-experience-${position.id}`} name="experience" type="text"
                    value={formData.experience} onChange={handleChange} placeholder="Relevant experience"
                    className={fieldClass} />
                </div>
              </div>

              <div>
                <label htmlFor={`career-portfolio-${position.id}`} className={labelClass}>Portfolio or website</label>
                <input id={`career-portfolio-${position.id}`} name="portfolio" type="url"
                  value={formData.portfolio} onChange={handleChange} placeholder="https://"
                  className={fieldClass} />
              </div>

              <div>
                <label htmlFor={`career-resume-${position.id}`} className={labelClass}>Resume or CV</label>
                <input
                  id={`career-resume-${position.id}`}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleResumeChange}
                  className="w-full border border-field bg-canvas px-4 py-3 text-sm text-ink-soft file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-plate hover:file:bg-signal"
                />
                {resumeFile && <p className="meta mt-2 text-ok">Selected: {resumeFile.name}</p>}
              </div>

              <div>
                <label htmlFor={`career-message-${position.id}`} className={labelClass}>Additional information</label>
                <textarea id={`career-message-${position.id}`} name="message" rows={4}
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell us about your interest in this role"
                  className="w-full resize-none border-0 border-b border-field bg-transparent py-2.5 text-base text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none" />
              </div>

              {error && <p role="alert" className="text-sm text-error">{error}</p>}
              {success && <p role="status" className="text-sm text-ok">Application submitted successfully.</p>}

              <div className="flex flex-wrap gap-3 border-t border-rule pt-6">
                <button type="submit" disabled={loading}
                  className="inline-flex h-[48px] items-center bg-signal px-8 text-sm font-medium text-plate transition-colors hover:bg-signal-dark disabled:bg-rule-strong disabled:text-ink-muted">
                  {loading ? 'Submitting' : 'Submit application'}
                </button>
                <button type="button" onClick={handleClose}
                  className="inline-flex h-[48px] items-center border border-ink px-8 text-sm font-medium text-ink transition-colors hover:border-signal hover:text-signal">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
