import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import AuthInput from './AuthInput';
import { asyncSetAuthUser } from '../states/authUser/action';

const LoginForm = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!password) {
      newErrors.password = 'Password wajib diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    return newErrors;
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    await dispatch(asyncSetAuthUser({ email, password }));
  };

  if (authUser) {
    navigate('/');
    return null;
  }

  return (
    <form className="space-y-5" onSubmit={onLogin}>
      <div>
        <AuthInput
          label="Email"
          type="email"
          placeholder="Masukkan email Anda"
          value={email}
          onChange={onEmailChange}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
        )}
      </div>

      <div>
        <AuthInput
          label="Password"
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={onPasswordChange}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
      >
        Masuk Sekarang
      </button>
    </form>
  );
};

export default LoginForm;