import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Target, PieChart, Rocket, ChevronDown } from 'lucide-react';
import { RevenueChart } from '../components/RevenueChart';
import { ClientAcquisitionChart } from '../components/ClientAcquisitionChart';
import { TeamVelocityCard } from '../components/TeamVelocityCard';

function MetricCard({ title, value, change, isPositive, icon: Icon, isRocket }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] p-7 flex flex-col h-[180px] overflow-hidden border border-t-white/10 border-l-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-start justify-between relative z-10">
        <h3 className="text-neutral text-xs font-bold tracking-[0.2em] uppercase mb-1">{title}</h3>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]`}>
          <Icon className={`w-4 h-4 ${isRocket ? 'text-primary' : 'text-neutral'}`} />
        </div>
      </div>
      
      <div className="relative z-10 mt-auto">
        <div className="text-[36px] font-bold text-white tracking-tight mb-2 leading-none">
          {value}
        </div>
        <div className={`text-sm font-semibold flex items-center gap-2 ${isPositive === null ? 'text-neutral' : isPositive ? 'text-warning' : 'text-red-400'}`}>
          {isPositive && <span className="text-warning">↗</span>}
          {isPositive === false && <span className="text-red-400">↘</span>}
          {change}
        </div>
      </div>
    </motion.div>
  );
}

export function Analytics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
        className="max-w-[1400px] mx-auto space-y-8"
      >
        {/* Header Area */}
        <div className="flex items-start justify-between mb-10">
          <div className="max-w-[600px]">
            <h2 className="text-[40px] font-bold tracking-tight text-white mb-2 leading-none">Analytics & Insights</h2>
            <p className="text-neutral text-[15px] leading-relaxed">
              Deep dive into your agency's performance metrics and client acquisition trends.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-[#16161E] hover:bg-[#1E1E28] transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium mx-1">Last 90 Days</span>
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
            <button 
              className="flex items-center gap-2 px-8 py-3 rounded-full transition-opacity shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #D0BCFF 0%, #8B5CF6 100%)' }}
            >
              <Download className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">Export Report</span>
            </button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Average Deal Value" 
            value="₹1,245,000" 
            change="+12.4% vs last quarter" 
            isPositive={true} 
            icon={Target} 
          />
          <MetricCard 
            title="Conversion Rate" 
            value="68.2%" 
            change="+4.1% vs last quarter" 
            isPositive={true} 
            icon={PieChart} 
          />
          <MetricCard 
            title="Monthly Growth" 
            value="+24.8%" 
            change="= Stable trajectory" 
            isPositive={null} 
            icon={Rocket} 
            isRocket={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Revenue Chart - takes 2 cols */}
          <motion.div variants={itemVariants} className="xl:col-span-2 flex flex-col">
            <RevenueChart />
          </motion.div>

          {/* Right Column - Client Acq & Team Velocity */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <ClientAcquisitionChart />
            <TeamVelocityCard />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
