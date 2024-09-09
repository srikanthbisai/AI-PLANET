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
    <div className="min-h-screen flex flex-col">
       <header className="w-5/6 mx-auto p-4">
          <img src="logo.png" alt="Company Logo" />
        </header>

  
      <div className="w-5/6 mx-auto mt-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-11/12 flex flex-col space-y-4 mt-2">
            <label>Challenge Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-[400px] border p-2"
              required
            />
          </div>


          <div className="mb-4 w-11/12 flex flex-col space-y-4 mt-2">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-[400px] border p-2"
              required
            />
          </div>

          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-[400px] border p-3"
              required
            />
          </div>

          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>Description</label>
            <textarea
              name="description"
              rows={10}
              value={formData.description}
              onChange={handleChange}
              className="w-[750px] border p-3"
              required
            />
          </div>

          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-[200px] border p-2"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="mb-4 w-11/12 flex flex-col space-y-4">
            <label>Image</label>
            <input
              type="text"
              name="image"
              placeholder='Upload'
              value={formData.image}
              onChange={handleChange}
              className="w-[200px] border p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 space-y-4 px-4 rounded-lg"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeForm;
