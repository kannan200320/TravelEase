import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Star,
  Globe2,
  HeartHandshake
} from 'lucide-react';
import {
  DESTINATIONS,
  TRAVEL_PACKAGES,
  TESTIMONIALS,
  FAQS,
  WHY_CHOOSE_US
} from '../data/travelData';
import { PackageCard } from '../components/PackageCard';
import { DestinationCard } from '../components/DestinationCard';

export const HomePage = () => {
  const navigate = useNavigate();

  // Search Widget State
  const [searchQuery, setSearchQuery] = useState('');

  // Package Filter Tab State
  const [packageFilter, setPackageFilter] = useState('all');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/packages');
    }
  };

  // Filter packages based on active tab
  const filteredPackages = TRAVEL_PACKAGES.filter((pkg) => {
    if (packageFilter === 'all') return true;
    if (packageFilter === 'trending') return pkg.badge?.includes('Trending') || pkg.badge?.includes('Best Seller');
    if (packageFilter === 'romantic') return pkg.category === 'romantic' || pkg.badge?.includes('Romantic');
    if (packageFilter === 'luxury') return pkg.price >= 120000;
    if (packageFilter === 'value') return pkg.price < 80000;
    return true;
  });

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Photo with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
            alt="Travel the world"
            className="w-full h-full object-cover object-center filter brightness-[0.68]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/40 to-slate-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 text-white drop-shadow-sm">
            Wander Freely. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7C5CC] via-white to-[#F7C5CC]">
              Book With Ease.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed mb-10 drop-shadow">
            Immerse yourself in boutique luxury, verified itineraries, and 24/7 personal concierge care. All prices transparently in Indian Rupees (₹).
          </p>

          {/* SEARCH BAR (Clean Pill Style matching Image 2) */}
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-full p-1.5 sm:p-2.5 shadow-2xl flex items-center justify-between gap-2 sm:gap-3 border border-white/60 text-slate-800"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5 pl-3.5 sm:pl-6 flex-1 min-w-0 text-left">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                    Where to next?
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search a country, city..."
                    className="w-full text-xs sm:text-sm font-medium text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none truncate mt-0.5"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs sm:text-sm px-4 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-md shadow-[#CC313D]/25 transition-all shrink-0 cursor-pointer"
              >
                <span>Search<span className="hidden sm:inline"> places</span></span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </form>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-center text-white/90">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl lg:text-3xl font-black text-amber-300">50K+</div>
              <div className="text-xs text-slate-200 mt-0.5">Delighted Travelers</div>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl lg:text-3xl font-black text-emerald-300">4.95 / 5</div>
              <div className="text-xs text-slate-200 mt-0.5">Average Traveler Rating</div>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl lg:text-3xl font-black text-[#F7C5CC]">120+</div>
              <div className="text-xs text-slate-200 mt-0.5">Bespoke Destinations</div>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-2xl lg:text-3xl font-black text-[#F7C5CC]">24 / 7</div>
              <div className="text-xs text-slate-200 mt-0.5">VIP On-Trip Concierge</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#CC313D] text-xs font-extrabold uppercase tracking-widest mb-1">
              <Globe2 className="w-4 h-4" />
              <span>World-Class Locations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              From secluded Cycladic calderas to neon-lit ancient temples, explore our highest-rated destinations.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#CC313D] hover:text-[#b52632] group shrink-0"
          >
            <span>Explore All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.slice(0, 4).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* SECTION: FEATURED TRAVEL PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#CC313D] text-xs font-extrabold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Curated Itineraries in INR (₹)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Travel Packages
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              All-inclusive boutique experiences with vetted luxury hotels, private guides, and transparent pricing in Indian Rupees.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'trending', label: 'Trending 2026' },
              { id: 'romantic', label: 'Romantic' },
              { id: 'luxury', label: 'Luxury Escapes' },
              { id: 'value', label: 'Best Value' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPackageFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  packageFilter === tab.id
                    ? 'bg-white text-[#CC313D] shadow-sm font-bold border border-[#F7C5CC]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.slice(0, 6).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-[#CC313D] text-white font-bold text-sm shadow-md transition-all hover:shadow-lg"
          >
            <span>View All {TRAVEL_PACKAGES.length} Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* EXTRA SECTION: WHY CHOOSE TRAVELEASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#CC313D]">
            The TravelEase Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            We eliminate travel anxiety by pairing personalized boutique itineraries with relentless commitment to hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#F7C5CC] transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F7C5CC]/30 text-[#CC313D] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA SECTION: HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="bg-gradient-to-b from-[#F7C5CC]/20 to-white py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#CC313D]">
              Seamless Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              How TravelEase Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From your initial dream to returning home with treasured memories in 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#CC313D] text-white font-black text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Select Your Dream Route
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse our verified packages or destinations. Review comprehensive day-by-day itineraries, hotel reviews, and inclusions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#e35a6b] text-white font-black text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Customize & Instant Booking
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select departure date, choose optional excursions or insurance, apply discount coupons, and complete checkout in under 2 minutes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-[#CC313D] text-white font-black text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Relax with 24/7 Concierge
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive your digital travel voucher instantly. Access dedicated WhatsApp concierge support throughout your entire journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION: VERIFIED TRAVELER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-sky-600 text-xs font-extrabold uppercase tracking-widest mb-1">
              <HeartHandshake className="w-4 h-4" />
              <span>Real Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Stories From Our Travelers
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Over 50,000 voyagers have embarked on unforgettable journeys with TravelEase.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-slate-900 text-sm">4.95 / 5.0</span>
            <span className="text-xs text-slate-500">(3,400+ Verified Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  "{t.title}"
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {t.review}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div className="truncate">
                  <div className="font-bold text-sm text-slate-900 truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {t.role} • {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA SECTION: INTERACTIVE FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#CC313D]">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Everything you need to know about booking in Indian Rupees (₹), payments, cancellations, and on-trip support.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.slice(0, 4).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#CC313D] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#CC313D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
