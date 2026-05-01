import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { CashFlowChart } from '../components/CashFlowChart';
import { RecentActivity } from '../components/RecentActivity';
import { Calendar, Bell, TrendingUp, TrendingDown, FileText, ChevronDown } from 'lucide-react';

export function Financials() {
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
        className="max-w-[1200px] mx-auto space-y-8"
      >
        {/* Header Area */}
        <div className="flex items-start justify-between mb-10">
          <div className="max-w-[500px]">
            <h2 className="text-[40px] font-bold tracking-tight text-white mb-2 leading-none">Financials</h2>
            <p className="text-neutral text-[15px] leading-relaxed">
              Monitor your agency's cash flow, pending invoices, and upcoming expenses in real-time.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-5 py-3 rounded-full border border-surface-border bg-[#0a0a0f] text-sm font-medium hover:bg-surface transition-colors">
              <Calendar className="w-4 h-4 text-primary" />
              <span>This Quarter</span>
              <ChevronDown className="w-4 h-4 text-neutral" />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#0a0a0f] border border-surface-border flex items-center justify-center text-neutral hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-[14px] right-[14px] w-2 h-2 bg-primary rounded-full shadow-neon-purple" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Revenue" 
            value="₹284,500" 
            decimal=".00"
            change="+14.2%" 
            icon={TrendingUp} 
            variant="primary" 
          />
          <StatCard 
            title="Total Expenses" 
            value="₹92,140" 
            decimal=".50"
            change="-2.4%" 
            icon={TrendingDown} 
            variant="default" 
          />
          <StatCard 
            title="Pending Receivables" 
            value="₹45,800" 
            decimal=".00"
            change="12 Awaiting" 
            icon={FileText} 
            variant="warning" 
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <CashFlowChart />
          </motion.div>

          {/* Activity */}
          <motion.div variants={itemVariants}>
            <RecentActivity />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
