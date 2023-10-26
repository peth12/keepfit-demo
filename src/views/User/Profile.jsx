import { React, useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { FaUserAstronaut } from "react-icons/fa";
import "./User.css";
import { useDispatch,useSelector } from "react-redux";
import { currentUser } from "../../function/auth";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userId, setUserId] = useState("");
  const [reload, setReload] =useState(false)

  const navigate = useNavigate()
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user.token) {
      currentUser(user.token)
        .then((res) => {
          setUserId(res.data._id)
          setWeight(res.data.Weight)
          setHeight(res.data.Height)
          setEmail(res.data.UserEmail)
          setImage(res.data.UserImage)
          setFirstName(res.data.Userfname)
          setLastName(res.data.Userlname)
          setUserDate(res.data.UserDateOfBirth)
          setGender(res.data.Gender)

          console.log("data in profile => ", res.data);
  
        })
        .catch((err) => console.error(err));
    }
  },[])
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const idToken = localStorage.token;
  const userEmail = localStorage.userEmail;
  

  const changeDateFormat = (query) => {
    const dateData = new Date(query);
    const date = new Date()
    return {
      date: dateData.getDate(),
      mont: dateData.getMonth(),
      year: dateData.getFullYear(),
      all: dateData.toDateString(),
      birthday: date.getFullYear() - dateData.getFullYear()
    };
  };
  

  const updateUser = async (e) => {

    e.preventDefault();
    await axios
      .put(`https://keepfit-backend.onrender.com/user/update/${userId}`, {
        Userfname: firstName,
        Userlname: lastName,
        UserDateOfBirth: userDate,
        Gender: gender,
        Weight: weight,
        Height: height,
        UserEmail :userEmail,
        UserImage: image,
      })
      .then((res) => {
        console.log(res);
        navigate("/profile");
         toggleEditMode();

        setTimeout(() => {
          toast.success("Update Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 1);
      })
      .catch((err) => console.error(err));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    console.log(`file : ${e.target.files[0]}`);
    previewFile(file)
}
const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result)
    }
}
  return (
    <Layout>
      <Toaster/>
      <div className="xl:container xl:mx-auto">
        <div className="px-4 pt-[75px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl shadow-lg">
              {/* Profile picture card */}
              <div className="bg-white rounded-lg shadow-md p-4 pb-10">
                <div className="text-xl font-black flex">
                  <strong className=" bg-primary rounded-full text-white px-10 p-2 flex gap-x-5">
                    My Profile <FaUserAstronaut />{" "}
                  </strong>
                </div>
                <div className="text-center mt-4">
                  {/* Profile picture image */}
                  <img
                    className="w-48 h-48 mx-auto rounded-full mb-2 border-primary border-4"
                    src={image}
                    alt=""
                  />
                  {/* Profile picture help block */}

                  {isEditMode ? (
                    <div className="text-xs text-gray-500 my-10">
                      JPG or PNG no larger than 5 MB
                    </div>
                  ) : (
                    <div className="text-xl text-black my-10 ">
                      {email}
                    </div>
                  )}

                  {/* Profile picture edit button */}
                  {isEditMode ? (
                    <label className="bg-primary hover:bg-primary-focus duration-150 text-white font-semibold py-2 px-4 rounded cursor-pointer">
                      <input type="file" className="hidden" onChange={handleFileInput} /> Upload new image
                    </label>
                  ) : (
                    <div className="eiei"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-2 mb-10 rounded-xl shadow-lg">
              {/* Account details card */}
              <div className="bg-white rounded-lg shadow-md p-4">
                {/* Form */}
                <form className="mt-4">
                  {/* Form Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Form Group (first name) */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-600 "
                        htmlFor="inputFirstName"
                      >
                        First name
                      </label>

                      {isEditMode ? (
                        <input
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                          id="inputFirstName"
                          type="text"
                          placeholder="Enter your first name"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          
                        />
                      ) : (
                        <p className="px-3 text-lg">{firstName}</p>
                      )}
                    </div>
                    {/* Form Group (last name) */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-600"
                        htmlFor="inputLastName"
                      >
                        Last name
                      </label>

                      {isEditMode ? (
                        <input
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                          id="inputLastName"
                          type="text"
                          placeholder="Enter your last name"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                        />
                      ) : (
                        <p className="px-3 text-lg">{lastName}</p>
                      )}
                    </div>
                  </div>
                  {/* Form Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Form Group (weight) */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-600"
                        htmlFor="inputWeight"
                      >
                        Weight (kg)
                      </label>

                      {isEditMode ? (
                        <input
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                          id="inputWeight"
                          type="number"
                          min="0"
                          placeholder="Enter your weight"
                          onChange={(e) => setWeight(e.target.value)}
                          value={weight}
                        />
                      ) : (
                        <p className="px-3 text-lg">{weight}</p>
                      )}
                    </div>
                    {/* Form Group (height) */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-600"
                        htmlFor="inputHeight"
                      >
                        Height (cm)
                      </label>

                      {isEditMode ? (
                        <input
                          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                          id="inputHeight"
                          type="number"
                          min="0"
                          placeholder="Enter your Height"
                          onChange={(e) => setHeight(e.target.value)}
                          value={height}
                        />
                      ) : (
                        <p className="px-3 text-lg">{height}</p>
                      )}
                    </div>
                  </div>
                  {/* Form Group (email address) */}
                  {/* <div className="mb-4">
                  <label
                    className="block text-sm font-semibold text-gray-600"
                    htmlFor="inputEmailAddress"
                  >
                    Email address
                  </label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div> */}

                  {/* Form Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Form Group (gender) */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-600"
                        htmlFor="inputGender"
                      >
                        Gender
                      </label>

                      {isEditMode ? (
                        <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary" onChange={(e) => setGender(e.target.value)}>
                          <option disabled selected>
                            {gender}
                          </option>
                          <option value={"Female"}>Female</option>
                          <option value={"Male"}>Male</option>
                          <option value={"Not specified"}>Not specified</option>
                        </select>
                      ) : (
                        <p className="px-3 text-lg">{gender}</p>
                      )}
                    </div>
                    {/* Form Group (birthday) */}
                    <div>
                      {isEditMode ? (
                        <div>
                          <label
                            className="block text-sm font-semibold text-gray-600"
                            htmlFor="inputBirthday"
                          >
                            Birthday
                          </label>
                          <input
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                            id="inputBirthday"
                            type="date"
                            name="birthday"
                            onChange={(e) => setUserDate(e.target.value)}
                            placeholder="Enter your birthday"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-semibold text-gray-600">
                            Age
                          </label>
                          <p className="px-3 text-lg">{changeDateFormat(userDate).birthday}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* edit  */}
                  {isEditMode ? (
                    <div className="eiei"></div>
                  ) : (
                    <button
                      className="bg-primary hover:bg-primary-focus duration-150 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                      onClick={toggleEditMode}
                    >
                      Edit my profile
                    </button>
                  )}

                  {/* Save changes button */}

                  {isEditMode ? (
                    <div className="flex gap-6">
                      <button
                        className="btn btn-primary text-white font-semibold py-2 px-4 rounded"
                        onClick={updateUser}
                      >
                        Save changes
                      </button>

                      <button
                        className="btn  bg-slate-500 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={toggleEditMode}>Discard Changes</button>

                    </div>


                  ) : (
                    <button
                      className="btn btn-primary text-white font-semibold py-2 px-4 rounded hidden"
                      onClick={toggleEditMode}
                    >
                      Save changes
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
