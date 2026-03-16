/**
 * Test Skenario untuk asyncSetAuthUser thunk:
 *
 * - should dispatch showLoading, setAuthUser, dan hideLoading saat login berhasil
 * - should call api.putAccessToken dengan token yang benar setelah login berhasil
 * - should dispatch showLoading dan hideLoading, dan alert error saat login gagal
 * - should not dispatch setAuthUser saat login gagal
 * - should call api.getOwnProfile setelah mendapatkan token
 *
 * Test Skenario untuk asyncUnsetAuthUser thunk:
 *
 * - should dispatch showLoading, unsetAuthUser, dan hideLoading saat logout
 * - should call api.putAccessToken dengan string kosong saat logout
 * - should dispatch tepat 3 actions saat logout
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from '../states/authUser/action';
import api from '../utils/api';

vi.mock('../utils/api', () => ({
  default: {
    login: vi.fn(),
    getOwnProfile: vi.fn(),
    putAccessToken: vi.fn(),
  },
}));

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'SHOW_LOADING' }),
  hideLoading: () => ({ type: 'HIDE_LOADING' }),
}));

const fakeAuthUser = {
  id: 'user-1',
  name: 'User Test',
  email: 'test@example.com',
  avatar: 'https://ui-avatars.com/api/?name=User+Test',
};

describe('asyncSetAuthUser thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, setAuthUser, dan hideLoading saat login berhasil', async () => {
    api.login.mockResolvedValue('fake-token-123');
    api.getOwnProfile.mockResolvedValue(fakeAuthUser);

    await asyncSetAuthUser({
      email: 'test@example.com',
      password: 'password123',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should call api.putAccessToken dengan token yang benar setelah login berhasil', async () => {
    const fakeToken = 'fake-token-xyz-789';
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeAuthUser);

    await asyncSetAuthUser({
      email: 'test@example.com',
      password: 'password123',
    })(dispatch);

    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.putAccessToken).toHaveBeenCalledTimes(1);
  });

  it('should call api.getOwnProfile setelah mendapatkan token', async () => {
    api.login.mockResolvedValue('fake-token-123');
    api.getOwnProfile.mockResolvedValue(fakeAuthUser);

    await asyncSetAuthUser({
      email: 'test@example.com',
      password: 'password123',
    })(dispatch);

    expect(api.getOwnProfile).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
  });

  it('should dispatch showLoading dan hideLoading, dan alert error saat login gagal', async () => {
    const errorMessage = 'Email atau password salah';
    api.login.mockRejectedValue(new Error(errorMessage));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncSetAuthUser({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
    expect(alertMock).toHaveBeenCalledWith(errorMessage);

    alertMock.mockRestore();
  });

  it('should not dispatch setAuthUser saat login gagal', async () => {
    api.login.mockRejectedValue(new Error('Email atau password salah'));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncSetAuthUser({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    })(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(setAuthUserActionCreator(expect.anything()));

    alertMock.mockRestore();
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, unsetAuthUser, dan hideLoading saat logout', async () => {
    await asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
  });

  it('should call api.putAccessToken dengan string kosong saat logout', async () => {
    await asyncUnsetAuthUser()(dispatch);

    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(api.putAccessToken).toHaveBeenCalledTimes(1);
  });

  it('should dispatch tepat 3 actions saat logout', async () => {
    await asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
