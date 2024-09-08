import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterCard } from '../lib/FilterCardData'; // Adjust import path as needed

const getRemainingTime = (endDate) => {
  const total = Date.parse(endDate) - Date.parse(new Date());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
};

const FilterCard = ({ filters }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const endDate = new Date(); // Replace with actual endDate from your card
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCards = filterCard.filter((card) => {
    const statusMatch = filters.status === 'all' || card.status === filters.status;
    const levelMatch = filters.level === 'all' || card.level === filters.level;
    return statusMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-blue-900 p-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-8">
      {filteredCards.length > 0 ? (
        filteredCards.map((card, index) => (
          <div
            key={index}
            className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden m-4 cursor-pointer"
            onClick={() => navigate(`/card/${card.id}`)} // Navigate to the card details page on click
          >
            <img src={card.image} alt={card.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className={`inline-block px-3 py-1 text-sm font-semibold ${card.status === 'active' ? 'bg-green-100 text-green-800' : card.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'} rounded-full mb-2`}>
                {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
              </span>
              <h1 className="text-xl font-semibold mb-2">{card.name}</h1>
              <p className="text-gray-600">{card.description}</p>
              {card.status !== 'completed' && (
                <div className="mt-4 text-center">
                  {card.status === 'active' ? (
                    <div>
                      <p className="text-lg font-bold">Ends in</p>
                      <p className="text-gray-600">{`${timeLeft.days} Days : ${timeLeft.hours} Hours : ${timeLeft.minutes} Mins : ${timeLeft.seconds} Secs`}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-bold">Starts in</p>
                      <p className="text-gray-600">{`${timeLeft.days} Days : ${timeLeft.hours} Hours : ${timeLeft.minutes} Mins : ${timeLeft.seconds} Secs`}</p>
                    </div>
                  )}
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-4">
                    Participate Now
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">No cards match the selected filters.</div>
      )}
    </div>
  );
};

export default FilterCard;
