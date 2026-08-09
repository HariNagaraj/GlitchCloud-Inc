import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, ShieldCheck, Mail, User, Layers, Sparkles, CheckCircle2, 
  AlertCircle, Lock, Power, Calendar, Phone, Home, Heart, CreditCard, 
  FileText, Landmark, Laptop, FileCheck, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CORPORATE_ROLES_LIST, DEFAULT_ROLE_DEPARTMENTS } from '../context/roleConstants';
import { CustomSelect } from './CustomSelect';
import { GlassDatePicker } from './GlassDatePicker';

export const UserManagement = ({ isOpen, onClose }) => {
  const { userProfile, role, createNewEmployeeAccount } = useAuth();

  const [activeTab, setActiveTab] = useState('basic');

  // Basic & Role
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Post-Production & VFX');
  const [selectedRole, setSelectedRole] = useState('Senior Video Editor');
  const [accountStatus, setAccountStatus] = useState('Active');

  // Personal Details
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  // Tax & Identity
  const [panCard, setPanCard] = useState('');
  const [govtIdUrl, setGovtIdUrl] = useState('');

  // Payroll & Assets
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split('T')[0]);
  const [assignedAssets, setAssignedAssets] = useState('MacBook Pro M3 Max, 4K Reference Monitor');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const isAuthorized = role === 'Founder' || role === 'CEO' || role === 'Senior HR' || role === 'admin';

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[500] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="p-8 rounded-3xl bg-[#0a0a0f] border border-amber-500/20 text-center max-w-md w-full relative font-urbanist">
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral hover:text-white"><X className="w-5 h-5" /></button>
          <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-amber-300">Restricted Access</h3>
          <p className="text-xs text-amber-200/70 mt-1">
            Employee onboarding is restricted to Founder, CEO, and Senior HR roles.
          </p>
        </div>
      </div>
    );
  }

  // Automatic Department Mapping when Role Changes
  const handleRoleChange = (val) => {
    setSelectedRole(val);
    if (DEFAULT_ROLE_DEPARTMENTS[val]) {
      setDepartment(DEFAULT_ROLE_DEPARTMENTS[val]);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter both Full Name and Corporate Email.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    const res = await createNewEmployeeAccount({
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      role: selectedRole,
      status: accountStatus,
      dob,
      phone,
      address,
      bloodGroup,
      emergencyContactName,
      emergencyContactPhone,
      panCard,
      govtIdUrl,
      bankAccountNumber,
      ifscCode,
      joiningDate,
      assignedAssets
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg(`Employee account created for ${name}! Registered in Firebase Auth with default credentials (GlitchCloud2026!) and email reset link dispatched.`);
      setName('');
      setEmail('');
      setPhone('');
      setPanCard('');
      setBankAccountNumber('');
      setTimeout(() => {
        if (onClose) onClose();
      }, 1800);
    } else {
      setErrorMsg(res.error || 'Failed to create employee account.');
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar font-urbanist select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0a0a0f] border border-white/10 rounded-[36px] p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative space-y-6 my-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white tracking-tight">Onboard New Employee</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                Comprehensive HR Schema
              </span>
            </div>
            <p className="text-xs text-neutral/60">
              Full employee onboarding data model including personal details, tax IDs, payroll banking, and hardware assets.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Onboarding Form Tab Navigation */}
        <div className="flex gap-2 border-b border-white/5 pb-3 overflow-x-auto custom-scrollbar">
          {[
            { id: 'basic', label: '1. Basic & Role', icon: User },
            { id: 'personal', label: '2. Personal & Emergency', icon: Heart },
            { id: 'tax', label: '3. Identity & Tax', icon: CreditCard },
            { id: 'payroll', label: '4. Payroll & Hardware Assets', icon: Landmark }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-neon-purple'
                    : 'bg-white/5 text-neutral/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          
          {/* Tab 1: Basic & Role */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all placeholder:text-neutral/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Corporate Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@glitchcloud.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all placeholder:text-neutral/20"
                  />
                </div>
              </div>

              <div>
                <CustomSelect
                  label="Corporate Role Hierarchy"
                  value={selectedRole}
                  options={CORPORATE_ROLES_LIST}
                  onChange={handleRoleChange}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Mapped Department</label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Personal & Emergency */}
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <GlassDatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(val) => setDob(val)}
                  placeholder="Select Date of Birth"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Permanent Residential Address</label>
                <div className="relative">
                  <Home className="w-4 h-4 text-neutral/40 absolute left-4 top-4" />
                  <textarea
                    rows="2"
                    placeholder="Street, City, State, Pincode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all resize-none"
                  />
                </div>
              </div>

              <div>
                <CustomSelect
                  label="Blood Group"
                  value={bloodGroup}
                  options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
                  onChange={(val) => setBloodGroup(val)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Emergency Contact Name & Relation</label>
                <input
                  type="text"
                  placeholder="e.g. Mark Jenkins (Spouse)"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Identity & Tax */}
          {activeTab === 'tax' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">PAN Card Number</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={panCard}
                    onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Government ID Document Link / File</label>
                <div className="relative">
                  <FileCheck className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="https://drive.google.com/id-scan.pdf"
                    value={govtIdUrl}
                    onChange={(e) => setGovtIdUrl(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Payroll & Hardware Assets */}
          {activeTab === 'payroll' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Bank Account Number</label>
                <div className="relative">
                  <Landmark className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="918237129837192"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">IFSC Code</label>
                <input
                  type="text"
                  placeholder="HDFC0001234"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all font-mono uppercase"
                />
              </div>

              <div>
                <GlassDatePicker
                  label="Corporate Joining Date"
                  value={joiningDate}
                  onChange={(val) => setJoiningDate(val)}
                  placeholder="Select Joining Date"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Assigned Hardware Assets</label>
                <div className="relative">
                  <Laptop className="w-4 h-4 text-neutral/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="MacBook Pro M3 Max, 4K Monitor"
                    value={assignedAssets}
                    onChange={(e) => setAssignedAssets(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Account Status Toggle Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 mt-4">
            <div className="flex items-center gap-3">
              <Power className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Account Entitlement & Deactivation Safety</div>
                <div className="text-[10px] text-neutral/50">Deactivating revokes portal login without destroying audit logs.</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAccountStatus(prev => prev === 'Active' ? 'Deactivated' : 'Active')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                accountStatus === 'Active'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {accountStatus}
            </button>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Employee Onboarding & Dispatch Credentials</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
