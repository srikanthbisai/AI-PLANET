import React, { useState } from 'react';

function ExplorePage({ setFilters }) {
  const [isOpened, setIsOpened] = useState(false);
  const [localFilters, setLocalFilters] = useState({ status: 'all', level: 'all' });

  const handleFilter = () => {
    setIsOpened(!isOpened);
  };

  const handleStatusChange = (e) => {
    setLocalFilters(prevFilters => ({ ...prevFilters, status: e.target.value }));
  };

  const handleLevelChange = (e) => {
    setLocalFilters(prevFilters => ({ ...prevFilters, level: e.target.value }));
  };

  const applyFilters = () => {
    setFilters(localFilters); // Update filters in the parent component
  };

  return (
    <div className="w-full bg-[#002A3B] p-10 flex flex-col">
      <div className="w-full text-center">
        <h1 className="text-white text-5xl">Explore Challenges</h1>
      </div>
      <div className="w-3/4 mx-auto space-x-10 mt-10">
        <input
          type="text"
          placeholder="Search"
          className="w-3/4 mx-auto p-4 rounded-lg"
        />
        {!isOpened && (
          <button className="bg-white rounded-lg p-4 tracking-widest" onClick={handleFilter}>
            Filter
          </button>
        )}
        {isOpened && (
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold">Filters</h2>
            <div className="mt-4">
              <label className="block">
                Status:
                <select value={localFilters.status} onChange={handleStatusChange} className="w-full mt-1 p-2 border border-gray-300 rounded">
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                Level:
                <select value={localFilters.level} onChange={handleLevelChange} className="w-full mt-1 p-2 border border-gray-300 rounded">
                  <option value="all">All</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
