import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const getData= async()=>{
    const res = await axios.get('http://localhost:5000/api/leaderboard')
    const newData= res.data;
    setLeaderboard(newData)
  }
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Top Fundraisers</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Amount Raised</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((person, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {person.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-green-600">${person.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;