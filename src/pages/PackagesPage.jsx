import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Compass,
  Check
} from 'lucide-react';
import { TRAVEL_PACKAGES, TRAVEL_CATEGORIES, DESTINATIONS } from '../data/travelData';
import { PackageCard } from '../components/PackageCard';
import { useBooking } from '../context/BookingContext';

export const PackagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useBooking();

  // Read initial query params from URL
  const initialQuery = searchParams.get('query') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialDuration = searchParams.get('duration') || '';
  const initialDestination = searchParams.get('destination') || '';

  // Filter state
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDestination, setSelectedDestination] = useState(initialDestination);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [selectedDuration, setSelectedDuration] = useState(initialDuration);
  const [sortBy, setSortBy] = useState('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active destination object if filtered by destination
  const activeDestObj = useMemo(() => {
    return DESTINATIONS.find((d) => d.id === selectedDestination);
  }, [selectedDestination]);

  // Handle reset
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDestination('');
    setSelectedRegion('');
    setMaxPrice(250000);
    setSelectedDuration('');
    setSortBy('recommended');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    selectedDestination,
    selectedRegion,
    maxPrice < 250000,
    selectedDuration,
  ].filter(Boolean).length;

  // Filter Packages
  const filteredPackages = useMemo(() => {
    return TRAVEL_PACKAGES.filter((pkg) => {
      // Filter by specific destination
      if (selectedDestination && pkg.destinationId !== selectedDestination) return false;

      // Search keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = pkg.title.toLowerCase().includes(q);
        const matchDest = pkg.destinationName.toLowerCase().includes(q);
        const matchCountry = pkg.country.toLowerCase().includes(q);
        const matchOverview = pkg.overview.toLowerCase().includes(q);
        if (!matchTitle && !matchDest && !matchCountry && !matchOverview) return false;
      }

      // Category
      if (selectedCategory && pkg.category !== selectedCategory) return false;

      // Region
      if (selectedRegion && pkg.region !== selectedRegion) return false;

      // Max price
      if (pkg.price > maxPrice) return false;

      // Duration
      if (selectedDuration === 'short' && pkg.durationDays > 5) return false;
      if (selectedDuration === 'medium' && (pkg.durationDays < 6 || pkg.durationDays > 8)) return false;
      if (selectedDuration === 'long' && pkg.durationDays < 9) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return b.durationDays - a.durationDays;
      return 0; // recommended
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedDestination,
    selectedRegion,
    maxPrice,
    selectedDuration,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#7a1b23] via-[#CC313D] to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#F7C5CC]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Holiday Packages</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            All-Inclusive Travel Packages
          </h1>
          <p className="text-slate-100 text-sm md:text-base leading-relaxed">
            Every package features 5-star handpicked accommodations, daily gourmet breakfast, guided local excursions, and all transfers in Indian Rupees (₹).
          </p>
        </div>

        {/* Destination Filter Pill if active */}
        {activeDestObj && (
          <div className="relative z-10 mt-6 pt-6 border-t border-white/15 flex items-center gap-2">
            <span className="text-xs text-[#F7C5CC]">Filtered for Destination:</span>
            <span className="inline-flex items-center gap-2 bg-[#F7C5CC]/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-[#F7C5CC]/40">
              <span>{activeDestObj.name}, {activeDestObj.country}</span>
              <button
                onClick={() => setSelectedDestination('')}
                className="hover:text-rose-300 cursor-pointer"
                aria-label="Clear destination filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Main Layout: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* MOBILE FILTER TOGGLE BUTTON */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-[#CC313D]" />
            <span>Filters ({activeFiltersCount})</span>
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="px-4 py-2 text-xs font-bold bg-[#CC313D] text-white rounded-xl shadow-sm shadow-[#CC313D]/25 cursor-pointer"
          >
            {isMobileFilterOpen ? 'Close Filters' : 'Adjust Filters'}
          </button>
        </div>

        {/* SIDEBAR FILTERS (Desktop + Collapsible Mobile) */}
        <aside
          className={`lg:block bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 ${
            isMobileFilterOpen ? 'block' : 'hidden'
          }`}
        >
          {/* Header & Reset */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-black text-slate-900 text-base">
              <SlidersHorizontal className="w-4 h-4 text-[#CC313D]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-[#F7C5CC]/50 text-[#CC313D] text-xs font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search package name, place..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#CC313D] font-medium"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              )}
            </div>
          </div>

          {/* Travel Theme / Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Travel Theme
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  selectedCategory === ''
                    ? 'bg-[#F7C5CC]/40 text-[#CC313D] font-bold'
                    : 'text-slate-600 hover:bg-[#F7C5CC]/20'
                }`}
              >
                <span>All Experiences</span>
                {selectedCategory === '' && <Check className="w-3.5 h-3.5 text-[#CC313D]" />}
              </button>

              {TRAVEL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#F7C5CC]/40 text-[#CC313D] font-bold'
                      : 'text-slate-600 hover:bg-[#F7C5CC]/20'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-[#CC313D]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider (in INR ₹) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Max Budget (₹)
              </label>
              <span className="text-xs font-black text-sky-600 font-mono">
                {formatPrice(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{formatPrice(50000)}</span>
              <span>{formatPrice(250000)}+</span>
            </div>
          </div>

          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Trip Duration
            </label>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {[
                { id: '', label: 'Any' },
                { id: 'short', label: '1-5 D' },
                { id: 'medium', label: '6-8 D' },
                { id: 'long', label: '9+ D' },
              ].map((dur) => (
                <button
                  key={dur.id}
                  onClick={() => setSelectedDuration(dur.id)}
                  className={`py-2 px-1 text-center rounded-lg border font-semibold transition-colors cursor-pointer ${
                    selectedDuration === dur.id
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RESULTS AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Count + Sort By */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600 font-medium">
              Showing <strong className="text-slate-900 font-black">{filteredPackages.length}</strong> Travel Packages
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold uppercase">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>
          </div>

          {/* Grid of Packages */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No matching packages found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn't find any holiday packages that match your search filters. Try adjusting your budget or clearing filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs shadow-md shadow-[#CC313D]/25 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
