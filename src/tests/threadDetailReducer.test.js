/**
 * Test Skenario untuk threadDetailReducer:
 *
 * - should return null as initial state when given unknown action
 * - should return threadDetail when given RECEIVE_THREAD_DETAIL action
 * - should return null when given CLEAR_THREAD_DETAIL action
 * - should add new comment to beginning of comments when given ADD_COMMENT action
 * - should keep all existing comments and thread data when adding new comment
 * - should not mutate the existing threadDetail state
 * - should handle RECEIVE_THREAD_DETAIL overwriting existing thread detail
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from '../states/threadDetail/reducer';
import { ActionType } from '../states/threadDetail/action';

const fakeComment = {
  id: 'comment-1',
  content: 'Komentar pertama',
  createdAt: '2024-01-01T01:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'User Satu',
    avatar: 'https://ui-avatars.com/api/?name=User+Satu',
  },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeComment2 = {
  id: 'comment-2',
  content: 'Komentar kedua',
  createdAt: '2024-01-01T02:00:00.000Z',
  owner: {
    id: 'user-2',
    name: 'User Dua',
    avatar: 'https://ui-avatars.com/api/?name=User+Dua',
  },
  upVotesBy: ['user-1'],
  downVotesBy: [],
};

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Detail Test',
  body: 'Isi thread detail test',
  category: 'testing',
  createdAt: '2024-01-01T00:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'User Satu',
    avatar: 'https://ui-avatars.com/api/?name=User+Satu',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [fakeComment],
};

describe('threadDetailReducer', () => {
  it('should return null as initial state when given unknown action', () => {
    const previousState = undefined;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = threadDetailReducer(previousState, action);

    expect(nextState).toBeNull();
  });

  it('should return threadDetail when given RECEIVE_THREAD_DETAIL action', () => {
    const previousState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: fakeThreadDetail },
    };

    const nextState = threadDetailReducer(previousState, action);

    expect(nextState).toEqual(fakeThreadDetail);
    expect(nextState.id).toBe('thread-1');
    expect(nextState.comments).toHaveLength(1);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const previousState = fakeThreadDetail;
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    const nextState = threadDetailReducer(previousState, action);

    expect(nextState).toBeNull();
  });

  it('should add new comment to beginning of comments when given ADD_COMMENT action', () => {
    const previousState = fakeThreadDetail;
    const newComment = {
      id: 'comment-new',
      content: 'Komentar baru',
      createdAt: '2024-01-01T03:00:00.000Z',
      owner: {
        id: 'user-3',
        name: 'User Tiga',
        avatar: 'https://ui-avatars.com/api/?name=User+Tiga',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(previousState, action);

    expect(nextState.comments[0]).toEqual(newComment);
    expect(nextState.comments[1]).toEqual(fakeComment);
    expect(nextState.comments).toHaveLength(2);
  });

  it('should keep all existing comments and thread data when adding new comment', () => {
    const threadWithMultipleComments = {
      ...fakeThreadDetail,
      comments: [fakeComment, fakeComment2],
    };
    const newComment = {
      id: 'comment-3',
      content: 'Komentar ketiga',
      createdAt: '2024-01-01T04:00:00.000Z',
      owner: { id: 'user-3', name: 'User Tiga', avatar: '' },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(threadWithMultipleComments, action);

    expect(nextState.id).toBe(fakeThreadDetail.id);
    expect(nextState.title).toBe(fakeThreadDetail.title);
    expect(nextState.category).toBe(fakeThreadDetail.category);
    expect(nextState.comments).toHaveLength(3);
  });

  it('should not mutate the existing threadDetail state', () => {
    const previousState = {
      ...fakeThreadDetail,
      comments: [...fakeThreadDetail.comments],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: fakeComment2 },
    };

    threadDetailReducer(previousState, action);

    expect(previousState.comments).toHaveLength(1);
    expect(previousState.comments[0]).toEqual(fakeComment);
  });

  it('should handle RECEIVE_THREAD_DETAIL overwriting existing thread detail', () => {
    const previousState = fakeThreadDetail;
    const newThreadDetail = {
      id: 'thread-2',
      title: 'Thread Lain',
      body: 'Isi thread lain',
      category: 'general',
      createdAt: '2024-02-01T00:00:00.000Z',
      owner: { id: 'user-2', name: 'User Dua', avatar: '' },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: newThreadDetail },
    };

    const nextState = threadDetailReducer(previousState, action);

    expect(nextState).toEqual(newThreadDetail);
    expect(nextState.id).toBe('thread-2');
  });
});
