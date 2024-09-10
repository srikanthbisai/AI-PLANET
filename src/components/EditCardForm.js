import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCardForm = ({ cards, updateCards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [card, setCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    level: '',
    image: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  // Fetch card data based on ID and populate form
  useEffect(() => {
    const foundCard = cards.find((c) => c.id.toString() === id);
    if (foundCard) {
      setCard(foundCard);
      setFormData({
        name: foundCard.name,
        description: foundCard.description,
        startDate: foundCard.startDate,
        endDate: foundCard.endDate,
        level: foundCard.level,
        image: foundCard.image,
      });
      setPreviewImage(foundCard.image); 
    }
  }, [id, cards]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
        setFormData((prevForm) => ({ ...prevForm, image: reader.result })); 
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (card) {
      const updatedCard = { ...card, ...formData }; 
      updateCards(updatedCard); 
      navigate('/');
    }
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-5/6 mx-auto p-4">
        <img src="/logo.png" alt="Company Logo" />
      </header>

      <div className="w-full bg-slate-200 text-2xl lg:h-[100px] flex items-center">
        <div className="w-5/6 mx-auto font-bold tracking-wide">
          Challenge Details
        </div> 
      </div>

      <div className="w-5/6 mx-auto mt-10">
        <form onSubmit={handleSubmit} className="space-y-10 pb-10 text-lg">
          {/* Card Name */}
          <div className="mb-4 w-11/12 flex flex-col space-y-4 mt-2">
            <label>Card Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-[400px] border p-2 border-gray-500 rounded-lg"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-4 w-11/12 flex flex-col border-gray-500 space-y-4 mt-2">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-[400px] border p-2 border-gray-500 rounded-lg"
              required
            />
          </div>

          {/* End Date */}
          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-[400px] border p-3 border-gray-500 rounded-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>Description</label>
            <textarea
              name="description"
              rows={10}
              value={formData.description}
              onChange={handleChange}
              className="w-[750px] border border-gray-500 p-3 rounded-lg"
              required
            />
          </div>

          {/* Image Preview with Change Option */}
          <div className="mb-4 w-11/12 flex flex-col space-y-4">
            <label>Image</label>
            <div className="relative w-[300px] h-auto bg-slate-200 p-4 rounded-lg">
              <img 
                src={previewImage || '/group1.png'}
                alt="Preview" 
                className="w-full h-auto object-cover rounded-md"
              />
              <label 
                htmlFor="imageUpload"
                className="text-green-600 cursor-pointer flex items-center space-x-2 mt-2"
              >
                <span className="text-white">
                  <img src="/imageUpload.png" alt="Edit" className="w-4 h-4" />
                </span>
                <span>Change image</span>
              </label>
              <input 
                id="imageUpload"
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden"
              />
            </div>
          </div>

          {/* Level */}
          <div className="my-4 w-11/12 flex flex-col space-y-4">
            <label>Level Type</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-[200px] border p-4 rounded-lg border-gray-500"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-800 hover:bg-orange-800 text-white font-bold py-2 space-y-4 px-4 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCardForm;
