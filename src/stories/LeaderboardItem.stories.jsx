import LeaderboardItem from '../components/LeaderboardItem';

/**
 * LeaderboardItem menampilkan satu baris data pengguna di halaman leaderboard.
 * Komponen ini menampilkan avatar, nama pengguna, skor, dan peringkat.
 */
export default {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    rank: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Peringkat pengguna dalam leaderboard',
    },
    score: {
      control: { type: 'number', min: 0 },
      description: 'Skor total pengguna',
    },
    user: {
      description: 'Data pengguna yang akan ditampilkan',
    },
  },
};

/**
 * Tampilan default leaderboard item dengan pengguna peringkat pertama.
 */
export const FirstPlace = {
  args: {
    rank: 1,
    score: 1250,
    user: {
      id: 'user-1',
      name: 'Budi Santoso',
      avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff',
    },
  },
};

/**
 * Tampilan pengguna dengan peringkat menengah.
 */
export const MiddleRank = {
  args: {
    rank: 5,
    score: 730,
    user: {
      id: 'user-5',
      name: 'Dewi Lestari',
      avatar: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=ec4899&color=fff',
    },
  },
};

/**
 * Tampilan pengguna dengan skor rendah di posisi bawah.
 */
export const LowScore = {
  args: {
    rank: 15,
    score: 45,
    user: {
      id: 'user-15',
      name: 'Ahmad Fauzi',
      avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=10b981&color=fff',
    },
  },
};

/**
 * Tampilan dengan nama pengguna yang sangat panjang.
 */
export const LongName = {
  args: {
    rank: 3,
    score: 980,
    user: {
      id: 'user-3',
      name: 'Muhammad Abdullah Rahmatulloh Hakim',
      avatar: 'https://ui-avatars.com/api/?name=Muhammad+Abdullah&background=f59e0b&color=fff',
    },
  },
};

/**
 * Tampilan pengguna dengan skor sangat tinggi (top performer).
 */
export const TopPerformer = {
  args: {
    rank: 1,
    score: 9999,
    user: {
      id: 'user-top',
      name: 'Siti Nurhaliza',
      avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=8b5cf6&color=fff',
    },
  },
};
