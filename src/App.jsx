import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from '@dimasmds/react-redux-loading-bar';
import { asyncPreloadProcess } from './states/isPreload/action';
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';
import ThreadsPage from './pages/ThreadsPage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { isPreload, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50">
        <TopNavbar authUser={authUser} />
        <LoadingBar style={{ backgroundColor: '#3b82f6', height: '4px' }} />
      </div>

      <main className="pb-24">
        <Routes>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/thread/:id" element={<DetailPage />} />
          <Route path="/new" element={<AddThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <BottomNavbar authUser={authUser} />
    </div>
  );
}

export default App;