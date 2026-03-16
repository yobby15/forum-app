import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddThreadHeader from '../components/AddThreadHeader';
import AddThreadForm from '../components/AddThreadForm';

const AddThreadPage = () => {
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  if (!authUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <AddThreadHeader />
        <AddThreadForm />
      </div>
    </div>
  );
};

export default AddThreadPage;