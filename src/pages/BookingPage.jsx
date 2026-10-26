import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Printer,
  Smartphone
} from 'lucide-react';
import { TRAVEL_PACKAGES, PROMO_CODES } from '../data/travelData';
import { useBooking } from '../context/BookingContext';
import { BookingVoucherModal } from '../components/BookingVoucherModal';

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice, addBooking, addToast, user } = useBooking();

  // Read URL query params
  const initialPackageId = searchParams.get('package') || TRAVEL_PACKAGES[0].id;
  const initialDate = searchParams.get('date') || '';
  const initialAdults = parseInt(searchParams.get('adults'), 10) || 2;
  const initialChildren = parseInt(searchParams.get('children'), 10) || 0;
  const initialPromo = searchParams.get('promo') || '';

  // Form State
  const [selectedPackageId, setSelectedPackageId] = useState(initialPackageId);
  const [travelDate, setTravelDate] = useState(() => {
    if (initialDate) return initialDate;
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);

  // Sync state if query params change
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    if (pkgParam) {
      setSelectedPackageId(pkgParam);
    }
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setTravelDate(dateParam);
    }
    const adultsParam = parseInt(searchParams.get('adults'), 10);
    if (adultsParam) {
      setAdults(adultsParam);
    }
    const childrenParam = parseInt(searchParams.get('children'), 10);
    if (!isNaN(childrenParam) && searchParams.has('children')) {
      setChildren(childrenParam);
    }
  }, [searchParams]);

  // Traveler Details State (default nationality India, prefilled if user is logged in)
  const [traveler, setTraveler] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nationality: 'India',
    passportNumber: '',
    specialRequests: '',
  });

  // Payment Details State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Promo Code State
  const [promoInput, setPromoInput] = useState(initialPromo);
  const [appliedPromo, setAppliedPromo] = useState(() => {
    if (initialPromo) {
      return PROMO_CODES.find((p) => p.code === initialPromo.toUpperCase()) || null;
    }
    return null;
  });
  const [promoError, setPromoError] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal State
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  // Active package object
  const activePackage = useMemo(() => {
    return (
      TRAVEL_PACKAGES.find((p) => p.id === selectedPackageId) ||
      TRAVEL_PACKAGES[0]
    );
  }, [selectedPackageId]);

  // Calculate return date
  const returnDateStr = useMemo(() => {
    if (!travelDate) return '';
    try {
      const d = new Date(travelDate);
      d.setDate(d.getDate() + activePackage.durationDays);
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }, [travelDate, activePackage]);

  // Price Calculation in INR (₹)
  const adultSubtotal = adults * activePackage.price;
  const childSubtotal = children * (activePackage.price * 0.5);
  const subtotal = adultSubtotal + childSubtotal;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discount = (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.discountType === 'fixed') {
      discount = appliedPromo.value;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const taxes = taxableAmount * 0.12; // 12% standard GST
  const grandTotal = taxableAmount + taxes;

  // Handle Promo Application
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === code);
    if (found) {
      setAppliedPromo(found);
      addToast(`Coupon "${code}" applied: ${found.description}`, 'success');
    } else {
      setPromoError('Invalid coupon code. Try "EASE10" or "EXPLORE3000".');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
    addToast('Coupon code removed', 'info');
  };

  // Form Validation
  const validateForm = () => {
    const errs = {};

    if (!traveler.fullName.trim()) {
      errs.fullName = 'Full legal name is required';
    } else if (traveler.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!traveler.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(traveler.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!traveler.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (traveler.phone.trim().replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!travelDate) {
      errs.travelDate = 'Please select a travel departure date';
    }

    if (adults < 1) {
      errs.adults = 'At least 1 adult traveler is required';
    }

    if (paymentMethod === 'upi') {
      if (upiId.trim() && !upiId.includes('@')) {
        errs.upi = 'Please enter a valid UPI ID (e.g. mobile@okhdfcbank)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 250);
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch {
      // safe fallback
    }
  };

  // Form Submit Handler
  const handleSubmitBooking = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('Please resolve the highlighted validation errors.', 'warning');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const paymentMethodLabel = paymentMethod === 'upi'
        ? `UPI (ID: ${upiId || 'verified@upi'})`
        : `Net Banking (${selectedBank})`;

      const newBookingRecord = {
        packageId: activePackage.id,
        packageTitle: activePackage.title,
        destination: `${activePackage.destinationName}, ${activePackage.country}`,
        image: activePackage.image,
        travelDate: travelDate,
        returnDate: returnDateStr,
        duration: `${activePackage.durationDays} Days / ${activePackage.durationNights} Nights`,
        adults: adults,
        children: children,
        travelers: [
          {
            name: traveler.fullName,
            email: traveler.email,
            phone: traveler.phone,
            nationality: traveler.nationality,
            passport: traveler.passportNumber,
            requests: traveler.specialRequests
          }
        ],
        addOns: [],
        subtotal: subtotal,
        discount: discount,
        promoCode: appliedPromo ? appliedPromo.code : null,
        taxes: taxes,
        totalPrice: grandTotal,
        paymentMethod: paymentMethodLabel
      };

      const createdBooking = addBooking(newBookingRecord);
      setConfirmedBooking(createdBooking);
      triggerConfetti();
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1 rounded-full border border-sky-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted 256-Bit SSL Checkout • Indian Rupee (₹)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Secure Your Journey
        </h1>
        <p className="text-slate-600 text-sm">
          Complete your booking in minutes. All reservations include instant confirmation and our Best Rate Guarantee in INR.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: BOOKING FORM */}
        <form onSubmit={handleSubmitBooking} className="lg:col-span-7 space-y-8">
          {/* STEP 1: PACKAGE & TRAVEL DATES */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Trip & Schedule Details
                </h3>
                <p className="text-xs text-slate-500">
                  Select your journey package and desired dates.
                </p>
              </div>
            </div>

            {/* Package Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Selected Package
              </label>
              <select
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                {TRAVEL_PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.destinationName}) — {formatPrice(p.price)}/person
                  </option>
                ))}
              </select>
            </div>

            {/* Package Quick Summary Card */}
            <div className="flex gap-4 p-4 rounded-2xl bg-sky-50/60 border border-sky-100 items-center">
              <img
                src={activePackage.image}
                alt={activePackage.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 space-y-1 text-xs">
                <span className="text-sky-700 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {activePackage.destinationName}, {activePackage.country}
                </span>
                <h4 className="font-bold text-slate-900 leading-snug">
                  {activePackage.title}
                </h4>
                <div className="flex items-center gap-3 text-slate-500 pt-1">
                  <span>{activePackage.durationDays} Days</span>
                  <span>•</span>
                  <span>Max {activePackage.groupSize}</span>
                </div>
              </div>
            </div>

            {/* Travel Date & Return Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Departure Date</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className={`w-full bg-slate-50 border rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer ${
                    errors.travelDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.travelDate && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.travelDate}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Estimated Return Date
                </label>
                <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-600">
                  {returnDateStr || 'Select departure first'}
                </div>
              </div>
            </div>

            {/* Travelers Count: Adults & Children */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Adults (Age 13+)</span>
                  <span className="text-xs font-mono font-bold text-slate-900">{adults}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs text-slate-500">{formatPrice(activePackage.price)} each</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Kids (Age 2-12)</span>
                  <span className="text-xs font-mono font-bold text-emerald-600">{children} (50% Off)</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs text-slate-500">{formatPrice(activePackage.price * 0.5)} each</span>
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
          </div>

          {/* STEP 2: PRIMARY TRAVELER DETAILS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Primary Traveler Information
                </h3>
                <p className="text-xs text-slate-500">
                  Where should we send your official e-voucher and confirmation?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Full Legal Name (as on Passport / ID)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={traveler.fullName}
                  onChange={(e) => setTraveler({ ...traveler, fullName: e.target.value })}
                  placeholder="e.g. Kannan Radhakrishnan"
                  className={`w-full bg-slate-50 border rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={traveler.email}
                  onChange={(e) => setTraveler({ ...traveler, email: e.target.value })}
                  placeholder="kannan@example.com"
                  className={`w-full bg-slate-50 border rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Mobile Phone / WhatsApp</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={traveler.phone}
                  onChange={(e) => setTraveler({ ...traveler, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-slate-50 border rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Nationality */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Nationality
                </label>
                <select
                  value={traveler.nationality}
                  onChange={(e) => setTraveler({ ...traveler, nationality: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Passport / Aadhaar / ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Passport / Gov ID (Optional)
                </label>
                <input
                  type="text"
                  value={traveler.passportNumber}
                  onChange={(e) => setTraveler({ ...traveler, passportNumber: e.target.value })}
                  placeholder="Optional for domestic packages"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Special Requests / Dietary */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Special Requests / Dietary Requirements (Optional)
                </label>
                <textarea
                  rows="2"
                  value={traveler.specialRequests}
                  onChange={(e) => setTraveler({ ...traveler, specialRequests: e.target.value })}
                  placeholder="e.g. Jain / Pure Vegetarian meals, king bed, airport wheelchair assistance..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: PAYMENT SELECTION */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Payment Method (INR)
                </h3>
                <p className="text-xs text-slate-500">
                  Instant processing with RBI-compliant encryption.
                </p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: Smartphone },
                { id: 'netbanking', label: 'Net Banking', icon: Lock },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'border-sky-600 bg-sky-50 text-sky-700 font-bold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <m.icon className="w-5 h-5" />
                  <span className="text-xs">{m.label}</span>
                </button>
              ))}
            </div>

            {/* UPI Option */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Enter UPI Virtual Payment Address (VPA)</span>
                  <span className="text-emerald-600">Zero Transaction Fees</span>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@okaxis or name@upi"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:border-sky-500"
                />
                {errors.upi && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.upi}</p>
                )}
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span>Supported: Google Pay</span>
                  <span>•</span>
                  <span>PhonePe</span>
                  <span>•</span>
                  <span>Paytm</span>
                  <span>•</span>
                  <span>BHIM</span>
                </div>
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Select Your Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                </select>
                <p className="text-[11px] text-slate-500">
                  You will be securely redirected to your bank portal to authorize payment.
                </p>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#CC313D] hover:bg-[#b52632] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#CC313D]/25 flex items-center justify-center gap-2 text-base transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Securing Your Reservation...</span>
              </>
            ) : (
              <>
                <span>Confirm & Pay {formatPrice(grandTotal)}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* RIGHT COLUMN: ORDER SUMMARY & LIVE PRICE CALCULATION (Sticky on Desktop/Laptop, Natural Flow on Mobile) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <h3 className="font-black text-slate-900 text-lg tracking-tight pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary (INR)</span>
              <span className="text-xs bg-[#F7C5CC]/40 text-[#CC313D] px-2.5 py-1 rounded-full font-bold">
                {activePackage.durationDays}D / {activePackage.durationNights}N
              </span>
            </h3>

            {/* Selected Package Details */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-sm">
                {activePackage.title}
              </div>
              <div className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#CC313D]" />
                <span>{activePackage.destinationName}, {activePackage.country}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 pt-1">
                <span>Dep: <strong>{travelDate || 'Pending'}</strong></span>
                <span>•</span>
                <span>Ret: <strong>{returnDateStr || 'Pending'}</strong></span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Promotional Coupon Code
              </label>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800">
                  <div className="font-bold">
                    ✓ {appliedPromo.code} applied (-{formatPrice(discount)})
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-emerald-700 hover:text-rose-600 font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter EASE10"
                    className="flex-1 text-xs uppercase bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500 font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-500 font-medium">{promoError}</p>
              )}
            </div>

            {/* Detailed Price Breakdown in INR */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Adult Fare ({adults} × {formatPrice(activePackage.price)})</span>
                <span className="font-mono">{formatPrice(adultSubtotal)}</span>
              </div>

              {children > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Children Fare ({children} × {formatPrice(activePackage.price * 0.5)})</span>
                  <span className="font-mono">{formatPrice(childSubtotal)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>GST & Tourism Surcharge (12%)</span>
                <span className="font-mono">+{formatPrice(taxes)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-base font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="text-2xl font-mono text-[#CC313D] font-black">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION SUCCESS MODAL OVERLAY */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 block mb-1">
                Booking Confirmed!
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                You're Heading to {confirmedBooking.destination}!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your reservation is stored safely in <strong>My Bookings</strong> on your device.
              </p>
            </div>

            {/* Quick summary box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-400">Reference Number</span>
                <span className="font-mono font-bold text-slate-900">{confirmedBooking.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Travel Date</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.travelDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Guests</span>
                <span className="font-semibold text-slate-800">
                  {confirmedBooking.adults} Adults{confirmedBooking.children ? `, ${confirmedBooking.children} Kids` : ''}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-2 font-bold">
                <span className="text-slate-800">Total Paid (INR)</span>
                <span className="font-mono text-emerald-600 text-sm">
                  {formatPrice(confirmedBooking.totalPrice)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowVoucherModal(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs shadow-md shadow-[#CC313D]/25 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Official E-Voucher</span>
              </button>

              <button
                onClick={() => navigate('/my-bookings')}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Go to My Bookings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VOUCHER MODAL */}
      {showVoucherModal && confirmedBooking && (
        <BookingVoucherModal
          booking={confirmedBooking}
          onClose={() => setShowVoucherModal(false)}
        />
      )}
    </div>
  );
};

export default BookingPage;
