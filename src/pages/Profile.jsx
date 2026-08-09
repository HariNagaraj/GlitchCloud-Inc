import React from 'react';
import { motion } from 'framer-motion';
import { useTeamStore } from '../store/useTeamStore';
import { Mail, Shield, Bell, Lock, LogOut, Camera, Edit3, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Profile = React.memo(function Profile() {
  const { currentUser } = useTeamStore();
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  const stats = [
    { label: 'Projects Led', value: '12', color: 'text-blue-400' },
    { label: 'Tasks Completed', value: '148', color: 'text-purple-400' },
    { label: 'Efficiency', value: '98%', color: 'text-green-400' },
  ];

  return (
    <div className="flex-1 bg-[#030305] text-white p-6 sm:p-10 font-urbanist overflow-y-auto pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-fluid-3xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-2">My Profile</h1>
          <p className="text-neutral text-fluid-sm font-medium opacity-60">Manage your identity and system preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0f] border border-white/5 rounded-[40px] p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />

              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-[40px] bg-gradient-to-tr from-primary to-purple-600 mx-auto p-1 relative group cursor-pointer shadow-2xl shadow-primary/20">
                  <div className="w-full h-full bg-[#0a0a0f] rounded-[38px] flex items-center justify-center text-4xl font-black text-white">
                    {currentUser?.name?.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-primary/40 rounded-[40px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 p-3 bg-primary rounded-2xl shadow-lg border border-white/20">
                  <Edit3 className="w-4 h-4 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-1">{currentUser?.name}</h2>
              <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-8">{currentUser?.roleTier} TIER</p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-medium">
                  <span className="text-neutral/60">Department</span>
                  <span className="text-white">Creative Ops</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-medium">
                  <span className="text-neutral/60">Employee ID</span>
                  <span className="text-white">#GC-7742</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a0a0f] border border-white/5 rounded-[40px] p-8 shadow-xl"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40 mb-8">Productivity Metrics</h3>
              <div className="space-y-6">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-neutral/60 text-sm font-medium">{stat.label}</span>
                    <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Settings & Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0a0a0f] border border-white/5 rounded-[40px] p-8 sm:p-10 shadow-2xl"
            >
              <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                Personalization & Settings
              </h3>

              <div className="space-y-6">
                {/* Theme Selection Section */}
                <div className="p-8 bg-white/[0.03] rounded-[32px] border border-white/5 hover:border-primary/20 transition-all group/theme">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Atmosphere</p>
                      <h4 className="text-lg font-bold text-white">System Color Theme</h4>
                      <p className="text-neutral/40 text-xs font-medium mt-1">Select your preferred accent color for the GlitchCloud OS.</p>
                    </div>
                    <div className="relative group/select w-full sm:w-64">
                      <select
                        value={currentTheme.id}
                        onChange={(e) => setCurrentTheme(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                      >
                        {themes.map(theme => (
                          <option key={theme.id} value={theme.id} className="bg-[#0a0a0f] text-white">
                            {theme.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral/40">
                        <Settings className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {themes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setCurrentTheme(theme.id)}
                        className={`group relative p-1 rounded-2xl border-2 transition-all ${currentTheme.id === theme.id ? 'border-primary' : 'border-transparent'}`}
                      >
                        <div
                          className="w-full aspect-square rounded-xl shadow-lg"
                          style={{ backgroundColor: theme.color }}
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Edit3 className="w-2 h-2 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: 'Email Address', value: 'user@glitchcloud.io', type: 'input' },
                    { icon: Shield, label: 'Security Level', value: 'Biometric + 2FA', type: 'badge' },
                    { icon: Bell, label: 'Notifications', value: 'High Priority', type: 'badge' },
                    { icon: Lock, label: 'Password', value: '••••••••••••', type: 'input' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-[24px] border border-white/5 hover:border-white/10 transition-all group/item">
                      <div className="p-3 bg-white/5 rounded-xl group-hover/item:bg-primary/10 transition-colors">
                        <item.icon className="w-4 h-4 text-neutral group-hover/item:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral/40 mb-0.5">{item.label}</p>
                        <p className="font-bold text-xs truncate text-white/90">{item.value}</p>
                      </div>
                      <button className="text-[9px] font-black text-primary hover:text-white uppercase tracking-widest bg-primary/10 hover:bg-primary px-3 py-1.5 rounded-lg transition-all active:scale-95">
                        Change
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/[0.03] border border-red-500/10 rounded-[40px] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="max-w-md">
                <h3 className="text-xl font-black text-red-500 mb-2 flex items-center gap-3">
                  <LogOut className="w-6 h-6" />
                  Terminate Session
                </h3>
                <p className="text-neutral/60 text-sm font-medium">Securely log out of the GlitchCloud OS on this device.</p>
              </div>
              <button className="w-full sm:w-auto px-10 py-5 bg-red-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 transition-all active:scale-95 whitespace-nowrap">
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});
