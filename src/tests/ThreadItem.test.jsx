/**
 * Test Skenario untuk ThreadItem component:
 *
 * - should render judul thread dengan benar
 * - should render kategori thread dengan benar (dengan prefix #)
 * - should render jumlah upvote dan downvote dengan benar
 * - should render jumlah komentar dengan benar
 * - should render nama pemilik thread
 * - should navigate ke halaman detail thread saat card diklik
 * - should menampilkan alert dan navigate ke /login saat vote diklik tanpa authUser
 * - should tidak navigate ke login saat vote diklik dengan authUser yang valid
 * - should menampilkan body thread (terpotong 3 baris)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const fakeThread = {
  id: 'thread-test-1',
  title: 'Cara Belajar React dengan Efektif',
  body: '<p>React adalah library JavaScript untuk membangun UI yang interaktif.</p>',
  category: 'react',
  createdAt: '2024-01-15T10:00:00.000Z',
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: ['user-3'],
  totalComments: 5,
  user: {
    id: 'user-1',
    name: 'Budi Santoso',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso',
  },
  authUser: null,
};

const renderThreadItem = (thread = fakeThread) => {
  return render(
    <MemoryRouter>
      <ThreadItem thread={thread} />
    </MemoryRouter>
  );
};

describe('ThreadItem component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render judul thread dengan benar', () => {
    renderThreadItem();

    expect(screen.getByText('Cara Belajar React dengan Efektif')).toBeInTheDocument();
  });

  it('should render kategori thread dengan benar (dengan prefix #)', () => {
    renderThreadItem();

    expect(screen.getByText('#react')).toBeInTheDocument();
  });

  it('should render jumlah upvote dan downvote dengan benar', () => {
    renderThreadItem();

    const voteNumbers = screen.getAllByText(/^\d+$/);
    const voteValues = voteNumbers.map((el) => el.textContent);
    expect(voteValues).toContain('2');
    expect(voteValues).toContain('1');
  });

  it('should render jumlah komentar dengan benar', () => {
    renderThreadItem();

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render nama pemilik thread', () => {
    renderThreadItem();

    expect(screen.getByText('Budi Santoso')).toBeInTheDocument();
  });

  it('should navigate ke halaman detail thread saat card diklik', () => {
    renderThreadItem();

    const threadTitle = screen.getByText('Cara Belajar React dengan Efektif');
    const threadCard = threadTitle.closest('div[class*="group"]');
    fireEvent.click(threadCard);

    expect(mockNavigate).toHaveBeenCalledWith('/thread/thread-test-1');
  });

  it('should menampilkan alert dan navigate ke /login saat vote diklik tanpa authUser', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderThreadItem();

    const upvoteButton = screen.getAllByRole('button')[0];
    fireEvent.click(upvoteButton);

    expect(alertMock).toHaveBeenCalledWith(
      'Anda harus login terlebih dahulu untuk memberikan vote!'
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login');

    alertMock.mockRestore();
  });

  it('should tidak navigate ke login saat vote diklik dengan authUser yang valid', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const threadWithAuth = {
      ...fakeThread,
      authUser: 'user-1',
    };
    renderThreadItem(threadWithAuth);

    const upvoteButton = screen.getAllByRole('button')[0];
    fireEvent.click(upvoteButton);

    expect(alertMock).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalledWith('/login');

    alertMock.mockRestore();
  });

  it('should menampilkan body thread', () => {
    renderThreadItem();

    const bodyEl = document.querySelector('[class*="line-clamp"]');
    expect(bodyEl).toBeInTheDocument();
  });
});
