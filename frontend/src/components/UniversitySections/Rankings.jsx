import React from 'react';

const Ranking = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">University Name | Ranking</h1>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <img src="https://via.placeholder.com/30" alt="College360 Logo" className="mr-2" />
            <h2 className="text-lg font-semibold">College360</h2>
          </div>
          <table className="w-full bg-blue-800 text-white">
            <thead>
              <tr>
                <th className="p-2">Stream</th>
                <th className="p-2">City</th>
                <th className="p-2">2025 Ranking</th>
                <th className="p-2">State</th>
                <th className="p-2">Overall</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-black">
                <td className="p-2">B.Tech</td>
                <td className="p-2">1</td>
                <td className="p-2">3</td>
                <td className="p-2">27</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <img src="https://via.placeholder.com/30" alt="Nirf Logo" className="mr-2" />
            <h2 className="text-lg font-semibold">Nirf ranking</h2>
          </div>
          <table className="w-full bg-blue-800 text-white">
            <thead>
              <tr>
                <th className="p-2">Stream</th>
                <th className="p-2">City</th>
                <th className="p-2">2025 Ranking</th>
                <th className="p-2">State</th>
                <th className="p-2">Overall</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-black">
                <td className="p-2">B.Tech</td>
                <td className="p-2">1</td>
                <td className="p-2">3</td>
                <td className="p-2">27</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <img src="https://via.placeholder.com/30" alt="IIRF Logo" className="mr-2" />
            <h2 className="text-lg font-semibold">IIRF Ranking</h2>
          </div>
          <table className="w-full bg-blue-800 text-white">
            <thead>
              <tr>
                <th className="p-2">Stream</th>
                <th className="p-2">City</th>
                <th className="p-2">2025 Ranking</th>
                <th className="p-2">State</th>
                <th className="p-2">Overall</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-black">
                <td className="p-2">MBA</td>
                <td className="p-2">3</td>
                <td className="p-2">4</td>
                <td className="p-2">41</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Rankings and Accreditations</h2>
          <div className="flex space-x-4">
            <span>🏅</span>
            <span>🌞</span>
            <span>🏅</span>
            <span>—</span>
            <span>🏅</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;