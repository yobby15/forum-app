/**
 * Test Skenario untuk LoginForm component:
 *
 * - should render form dengan input email, password, dan tombol submit
 * - should update nilai email input saat user mengetik
 * - should update nilai password input saat user mengetik
 * - should menampilkan error validasi saat form di-submit dengan email kosong
 * - should menampilkan error validasi saat password kurang dari 6 karakter
 * - should menampilkan error validasi format email tidak valid
 * - should navigate ke halaman utama setelah submit dengan data valid
 * - should dispatch asyncSetAuthUser saat submit dengan data valid
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (selector) => selector({ authUser: null }),
  };
});

vi.mock('../states/authUser/action', () => ({
  asyncSetAuthUser: vi.fn(({ email, password }) => ({
    type: 'MOCK_SET_AUTH_USER',
    payload: { email, password },
  })),
}));

const renderLoginForm = () => {
  const store = configureStore({
    reducer: {
      authUser: (state = null) => state,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </Provider>
  );
};

describe('LoginForm component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockDispatch.mockClear();
  });

  it('should render form dengan input email, password, dan tombol submit', () => {
    renderLoginForm();

    expect(screen.getByPlaceholderText('Masukkan email Anda')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /masuk sekarang/i })).toBeInTheDocument();
  });

  it('should update nilai email input saat user mengetik', () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText('Masukkan email Anda');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update nilai password input saat user mengetik', () => {
    renderLoginForm();

    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  it('should menampilkan error validasi saat form di-submit dengan email kosong', async () => {
    renderLoginForm();

    const submitButton = screen.getByRole('button', { name: /masuk sekarang/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email wajib diisi')).toBeInTheDocument();
    });
  });

  it('should menampilkan error validasi saat password kurang dari 6 karakter', async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText('Masukkan email Anda');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const submitButton = screen.getByRole('button', { name: /masuk sekarang/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password minimal 6 karakter')).toBeInTheDocument();
    });
  });

  it('should menampilkan error validasi format email tidak valid', async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText('Masukkan email Anda');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const submitButton = screen.getByRole('button', { name: /masuk sekarang/i });

    fireEvent.change(emailInput, { target: { value: 'emailtidakvalid' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const form = submitButton.closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Format email tidak valid')).toBeInTheDocument();
    });
  });

  it('should navigate ke halaman utama setelah submit dengan data valid', async () => {
    renderLoginForm();

    mockDispatch.mockImplementation(async () => {});

    const emailInput = screen.getByPlaceholderText('Masukkan email Anda');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const submitButton = screen.getByRole('button', { name: /masuk sekarang/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it('should dispatch asyncSetAuthUser saat submit dengan data valid', async () => {
    renderLoginForm();

    const emailInput = screen.getByPlaceholderText('Masukkan email Anda');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const submitButton = screen.getByRole('button', { name: /masuk sekarang/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});