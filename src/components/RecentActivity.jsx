import React from 'react';
import { Cloud, MessageSquare, GitBranch } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      icon: Cloud,
      title: 'Render Complete: Alpha Cinematic',
      desc: 'Project Neo-Tokyo scene 4 finished rendering on node 12.',
      time: '2m ago',
    },
    {
      icon: MessageSquare,
      title: 'Client Feedback Received',
      desc: 'Sarah J. left 3 comments on the latest motion graphics draft.',
      time: '1h ago',
    },
    {
      icon: GitBranch,
      title: 'Pipeline Updated',
      desc: 'VFX sequence merged into main branch by David.',
      time: '3h ago',
    }
  ];

  return (
    <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-[32px] p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-7 relative z-10">
        <h2 className="text-[17px] font-bold tracking-wide text-white">Recent Activity</h2>
        <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div key={i} className="flex items-start justify-between group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-neutral group-hover:text-white group-hover:bg-white/10 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white leading-tight">{activity.title}</h4>
                  <p className="text-[12px] text-neutral mt-1.5 max-w-[340px] leading-relaxed opacity-80">{activity.desc}</p>
                </div>
              </div>
              <div className="text-[11px] font-semibold text-neutral whitespace-nowrap pt-1">
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
