import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from './assets/logo.jpg';
import { MobileBottomNav } from './components/MobileBottomNav';
import { useTeamStore } from './store/useTeamStore';
import { PageLoader } from './components/PageLoader';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RoleGuard } from './components/RoleGuard';
import { FirstLoginResetModal } from './components/FirstLoginResetModal';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Financials = lazy(() => import('./pages/Financials').then(module => ({ default: module.Financials })));
const ProductionCalendar = lazy(() => import('./pages/ProductionCalendar').then(module => ({ default: module.ProductionCalendar })));
const Analytics = lazy(() => import('./pages/Analytics').then(module => ({ default: module.Analytics })));
const Team = lazy(() => import('./pages/Team').then(module => ({ default: module.Team })));
const Configuration = lazy(() => import('./pages/Configuration').then(module => ({ default: module.Configuration })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const Worklogs = lazy(() => import('./pages/Worklogs').then(module => ({ default: module.Worklogs })));

// Lazy load wrappers
const DashboardWrapper = lazy(() => import('./pages/Wrappers/DashboardWrapper').then(module => ({ default: module.DashboardWrapper })));

const USE_TOP_NAV = false;

function MainLayout() {
  const { userProfile, isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('glitchcloud_sidebar_collapsed');
    return saved === 'true';
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('glitchcloud_sidebar_collapsed', isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  if (loading) {
    return <PageLoader />;
  }

  // Mandatory Authentication Redirect
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="h-screen overflow-hidden bg-[#030305] flex text-white font-urbanist select-none">
      {userProfile?.isFirstLogin && <FirstLoginResetModal />}
      {!USE_TOP_NAV && (
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isCollapsed={isMobile ? !isSidebarCollapsed : isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobile={isMobile}
        />
      )}

      {/* Mobile Contextual Top-Bar */}
      {isMobile && !USE_TOP_NAV && (
        <div className="fixed top-0 left-0 right-0 h-20 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-[50] pt-safe">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-black flex items-center justify-center p-2 border border-primary/20 shadow-neon-purple/20 shadow-lg">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-bold text-xl tracking-tighter">GlitchCloud</h1>
          </div>

          <div
            onClick={() => setCurrentPage('profile')}
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold transition-all border active:scale-90 ${currentPage === 'profile'
              ? 'bg-primary text-white border-primary shadow-neon-purple'
              : 'bg-white/5 border-white/10 text-primary'
              }`}
          >
            {(userProfile?.name || 'U').charAt(0)}
          </div>
        </div>
      )}

      <motion.div
        animate={{
          paddingLeft: !USE_TOP_NAV ? (isMobile ? 0 : (isSidebarCollapsed ? 100 : 280)) : 0,
          paddingTop: (USE_TOP_NAV || isMobile) ? 80 : 0,
          paddingBottom: isMobile ? 80 : 0
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="flex-1 flex flex-col h-full overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col h-full overflow-hidden relative"
          >
            <Suspense fallback={<PageLoader />}>
              <RoleGuard navId={currentPage} onNavigate={setCurrentPage}>
                {currentPage === 'dashboard' && <DashboardWrapper onNavigate={setCurrentPage} />}
                {currentPage === 'team' && <Team />}
                {currentPage === 'analytics' && <Analytics />}
                {currentPage === 'calendar' && <ProductionCalendar onNavigate={setCurrentPage} />}
                {currentPage === 'clients' && <Configuration initialTopic="clients" />}
                {currentPage === 'worklogs' && <Worklogs />}
                {currentPage === 'financials' && <Financials />}
                {(currentPage === 'admin' || currentPage === 'configuration') && <Configuration initialTopic={null} />}
                {currentPage === 'profile' && <Profile />}

                {currentPage !== 'dashboard' && currentPage !== 'financials' && currentPage !== 'calendar' && currentPage !== 'analytics' && currentPage !== 'team' && currentPage !== 'configuration' && currentPage !== 'clients' && currentPage !== 'profile' && currentPage !== 'worklogs' && currentPage !== 'admin' && (
                  <div className="flex-1 p-10 flex items-center justify-center text-neutral">
                    <h2 className="text-xl">The {currentPage} view is not implemented yet.</h2>
                  </div>
                )}
              </RoleGuard>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {isMobile && !USE_TOP_NAV && (
        <MobileBottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
