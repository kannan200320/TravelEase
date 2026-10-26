import { Link } from 'react-router-dom';
import {
  Star,
  Users,
  MapPin,
  Heart,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const PackageCard = ({ pkg }) => {
  const { formatPrice, toggleWishlist, isWishlisted } = useBooking();
  const wishlisted = isWishlisted(pkg.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#F7C5CC] transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {pkg.badge && (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#CC313D] border border-[#F7C5CC]/60 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 text-[#CC313D]" />
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(pkg.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 z-10 cursor-pointer ${
            wishlisted
              ? 'bg-[#CC313D] text-white'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-[#CC313D]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Location Pill overlay on bottom of image */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium z-10">
          <div className="flex items-center gap-1 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-[#F7C5CC]" />
            <span>{pkg.destinationName}, {pkg.country}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating and Group Size */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-slate-800">{pkg.rating}</span>
            <span>({pkg.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{pkg.groupSize || 'Small Group'}</span>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/package/${pkg.slug || pkg.id}`}
          className="text-base font-bold text-slate-900 hover:text-[#CC313D] transition-colors line-clamp-2 leading-snug mb-2"
        >
          {pkg.title}
        </Link>

        {/* Simple & Clean Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {pkg.overview}
        </p>

        {/* Card Footer: Price & Visible Action Buttons */}
        <div className="mt-auto pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Starting from
              </div>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  {formatPrice(pkg.price)}
                </span>
                {pkg.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(pkg.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">per person</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/package/${pkg.slug || pkg.id}`}
              className="text-xs font-semibold py-2.5 px-3 rounded-xl text-slate-700 bg-slate-100 hover:bg-[#F7C5CC]/30 hover:text-[#CC313D] transition-colors text-center flex items-center justify-center"
            >
              Details
            </Link>

            <Link
              to={`/booking?package=${pkg.id}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl bg-[#CC313D] hover:bg-[#b52632] text-white shadow-sm shadow-[#CC313D]/25 transition-all hover:shadow cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
