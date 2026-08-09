import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '../components/StatCard';
import { CashFlowChart } from '../components/CashFlowChart';
import { RecentActivity } from '../components/RecentActivity';
import { Calendar, Bell, TrendingUp, TrendingDown, FileText, ChevronDown, Lock, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../context/roleConstants';

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export const Financials = React.memo(function Financials() {
  const { role, roleDetails } = useAuth();
  const isHR = role === ROLES.HR_STAFF;

  return (
    <main className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar font-urbanist bg-[#030305]">
      <motion.div 
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto space-y-10"
      >
        {/* Header Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0 mb-4 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-fluid-3xl font-black tracking-tighter text-white leading-[1.1]">Financials & Payroll</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleDetails?.badgeBg}`}>
                {isHR ? 'HR Payroll Read-Only' : 'Full Financial Directory'}
              </span>
            </div>
            <p className="text-neutral text-fluid-sm font-medium opacity-60">
              {isHR 
                ? 'Personnel compensation, salary disbursement telemetry, and benefits tracking.'
                : 'Agency cash flow, client retainers, and financial performance telemetry.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-white/5 bg-white/5 text-sm font-black hover:bg-white/10 transition-all active:scale-95 whitespace-nowrap">
              <Calendar className="w-4 h-4 text-primary" />
              <span>This Quarter</span>
              <ChevronDown className="w-4 h-4 text-neutral/40" />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral hover:text-white transition-all relative active:scale-95 shrink-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)] animate-pulse" />
            </button>
          </div>
        </div>

        {isHR && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center gap-3">
            <Eye className="w-5 h-5 shrink-0 text-amber-400" />
            <span>
              <strong>HR Partial Access Mode:</strong> You are viewing payroll & salary disbursement logs. Agency strategic revenues and client profit margins remain restricted to Admin & Finance teams.
            </span>
          </div>
        )}

        {/* Stats Grid */}
        <motion.div variants={ITEM_VARIANTS} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title={isHR ? "Monthly Payroll Budget" : "Total Revenue"}
            value={isHR ? "₹145,000" : "₹284,500"}
            decimal=".00"
            change="+14.2%" 
            isPositive={true}
            subValue={isHR ? "Payroll Expenses" : "YTD Performance"}
            icon={TrendingUp} 
          />
          <StatCard 
            title={isHR ? "Benefits & Insurance" : "Total Expenses"}
            value={isHR ? "₹24,500" : "₹92,140"}
            decimal=".50"
            change="-2.4%" 
            isPositive={false}
            subValue={isHR ? "Healthcare & Perks" : "Operating Costs"}
            icon={TrendingDown} 
          />
          <StatCard 
            title={isHR ? "Contractor Disbursements" : "Pending Receivables"}
            value={isHR ? "₹18,200" : "₹45,800"}
            decimal=".00"
            change={isHR ? "4 Pending" : "12 Awaiting"} 
            subValue={isHR ? "Freelance Payouts" : "Unpaid Invoices"}
            icon={FileText} 
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div variants={ITEM_VARIANTS} className="xl:col-span-2">
            <CashFlowChart />
          </motion.div>

          {/* Activity */}
          <motion.div variants={ITEM_VARIANTS}>
            <RecentActivity />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
});
