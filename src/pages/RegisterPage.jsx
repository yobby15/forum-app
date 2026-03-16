import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthHeader from '../components/AuthHeader';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <AuthHeader
          Icon={UserPlus}
          title="Buat Akun"
          subtitle="Gabung dengan komunitas Dicoding Forum"
        />

        <RegisterForm />

        <p className="text-center mt-8 text-slate-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;