import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Shield, MessageSquare, Video, PhoneCall, Link as LinkIcon, Briefcase } from 'lucide-react';

export function ProfilePanel({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0f]">
      {/* Profile Header / Cover Area */}
      <div className="relative h-32 bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)]" />
      </div>

      <div className="px-6 -mt-16 relative flex flex-col flex-1 overflow-y-auto pb-8">
        {/* Avatar Area */}
        <div className="relative inline-block self-start">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#7C3AED] to-indigo-600 p-[2px] shadow-2xl">
            <div className="w-full h-full rounded-3xl bg-[#0a0a0f] flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                member.name.charAt(0)
              )}
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#0a0a0f] rounded-full flex items-center justify-center border-2 border-[#0a0a0f]">
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
        </div>

        {/* Name and Role */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">{member.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-primary text-sm font-medium">{member.roleTier || 'Member'}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-neutral/70 text-sm">{member.dept || 'Department'}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-6">
          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 flex flex-col items-center justify-center gap-1 transition-all group">
            <MessageSquare className="w-4 h-4 text-neutral group-hover:text-white" />
            <span className="text-[10px] text-neutral group-hover:text-white uppercase font-bold tracking-widest">Message</span>
          </button>
          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 flex flex-col items-center justify-center gap-1 transition-all group">
            <PhoneCall className="w-4 h-4 text-neutral group-hover:text-white" />
            <span className="text-[10px] text-neutral group-hover:text-white uppercase font-bold tracking-widest">Call</span>
          </button>
          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 flex flex-col items-center justify-center gap-1 transition-all group">
            <Video className="w-4 h-4 text-neutral group-hover:text-white" />
            <span className="text-[10px] text-neutral group-hover:text-white uppercase font-bold tracking-widest">Video</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="mt-8 space-y-6">
          <Section title="Contact Information">
            <InfoItem icon={Mail} label="Email" value={member.email || `${member.name.toLowerCase().replace(' ', '.')}@glitchcloud.com`} />
            <InfoItem icon={Phone} label="Phone" value="+91 98765 43210" />
            <InfoItem icon={LinkIcon} label="Slack" value={`@${member.name.toLowerCase().replace(' ', '_')}`} />
          </Section>

          <Section title="About">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 text-neutral/50 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Location</span>
                </div>
                <div className="text-sm text-white font-medium">Bangalore, IN</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 text-neutral/50 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Timezone</span>
                </div>
                <div className="text-sm text-white font-medium">IST (UTC+5:30)</div>
              </div>
            </div>
          </Section>

          <Section title="Organization">
            <InfoItem icon={Briefcase} label="Department" value={member.dept || 'Operations'} />
            <InfoItem icon={Shield} label="Access Tier" value={member.roleTier || 'Standard'} />
          </Section>
        </div>

        {/* View Profile Button */}
        <button className="mt-10 w-full py-4 bg-gradient-to-r from-[#7C3AED] to-indigo-600 rounded-2xl text-sm font-bold text-white shadow-[0_8px_25px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_35px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/10 uppercase tracking-widest">
          View Full Profile
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-neutral/40 px-1">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3.5 transition-colors cursor-pointer group">
      <div className="w-10 h-10 rounded-lg bg-[#0a0a0f] flex items-center justify-center text-neutral group-hover:text-primary transition-colors border border-white/5">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[10px] text-neutral/50 font-bold uppercase tracking-wider">{label}</div>
        <div className="text-sm text-white font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
}
