import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';

/**
 * ThreadItem adalah komponen kartu yang menampilkan ringkasan thread diskusi.
 * Komponen ini menampilkan judul, kategori, isi singkat, jumlah vote, komentar, dan pemilik thread.
 */
export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    () => (
      <MemoryRouter>
        <div style={{ maxWidth: '600px', padding: '20px', background: '#f8fafc' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    thread: {
      description: 'Data thread yang akan ditampilkan',
    },
  },
};

const baseThread = {
  id: 'thread-story-1',
  title: 'Cara Belajar React dengan Efektif di 2024',
  body: '<p>React adalah library JavaScript yang sangat populer untuk membangun antarmuka pengguna yang interaktif dan efisien. Dalam artikel ini kita akan membahas cara terbaik belajar React.</p>',
  category: 'react',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  upVotesBy: ['user-1', 'user-2', 'user-3'],
  downVotesBy: ['user-4'],
  totalComments: 12,
  user: {
    id: 'user-1',
    name: 'Budi Santoso',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
  },
  authUser: null,
};

/**
 * Tampilan default thread tanpa user yang login.
 * Vote button akan redirect ke halaman login jika diklik.
 */
export const Default = {
  args: {
    thread: baseThread,
  },
};

/**
 * Thread saat user sudah login.
 * Vote button dapat diklik tanpa redirect ke halaman login.
 */
export const WithAuthUser = {
  args: {
    thread: {
      ...baseThread,
      authUser: 'user-5',
    },
  },
};

/**
 * Thread dengan vote yang sudah diberikan user.
 */
export const WithManyVotes = {
  args: {
    thread: {
      ...baseThread,
      title: 'Diskusi Panas: Vue vs React vs Angular, Mana yang Terbaik?',
      category: 'javascript',
      upVotesBy: Array.from({ length: 42 }, (_, i) => `user-${i}`),
      downVotesBy: Array.from({ length: 8 }, (_, i) => `user-down-${i}`),
      totalComments: 87,
    },
  },
};

/**
 * Thread baru yang baru saja dibuat dengan judul panjang.
 */
export const NewThread = {
  args: {
    thread: {
      ...baseThread,
      id: 'thread-story-2',
      title: 'Pengalaman Saya Berpindah dari JavaScript ke TypeScript Setelah 3 Tahun Bekerja',
      category: 'typescript',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      user: {
        id: 'user-2',
        name: 'Siti Rahma',
        avatar: 'https://ui-avatars.com/api/?name=Siti+Rahma&background=ec4899&color=fff',
      },
    },
  },
};

/**
 * Thread dengan kategori general dan konten panjang.
 */
export const GeneralCategory = {
  args: {
    thread: {
      ...baseThread,
      id: 'thread-story-3',
      title: 'Tips dan Trik Produktivitas untuk Developer',
      body: '<p>Sebagai seorang developer, produktivitas adalah kunci keberhasilan. Berikut adalah beberapa tips yang telah saya kumpulkan selama bertahun-tahun bekerja di industri teknologi yang dapat membantu Anda bekerja lebih efisien.</p>',
      category: 'general',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      totalComments: 5,
    },
  },
};
