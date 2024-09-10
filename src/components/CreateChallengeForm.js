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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevForm) => ({ ...prevForm, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChallenge = {
      id: Date.now(), //   generating a unique ID
      ...formData,
      status: 'upcoming', // Default status
    };
    addChallenge(newChallenge);
    navigate('/'); // Navigating back to the main page upon successful additon of New challenge
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-5/6 mx-auto p-4">
        <img src="/logo.png" alt="Company Logo" />
      </header>

      <div className='w-full bg-slate-200 text-2xl lg:h-[100px] flex items-center'>
        <div className='w-5/6 mx-auto font-bold tracking-wide '>
          Challenge Details
        </div>
      </div>

      <div className="w-5/6 mx-auto mt-10 rounded-lg">
        <form onSubmit={handleSubmit} className='space-y-10 mb-10'>
          <div className="mb-4  w-11/12 flex flex-col space-y-4 mt-2">
            <label>Challenge Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-[400px] border p-2 border-gray-500"
              required
            />
          </div>

          <div className="mb-4 w-11/12 flex flex-col space-y-4 mt-2 ">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-[400px] border p-2 rounded-lg border-gray-500"
              required
            />
          </div>

          <div className="my-4 w-11/12 flex flex-col space-y-4 rounded-lg">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-[400px] border p-2 rounded-lg border-gray-500"
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
              className="lg:w-[750px] border p-2 rounded-lg border-gray-500"
              required
            />
          </div>

          <div className="mb-4 w-11/12 flex flex-col space-y-4">
            <label>Image</label>
            <div className="relative w-[200px] h-auto bg-slate-200 p-4 rounded-lg flex items-center justify-center">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden rounded-lg"
              />
              <button
                type="button"
                onClick={() => document.getElementById('imageUpload').click()}
                className="flex items-center space-x-2 text-black rounded-lg"
              >
                <span>Upload Image</span>
                <img src="upload.svg" alt="Upload" className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-[200px] border p-3 rounded-lg border-gray-500"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-lg w-[200px]"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeForm;
