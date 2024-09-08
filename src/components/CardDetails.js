import React from "react";
import { useParams } from "react-router-dom";
import { filterCard } from "../lib/FilterCardData"; // Adjust the import path as needed

const CardDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const card = filterCard.find((card) => card.id.toString() === id); // Find the card by ID

  if (!card) {
    return <div className="text-white">Card not found!</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-11/12 mx-auto p-4">
        <img src="logo.png" alt="Company Logo" />
      </header>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden m-4">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold ${
              card.status === "active"
                ? "bg-green-100 text-green-800"
                : card.status === "upcoming"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            } rounded-full mb-2`}
          >
            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
          </span>
          <h1 className="text-2xl font-semibold mb-4">{card.name}</h1>
          <p className="text-gray-600 mb-4">{card.description}</p>
          {/* Add more details about the card as needed */}
          <div className="text-gray-600">
            <p>
              <strong>Level:</strong> {card.level}
            </p>
            <p>
              <strong>Status:</strong> {card.status}
            </p>
            {/* Add other details if available */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
