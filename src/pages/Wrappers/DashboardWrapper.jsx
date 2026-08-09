import { useState } from 'react';
import { Dashboard } from '../Dashboard';
import { Analytics } from '../Analytics';
import { Financials } from '../Financials';

export function DashboardWrapper({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Render Component */}
      <div className="flex-1">
        {activeTab === 'dashboard' && <Dashboard onNavigate={onNavigate} />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'financials' && <Financials />}
      </div>
    </div>
  );
}
