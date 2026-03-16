/**
 * Test Skenario untuk threadsReducer:
 *
 * - should return initial state (empty array) when given unknown action
 * - should return threads when given RECEIVE_THREADS action
 * - should replace existing threads when given RECEIVE_THREADS action
 * - should add new thread to beginning of list when given ADD_THREAD action
 * - should return current state when given unknown action type with existing data
 * - should handle RECEIVE_THREADS with empty array
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from '../states/threads/reducer';
import { ActionType } from '../states/threads/action';

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Isi thread pertama',
  category: 'general',
  createdAt: '2024-01-01T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeThread2 = {
  id: 'thread-2',
  title: 'Thread Kedua',
  body: 'Isi thread kedua',
  category: 'react',
  createdAt: '2024-01-02T00:00:00.000Z',
  ownerId: 'user-2',
  upVotesBy: ['user-1'],
  downVotesBy: [],
  totalComments: 3,
};

describe('threadsReducer', () => {
  it('should return initial state (empty array) when given unknown action', () => {
    const previousState = undefined;
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = threadsReducer(previousState, action);

    expect(nextState).toEqual([]);
    expect(Array.isArray(nextState)).toBe(true);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    const previousState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [fakeThread, fakeThread2] },
    };

    const nextState = threadsReducer(previousState, action);

    expect(nextState).toEqual([fakeThread, fakeThread2]);
    expect(nextState).toHaveLength(2);
  });

  it('should replace existing threads when given RECEIVE_THREADS action', () => {
    const previousState = [fakeThread];
    const newThreads = [fakeThread2];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: newThreads },
    };

    const nextState = threadsReducer(previousState, action);

    expect(nextState).toEqual(newThreads);
    expect(nextState).not.toContainEqual(fakeThread);
    expect(nextState).toHaveLength(1);
  });

  it('should add new thread to beginning of list when given ADD_THREAD action', () => {
    const previousState = [fakeThread];
    const newThread = {
      id: 'thread-new',
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'discussion',
      createdAt: '2024-01-03T00:00:00.000Z',
      ownerId: 'user-3',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    const nextState = threadsReducer(previousState, action);

    expect(nextState[0]).toEqual(newThread);
    expect(nextState[1]).toEqual(fakeThread);
    expect(nextState).toHaveLength(2);
  });

  it('should return current state when given unknown action type with existing data', () => {
    const previousState = [fakeThread, fakeThread2];
    const action = { type: 'SOME_RANDOM_ACTION' };

    const nextState = threadsReducer(previousState, action);

    expect(nextState).toEqual(previousState);
    expect(nextState).toHaveLength(2);
  });

  it('should handle RECEIVE_THREADS with empty array', () => {
    const previousState = [fakeThread, fakeThread2];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [] },
    };

    const nextState = threadsReducer(previousState, action);

    expect(nextState).toEqual([]);
    expect(nextState).toHaveLength(0);
  });
});
