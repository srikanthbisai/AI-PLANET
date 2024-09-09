import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Debounce utility function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Function to calculate remaining time
const getRemainingTime = (startDate, endDate, status) => {
  let total;
  
  if (status === 'upcoming') {
    total = Date.parse(startDate) - Date.parse(new Date());
  } else if (status === 'active') {
    total = Date.parse(endDate) - Date.parse(new Date());
  } else {
    total = 0;
  }

  total = Math.max(total, 0);  // Ensure no negative time

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
};

const FilterCard = ({ filters, cards }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const navigate = useNavigate();

  const debouncedSearchHandler = useCallback(
    debounce((search) => {
      setDebouncedSearch(search);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearchHandler(filters.search);
  }, [filters.search, debouncedSearchHandler]);

  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      const updatedTimes = {};

      cards.forEach((card) => {
        const time = getRemainingTime(card.startDate, card.endDate, card.status);
        updatedTimes[card.id] = time;
      });

      setTimeLeft(updatedTimes); // Update the entire timeLeft state with the new times
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [cards]);

  const filteredCards = cards.filter((card) => {
    const statusMatch = filters.status.includes('all') || filters.status.includes(card.status);
    const levelMatch = filters.level.includes('all') || filters.level.includes(card.level);

    const searchQuery = (debouncedSearch || '').toLowerCase();
    const cardName = (card.name || '').toLowerCase();

    const searchMatch = cardName.includes(searchQuery);
    return statusMatch && levelMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#003145] pt-10">
      <div className="w-3/4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => {
            const status = card.status || 'unknown';
            const name = card.name || 'Unnamed Challenge';
            const time = timeLeft[card.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };

            return (
              <div
                key={index}
                className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden m-4 cursor-pointer flex flex-col items-center"
                onClick={() => navigate(`/card/${card.id}`)}
              >
                <img src={card.image} alt={name} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col items-center text-center">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold ${status === 'active' ? 'bg-green-100 text-green-800' : status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'} rounded-full mb-2`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <h1 className="text-xl font-semibold mb-2">{name}</h1>
                  {status !== 'completed' ? (
                    <div className="mt-4 text-center p-4">
                      {status === 'upcoming' ? (
                        <div className='space-y-3'>
                          <p className="text-sm text-gray-600">Starts in:</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
                          </p>
                        </div>
                      ) : status === 'active' ? (
                        <div className='space-y-3'>
                          <p className="text-sm text-gray-600">Ends in:</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="mt-4 text-center p-4">
                      <p className="text-sm text-gray-600">Ended on:</p>
                      <p className="text-lg font-semibold text-gray-800">{card.endDate}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-center text-white">No challenges found</div>
        )}
      </div>
    </div>
  );
};

export default FilterCard;
