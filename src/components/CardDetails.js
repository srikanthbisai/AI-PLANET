import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filterCard } from "../lib/FilterCardData";

const CardDetails = ({ cards, deleteCard }) => {
  const { id } = useParams(); // fetching card ID from the URL
  const navigate = useNavigate();    
  const card = cards.find((card) => card.id.toString() === id); // Finding the card by ID

  if (!card) {
    return <div className="text-white">Card not found!</div>;
  }

  const handleEditClick = () => {
    navigate(`/card/${id}/edit`); // Navigating to the edit form on clicking edit button
  };

  const handleDeleteClick = () => {
    deleteCard(card.id); // 
    navigate("/");  //navigating to home page after deletion to view remaining cards
  };


  const filteredCard = filterCard.find((fCard) => fCard.id.toString() === id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-white py-4 shadow">
        <div className="w-3/4 mx-auto px-4">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-12 inline-block"
          />
        </div>
      </header>

      {/* Main Section */}
      <div className="bg-[#003145] py-6 text-white flex-grow flex flex-col">
        <div className="w-3/4 mx-auto flex-grow flex flex-col justify-between">
          <div className="flex flex-col space-y-10">
            <div className="bg-yellow-500 text-black py-2 px-6 rounded-md mt-10 w-1/3 justify-center">
              <p>Starts on 17th Jun'22 09:00 PM (India Standard Time)</p>
            </div>
            <h1 className="text-4xl font-bold">{card.name}</h1>
            <p className="mt-2 text-lg">
              {filteredCard ? filteredCard.description : "No description available"}
            </p>
          </div>
          <div>
            <button className="bg-white text-black p-3">{card.level}</button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white py-8">
        <div className="w-3/4 mx-auto">
          <div className="flex space-x-4 justify-between">
            <div className="overViewContainer">
              <h2 className="mb-4 font-bold text-2xl">Overview</h2>
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

          <div className="textContainer flex-grow mt-10 w-3/4 space-y-10">
            <p className="text-gray-600 mb-4 text-2xl font-medium">
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
