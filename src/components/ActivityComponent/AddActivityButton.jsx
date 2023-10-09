import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const AddActivityButton = ({defaultActivityName}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    type: defaultActivityName,
    duration: "",
    date: "",
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
    console.log(activityData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData({
      ...activityData,
      [name]: value,
    });
  };

  return (
    <div>
      {/* Add button */}
      <button
        className="flex justify-end items-center btn btn-primary drop-shadow-xl text-white text-[20px] font-bold py-2 px-5 rounded-lg w-fit h-[20px]"
        onClick={toggleFormVisibility}
      >
        Do It Now
      </button>

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg">
            <span
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 cursor-pointer"
              onClick={toggleFormVisibility}
            >
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Activity Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={activityData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={activityData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Activity Type:
                </label>
                <select
                  name="type"
                  value={activityData.type}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Yoga">Yoga</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Swimming">Swim</option>
                  <option value="Walk">Walk</option>
                  <option value="Running">Running</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Duration (minutes):
                </label>
                <input
                  type="text"
                  name="duration"
                  value={activityData.duration}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  value={activityData.date}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Activity
                </button>
  
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddActivityButton;
