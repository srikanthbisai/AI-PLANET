import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filterCard } from "../lib/FilterCardData"; // Adjust the import path as needed

const CardDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const card = filterCard.find((card) => card.id.toString() === id); // Find the card by ID

  if (!card) {
    return <div className="text-white">Card not found!</div>;
  }


  const handleEditClick = () => {
    navigate(`/card/${id}/edit`); // Navigate to the edit form
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white py-4 shadow">
        <div className="w-3/4 mx-auto px-4">
          <img
            src="logo.png"
            alt="Company Logo"
            className="h-12 inline-block"
          />
        </div>
      </header>

      {/* Main Section */}
      <div className="bg-[#003145] py-6 text-white flex-grow flex flex-col">
        <div className="w-3/4 mx-auto flex-grow flex flex-col justify-between">
          <div className="flex flex-col space-y-10 p-10">
            <div className="bg-yellow-500 text-black py-2 px-6 rounded-md mt-10 w-1/3 justify-center">
              <p>Starts on 17th Jun'22 09:00 PM (India Standard Time)</p>
            </div>
            <h1 className="text-4xl font-bold">{card.name}</h1>
            <p className="mt-2 text-lg">
              Identify the class to which each butterfly belongs
            </p>
          </div>
          <div>
          <button>{card.level}</button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white py-8">
        <div className="w-3/4 mx-auto px-4 p-2">
          <div className="flex space-x-4 justify-between">
            <div className="overViewContainer">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            </div>
            <div className="buttonContainer space-x-4">
              <button onClick={handleEditClick} className="bg-green-600 text-white py-2 px-6 rounded-md">
                Edit
              </button>
              <button className="border border-red-500 text-red-500 py-2 px-6 rounded-md">
                Delete
              </button>
            </div>
          </div>

          <div className="textContainer flex-grow mt-10 w-3/4 space-y-10">
            <p className="text-gray-600 mb-4 text-2xl font-bold">
              Butterflies are the adult flying stage of certain insects belonging
              to an order or group called Lepidoptera. The word "Lepidoptera"
              means "scaly wings" in Greek. This name perfectly suits the insects
              in this group because their wings are covered with thousands of tiny
              scales overlapping in rows.
            </p>
            <p className="text-gray-600 mb-4 text-2xl font-bold">
              An agency of the Governmental Wildlife Conservation is planning to
              implement an automated system based on computer vision so that it
              can identify butterflies based on captured images. As a consultant
              for this project, you are responsible for developing an efficient
              model.
            </p>
            <p className="text-gray-600 mb-6 text-2xl font-bold">
              Your task is to build an Image Classification Model using CNN that
              classifies to which class each butterfly belongs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
