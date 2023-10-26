import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWorkout = () => {
  const [activityTypeName, setActivityTypeName] = useState("");
  const [activityTypeImage, setActivityTypeImage] = useState("");
  const [activityTypeDesc, setActivityTypeDesc] = useState("");
  const navigate = useNavigate();

  const createActicityType = async () => {
    
    await axios
      .post(`${import.meta.env.VITE_API_URL}activityType/create`, {
        ActivityTypeName: activityTypeName,
        ActivityTypeImage: previewSource,
        ActivityTypeDesc: activityTypeDesc,
      })
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((err) => console.error(err));
  };
  const [previewSource, setPreviewSource] = useState('');
  const handleFileInput = (e) => {
      const file = e.target.files[0]
      console.log(`file : ${e.target.files[0]}`);
      previewFile(file)
  }
  const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result)
      }
  }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="bg-primary flex p-2 px-10 rounded-lg items-center gap-x-2 text-white hover:scale-105 hover:duration-300"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Add Workout Type
        <FiPlusCircle />
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-600 text-white">
                ✕
              </button>
            </form>
            <p className="font-bold py-4 text-xl flex items-center gap-2">
              Workout info <MdOutlineSportsKabaddi />
            </p>

            {/* Workout photo*/}

            <div className="flex justify-center py-8">
              <img
                className="w-[200px] h-[200px] object-cover rounded-full border-4 border-primary"
                src={previewSource}
                alt=""
              />

              {/* รูปไว้กด Edit */}
              <div className="w-[200px] h-[200px] group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                <img
                  type="file"
                  className="hidden group-hover:block w-12"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt=""
                />

                {/* ปุ่มไว้กด Upload photo */}

                <input type="file" onChange={handleFileInput}></input>
              </div>
            </div>

            {/*Container of Input ทั้งหมด */}
            <div>
              <div className="">
                <label
                  className="block text-sm font-semibold text-gray-600 mb-1 "
                  htmlFor="inputWorkoutName"
                >
                  Workout Name
                </label>

                <input
                  className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:border-primary"
                  id="inputWorkoutName"
                  type="text"
                  placeholder="Enter your Workout name"
                  onChange={(e) => setActivityTypeName(e.target.value)}
                />
              </div>

              <div className="">
                <label
                  className="block text-sm font-semibold text-gray-600 mb-1 "
                  htmlFor="inputDescription"
                >
                  Description
                </label>

                <input
                  className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:border-primary"
                  id="inputDescription"
                  type="text"
                  placeholder="Enter your Description"
                  onChange={(e) => setActivityTypeDesc(e.target.value)}
                />
              </div>

              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button 
                  className="btn btn-primary text-white"
                  onClick={createActicityType}
                >
                  Save
                </button>
              </div>
            </div>
        </div>
      </dialog>
    </>
  );
};

export default AddWorkout;
