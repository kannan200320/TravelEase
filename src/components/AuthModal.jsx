import { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Plane,
  ArrowRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    closeAuthModal,
    loginWithCredentials,
    registerUser,
  } = useBooking();

  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreeTerms, setRegAgreeTerms] = useState(true);

  // Freeze background content scrolling when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isAuthModalOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Handle tab switch
  const handleSwitchTab = (tab) => {
    setAuthModalTab(tab);
    setErrorMsg('');
  };

  if (!isAuthModalOpen) return null;

  // Strict email format validation: name@gmail.com
  const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

  // Handle Sign In Submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = signInEmail.trim();

    if (!trimmedEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!GMAIL_REGEX.test(trimmedEmail)) {
      setErrorMsg('Email address must be in the format of name@gmail.com.');
      return;
    }
    if (!signInPassword || signInPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    const result = loginWithCredentials(trimmedEmail, signInPassword, rememberMe);
    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = regName.trim();
    const trimmedEmail = regEmail.trim();

    // 1. Full name: must be greater than 2 letters and should not accept numbers
    if (!trimmedName || trimmedName.length <= 2) {
      setErrorMsg('Full name must be greater than 2 letters.');
      return;
    }
    if (/\d/.test(trimmedName)) {
      setErrorMsg('Full name should not accept numbers.');
      return;
    }

    // 2. Email: format of name@gmail.com
    if (!GMAIL_REGEX.test(trimmedEmail)) {
      setErrorMsg('Email address must be in the format of name@gmail.com.');
      return;
    }

    // 3. Mobile: must be 10 digits and should not accept letters
    if (!regPhone || regPhone.length !== 10) {
      setErrorMsg('Mobile number must be exactly 10 digits.');
      return;
    }

    // 4. Password: must be at least 6 characters
    if (!regPassword || regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!regAgreeTerms) {
      setErrorMsg('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    const result = registerUser({
      name: trimmedName,
      email: trimmedEmail,
      phone: regPhone,
      password: regPassword,
    });

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex justify-center items-center p-2.5 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity animate-in fade-in duration-200"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card with Max Height and Internal Scroll for Mobile */}
      <div className="relative w-full max-w-md max-h-[92dvh] sm:max-h-[88vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Header Decorative Banner (Fixed Header) */}
        <div className="shrink-0 bg-gradient-to-r from-[#7a1b23] via-[#CC313D] to-[#b52632] px-5 sm:px-6 pt-5 pb-4 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-3.5 right-3.5 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow">
              <Plane className="w-4 h-4 text-white -rotate-45" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight">TravelEase</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold">
            {authModalTab === 'signin' ? 'Welcome Back!' : 'Create Your Account'}
          </h3>
          <p className="text-[11px] sm:text-xs text-rose-100 mt-0.5">
            {authModalTab === 'signin'
              ? 'Sign in to access your saved wishlist and bookings.'
              : 'Join over 50,000 travelers and enjoy member-exclusive perks.'}
          </p>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 mt-3.5 p-1 bg-black/20 rounded-xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleSwitchTab('signin')}
              className={`py-1.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authModalTab === 'signin'
                  ? 'bg-white text-[#CC313D] shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('register')}
              className={`py-1.5 sm:py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authModalTab === 'register'
                  ? 'bg-white text-[#CC313D] shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-3 p-2.5 sm:p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#CC313D] text-xs font-medium flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authModalTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (name@gmail.com)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setErrorMsg('Please enter your registered email address to receive reset instructions.')}
                    className="text-[11px] font-semibold text-[#CC313D] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter password (min 6 chars)"
                    className="w-full pl-10 pr-10 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#CC313D] focus:ring-[#CC313D] border-slate-300 cursor-pointer"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#CC313D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to TravelEase</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-500 pt-1">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchTab('register')}
                  className="font-bold text-[#CC313D] hover:underline cursor-pointer"
                >
                  Create one free
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (letters only, min 3)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value.replace(/[0-9]/g, ''))}
                    placeholder="e.g. Ananya Roy"
                    className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                    autoFocus
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email (name@gmail.com)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile (10 digits)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Create Password (6+ chars)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="6+ chars"
                      className="w-full pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      className="w-full pl-10 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC313D]/20 focus:border-[#CC313D] transition-all text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer text-[11px] sm:text-xs text-slate-600 select-none pt-0.5">
                <input
                  type="checkbox"
                  checked={regAgreeTerms}
                  onChange={(e) => setRegAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-[#CC313D] focus:ring-[#CC313D] border-slate-300 mt-0.5 cursor-pointer"
                />
                <span>
                  I agree to the TravelEase{' '}
                  <span className="text-[#CC313D] font-semibold underline">Terms of Service</span> and{' '}
                  <span className="text-[#CC313D] font-semibold underline">Privacy Policy</span>.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#CC313D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Create TravelEase Account</span>
              </button>

              <div className="text-center text-xs text-slate-500 pt-0.5">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchTab('signin')}
                  className="font-bold text-[#CC313D] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
