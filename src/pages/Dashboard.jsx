import React from 'react';
import { motion } from 'framer-motion';
import { DashboardStatCard } from '../components/DashboardStatCard';
import { RevenueOverviewCard } from '../components/RevenueOverviewCard';
import { TeamCoreCard } from '../components/TeamCoreCard';
import { RecentActivity } from '../components/RecentActivity';
import { Video, Layers, Clock, Plus } from 'lucide-react';

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
    <main className="flex-1 p-10 overflow-y-auto">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto space-y-10"
      >
        {/* Header Area */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[40px] font-bold tracking-tight text-white leading-none">Overview</h1>
            <p className="text-neutral text-[15px] mt-4 max-w-[600px] leading-relaxed">
              Welcome back. System nominal. Production pipelines are currently operating at 94% efficiency.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-[#16161E] text-sm font-medium text-white hover:bg-white/5 transition-all">
              <Clock className="w-4 h-4 text-primary" />
              <span>Clock In</span>
            </button>
            <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#EADDFF] text-[#12121A] text-sm font-bold shadow-[0_4px_20px_rgba(234,221,255,0.3)] hover:brightness-110 transition-all">
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>

        {/* Top Row Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardStatCard 
            title="Videos Completed" 
            value="1,492" 
            icon={Video} 
            trend="+12.5%" 
          />
          <DashboardStatCard 
            title="Active Projects" 
            value="84" 
            icon={Layers} 
            trend="Stable workload" 
          />
          <RevenueOverviewCard />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <RecentActivity />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TeamCoreCard />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
