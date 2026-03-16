const LeaderboardItem = ({ user, score, rank }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm font-medium text-slate-300 w-4">
          {rank}
        </span>

        <div className="h-12 w-12 rounded-full overflow-hidden shadow-inner group-hover:scale-105 transition-transform border border-slate-200">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <span className="text-lg font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
          {user.name}
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-2xl font-black text-slate-800 tracking-tighter">
          {score}
        </span>
      </div>
    </div>
  );
};

export default LeaderboardItem;