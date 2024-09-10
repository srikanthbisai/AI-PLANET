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
  const now = new Date().getTime();
  let total = 0;

  if (status === 'upcoming') {
    total = new Date(startDate).getTime() - now; // Time until it starts
  } else if (status === 'active') {
    total = new Date(endDate).getTime() - now; // Time until it ends
  }

  if (total < 0) {
    total = 0; // Timer stops at 0 when an event has started or ended
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);

  return { total, days, hours, minutes };
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
        // Calculate remaining time for each card
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
      <div className="w-3/4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => {
            const status = card.status || 'unknown';
            const name = card.name || 'Unnamed Challenge';
            const time = timeLeft[card.id] || { days: 0, hours: 0, minutes: 0 };

            return (
              <div
                key={index}
                className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden m-4 cursor-pointer flex flex-col items-center"
                onClick={() => navigate(`/card/${card.id}`)}
              >
                <img src={card.image} alt={name} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col items-center text-center">
                  <span className={`inline-block px-3 py-1 text-sm font-semibold ${status === 'active' ? 'bg-green-100 text-green-800' : status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} rounded-lg mb-2`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <h1 className="text-lg w-4/5 font-semibold mb-2">{name}</h1>
                  {status !== 'completed' ? (
                    <div className="mt-4 text-center">
                      {status === 'upcoming' ? (
                        <div className='space-y-3'>
                          <p className="text-sm text-gray-600">Starts in:</p>
                          {/* Timer */}
                          <div className="flex justify-center space-x-2 text-lg font-semibold text-gray-800">
                            <div>{String(time.days).padStart(2, '0')}</div>
                            <div>:</div>
                            <div>{String(time.hours).padStart(2, '0')}</div>
                            <div>:</div>
                            <div>{String(time.minutes).padStart(2, '0')}</div>
                          </div>
                          {/* Timer Labels */}
                          <div className="flex justify-center space-x-3 text-sm font-medium text-gray-600">
                            <div>Days</div>
                            <div>Hours</div>
                            <div>Mins</div>
                          </div>
                        </div>
                      ) : status === 'active' ? (
                        <div className='space-y-3'>
                          <p className="text-sm text-gray-600">Ends in:</p>
                          {/* Timer */}
                          <div className="flex justify-center space-x-2 text-lg font-semibold text-gray-800">
                            <div>{String(time.days).padStart(2, '0')}</div>
                            <div>:</div>
                            <div>{String(time.hours).padStart(2, '0')}</div>
                            <div>:</div>
                            <div>{String(time.minutes).padStart(2, '0')}</div>
                          </div>
                          {/* Timer Labels */}
                          <div className="flex justify-center space-x-3 text-sm font-medium text-gray-600">
                            <div>Days</div>
                            <div>Hours</div>
                            <div>Mins</div>
                          </div>
                        </div>
                      ) : null}
                      <button className="bg-green-800 text-white mt-4 px-6 py-2 rounded-lg font-semibold hover:bg-green-600  flex items-center space-x-4">
                        <img src='circletick.png' alt='' />
                        <h1>Participate Now</h1>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 text-center space-y-6">
                      <p className="text-sm text-gray-600">Ended on:</p>
                      <p className="text-lg font-semibold text-gray-800">{card.endDate}</p>
                      <button className="bg-green-800 text-white mt-4 px-6 py-2 rounded-lg font-semibold hover:bg-green-600  flex items-center space-x-4">
                        <img src='circletick.png' alt='' />
                        <h1>Participate Now</h1>
                      </button>
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
