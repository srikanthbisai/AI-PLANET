import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function ExplorePage({ setFilters }) {
  const [isOpened, setIsOpened] = useState(false);
  const [localFilters, setLocalFilters] = useState({ status: [], level: [], search: '' });

  const handleFilter = () => {
    setIsOpened(!isOpened);
  };

  const handleSearchChange = (e) => {
    setLocalFilters(prevFilters => ({ ...prevFilters, search: e.target.value }));
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter(item => item !== value)
    }));
  };

  const applyFilters = () => {
    // Convert the status and level arrays to 'all' if empty
    const updatedFilters = {
      status: localFilters.status.length ? localFilters.status : ['all'],
      level: localFilters.level.length ? localFilters.level : ['all'],
      search: localFilters.search
    };
    setFilters(updatedFilters);
    setIsOpened(false);
  };

  return (
    <div className="w-full bg-[#002A3B] p-10 flex flex-col justify-center">
      <div className="w-full text-center">
        <h1 className="text-white text-5xl">Explore Challenges</h1>
      </div>
      <div className="w-3/4 flex mx-auto space-x-4 mt-10 relative items-center">
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search"
            value={localFilters.search}
            onChange={handleSearchChange}
            className="w-full p-4 rounded-lg pl-12"
          />
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
            onClick={applyFilters}
          >
            <FaSearch className="text-gray-500" />
          </button>
        </div>
        {!isOpened && (
          <button
            className="bg-white rounded-lg px-10 py-4 w-[200px]"
            onClick={handleFilter}
          >
            Filter
          </button>
        )}
        {isOpened && (
          <div className="absolute top-0 right-0 bg-white p-4 w-[350px] rounded-lg z-50 shadow-lg">
            <h2 className="text-lg font-bold">Filters</h2>
            <div className="mt-4">
              <h3 className="font-semibold">Status</h3>
              <div className="mt-2">
                <label className="block">
                  <input
                    type="checkbox"
                    value="active"
                    onChange={(e) => handleCheckboxChange(e, 'status')}
                    checked={localFilters.status.includes('active')}
                  />
                  Active
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    value="upcoming"
                    onChange={(e) => handleCheckboxChange(e, 'status')}
                    checked={localFilters.status.includes('upcoming')}
                  />
                  Upcoming
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    value="completed"
                    onChange={(e) => handleCheckboxChange(e, 'status')}
                    checked={localFilters.status.includes('completed')}
                  />
                  Completed
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Level</h3>
              <div className="mt-2">
                <label className="block">
                  <input
                    type="checkbox"
                    value="Beginner"
                    onChange={(e) => handleCheckboxChange(e, 'level')}
                    checked={localFilters.level.includes('Beginner')}
                  />
                  Beginner
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    value="Intermediate"
                    onChange={(e) => handleCheckboxChange(e, 'level')}
                    checked={localFilters.level.includes('Intermediate')}
                  />
                  Intermediate
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    value="Advanced"
                    onChange={(e) => handleCheckboxChange(e, 'level')}
                    checked={localFilters.level.includes('Advanced')}
                  />
                  Advanced
                </label>
              </div>
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-4"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
