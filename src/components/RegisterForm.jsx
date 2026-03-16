// src/components/RegisterForm.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import AuthInput from './AuthInput';
import { asyncRegisterUser } from '../states/users/action';

const RegisterForm = () => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }, () => {
      navigate('/login');
    }));
  };

  return (
    <form className="space-y-5" onSubmit={onRegister}>
      <AuthInput
        label="Nama Lengkap"
        placeholder="Masukkan nama lengkap"
        value={name}
        onChange={onNameChange}
      />
      <AuthInput
        label="Email"
        type="email"
        placeholder="Masukkan alamat email"
        value={email}
        onChange={onEmailChange}
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Buat password minimal 6 karakter"
        value={password}
        onChange={onPasswordChange}
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
      >
        Daftar Akun
      </button>
    </form>
  );
};

export default RegisterForm;