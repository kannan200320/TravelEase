import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  Printer,
  Trash2,
  AlertTriangle,
  Search,
  Compass
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BookingVoucherModal } from '../components/BookingVoucherModal';

export const MyBookingsPage = () => {
  const {
    bookings,
    cancelBooking,
    deleteBooking,
    resetBookingsToDefault,
    formatPrice
  } = useBooking();

  // Search & Filter state
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected booking for Voucher Modal
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  // Modal for Cancel Confirmation
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Tab filter
      if (activeTab === 'confirmed' && (b.status === 'Cancelled')) return false;
      if (activeTab === 'cancelled' && b.status !== 'Cancelled') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = b.id?.toLowerCase().includes(q);
        const matchDest = b.destination?.toLowerCase().includes(q);
        const matchTitle = b.packageTitle?.toLowerCase().includes(q);
        const matchName = b.travelers?.[0]?.name?.toLowerCase().includes(q);
        if (!matchId && !matchDest && !matchTitle && !matchName) return false;
      }

      return true;
    });
  }, [bookings, activeTab, searchQuery]);

  const handleConfirmCancel = () => {
    if (cancellingBookingId) {
      cancelBooking(cancellingBookingId);
      setCancellingBookingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#7a1b23] via-[#CC313D] to-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#F7C5CC]">
            <Compass className="w-4 h-4 text-[#F7C5CC]" />
            <span>Persisted in Browser LocalStorage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Booked Journeys
          </h1>
          <p className="text-slate-100 text-xs sm:text-sm leading-relaxed">
            Manage your upcoming adventures, print travel vouchers, review itinerary details, or cancel reservations anytime with zero hassle.
          </p>
        </div>

      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold w-full md:w-auto">
          {[
            { id: 'all', label: `All (${bookings.length})` },
            { id: 'confirmed', label: `Active (${bookings.filter((b) => b.status !== 'Cancelled').length})` },
            { id: 'cancelled', label: `Cancelled (${bookings.filter((b) => b.status === 'Cancelled').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#CC313D] shadow font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ID, place..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3 pr-8 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#CC313D] font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-6">
          {filteredBookings.map((booking) => {
            const isCancelled = booking.status === 'Cancelled';
            const isConfirmed = !isCancelled;
            const bookingDateStr = booking.bookedAt
              ? new Date(booking.bookedAt).toLocaleDateString()
              : 'Recent';

            return (
              <div
                key={booking.id}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg ${
                  isCancelled
                    ? 'border-slate-200/60 opacity-80'
                    : 'border-slate-200/90 hover:border-sky-300'
                }`}
              >
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
                  {/* Left: Thumbnail & Main Trip Info */}
                  <div className="flex flex-col sm:flex-row gap-5 items-start flex-1">
                    <img
                      src={booking.image}
                      alt={booking.packageTitle}
                      className="w-full sm:w-44 h-36 object-cover rounded-2xl shrink-0"
                    />

                    <div className="space-y-2 flex-1">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                          {booking.id}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isConfirmed
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {isConfirmed ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          <span>{booking.status}</span>
                        </span>

                        <span className="text-[11px] text-slate-400">
                          Booked on {bookingDateStr}
                        </span>
                      </div>

                      {/* Destination & Title */}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-[#CC313D] text-xs font-bold">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{booking.destination}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">
                          {booking.packageTitle}
                        </h3>
                      </div>

                      {/* Travel Dates & Passenger Count */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sky-600" />
                          <span>
                            {booking.travelDate}
                            {booking.returnDate && ` → ${booking.returnDate}`}
                          </span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-indigo-600" />
                          <span>
                            {booking.adults} Adults
                            {booking.children ? `, ${booking.children} Children` : ''}
                          </span>
                        </div>
                        <span>•</span>
                        <div className="text-slate-500">
                          Contact: <strong>{booking.travelers?.[0]?.name || 'Traveler'}</strong>
                        </div>
                      </div>

                      {/* Add-ons preview */}
                      {booking.addOns && booking.addOns.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {booking.addOns.map((add, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100 font-medium"
                            >
                              + {add}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Price & Action Buttons */}
                  <div className="lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Total Paid
                      </span>
                      <span className="text-2xl font-black font-mono text-slate-900">
                        {formatPrice(booking.totalPrice)}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {booking.paymentMethod || 'Online Checkout'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* View Voucher Button */}
                      <button
                        onClick={() => setSelectedVoucher(booking)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#CC313D] hover:bg-[#b52632] shadow-sm shadow-[#CC313D]/20 transition-all cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>View Voucher</span>
                      </button>

                      {/* Cancel Booking Button */}
                      {isConfirmed && (
                        <button
                          onClick={() => setCancellingBookingId(booking.id)}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}

                      {/* Delete permanently */}
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete from list"
                        aria-label="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No Bookings Found
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {searchQuery
              ? `No bookings match your search query "${searchQuery}".`
              : "You haven't reserved any travel packages yet. Explore our curated destinations and start planning your escape!"}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/destinations"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Discover Destinations
            </Link>
            <button
              onClick={resetBookingsToDefault}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Load Demo Bookings
            </button>
          </div>
        </div>
      )}

      {/* CONFIRM CANCELLATION MODAL */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Cancel Reservation?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel booking <strong>{cancellingBookingId}</strong>? In accordance with our guarantee, a full refund will be processed back to your payment account.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors cursor-pointer"
              >
                Yes, Cancel Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VOUCHER / RECEIPT MODAL */}
      {selectedVoucher && (
        <BookingVoucherModal
          booking={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </div>
  );
};

export default MyBookingsPage;
