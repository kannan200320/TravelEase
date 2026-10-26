import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, ArrowRight } from 'lucide-react';
import { TRAVEL_PACKAGES } from '../data/travelData';
import { PackageCard } from '../components/PackageCard';
import { useBooking } from '../context/BookingContext';

export const WishlistPage = () => {
  const { wishlist } = useBooking();

  // Filter packages that are in the user's wishlist
  const savedPackages = useMemo(() => {
    return TRAVEL_PACKAGES.filter((pkg) => wishlist.includes(pkg.id));
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
            <span>Personal Travel Bucket List</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Saved Wishlist
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Your handpicked favorite holiday itineraries. Ready to pack your bags? Reserve your spot anytime with just one click.
          </p>
        </div>

        {/* Counter Pill */}
        <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-center">
          <span className="block text-2xl font-black text-rose-300">{savedPackages.length}</span>
          <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Saved Trips</span>
        </div>
      </div>

      {/* Wishlist Grid (No filters, clean and direct) */}
      {savedPackages.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Showing <strong>{savedPackages.length}</strong> saved holiday packages</span>
            <Link
              to="/packages"
              className="text-[#CC313D] hover:text-[#b52632] font-bold text-xs flex items-center gap-1"
            >
              <span>Explore more packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Explore our curated destinations and click the heart icon on any package to save your dream itineraries here.
          </p>
          <div className="pt-2">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs shadow-md shadow-[#CC313D]/25 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Travel Packages</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
