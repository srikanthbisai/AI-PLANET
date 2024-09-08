import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCardForm = ({ cards, updateCards }) => {
  const { id } = useParams(); // Get the card ID from the URL
  const navigate = useNavigate(); // To navigate back after saving
  const card = cards.find((c) => c.id.toString() === id); // Find the card by ID
  
  const [formData, setFormData] = useState({
    name: card.name,
    description: card.description,
    startDate: card.startDate,
    endDate: card.endDate,
    level: card.level,
    image: card.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCard = { ...card, ...formData };
    updateCards(updatedCard); // Update the card in parent state
    navigate('/'); // Navigate back to the main page (or card listing)
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <header className="w-full bg-white py-4 shadow">
        <div className="w-3/4 mx-auto px-4">
          <img
            src="logo.png"
            alt="Company Logo"
            className="h-12 inline-block"
          />
        </div>
      </header>
      
      <div className="w-3/4 mx-auto mt-10">
        <h2 className="text-3xl mb-6">Edit Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Card Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-4">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCardForm;
