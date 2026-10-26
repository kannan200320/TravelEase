import { Link } from 'react-router-dom';
import {
  Plane,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info (takes 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#CC313D] flex items-center justify-center text-white shadow-md shadow-[#CC313D]/30">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Travel<span className="text-[#F7C5CC]">Ease</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TravelEase is your premier gateway to unforgettable journeys worldwide. We craft handcrafted itineraries combining boutique 5-star comfort, local cultural depth, and seamless modern technology in Indian Rupees (₹).
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F7C5CC] shrink-0" />
                <span>Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F7C5CC] shrink-0" />
                <span>1800-123-EASE / +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F7C5CC] shrink-0" />
                <span>support@travelease.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase text-[#F7C5CC]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition-colors">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-white transition-colors">
                  Book A Trip
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase text-[#F7C5CC]">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/packages?category=beach" className="hover:text-white transition-colors">
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link to="/packages?category=romantic" className="hover:text-white transition-colors">
                  Santorini, Greece
                </Link>
              </li>
              <li>
                <Link to="/packages?category=mountain" className="hover:text-white transition-colors">
                  Swiss Alps, Switzerland
                </Link>
              </li>
              <li>
                <Link to="/packages?category=cultural" className="hover:text-white transition-colors">
                  Tokyo & Kyoto, Japan
                </Link>
              </li>
              <li>
                <Link to="/packages?category=city" className="hover:text-white transition-colors">
                  Dubai & Abu Dhabi, UAE
                </Link>
              </li>
              <li>
                <Link to="/packages?category=wildlife" className="hover:text-white transition-colors">
                  Serengeti & Zanzibar, Tanzania
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TravelEase India. Handcrafted for passionate Indian & world travelers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
