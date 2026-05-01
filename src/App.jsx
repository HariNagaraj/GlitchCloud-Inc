import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Financials } from './pages/Financials';
import { ProductionCalendar } from './pages/ProductionCalendar';
import { Analytics } from './pages/Analytics';
import { Team } from './pages/Team';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background flex text-white font-sans">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'financials' && <Financials />}
        {currentPage === 'calendar' && <ProductionCalendar />}
        {currentPage === 'analytics' && <Analytics />}
        {currentPage === 'team' && <Team />}
        {currentPage !== 'dashboard' && currentPage !== 'financials' && currentPage !== 'calendar' && currentPage !== 'analytics' && currentPage !== 'team' && (
           <div className="flex-1 p-10 flex items-center justify-center text-neutral">
             <h2 className="text-xl">The {currentPage} view is not implemented yet.</h2>
           </div>
        )}
      </div>
    </div>
  );
}

export default App;
