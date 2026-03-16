import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User, LogIn, LogOut } from 'lucide-react';
import logo from '../assets/images/logo.png';
import { asyncUnsetAuthUser } from '../states/authUser/action';

const TopNavbar = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:scale-110 transition-transform">
            <img src={logo} alt="Dicoding Forum Logo" className="w-8 h-8 object-contain"/>
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
            Dicoding<span className="text-indigo-600">Forum</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100 font-bold transition-all"
                title="Keluar"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>

              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-200 hover:border-indigo-400 transition-colors cursor-pointer">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  title={authUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold transition-all"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>

              <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                <User size={20} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;