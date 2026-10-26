import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Share2,
  Heart,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { TRAVEL_PACKAGES } from '../data/travelData';
import { useBooking } from '../context/BookingContext';

export const PackageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice, toggleWishlist, isWishlisted, addToast } = useBooking();

  // Find package by slug or id
  const pkg = useMemo(() => {
    return (
      TRAVEL_PACKAGES.find((p) => p.slug === id || p.id === id) ||
      TRAVEL_PACKAGES[0]
    );
  }, [id]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Accordion state for day-by-day itinerary
  const [openDayIndex, setOpenDayIndex] = useState(0);

  // Booking Calculator State
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const wishlisted = isWishlisted(pkg.id);

  // Price calculations in INR
  const adultTotal = adults * pkg.price;
  const childTotal = children * (pkg.price * 0.5); // 50% discount for children
  const subtotal = adultTotal + childTotal;
  const taxes = subtotal * 0.12; // 12% standard GST & tourism fees
  const grandTotal = subtotal + taxes;

  const handleProceedToBooking = () => {
    if (!travelDate) {
      addToast('Please select your preferred departure date', 'warning');
      return;
    }
    const params = new URLSearchParams();
    params.append('package', pkg.id);
    params.append('date', travelDate);
    params.append('adults', adults.toString());
    params.append('children', children.toString());

    navigate(`/booking?${params.toString()}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: `Check out this journey: ${pkg.title} on TravelEase!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard!', 'success');
    }
  };

  const galleryImages = pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [pkg.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-sky-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/packages" className="hover:text-sky-600 transition-colors">
          Travel Packages
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
          {pkg.title}
        </span>
      </nav>

      {/* Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-full border border-sky-200">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>{pkg.destinationName}, {pkg.country}</span>
            </span>

            {pkg.badge && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{pkg.badge}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {pkg.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{pkg.rating}</span>
              <span className="text-slate-500">({pkg.reviewCount} verified reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>{pkg.groupSize}</span>
            </div>
          </div>
        </div>

        {/* Share & Wishlist Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Share</span>
          </button>

          <button
            onClick={() => toggleWishlist(pkg.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer ${
              wishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
            <span>{wishlisted ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* IMAGE GALLERY */}
      <div className="space-y-3">
        {/* Main Showcase Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/80">
          <img
            src={galleryImages[activeImageIndex]}
            alt={pkg.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
            <span className="bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl font-medium">
              Photo {activeImageIndex + 1} of {galleryImages.length}
            </span>
          </div>
        </div>

        {/* Thumbnails Row */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-sky-600 scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MAIN TWO-COLUMN CONTENT: DETAILS (LEFT) & STICKY BOOKING CALCULATOR (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: ITINERARY & DETAILS */}
        <div className="lg:col-span-7 space-y-10">
          {/* Overview */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Journey Overview
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {pkg.overview}
            </p>

            {/* Tour Highlights */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Experience Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pkg.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DAY-BY-DAY ITINERARY ACCORDION */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Day-by-Day Itinerary
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Handcrafted schedule with freedom for personal exploration.
                </p>
              </div>

              <button
                onClick={() => setOpenDayIndex(openDayIndex === null ? 0 : null)}
                className="text-xs text-sky-600 font-bold hover:underline cursor-pointer"
              >
                {openDayIndex === null ? 'Expand Days' : 'Collapse Days'}
              </button>
            </div>

            <div className="space-y-3">
              {pkg.itinerary.slice(0, 4).map((item, index) => {
                const isOpen = openDayIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDayIndex(isOpen ? null : index)}
                      className="w-full p-4 flex items-center justify-between gap-4 text-left bg-slate-50/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                          D{item.day}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            Stay: {item.stay}
                          </span>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-sky-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-xs leading-relaxed text-slate-600 animate-in fade-in duration-150">
                        <p>{item.description}</p>
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] font-medium text-slate-500">
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {item.meals}
                          </span>
                          <span>Overnight: <strong className="text-slate-800">{item.stay}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: DYNAMIC BOOKING CALCULATOR (Sticky on Laptop/Desktop, Natural Flow on Mobile) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-3xl border-2 border-[#F7C5CC] shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Package Fare
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {formatPrice(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">/ person</span>
                </div>
              </div>

              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                Best Rate Guaranteed
              </span>
            </div>

            {/* Travel Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Select Departure Date</span>
                <span className="text-[11px] text-[#CC313D] font-normal">Free change up to 14 days</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#CC313D] cursor-pointer"
                />
              </div>
            </div>

            {/* Guests Counters: Adults & Children */}
            <div className="grid grid-cols-2 gap-4">
              {/* Adults Counter */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Adults</span>
                  <span className="text-[10px] text-slate-400">Age 13+</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-base text-slate-900">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter (50% OFF) */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Children</span>
                  <span className="text-[10px] text-emerald-600 font-bold">50% OFF</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-base text-slate-900">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* DYNAMIC LIVE PRICE BREAKDOWN IN INR */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Adults ({adults} × {formatPrice(pkg.price)})</span>
                <span className="font-mono">{formatPrice(adultTotal)}</span>
              </div>

              {children > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Children ({children} × {formatPrice(pkg.price * 0.5)})</span>
                  <span className="font-mono">{formatPrice(childTotal)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>Taxes & Tourism Surcharge (12%)</span>
                <span className="font-mono">+{formatPrice(taxes)}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-base font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="text-xl font-mono text-[#CC313D]">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Booking CTA Button */}
            <button
              onClick={handleProceedToBooking}
              className="w-full bg-[#CC313D] hover:bg-[#b52632] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#CC313D]/25 flex items-center justify-center gap-2 text-sm sm:text-base transition-all transform hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Instant Confirmation • All Prices in Indian Rupee (₹) • 100% Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
