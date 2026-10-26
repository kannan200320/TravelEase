import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Plane,
  Heart,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const {
    bookings,
    wishlist,
    user,
    openAuthModal,
    logoutUser,
  } = useBooking();

  const location = useLocation();
  const activeBookingsCount = bookings.filter((b) => b.status !== 'Cancelled').length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Freeze background content scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Auto-close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80'
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 rounded-xl bg-[#CC313D] flex items-center justify-center text-white shadow-md shadow-[#CC313D]/25 group-hover:scale-105 transition-transform duration-200">
              <Plane className="w-6 h-6 stroke-[2.2] -rotate-45 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Travel<span className="text-[#CC313D]">Ease</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-600">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#CC313D] bg-[#F7C5CC]/30 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/destinations"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#CC313D] bg-[#F7C5CC]/30 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Destinations
            </NavLink>

            <NavLink
              to="/packages"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#CC313D] bg-[#F7C5CC]/30 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Travel Packages
            </NavLink>

            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `relative px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#CC313D] bg-[#F7C5CC]/30 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#CC313D] rounded-full shadow-sm">
                  {activeBookingsCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right Action Controls: Single Wishlist Icon Button, Sign In / Profile, Book Now */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist Icon Button (Single Wishlist access in header) */}
            <Link
              to="/wishlist"
              className={`relative p-2.5 rounded-xl border transition-all ${
                location.pathname === '/wishlist'
                  ? 'bg-[#F7C5CC]/40 border-[#F7C5CC] text-[#CC313D] shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-[#CC313D] hover:bg-[#F7C5CC]/20'
              }`}
              title="View Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#CC313D] text-[#CC313D]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC313D] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Authentication: Sign In or User Menu */}
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#CC313D] bg-slate-100 hover:bg-[#F7C5CC]/30 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer border border-slate-200/80"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="inline-flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#CC313D] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1 text-xs font-medium text-slate-700">
                      <Link
                        to="/my-bookings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7C5CC]/20 hover:text-[#CC313D] transition-colors"
                      >
                        <span>My Bookings ({bookings.length})</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F7C5CC]/20 hover:text-[#CC313D] transition-colors"
                      >
                        <Heart className="w-4 h-4 text-[#CC313D]" />
                        <span>Saved Wishlist ({wishlist.length})</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logoutUser();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#CC313D] hover:bg-[#F7C5CC]/30 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Book Trip Primary CTA */}
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-[#CC313D] hover:bg-[#b52632] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-[#CC313D]/25 hover:shadow-lg hover:shadow-[#CC313D]/35 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Book A Trip</span>
            </Link>
          </div>

          {/* Mobile Menu & Wishlist Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-[#CC313D]"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#CC313D] text-[#CC313D]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#CC313D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[65px] bg-slate-950/40 backdrop-blur-sm z-30 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="relative z-40 lg:hidden border-t border-slate-100 bg-white px-4 pt-4 pb-6 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 text-base font-medium">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="px-4 py-2.5 rounded-lg text-slate-800 hover:bg-[#F7C5CC]/25 hover:text-[#CC313D] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/destinations"
                onClick={closeMobileMenu}
                className="px-4 py-2.5 rounded-lg text-slate-800 hover:bg-[#F7C5CC]/25 hover:text-[#CC313D] transition-colors"
              >
                Destinations
              </Link>
              <Link
                to="/packages"
                onClick={closeMobileMenu}
                className="px-4 py-2.5 rounded-lg text-slate-800 hover:bg-[#F7C5CC]/25 hover:text-[#CC313D] transition-colors"
              >
                Travel Packages
              </Link>
              <Link
                to="/my-bookings"
                onClick={closeMobileMenu}
                className="px-4 py-2.5 rounded-lg text-slate-800 hover:bg-[#F7C5CC]/25 hover:text-[#CC313D] flex items-center justify-between transition-colors"
              >
                <span>My Bookings</span>
                {activeBookingsCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#CC313D] rounded-full">
                    {activeBookingsCount} Active
                  </span>
                )}
              </Link>

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
                {/* Only Sign In button above to the Book A Trip Now button */}
                {user ? (
                  <div className="p-3 rounded-2xl bg-[#F7C5CC]/25 border border-[#F7C5CC] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#CC313D] text-white font-bold text-xs flex items-center justify-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{user.name}</div>
                        <div className="text-[10px] text-slate-500">{user.email}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();
                        logoutUser();
                      }}
                      className="text-xs font-bold text-[#CC313D] hover:underline cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      openAuthModal('signin');
                    }}
                    className="w-full text-center py-2.5 rounded-xl border-2 border-[#CC313D] bg-[#F7C5CC]/20 text-xs font-bold text-[#CC313D] hover:bg-[#F7C5CC]/40 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                )}

                <Link
                  to="/booking"
                  onClick={closeMobileMenu}
                  className="w-full text-center bg-[#CC313D] hover:bg-[#b52632] text-white font-semibold py-3 rounded-xl shadow-md shadow-[#CC313D]/25 transition-all"
                >
                  Book A Trip Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
