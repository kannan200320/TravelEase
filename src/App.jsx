import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { PackagesPage } from './pages/PackagesPage';
import { WishlistPage } from './pages/WishlistPage';
import { PackageDetailsPage } from './pages/PackageDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, search]);

  return null;
};

export function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
          {/* Global Header */}
          <Navbar />

          {/* Main App Content View */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/package/:id" element={<PackageDetailsPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* User Sign In / Register Modal Dialog */}
          <AuthModal />

          {/* Floating Toast Notification Container */}
          <ToastContainer />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
