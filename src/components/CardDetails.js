import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filterCard } from "../lib/FilterCardData"; 

const CardDetails = ({ cards, deleteCard }) => {
  const { id } = useParams(); // Fetching card ID from the URL
  const navigate = useNavigate();
  const card = cards.find((card) => card.id.toString() === id); // Finding the card by ID 

  if (!card) {
    return <div className="text-white">Card not found!</div>;
  }

  const handleEditClick = () => {
    navigate(`/card/${id}/edit`); // Navigating to the edit form on clicking edit button
  };

  const handleDeleteClick = () => {
    deleteCard(card.id); 
    navigate("/");  // Navigating to home page after deletion to view remaining cards
  };

  const filteredCard = filterCard.find((fCard) => fCard.id.toString() === id);

  // Dynamic rendering of start and end dates
  const formattedStartDate = new Date(card.startDate).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

  const formattedEndDate = new Date(card.endDate).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

  // Conditional check for dynamic message based on status
  const getStatusMessage = () => {
    const isValidDate = (date) => !isNaN(new Date(date).getTime());
  
    if (card.status === 'upcoming') {
      return `Starts on ${formattedStartDate}`;
    } else if (card.status === 'active') {
      return `Ends on ${isValidDate(card.endDate) ? formattedEndDate : 'Invalid Date'}`;
    } else if (card.status === 'completed') {
      return `Ended on ${isValidDate(card.endDate) ? formattedEndDate : 'Invalid Date'}`;
    }
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-white py-4 shadow">
        <div className="lg:w-[85%]  mx-auto px-4">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-12 inline-block"
          />
        </div>
      </header>

      {/* Main Section */}
      <div className="bg-[#003145] py-12 text-white flex-grow flex flex-col justify-center">
        <div className="w-3/4 mx-auto space-y-8">
          <div className="bg-[#FFCE5C] text-black py-2 px-4 rounded-md flex items-center max-w-max space-x-3">
            <img src="/timer.png" alt="" />
            <p>{getStatusMessage()} (India Standard Time)</p>
          </div>

          <h1 className="text-4xl font-bold">{card.name}</h1>
          <p className="mt-2 text-lg">
            {filteredCard ? filteredCard.description : "No description available"}
          </p>
          <button className="bg-white text-black py-2 px-6 rounded-md flex items-center justify-center space-x-3">
            <img src="/skill.svg" alt="" />
            <span>{card.level}</span>
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white py-8 ">
        <div className="w-3/4 mx-auto ">
          <div className="flex justify-between items-center ">
            <div className="overViewContainer border-b-4 border-green-600">
              <h2 className="mb-4 font-bold text-2xl  inline-block">
                Overview
              </h2>
            </div>
            <div className="buttonContainer space-x-4">
              <button
                onClick={handleEditClick}
                className="bg-green-800 text-white py-2 px-8 rounded-md text-lg"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="border border-red-800 text-red-800 py-2 px-8 rounded-md text-lg"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="textContainer mt-10 space-y-6">
            <p className="text-gray-600 text-xl leading-relaxed">
              {filteredCard ? filteredCard.longDescription.split('\n\n').map((paragraph, index) => (
                <span key={index}>{paragraph}<br /><br /></span>
              )) : "No detailed description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
