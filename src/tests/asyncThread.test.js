/**
 * Test Skenario untuk asyncAddThread thunk:
 *
 * - should dispatch showLoading, addThread, dan hideLoading saat berhasil membuat thread
 * - should call api.createThread dengan parameter yang benar
 * - should dispatch showLoading dan hideLoading, dan alert error saat gagal membuat thread
 * - should not dispatch addThread saat api gagal
 *
 * Test Skenario untuk asyncAddComment thunk:
 *
 * - should dispatch showLoading, addComment, dan hideLoading saat berhasil membuat komentar
 * - should call api.createComment dengan threadId dan content yang benar
 * - should dispatch showLoading dan hideLoading, dan alert error saat gagal membuat komentar
 * - should not dispatch addComment saat api gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncAddThread, addThreadActionCreator } from '../states/threads/action';
import { asyncAddComment, addCommentActionCreator } from '../states/threadDetail/action';
import api from '../utils/api';

vi.mock('../utils/api', () => ({
  default: {
    createThread: vi.fn(),
    createComment: vi.fn(),
  },
}));

vi.mock('@dimasmds/react-redux-loading-bar', () => ({
  showLoading: () => ({ type: 'SHOW_LOADING' }),
  hideLoading: () => ({ type: 'HIDE_LOADING' }),
}));

const fakeThread = {
  id: 'thread-new-1',
  title: 'Thread Baru',
  body: 'Konten thread baru yang menarik',
  category: 'react',
  createdAt: '2024-01-10T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeComment = {
  id: 'comment-new-1',
  content: 'Komentar baru yang informatif',
  createdAt: '2024-01-10T01:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'User Test',
    avatar: 'https://ui-avatars.com/api/?name=User+Test',
  },
  upVotesBy: [],
  downVotesBy: [],
};

describe('asyncAddThread thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, addThread, dan hideLoading saat berhasil membuat thread', async () => {
    api.createThread.mockResolvedValue(fakeThread);

    await asyncAddThread({
      title: 'Thread Baru',
      body: 'Konten thread baru yang menarik',
      category: 'react',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should call api.createThread dengan parameter yang benar', async () => {
    api.createThread.mockResolvedValue(fakeThread);
    const threadData = {
      title: 'Thread Baru',
      body: 'Konten thread',
      category: 'react',
    };

    await asyncAddThread(threadData)(dispatch);

    expect(api.createThread).toHaveBeenCalledWith(threadData);
    expect(api.createThread).toHaveBeenCalledTimes(1);
  });

  it('should dispatch showLoading dan hideLoading, dan alert error saat gagal membuat thread', async () => {
    const errorMessage = 'Gagal membuat thread';
    api.createThread.mockRejectedValue(new Error(errorMessage));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncAddThread({
      title: 'Thread Gagal',
      body: 'Konten',
      category: 'error',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
    expect(alertMock).toHaveBeenCalledWith(errorMessage);

    alertMock.mockRestore();
  });

  it('should not dispatch addThread saat api gagal', async () => {
    api.createThread.mockRejectedValue(new Error('Gagal'));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncAddThread({
      title: 'Thread Gagal',
      body: 'Konten',
      category: 'error',
    })(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(addThreadActionCreator(expect.anything()));

    alertMock.mockRestore();
  });
});

describe('asyncAddComment thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, addComment, dan hideLoading saat berhasil membuat komentar', async () => {
    api.createComment.mockResolvedValue(fakeComment);

    await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar baru yang informatif',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should call api.createComment dengan threadId dan content yang benar', async () => {
    api.createComment.mockResolvedValue(fakeComment);
    const commentData = { threadId: 'thread-123', content: 'Isi komentar' };

    await asyncAddComment(commentData)(dispatch);

    expect(api.createComment).toHaveBeenCalledWith(commentData);
    expect(api.createComment).toHaveBeenCalledTimes(1);
  });

  it('should dispatch showLoading dan hideLoading, dan alert error saat gagal membuat komentar', async () => {
    const errorMessage = 'Gagal menambahkan komentar';
    api.createComment.mockRejectedValue(new Error(errorMessage));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar gagal',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
    expect(alertMock).toHaveBeenCalledWith(errorMessage);

    alertMock.mockRestore();
  });

  it('should not dispatch addComment saat api gagal', async () => {
    api.createComment.mockRejectedValue(new Error('Gagal'));
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar gagal',
    })(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(addCommentActionCreator(expect.anything()));

    alertMock.mockRestore();
  });
});
