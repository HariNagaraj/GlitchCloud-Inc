import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, Sparkles, AlertCircle, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROLE_DETAILS } from '../context/roleConstants';

export const Login = () => {
  const { loginWithFirebase, sendForgotPasswordEmail, loginAsDemoRole, loading } = useAuth();

  const [email, setEmail] = useState('Founder');
  const [password, setPassword] = useState('Founder');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSending, setIsResetSending] = useState(false);

  const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }

    setErrorMessage('');
    setInfoMessage('');
    setIsSubmitting(true);

    const result = await loginWithFirebase(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your corporate email address to receive a password reset link.');
      return;
    }

    setErrorMessage('');
    setInfoMessage('');
    setIsResetSending(true);

    const res = await sendForgotPasswordEmail(email);
    setIsResetSending(false);

    if (res.success) {
      setInfoMessage(`Password reset link dispatched to ${email}. Check your inbox.`);
    } else {
      setErrorMessage(res.error || 'Unable to send password reset email.');
    }
  };

  const handleDemoClick = (roleKey) => {
    setErrorMessage('');
    setInfoMessage('');
    loginAsDemoRole(roleKey);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B0F] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-urbanist select-none">
      {/* Background Ambient Glow Circles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md bg-[#12121A]/80 border border-white/10 backdrop-blur-2xl rounded-[36px] p-8 sm:p-10 shadow-2xl shadow-purple-950/20 relative z-10 overflow-hidden"
      >
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-black p-3 border border-white/10 shadow-neon-purple/30 shadow-2xl mb-4 flex items-center justify-center">
            <img src={logo} alt="GlitchCloud Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white mb-1 leading-none font-urbanist">
            GlitchCloud
          </h1>
          <p className="text-xs text-neutral/60 font-black uppercase tracking-[0.25em]">
            Enterprise Platform OS
          </p>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-start gap-3"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Informational Alert */}
        {infoMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-start gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-neutral/70 mb-2">
              Username / Corporate Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Founder or founder@glitchcloud.in"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-neutral/40 text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-black uppercase tracking-wider text-neutral/70">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isResetSending}
                className="text-[11px] font-bold text-primary/80 hover:text-primary transition-colors flex items-center gap-1"
              >
                {isResetSending ? 'Sending...' : 'Forgot Password?'}
              </button>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 text-neutral/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Founder"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-neutral/40 text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-neon-purple flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Role Selector Section (Dev Mode Only) */}
        {isDev && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-neutral/50">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Instant Role Demo Sign-In (Dev Only)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoClick('Founder')}
                className="px-3 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold hover:bg-purple-500/20 transition-all flex items-center justify-between"
              >
                <span>Founder</span>
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              </button>

              <button
                onClick={() => handleDemoClick('Creative Head')}
                className="px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold hover:bg-blue-500/20 transition-all flex items-center justify-between"
              >
                <span>Creative Head</span>
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              </button>

              <button
                onClick={() => handleDemoClick('Senior Video Editor')}
                className="px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center justify-between"
              >
                <span>Senior Video Editor</span>
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={() => handleDemoClick('Senior Accountant')}
                className="px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center justify-between"
              >
                <span>Senior Accountant</span>
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={() => handleDemoClick('Senior HR')}
                className="col-span-2 px-3 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold hover:bg-rose-500/20 transition-all flex items-center justify-between"
              >
                <span>Senior HR (Employee Onboarding)</span>
                <UserCheck className="w-3.5 h-3.5 text-rose-400" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
