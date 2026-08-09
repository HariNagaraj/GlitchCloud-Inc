import { motion } from 'framer-motion';
import { 
  ChevronLeft, Search, MoreVertical, Plus, 
  Calendar as CalendarIcon, FileText, Download,
  Phone, Mail, MapPin, Clock, Shield,
  MessageSquare, Video, PhoneCall, Link as LinkIcon,
  Briefcase, CheckCircle, Info, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Sparkles
} from 'lucide-react';

export function EmployeeProfile({ member, onBack }) {
  if (!member) return null;

  const specializations = [
    'Engines', 'Transmission', 'Braking system', 
    'Wheel balancing', 'Light', 'Air conditions'
  ];

  const certifications = [
    { name: 'ASE certificate', ext: '.pdf' },
    { name: 'ASE advance...', ext: '.jpg' }
  ];

  const absences = [
    { label: 'Days off', current: 4, total: 15, color: 'from-orange-500 to-red-500' },
    { label: 'Vacation', current: 14, total: 20, color: 'from-blue-500 to-cyan-500' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col h-full bg-[#030305] text-white overflow-hidden"
    >
      {/* Top Header */}
      <div className="h-16 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/5 text-neutral hover:text-white transition-colors flex items-center gap-2 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Chat</span>
          </button>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral">Mechanics</span>
            <span className="text-neutral/30">/</span>
            <span className="font-semibold">Profile</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:border-primary/50 outline-none w-64"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 text-neutral hover:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column - Details */}
        <div className="w-[400px] border-r border-white/5 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* Profile Basic Info */}
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 p-[2px] shrink-0">
              <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center text-3xl font-bold">
                {member.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{member.name}</h2>
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-md">
                   <Clock className="w-3 h-3" />
                   $75/h
                </div>
              </div>
              <p className="text-sm text-neutral mt-1">12 May, 1986 (38 y.o)</p>
              
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Resume
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                  <Download className="w-3.5 h-3.5 text-neutral" />
                </button>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <Section title="Specializations" icon={Shield}>
            <div className="flex flex-wrap gap-2">
              {specializations.map(spec => (
                <span key={spec} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-neutral hover:text-white hover:border-primary/50 transition-all cursor-default">
                  {spec}
                </span>
              ))}
            </div>
          </Section>

          {/* Certifications */}
          <Section title="Certifications" icon={CheckCircle}>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.name} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-3">
                     <FileText className="w-4 h-4 text-primary" />
                     <span className="text-xs font-medium">{cert.name}</span>
                   </div>
                   <button className="flex items-center gap-1.5 text-[10px] text-neutral font-bold uppercase tracking-widest">
                     <Download className="w-3 h-3" />
                     {cert.ext}
                   </button>
                </div>
              ))}
            </div>
          </Section>

          {/* General Info */}
          <Section title="General" icon={Info}>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral">Financial reward</span>
                <span className="font-bold text-green-400">$45/h</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral">Start of work</span>
                <span className="font-bold flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                  17 Jun, 2023
                </span>
              </div>
            </div>
          </Section>

          {/* Available Absences */}
          <Section title="Available absences" icon={CalendarIcon}>
            <div className="grid grid-cols-2 gap-4">
              {absences.map(abs => (
                <div key={abs.label} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-bold text-neutral uppercase tracking-widest">{abs.label}</span>
                    <span className="text-sm font-bold">{abs.current} <span className="text-neutral/40">/ {abs.total}</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${abs.color} rounded-full`} 
                      style={{ width: `${(abs.current / abs.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Contacts */}
          <Section title="Contacts" icon={Phone}>
            <div className="space-y-4">
              <ContactItem icon={Phone} label="Phone" value="+47 2875 6571, +47 7675 6572" />
              <ContactItem icon={Mail} label="E-mail" value="floyd.miles@gmail.com" />
              <ContactItem icon={MapPin} label="Address" value="Aarhus, Rosenvej 24, 8000, Midtjylland" />
            </div>
          </Section>

        </div>

        {/* Right Column - Calendar & Notes */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-[#030305]">
          
          {/* Calendar Header */}
          <div className="p-8 pb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">April, 2024</h3>
            <div className="flex items-center gap-2">
              <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex gap-1">
                {['Week', 'Month', 'Year', 'Today'].map(v => (
                  <button key={v} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${v === 'Month' ? 'bg-primary text-white shadow-lg' : 'text-neutral hover:text-white'}`}>
                    {v}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 bg-primary px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                <Plus className="w-4 h-4" />
                New absence
              </button>
            </div>
          </div>

          {/* Mini Calendar Grid (Visual) */}
          <div className="px-8 flex-1 min-h-[400px]">
            <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="bg-[#0a0a0f] p-3 text-center text-[10px] font-bold text-neutral uppercase tracking-widest border-b border-white/5">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 0; // Simplified day calculation
                const isToday = day === 10;
                const hasTask = [1, 3, 5, 8, 10, 18, 30].includes(day);
                
                return (
                  <div key={i} className={`bg-[#060608]/50 min-h-[80px] p-2 border-r border-b border-white/5 relative group hover:bg-white/5 transition-colors ${day <= 0 || day > 30 ? 'opacity-20 bg-transparent' : ''}`}>
                    {day > 0 && day <= 30 && (
                      <>
                        <span className={`text-xs font-medium ${isToday ? 'bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center -m-1' : 'text-neutral'}`}>{day}</span>
                        {hasTask && (
                           <div className={`mt-2 p-1.5 rounded-lg text-[9px] font-bold ${day === 10 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-primary/20 text-primary border border-primary/30'} truncate`}>
                             {day === 10 ? 'Steering s...' : 'Engine mo...'}
                           </div>
                        )}
                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center backdrop-blur-md border border-primary/30">
                             <Plus className="w-4 h-4" />
                           </div>
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes Section */}
          <div className="p-8 border-t border-white/5 mt-8 space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <MessageSquare className="w-5 h-5 text-primary" />
                 <h4 className="text-lg font-bold">Notes</h4>
                 <span className="bg-white/5 text-neutral px-2 py-0.5 rounded text-xs font-bold">12</span>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
               <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-white/5 text-neutral"><Bold className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-white/5 text-neutral"><Italic className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button className="p-1.5 rounded hover:bg-white/5 text-neutral"><AlignLeft className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-white/5 text-neutral"><AlignCenter className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded hover:bg-white/5 text-neutral"><AlignRight className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button className="p-1.5 rounded hover:bg-white/5 text-neutral"><List className="w-4 h-4" /></button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-primary/30 rounded-lg text-xs font-bold text-primary group">
                    <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    AI Assistant
                  </button>
               </div>
               
               <textarea 
                 placeholder="Type your comment here or @ to mention..."
                 className="w-full bg-transparent border-none outline-none text-sm text-white resize-none min-h-[100px] placeholder:text-neutral/30"
               />

               <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-2">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full border-2 border-[#030305] bg-neutral/20" />
                     ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl text-xs font-bold text-neutral hover:text-white transition-colors">Cancel</button>
                    <button className="px-6 py-2 bg-primary rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">Save</button>
                  </div>
               </div>
            </div>

            {/* Comment Feed */}
            <div className="space-y-4 pt-4">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs shrink-0 shadow-lg shadow-indigo-500/20">A</div>
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">Anders Johansen</span>
                        <span className="text-neutral/40 text-[10px] uppercase font-black tracking-widest">23 June, 2024 at 14:24</span>
                     </div>
                     <p className="text-sm text-neutral leading-relaxed">
                       Floyd received positive feedback for his detailed engine diagnostics from 5 clients and completed one more certification.
                     </p>
                  </div>
               </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-white/5 pb-2">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral/40">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
        <Icon className="w-3.5 h-3.5 text-neutral" />
      </div>
      <div>
        <div className="text-[10px] text-neutral/50 font-bold uppercase tracking-wider">{label}</div>
        <div className="text-sm font-medium mt-0.5 break-all">{value}</div>
      </div>
    </div>
  );
}
