import { useState } from 'react';

export function ConfigurationWrapper() {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="flex-1 flex flex-col h-full px-6 max-w-7xl mx-auto w-full">
      
      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`text-sm font-medium transition-colors ${activeTab === 'settings' ? 'text-primary' : 'text-neutral hover:text-white'}`}
        >
          General Settings
        </button>
        <button 
          onClick={() => setActiveTab('clients')}
          className={`text-sm font-medium transition-colors ${activeTab === 'clients' ? 'text-primary' : 'text-neutral hover:text-white'}`}
        >
          Client Management
        </button>
      </div>

      {/* Render Component */}
      <div className="flex-1">
        {activeTab === 'settings' && (
          <div className="flex items-center justify-center h-64 text-neutral border border-dashed border-white/10 rounded-2xl">
            <p>Settings View (Not Implemented)</p>
          </div>
        )}
        {activeTab === 'clients' && (
          <div className="flex items-center justify-center h-64 text-neutral border border-dashed border-white/10 rounded-2xl">
            <p>Clients View (Not Implemented - Use standalone view if built)</p>
          </div>
        )}
      </div>
    </div>
  );
}
