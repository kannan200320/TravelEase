import { useEffect } from 'react';
import {
  X,
  Printer,
  Calendar,
  Users,
  CheckCircle2,
  MapPin,
  Plane,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingVoucherModal = ({ booking, onClose }) => {
  const { formatPrice } = useBooking();

  // Freeze background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const isConfirmed = booking.status === 'Confirmed' || booking.status === 'Upcoming';
  const isCancelled = booking.status === 'Cancelled';
  const formattedDate = booking.bookedAt
    ? new Date(booking.bookedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Confirmed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      {/* Container */}
      <div className="relative bg-white w-full max-w-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 print-only-modal">
        {/* Header Ribbon */}
        <div className="shrink-0 bg-gradient-to-r from-[#7a1b23] via-[#CC313D] to-slate-900 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Plane className="w-4 h-4 text-white -rotate-45" />
              </div>
              <span className="font-black text-xl tracking-tight">
                Travel<span className="text-[#F7C5CC]">Ease</span>
              </span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium ml-2">
                Official E-Voucher
              </span>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-4 text-xs">
            <div>
              <span className="text-[#F7C5CC] block text-[11px]">Booking Reference</span>
              <span className="font-mono font-bold text-base tracking-wider text-white">
                {booking.id}
              </span>
            </div>

            <div>
              <span className="text-[#F7C5CC] block text-[11px]">Status</span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-xs ${
                  isConfirmed
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                    : isCancelled
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
                    : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                {booking.status}
              </span>
            </div>

            <div>
              <span className="text-[#F7C5CC] block text-[11px]">Booking Date</span>
              <span className="text-white font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Voucher Body (Scrollable on small mobile screens) */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          {/* Trip Summary Card */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            {booking.image && (
              <img
                src={booking.image}
                alt={booking.packageTitle}
                className="w-full sm:w-28 h-28 object-cover rounded-xl shrink-0"
              />
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1 text-[#CC313D] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{booking.destination}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base leading-snug">
                {booking.packageTitle}
              </h4>
              <p className="text-xs text-slate-500">
                Duration: <strong className="text-slate-700">{booking.duration || 'Flexible Itinerary'}</strong>
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" />
                  <span>Departure: <strong>{booking.travelDate}</strong></span>
                </div>
                {booking.returnDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Return: <strong>{booking.returnDate}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Travelers: <strong>{booking.adults} Adults{booking.children ? `, ${booking.children} Children` : ''}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2 text-sky-700">
                Primary Passenger Details
              </h5>
              <div className="space-y-1 text-slate-600">
                <p>
                  Name: <strong className="text-slate-900">{booking.travelers?.[0]?.name || 'Traveler'}</strong>
                </p>
                <p>
                  Email: <strong className="text-slate-900">{booking.travelers?.[0]?.email || 'N/A'}</strong>
                </p>
                <p>
                  Phone: <strong className="text-slate-900">{booking.travelers?.[0]?.phone || 'N/A'}</strong>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2 text-sky-700">
                Payment & Inclusions
              </h5>
              <div className="space-y-1 text-slate-600">
                <p>
                  Method: <strong className="text-slate-900">{booking.paymentMethod || 'Online Payment'}</strong>
                </p>
                <p>
                  Add-ons: <strong className="text-slate-900">{booking.addOns?.length ? booking.addOns.join(', ') : 'Standard Package'}</strong>
                </p>
                {booking.promoCode && (
                  <p>
                    Coupon Applied: <strong className="text-emerald-600">{booking.promoCode}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Breakdown Box */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400">Package Fare ({booking.adults} Adults{booking.children ? `, ${booking.children} Kids` : ''})</span>
              <span className="font-mono">{formatPrice(booking.subtotal || booking.totalPrice)}</span>
            </div>

            {booking.discount > 0 && (
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800 text-emerald-400">
                <span>Special Promo Discount</span>
                <span className="font-mono">-{formatPrice(booking.discount)}</span>
              </div>
            )}

            {booking.taxes > 0 && (
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800 text-slate-400">
                <span>Tourism Taxes & Government Levies (12%)</span>
                <span className="font-mono">+{formatPrice(booking.taxes)}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 text-base font-bold">
              <span className="text-sky-300">Total Paid Amount</span>
              <span className="text-xl font-mono text-emerald-400">{formatPrice(booking.totalPrice)}</span>
            </div>
          </div>

          {/* Verification Bar & QR code */}
          <div className="flex items-center justify-between pt-2 border-t border-dashed border-slate-300 text-slate-500 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified by TravelEase Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Please present this digital voucher or printed copy at hotel check-in and airport reception.
              </p>
            </div>

            {/* QR Mockup */}
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#CC313D] hover:bg-[#b52632] shadow-md shadow-[#CC313D]/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Voucher</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingVoucherModal;
