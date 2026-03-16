import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardHeader from '../components/LeaderboardHeader';
import LeaderboardList from '../components/LeaderboardList';

const LeaderboardsPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <LeaderboardHeader />

        <LeaderboardList data={leaderboards} />

        <p className="text-center text-slate-400 text-sm mt-8 italic">
          Skor diperbarui secara real-time berdasarkan aktivitas diskusi.
        </p>
      </div>
    </div>
  );
};

export default LeaderboardsPage;