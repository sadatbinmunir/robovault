import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, ExternalLink, Github, Linkedin, Globe, MessageSquare, Terminal } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactPageProps {
  contactInfo: ContactInfo;
}

export const ContactPage: React.FC<ContactPageProps> = ({ contactInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(`${label} copied to clipboard!`);
    setTimeout(() => setCopyStatus(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // User can also trigger mailto
  };

  const handleMailtoDirect = () => {
    const subject = encodeURIComponent(formData.subject || 'Robotics Capstone Query');
    const body = encodeURIComponent(
      `Hello Sadat,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>COMMUNICATION CHANNELS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          Direct Contact & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Inquiries</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Have questions regarding our robotics project architecture, academic collaboration, or test data? Reach out directly via the channels or contact form below.
        </p>
      </div>

      {copyStatus && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-900 border border-emerald-400 text-xs font-mono text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{copyStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Direct Email */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Primary Email
                  </span>
                  <h3 className="text-base font-tech font-bold text-white break-all">
                    {contactInfo.email}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => handleCopy(contactInfo.email, 'Email')}
                title="Copy email to clipboard"
                className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-900/60"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-500/20 flex gap-2">
              <a
                href={`mailto:${contactInfo.email}?subject=Robotics%20Project%20Inquiry`}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-tech font-bold tracking-wider text-center transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                EMAIL ME DIRECTLY
              </a>
            </div>
          </div>

          {/* Card 2: Phone */}
          {contactInfo.phone && (
            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Telephone Contact
                    </span>
                    <h3 className="text-base font-tech font-bold text-white">
                      {contactInfo.phone}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(contactInfo.phone || '', 'Phone number')}
                  title="Copy phone to clipboard"
                  className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-900/60"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-500/20">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="block w-full py-2 px-3 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-tech font-semibold tracking-wider text-center transition-all"
                >
                  CALL DIRECTLY
                </a>
              </div>
            </div>
          )}

          {/* Card 3: Address */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all group">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Residential / Project Base Address
                </span>
                <h3 className="text-sm font-tech font-bold text-white">
                  Bashundhara Residential Area
                </h3>
                <p className="text-xs text-slate-300">
                  Bashundhara, Dhaka, Bangladesh
                </p>
                <p className="text-[11px] text-emerald-400/80 font-mono pt-1">
                  Location: {contactInfo.address}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Social Media Links Placeholders */}
          <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Professional Profiles [Placeholders]
              </span>
              <span className="text-[10px] font-mono text-slate-500">Ready to update</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* LinkedIn */}
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/50 flex flex-col items-center text-center gap-2 group transition-all"
              >
                <Linkedin className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-tech text-white">LinkedIn</span>
                <span className="text-[9px] font-mono text-emerald-400/70">[Connect]</span>
              </a>

              {/* GitHub */}
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/50 flex flex-col items-center text-center gap-2 group transition-all"
              >
                <Github className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-tech text-white">GitHub</span>
                <span className="text-[9px] font-mono text-emerald-400/70">[Repositories]</span>
              </a>

              {/* Portfolio */}
              <a
                href={contactInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/50 flex flex-col items-center text-center gap-2 group transition-all"
              >
                <Globe className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-tech text-white">Portfolio</span>
                <span className="text-[9px] font-mono text-emerald-400/70">[Showcase]</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Integrated Quick Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] space-y-6">
          <div className="space-y-2 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>TRANSMIT A MESSAGE</span>
            </div>
            <h3 className="text-2xl font-tech font-bold text-white">
              Quick Contact Form
            </h3>
            <p className="text-xs text-slate-300">
              Fill out the details below to dispatch an inquiry directly to the project team.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_#00ff88]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-tech font-bold text-white">
                Message Dispatched Successfully!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-emerald-400">{formData.name}</strong>. Your message regarding "{formData.subject}" has been queued. We will respond to <strong className="text-emerald-400">{formData.email}</strong> shortly.
              </p>
              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-500/30 text-xs font-mono text-emerald-300 hover:text-white"
                >
                  Send Another Message
                </button>
                <button
                  onClick={handleMailtoDirect}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-tech font-bold hover:bg-emerald-400"
                >
                  Also Open In Mail Client
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rahman / Student Name"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-emerald-500/30 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. collaborator@iub.edu.bd"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-emerald-500/30 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Question on ROBOVAULT Waste Sorting / Capstone Feedback"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-emerald-500/30 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 block">
                  Message Content *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message, suggestions, or collaboration inquiries here..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-emerald-500/30 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-tech font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>

                <button
                  type="button"
                  onClick={handleMailtoDirect}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-white font-tech text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Or Send via System Mail Client</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
