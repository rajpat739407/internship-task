import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Dashboard = () => {
  const [number, setNumber] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard');
        setFetchData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();

    const storedNumber = localStorage.getItem('number');
    if (storedNumber) {
      setNumber(JSON.parse(storedNumber));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-extrabold tracking-tight mb-2">Intern Dashboard</h1>
          <p className="text-xl text-blue-200">Welcome back, superstar!</p>
        </header>
        
        {fetchData && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 transition-all duration-500 hover:shadow-2xl animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b-2 border-blue-400 pb-2">Your Information</h2>
                <p className="flex justify-between items-center">
                  <span className="font-semibold">Name:</span> 
                  <span className="font-light">{fetchData[number].name}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="font-semibold">Referral Code:</span> 
                  <span className="bg-blue-400/20 text-blue-100 px-3 py-1 rounded-full font-mono text-sm tracking-wider">
                    {fetchData[number].referralCode}
                  </span>
                </p>
                <div className="bg-green-400/20 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                  <h3 className="font-bold text-green-100 text-lg">Total Donations Raised</h3>
                  <p className="text-5xl font-bold text-white mt-2">${fetchData[number].donations}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b-2 border-blue-400 pb-2">Your Rewards</h2>
                <div className="space-y-4">
                  <div className="flex items-center bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 transform hover:translate-x-2">
                    <div className="bg-yellow-400/20 border-2 border-dashed border-yellow-300 rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-2xl">🥉</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold">Bronze Fundraiser</h3>
                      <p className="text-blue-200">Raised $500+</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10 transform hover:translate-x-2">
                    <div className="bg-gray-300/20 border-2 border-dashed border-gray-200 rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold">Silver Supporter</h3>
                      <p className="text-blue-200">Raised $1000+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;