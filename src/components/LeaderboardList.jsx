import LeaderboardItem from './LeaderboardItem';

const LeaderboardList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-slate-500 py-8">Belum ada data klasemen.</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-slate-50/50 border-b border-slate-100">
        <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Pengguna</span>
        <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Skor</span>
      </div>

      <div className="divide-y divide-slate-50">
        {data.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            user={item.user}
            score={item.score}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardList;