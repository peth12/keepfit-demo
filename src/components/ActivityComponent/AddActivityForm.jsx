import React, { useState, useEffect } from "react";
import { useData } from "./ActivityData";
import { BsImages, BsActivity } from "react-icons/bs";
import { BiSwim, BiCycling } from "react-icons/bi";
import { GiBodyBalance } from "react-icons/gi";
import { RiBoxingLine } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { currentUser } from "../../function/auth";
import { useDispatch, useSelector } from "react-redux";


const AddActivityForm = ({
  toggleFormVisibility,
  defaultType,
  setCheckAddActivity,
}) => {
  const { activityList } = useData();
  const [newActivity, setNewActivity] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityImage, setActivityImage] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [allActivityType, setAllActivityType] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const idToken = localStorage.token;
  const dispatch = useDispatch();
  const selectedActivity = activityList.find(
    (activity) => activity.ActivityTypeName === defaultType
  );

  const getIconComponent = (iconKey) => {
    switch (iconKey) {
      case "Yoga":
        return <GiBodyBalance className="fill-white scale-150 mb-1" />;
      case "Boxing":
        return <RiBoxingLine className="fill-white scale-150 mb-1" />;
      case "Cycling":
        return <BiCycling className="fill-white scale-150 mb-1" />;
      case "Swimming":
        return <BiSwim className="fill-white scale-150 mb-1" />;
      case "Running":
        return <FaRunning className="fill-white scale-150 mb-1" />;
      default:
        return <BsActivity className="fill-white scale-150 mb-1" />;
    }
  };

  const iconComponent = getIconComponent(selectedActivity.ActivityTypeName);

  const [activityData, setActivityData] = useState({
    ActivityName: "",
    ActivityDesc: "",
    ActivityType: selectedActivity.ActivityTypeName,
    ActivityDuration: 0,
    ActivityImage: "",
    ActivityDate: 0,
    UserEmail: "",
    UserId: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
const email = await user.useremail
    try {
      const response = await axios.post(
        "https://keepfit-backend.onrender.com/activity/create",
        {
          ActivityName: activityName,
          ActivityDesc: activityDesc,
          ActivityType: selectedActivity.ActivityTypeName,
          ActivityDuration: activityDuration,
          ActivityImage: previewSource,
          UserId: userId,
          UserEmail: email,
        }
      );
      console.log("Activity created:", response.data);

      setCheckAddActivity("successed");
      toggleFormVisibility();
      toast.success("added activity successfully");
      setActivityData({
        ActivityName: "",
        ActivityDesc: "",
        ActivityType: selectedActivity.ActivityTypeName,
        ActivityDuration: 0,
        ActivityImage: "",
        ActivityDate: 0,
        UserEmail: "",
        UserId: 1,
      });
    } catch (error) {
      console.log({
        ActivityName: activityName,
        ActivityDesc: activityDesc,
        ActivityType: selectedActivity.ActivityTypeName,
        ActivityDuration: activityDuration,
        ActivityImage: previewSource,
        UserId: userId,
        UserEmail: userEmail,
      });
      setCheckAddActivity("failed");
      toast.error("add activity failed");
      console.error("Error creating activity:", error);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(`file : ${e.target.files[0]}`);

    if (file) {
      previewFile(file);
    } else {
      const defaultImage = "default";
      previewFile(defaultImage);
    }
  };

  const previewFile = (file) => {
    if (file === "default") {
      setPreviewSource(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      );
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 gradient-background p-8 rounded-lg shadow-lg w-96 h-fit">
        <span
          className="absolute top-0 right-0 m-2 text-white cursor-pointer p-2"
          onClick={toggleFormVisibility}
          style={{ transform: "scale(2.5)" }}
        >
          &times;
        </span>
        <div className="mb-7 flex justify-start items-center gap-3 ">
          <div className="text-3xl text-white font-bold mb-1 text-center pb-1">
            {selectedActivity.ActivityTypeName}
          </div>
          <div>{iconComponent}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-black">
            <div className="mb-4 ">
              <label className="block text-xl font-bold mb-2 mt-12">
                Activity Name:
              </label>
              <input
                type="text"
                name="ActivityName"
                placeholder=" Morning Jogging, Basic Yoga ..."
                value={activityData.name}
                onChange={(e) => setActivityName(e.target.value)}
                className="input input-bordered  w-80 rounded-sm text-orange-400"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="ActivityType"
                value={selectedActivity.ActivityTypeName}
                className="hidden"
                onChange={(e) => setActivityType(e.target.value)}
              />
              <input
                type="text"
                name="UserEmail"
                value={"sendFrominput@test.com"}
                className="hidden"
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <input
                type="text"
                name="UserId"
                value={999}
                className="hidden"
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block  text-xl font-bold mb-2">
                Description:
              </label>
              <input
                name="ActivityDesc"
                value={activityData.description}
                onChange={(e) => setActivityDesc(e.target.value)}
                placeholder=" Tell about your activity..."
                className="input input-bordered  w-80 rounded-sm text-orange-400"
                required
              ></input>
            </div>

            <div className="mb-4">
              <label className="block  text-xl font-bold mb-2">
                Duration (minutes):
              </label>
              <input
                type="number"
                name="ActivityDuration"
                min={0}
                placeholder="only number here"
                value={activityData.duration}
                onChange={(e) => setActivityDuration(e.target.value)}
                className="input input-bordered  w-80 rounded-sm text-orange-400"
                required
              />
            </div>
            <div className="flex justify-center items-center gap-4 ">
              <div className="">
                <label className="block  text-xl font-bold">Date:</label>
                <input
                  type="date"
                  name="ActivityDate"
                  placeholder="mm/dd/yyyy"
                  value={activityData.date}
                  onChange={(e) => setActivityDate(e.target.value)}
                  className="input input-bordered  w-80  h-10 text-orange-400"
                  required
                />
              </div>
            </div>
            <div className="">
              <img src={activityData.ActivityImage} alt="" />
            </div>
            <div className="flex justify-center items-center gap-4 hover:cursor-pointer hover:scale-[102%] hover:duration-300 mt-10">
              <label className="flex bg-[#08A045] hover:bg-[#21D375] hover:cursor-pointer  w-80 gap-3 text-white font-semibold py-2 px-4 rounded items-center ">
                <input
                  type="file"
                  name="ActivityImage"
                  onChange={handleFileInput}
                  className="file-input file-input-bordered file-input-info h-10 w-80 hover:cursor-pointer hidden"
                ></input>
                <BsImages /> Upload image{" "}
                <div className=" text-xs">(optional)</div>
              </label>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="btn bg-orange-400 text-white w-80 hover:bg-orange-300 hover:scale-[102%] hover:duration-300"
            >
              Add Activity
            </button>
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityForm;
