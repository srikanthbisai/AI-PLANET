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
    const updatedFilters = {
      status: localFilters.status.length ? localFilters.status : ["all"],
      level: localFilters.level.length ? localFilters.level : ["all"],
      search: localFilters.search,
    };
    setFilters(updatedFilters);
    setIsOpened(false);
  };

  const removeFilter = (filterType, filterValue) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== filterValue),
    }));
  };

  return (
    <div className="w-full bg-[#002A3B] p-10 h-auto flex flex-col space-y-10 justify-center items-center">
      <div className="w-full text-center">
        <h1 className="text-white text-5xl">Explore Challenges</h1>
      </div>
      <div className="w-3/4 flex flex-col lg:flex-row gap-6 mx-auto mt-10 relative items-center">
        <div className="relative w-full lg:w-3/4">
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
            className="bg-white rounded-lg font-bold text-2xl font-serif px-10 py-3 w-full lg:w-[200px] flex justify-center items-center"
            onClick={handleFilter}
          >
            <div className="buttonContainer flex items-center justify-center space-x-4">
              <h2 className="text-2xl font-bold w-full">Filters</h2>
              <img src="Caret.png" alt="" onClick={handleFilter} />
            </div>
          </button>
        )}
        {isOpened && (
          <div className="absolute top-0 right-0 bg-white p-4 font-serif w-full lg:w-[350px] rounded-lg z-50 shadow-lg">
            <div className="buttonContainer flex items-center justify-center">
              <h2 className="text-2xl font-bold w-full">Filters</h2>
              <img src="Caretup.png" alt="" onClick={handleFilter} className="cursor-pointer" />
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
                    value="Easy"
                    onChange={(e) => handleCheckboxChange(e, "level")}
                    checked={localFilters.level.includes("Easy")}
                  />
                  <span>Easy</span>
                </label>
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="Medium"
                    onChange={(e) => handleCheckboxChange(e, "level")}
                    checked={localFilters.level.includes("Medium")}
                  />
                  <span>Medium</span>
                </label>
                <label className="block space-x-2">
                  <input
                    type="checkbox"
                    value="Hard"
                    onChange={(e) => handleCheckboxChange(e, "level")}
                    checked={localFilters.level.includes("Hard")}
                  />
                  <span>Hard</span>
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

      {/* Displaying Selected Filters */}
      <div className="mt-4 w-3/4 mx-auto flex flex-wrap gap-3">
        {/* Display status filters */}
        {localFilters.status.map((status) => (
          <div
            key={status}
            className="flex items-center bg-gray-400 text-white px-3 py-1 rounded-full"
          >
            <span>{status}</span>
            <button
              onClick={() => removeFilter("status", status)}
              className="ml-2 text-sm text-white rounded-full px-1.5 bg-gray-600"
            >
              &times;
            </button>
          </div>
        ))}
        {/* Display level filters */}
        {localFilters.level.map((level) => (
          <div
            key={level}
            className="flex items-center bg-gray-400 text-white px-3 py-1 rounded-full"
          >
            <span>{level}</span>
            <button
              onClick={() => removeFilter("level", level)}
              className="ml-2 text-sm text-white rounded-full px-1.5 bg-gray-600"
            >
              &times;
            </button>
          </div>
        ))}
        {/* Display search filter */}
        {localFilters.search && (
          <div className="flex items-center bg-gray-400 text-white px-3 py-1 rounded-full">
            <span>{localFilters.search}</span>
            <button
              onClick={() => setLocalFilters((prevFilters) => ({ ...prevFilters, search: "" }))}
              className="ml-2  text-sm text-white rounded-md p-2 bg-gray-600"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
