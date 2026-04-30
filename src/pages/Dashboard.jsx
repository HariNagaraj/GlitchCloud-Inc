import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { StatusDot } from '../components/StatusDot';
import { ProgressBar } from '../components/ProgressBar';
import { Users, Video, DollarSign, Activity, ArrowRight, MoreHorizontal } from 'lucide-react';

export function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-[1400px] mx-auto space-y-8"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-heading text-on-surface mb-2">Overview</h2>
                <p className="text-on-surface-variant">Welcome back to GlitchCloud AMS.</p>
              </div>
              <Button>
                New Project
              </Button>
            </div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Revenue" value="$128.4K" change="12.5%" icon={DollarSign} trend="up" />
              <StatCard title="Active Projects" value="24" change="4" icon={Video} trend="up" />
              <StatCard title="Client Roster" value="86" change="2" icon={Users} trend="up" />
              <StatCard title="Overall Efficiency" value="94%" change="1.2%" icon={Activity} trend="down" />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Active Projects List */}
              <motion.div variants={itemVariants} className="xl:col-span-2">
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold tracking-heading">Active Productions</h3>
                    <button className="text-sm font-semibold text-primary hover:text-primary-fixed flex items-center gap-1 transition-colors">
                      View All <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Neon Genesis Commercial', client: 'Stark Ind.', progress: 75, status: 'online' },
                      { name: 'Quantum UI Reel', client: 'Acme Corp', progress: 40, status: 'warning' },
                      { name: 'Cyberpunk Short Film', client: 'CDPR', progress: 90, status: 'online' }
                    ].map((project, i) => (
                      <div key={i} className="p-4 rounded-xl bg-surface-container-low border border-white/5 flex items-center gap-6 hover:bg-surface-bright/50 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <StatusDot status={project.status} />
                            <h4 className="font-bold text-on-surface">{project.name}</h4>
                          </div>
                          <div className="text-sm text-on-surface-variant pl-5">{project.client}</div>
                        </div>
                        <div className="w-48">
                          <div className="flex justify-between text-xs mb-2 text-on-surface-variant font-semibold">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <ProgressBar progress={project.progress} />
                        </div>
                        <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants}>
                <GlassCard className="h-full">
                  <h3 className="text-xl font-bold tracking-heading mb-6">Recent Activity</h3>
                  
                  <div className="relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/5 space-y-6">
                    {[
                      { title: 'Assets Uploaded', desc: 'Sarah added 12 new files to Neon Genesis', time: '2h ago', color: 'bg-primary shadow-neon-primary' },
                      { title: 'Milestone Approved', desc: 'Client signed off on Phase 1', time: '5h ago', color: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' },
                      { title: 'Feedback Received', desc: '3 new comments on Cyberpunk Short', time: '1d ago', color: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]' },
                    ].map((activity, i) => (
                      <div key={i} className="relative pl-8">
                        <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface border border-white/10 flex items-center justify-center z-10`}>
                          <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                        </div>
                        <h4 className="font-semibold text-sm text-on-surface">{activity.title}</h4>
                        <p className="text-xs text-on-surface-variant mt-1">{activity.desc}</p>
                        <span className="text-[10px] font-bold text-outline uppercase tracking-wider mt-2 block">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
