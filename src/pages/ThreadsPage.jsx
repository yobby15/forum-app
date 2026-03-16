import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import ThreadsList from '../components/ThreadsList';
import { Plus } from 'lucide-react';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

const ThreadsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { threads = [], users = [], authUser } = useSelector((state) => state);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const categories = Array.from(new Set(threads.map((thread) => thread.category)));

  const filteredThreads = filterCategory
    ? threadList.filter((thread) => thread.category === filterCategory)
    : threadList;

  const onAddThreadClick = () => {
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk membuat diskusi.');
      navigate('/login');
    } else {
      navigate('/new');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <CategoryList
          categories={categories}
          selectedCategory={filterCategory}
          onSelectCategory={setFilterCategory}
        />

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 italic tracking-tight underline decoration-indigo-500 decoration-4 underline-offset-8">
            Diskusi Tersedia
          </h2>
        </div>

        <ThreadsList threads={filteredThreads} />
      </div>

      <button
        onClick={onAddThreadClick}
        className="fixed bottom-24 right-8 bg-slate-800 text-white p-4 rounded-full shadow-2xl hover:bg-slate-900 transition-all active:scale-95 z-50"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default ThreadsPage;