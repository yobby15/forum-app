const LeaderboardHeader = () => {
  return (
    <div className="mb-8 text-center sm:text-left">
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Klasmen <span className="text-indigo-600">Pengguna Aktif</span>
      </h2>

      <p className="text-slate-500 mt-2">
        Daftar pengguna dengan kontribusi terbaik di komunitas.
      </p>
    </div>
  );
};

export default LeaderboardHeader;