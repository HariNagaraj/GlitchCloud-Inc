import { useState } from 'react';
import { ProductionCalendar } from '../ProductionCalendar';

export function CalendarWrapper() {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="flex-1 flex flex-col h-full px-6 max-w-7xl mx-auto w-full">
      
      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('calendar')}
          className={`text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'text-primary' : 'text-neutral hover:text-white'}`}
        >
          Schedule
        </button>
        <button 
          onClick={() => setActiveTab('production')}
          className={`text-sm font-medium transition-colors ${activeTab === 'production' ? 'text-primary' : 'text-neutral hover:text-white'}`}
        >
          Production Planner
        </button>
      </div>

      {/* Render Component */}
      <div className="flex-1">
        {activeTab === 'calendar' && (
          <div className="flex items-center justify-center h-64 text-neutral border border-dashed border-white/10 rounded-2xl">
            <p>Base Calendar View (Not Implemented)</p>
          </div>
        )}
        {activeTab === 'production' && <ProductionCalendar />}
      </div>
    </div>
  );
}
