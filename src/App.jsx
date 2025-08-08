import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './Components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.warn("getCurrentUser failed", err);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-start py-6 px-2 sm:px-4">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
