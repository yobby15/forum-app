import { NavLink } from 'react-router-dom';
import { MessageSquare, Trophy } from 'lucide-react';

const BottomNavbar = () => {
  const activeClass = 'text-indigo-600 border-indigo-600 font-bold';
  const inactiveClass = 'text-slate-500 border-transparent hover:text-indigo-500';

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) => `flex flex-col items-center gap-1 py-3 px-8 transition-all border-t-4 ${isActive ? activeClass : inactiveClass}`}
        >
          <MessageSquare size={24} />

          <span className="text-xs">Threads</span>
        </NavLink>

        <NavLink
          to="/leaderboards"
          className={({ isActive }) => `flex flex-col items-center gap-1 py-3 px-8 transition-all border-t-4 ${isActive ? activeClass : inactiveClass}`}
        >
          <Trophy size={24} />

          <span className="text-xs">Leaderboards</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbar;