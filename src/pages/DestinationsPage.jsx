import { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Compass,
  Globe2
} from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import { DestinationCard } from '../components/DestinationCard';

export const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const regions = ['Asia', 'Europe', 'Americas', 'Africa', 'Middle East', 'Oceania'];

  // Filter Destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = d.name.toLowerCase().includes(query);
        const matchCountry = d.country.toLowerCase().includes(query);
        const matchTagline = d.tagline.toLowerCase().includes(query);
        if (!matchName && !matchCountry && !matchTagline) return false;
      }
      // Region
      if (selectedRegion && d.region !== selectedRegion) return false;
      // Category
      if (selectedCategory && d.category !== selectedCategory) return false;

      return true;
    });
  }, [searchQuery, selectedRegion, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedCategory('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#7a1b23] via-[#CC313D] to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#F7C5CC]">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Destinations Catalog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Explore World Destinations
          </h1>
          <p className="text-slate-100 text-sm md:text-base leading-relaxed">
            Discover iconic wonders and hidden tranquil sanctuaries across 6 continents. Select any destination to view tailor-made tour packages.
          </p>
        </div>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Keyword Search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, country (e.g. Bali, Japan)..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#CC313D] font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Quick Stats & Reset */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">
              Showing <strong>{filteredDestinations.length}</strong> of {DESTINATIONS.length} Destinations
            </span>
            {(searchQuery || selectedRegion || selectedCategory) && (
              <button
                onClick={handleResetFilters}
                className="text-[#CC313D] hover:text-[#b52632] font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mr-1">
            Region:
          </span>
          <button
            onClick={() => setSelectedRegion('')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedRegion === ''
                ? 'bg-[#CC313D] text-white shadow-sm shadow-[#CC313D]/25'
                : 'bg-slate-100 text-slate-600 hover:bg-[#F7C5CC]/25'
            }`}
          >
            All Regions
          </button>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(selectedRegion === reg ? '' : reg)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#CC313D] text-white shadow-sm shadow-[#CC313D]/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-[#F7C5CC]/25'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No Destinations Found
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any destinations matching your search. Try resetting your filters.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
