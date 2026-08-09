import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Target, PieChart, Rocket, ChevronDown } from 'lucide-react';
import { RevenueChart } from '../components/RevenueChart';
import { ClientAcquisitionChart } from '../components/ClientAcquisitionChart';
import { TeamVelocityCard } from '../components/TeamVelocityCard';
import { StatCard } from '../components/StatCard';


const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export const Analytics = React.memo(function Analytics() {
  return (
    <main className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar font-urbanist">
      <motion.div 
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto space-y-8"
      >
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-8">
          <div className="max-w-[600px]">
            <h2 className="text-fluid-3xl font-black tracking-tighter text-white mb-2 leading-[1.1]">Analytics & Insights</h2>
            <p className="text-neutral text-fluid-sm font-medium opacity-60">
              Deep dive into your agency's performance metrics and client acquisition trends.
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/5 bg-[#16161E] hover:bg-[#1E1E28] transition-colors shadow-2xl">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-black uppercase tracking-widest mx-1">Last 90 Days</span>
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={() => console.log('[Analytics] Exporting report...')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl transition-opacity shadow-2xl shadow-primary/20 hover:opacity-90 bg-primary text-white text-sm font-black uppercase tracking-widest"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Average Deal Value" 
            value="₹1,245,000" 
            change="+12.4%" 
            isPositive={true} 
            subValue="Per Contract"
            icon={Target} 
          />
          <StatCard 
            title="Conversion Rate" 
            value="68.2%" 
            change="+4.1%" 
            isPositive={true} 
            subValue="Lead to Client"
            icon={PieChart} 
          />
          <StatCard 
            title="Monthly Growth" 
            value="+24.8%" 
            change="Stable" 
            subValue="Traffic & Sales"
            icon={Rocket} 
            isFeatured
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          {/* Revenue Chart - takes 2 cols */}
          <motion.div variants={ITEM_VARIANTS} className="xl:col-span-2 flex flex-col">
            <RevenueChart />
          </motion.div>

          {/* Right Column - Client Acq & Team Velocity */}
          <motion.div variants={ITEM_VARIANTS} className="flex flex-col gap-6">
            <ClientAcquisitionChart />
            <TeamVelocityCard />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
});
