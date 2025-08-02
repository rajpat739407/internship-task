import { Link, useNavigate } from "react-router-dom";
import "../../src/index.css"; // Ensure styles are imported
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [number, setNumber] = useState(null);
  const [fetchData, setFetchData] = useState("");
  const navigate = useNavigate();

  const handleclick = () => {
    setActiveTab("leaderboard");
  }


  const handleLogout = () => {
    // In a real app, we would clear tokens/session
    // For this dummy version, just redirect to login
    navigate("/");
  };


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
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
              <span className="ml-2 text-xl font-bold text-blue-600">
                FundraiseHub
              </span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                onClick={() => setActiveTab(false)}
                to="/dashboard"
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                onClick={handleclick}
                to="/leaderboard"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium {activeTab === 'leaderboard' ? 'text-red-800' : ''}"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-4">
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {
                    fetchData ? (
                      <span className="flex items-center">
                        {fetchData[number] ? fetchData[number].name : "Loading..."}
                        <img src={fetchData[number].src} alt="User Avatar" className="w-10 h-10 rounded-full inline-block ml-2" />
                      </span>
                    ): ("Loading...")
                  }
                </span>
                
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/dashboard"
            className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/leaderboard"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium {activeTab === 'leaderboard' ? 'text-red-800' : ''}"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
