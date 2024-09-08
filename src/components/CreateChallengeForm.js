// CreateChallengeForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateChallengeForm = ({ addChallenge }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    level: 'Beginner',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChallenge = {
      id: Date.now(), // Simple way to generate a unique ID
      ...formData,
      status: 'upcoming', // Default status
    };
    addChallenge(newChallenge);
    navigate('/'); // Navigate back to the main page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <div className="w-3/4 mx-auto mt-10">
        <h2 className="text-3xl mb-6">Create Challenge</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Challenge Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2"
              required
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
              required
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
              required
            />
          </div>

          <div className="mb-4">
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border p-2"
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeForm;
