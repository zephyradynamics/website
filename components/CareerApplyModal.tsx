'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Position {
  id: number;
  title: string;
  description?: string;
}

interface CareerApplyModalProps {
  position: Position;
}

export default function CareerApplyModal({ position }: CareerApplyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    portfolio: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.phone || !resumeFile) {
      setError('Name, email, phone, and resume are required');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('education', formData.education);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('position', position.title);
      formDataToSend.append('resume', resumeFile);

      const response = await fetch('/api/apply-career', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        portfolio: '',
        message: '',
      });
      setResumeFile(null);

      setTimeout(() => {
        handleClose();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-6 py-3 bg-horizon-cyan text-deep-space font-bold uppercase tracking-wider rounded-lg hover:bg-horizon-cyan/90 transition-all duration-300 hover:shadow-lg hover:shadow-horizon-cyan/20 whitespace-nowrap"
      >
        Apply Now
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 z-[9999]"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="fixed top-0 left-0 right-0 bottom-0 z-[10000] flex items-center justify-center px-4 py-8">
            <div
              className="bg-deep-space border border-horizon-cyan/50 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-deep-space border-b border-horizon-cyan/20 px-6 lg:px-8 py-6 flex justify-between items-center">
                <div>
                  <p className="text-horizon-cyan text-xs font-bold uppercase tracking-wider">Application Form</p>
                  <h3 className="font-heading text-xl font-bold text-cloud-white mt-1">{position.title}</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-stratosphere-silver hover:text-cloud-white transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 lg:px-8 py-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
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
                      className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                        Email <span className="text-horizon-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                        Phone <span className="text-horizon-cyan">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Education & Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                        Education
                      </label>
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="e.g., B.Tech Aerospace Engineering"
                        className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                        Experience (Years)
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g., 2 years"
                        className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div>
                    <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                      Portfolio / Website (Optional)
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://your-portfolio.com"
                      className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                      Resume / CV <span className="text-horizon-cyan">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:bg-horizon-cyan file:text-deep-space file:font-semibold file:cursor-pointer hover:file:bg-horizon-cyan/90 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all"
                        required
                      />
                      {resumeFile && (
                        <p className="text-horizon-cyan text-xs mt-2 flex items-center gap-1">
                          ✓ {resumeFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-cloud-white text-xs font-semibold uppercase tracking-wide mb-2">
                      Cover Letter / Additional Info
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us why you're interested in this role..."
                      rows={4}
                      className="w-full bg-orbital-blue/30 border border-horizon-cyan/40 rounded-lg px-4 py-2.5 text-cloud-white text-sm placeholder-stratosphere-silver/40 focus:outline-none focus:border-horizon-cyan focus:ring-1 focus:ring-horizon-cyan/30 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3">
                      <p className="text-green-400 text-sm">Application submitted successfully! We'll review it soon.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-horizon-cyan hover:bg-horizon-cyan/90 disabled:bg-horizon-cyan/50 text-deep-space font-bold uppercase tracking-wider py-3 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-horizon-cyan/30 cursor-pointer border border-horizon-cyan active:scale-95"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
