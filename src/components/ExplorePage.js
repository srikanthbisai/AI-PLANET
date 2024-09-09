import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function ExplorePage({ setFilters }) {
  const [isOpened, setIsOpened] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    status: [],
    level: [],
    search: "",
  });

  const handleFilter = () => {
    setIsOpened(!isOpened);
  };

  const handleSearchChange = (e) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  const applyFilters = () => {
    // Convert the status and level arrays to 'all' if empty
    const updatedFilters = {
      status: localFilters.status.length ? localFilters.status : ["all"],
      level: localFilters.level.length ? localFilters.level : ["all"],
      search: localFilters.search,
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
            className="bg-white rounded-lg font-bold text-2xl font-serif px-10 py-4 w-[200px]"
            onClick={handleFilter}
          >
            Filter V
          </button>
        )}
        {isOpened && (
          <div className="absolute top-0 right-0 bg-white p-4 font-serif w-[350px] rounded-lg z-50 shadow-lg">
            <h2 className="text-2xl font-bold w-full">Filters</h2>
            <div
              className="bg-gray-100"
              style={{
                width: "300px",
                height: "2px",
                transform: "rotate(0deg)",
                marginTop: "25px",
              }}
            ></div>
            <div className="mt-4">
              <h3 className="font-semibold">Status</h3>
              <div className="mt-2">
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="active"
                    onChange={(e) => handleCheckboxChange(e, "status")}
                    checked={localFilters.status.includes("active")}
                  />
                  <span>Active</span>
                </label>
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="upcoming"
                    onChange={(e) => handleCheckboxChange(e, "status")}
                    checked={localFilters.status.includes("upcoming")}
                  />
                  <span>Upcoming</span>
                </label>
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="completed"
                    onChange={(e) => handleCheckboxChange(e, "status")}
                    checked={localFilters.status.includes("completed")}
                  />
                  <span>Completed</span>
                </label>
              </div>
            </div>

            <div
              className="bg-gray-100"
              style={{
                width: "300px",
                height: "2px",
                transform: "rotate(0deg)",
                marginTop: "25px",
              }}
            ></div>
            <div className="mt-4">
              <h3 className="font-semibold">Level</h3>

              <div className="mt-2 space">
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="Beginner"
                    onChange={(e) => handleCheckboxChange(e, "level")}
                    checked={localFilters.level.includes("Beginner")}
                  />
                  <span>Beginner</span>
                </label>
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="Intermediate"
                    onChange={(e) => handleCheckboxChange(e, "level")}
                    checked={localFilters.level.includes("Intermediate")}
                  />
                  <span>Intermediate</span>
                </label>
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="Advanced"
                    onChange={(e) => handleCheckboxChange(e, "level")}
                    checked={localFilters.level.includes("Advanced")}
                  />
                  <span>Advanced</span>
                </label>
              </div>
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
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
