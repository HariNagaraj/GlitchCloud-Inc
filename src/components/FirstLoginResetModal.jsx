import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Key, ShieldCheck, Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const FirstLoginResetModal = () => {
  const { userProfile, completeFirstLoginPasswordReset } = useAuth();

  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setErrorMsg('Please fill in your new password.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const res = await completeFirstLoginPasswordReset(newPassword, otpCode);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg('Password updated successfully! Welcome to GlitchCloud.');
    } else {
      setErrorMsg(res.error || 'Password reset failed. Please check your verification code.');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 font-urbanist select-none">
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#12121A]/95 border border-white/10 backdrop-blur-3xl rounded-[36px] p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mb-4 shadow-neon-purple">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">First-Time Sign In Reset</h2>
          <p className="text-xs text-neutral/60 font-medium mt-1">
            Welcome, <span className="text-white font-bold">{userProfile?.name}</span> ({userProfile?.role}). An automated OTP reset link was sent to <span className="text-primary font-semibold">{userProfile?.email}</span>. Please update your password to proceed.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral/60 mb-2">Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled
                value={userProfile?.email || ''}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 text-xs font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral/60 mb-2">OTP Code / Verification Token</label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-neutral/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP code (Optional for demo)"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral/40 focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral/60 mb-2">New Private Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-neutral/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral/40 focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-neutral/60 mb-2">Confirm New Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-neutral/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral/40 focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-xs uppercase tracking-widest shadow-neon-purple flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Update Password & Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
