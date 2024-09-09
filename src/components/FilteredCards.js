// FilterCard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getRemainingTime = (endDate) => {
  const total = Date.parse(endDate) - Date.parse(new Date());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
};

const FilterCard = ({ filters, cards }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const endDate = new Date(); // You might want to replace this with the actual end date of the card
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCards = cards.filter((card) => {
    const statusMatch = filters.status === 'all' || card.status === filters.status;
    const levelMatch = filters.level === 'all' || card.level === filters.level;
    return statusMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-[#003145] pt-10"> 
    <div className="w-3/4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {filteredCards.length > 0 ? (
        filteredCards.map((card, index) => {
          const status = card.status || 'unknown'; // Fallback if status is undefined
          const name = card.name || 'Unnamed Challenge'; // Fallback if name is undefined

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
                {status !== 'completed' && (
                  <div className="mt-4 text-center p-4">
                    {status === 'active'  ? (
                      <div className='space-y-3'>
                        <p className="text-lg font-bold">Ends in</p>
                        <p className="text-gray-600">00  :  15  :  22</p>
                        <p>Days : Hours : Min</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-bold">Starts in</p>
                        <p className="text-gray-600">{`${timeLeft.days} Days : ${timeLeft.hours} Hours : ${timeLeft.minutes} Mins : ${timeLeft.seconds} Secs`}</p>
                      </div>
                    )}
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4">
                      Participate Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-white">No cards match the selected filters.</div>
      )}
      </div>
    </div>
  );
};

export default FilterCard;
