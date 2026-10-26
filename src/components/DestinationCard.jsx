import { Link } from 'react-router-dom';
import { MapPin, Star, SunMedium } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const DestinationCard = ({ destination }) => {
  const { formatPrice } = useBooking();

  return (
    <Link
      to={`/packages?destination=${destination.id}`}
      className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-200/50 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Multi-stage Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/10 group-hover:from-slate-950/90 transition-colors" />

      {/* Top Details: Weather & Rating */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium z-10">
        <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <SunMedium className="w-3.5 h-3.5 text-amber-300" />
          <span>{destination.weather}</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-amber-300">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span className="font-bold text-white">{destination.rating}</span>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 flex flex-col justify-end">
        <div className="flex items-center gap-1 text-[#F7C5CC] text-xs font-semibold uppercase tracking-wider mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination.country}</span>
        </div>

        <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-[#F7C5CC] transition-colors leading-tight mb-1">
          {destination.name}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
          {destination.tagline}
        </p>

        {/* Starting Price */}
        <div className="pt-3 border-t border-white/15 text-xs">
          <span className="text-slate-400 block text-[10px]">From</span>
          <span className="text-base font-bold text-white font-mono">
            {formatPrice(destination.startingPrice)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
