import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthHeader from '../components/AuthHeader';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <AuthHeader
          Icon={LogIn}
          title="Selamat Datang"
          subtitle="Silakan masuk untuk berdiskusi"
        />

        <LoginForm />

        <p className="text-center mt-8 text-slate-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;