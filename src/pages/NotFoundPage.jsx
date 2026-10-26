import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#F7C5CC]/30 text-[#CC313D] mx-auto flex items-center justify-center shadow-inner">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#CC313D] block">
          404 Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Lost in the World?
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          The page or journey you are looking for has moved or does not exist. Let's guide you back to familiar trails.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#CC313D] hover:bg-[#b52632] text-white font-bold text-xs shadow-md shadow-[#CC313D]/25 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
        >
          <span>Browse Destinations</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
