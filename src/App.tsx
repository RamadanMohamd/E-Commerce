import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OffersBar from './components/OffersBar';
import Footer from './components/Footer';
import { useInitializeLanguage } from './hooks/useInitializeLanguage';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const App: React.FC = () => {
  useInitializeLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <OffersBar />
      <Header />
      <main className="flex-grow bg-white">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;