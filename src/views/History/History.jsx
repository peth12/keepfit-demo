import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../components/Layout";
import { TbTrash } from "react-icons/tb";
import { TbPencil } from "react-icons/tb";
import { FaRunning } from "react-icons/fa";
import { TbSwimming } from "react-icons/tb";
import { FaBicycle } from "react-icons/fa6";
import { VscChevronRight } from "react-icons/vsc";
import { VscChevronDown } from "react-icons/vsc";
import { AiFillEdit } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsImages, BsActivity } from "react-icons/bs";
import { BiSwim, BiCycling } from "react-icons/bi";
import { GiBodyBalance } from "react-icons/gi";
import { RiBoxingLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { currentUser } from "../../function/auth";
import { GiBoxingGlove } from "react-icons/gi";
import { useSelector } from "react-redux";

function History() {
  const { user } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [activityType, setActivityType] = useState([]);
  const [userById, setUserById] = useState([]);
  const [reload, setReload] = useState(false);
  const [filterDataType, setFilterDataType] = useState([]);

  useEffect(() => {
    axios
      .post(`https://keepfit-backend.onrender.com/activity`, {
        UserEmail: user.useremail,
      })
      .then((result) => setActivity(result.data))

      .catch((err) => console.log(err));
    axios
      .get(`https://keepfit-backend.onrender.com/activityType`)
      .then((result) => setActivityType(result.data))
      .catch((err) => console.log(err));
  }, [reload]);
  useEffect(() => {
    setFilterDataType(activity);
  }, [activity]);
  useEffect(() => {
    // Fetch data by ID when the 'id' parameter changes
    if (id) {
      axios
        .get(`https://keepfit-backend.onrender.com/activity/${id}`)
        .then((result) => {
          setUserById(result.data);
          // This might not be necessary if you're not using 'reload' for other purposes
        })
        .catch((err) => console.log(err));
    }
    setReload(!reload);
  }, [id]);

  const notify = () => toast.success("delete success");
  const deleteData = async (data) => {
    if (window.confirm(`Are you sure delete`)) {
      await axios
        .delete(`https://keepfit-backend.onrender.com/activity/${data}`)
        .then((res) => {
          console.log(res.data);
          setReload(!reload);
          notify();
        })
        .catch((err) => console.error(err));
    }
  };
  const changeDateFormat = (query) => {
    const dateData = new Date(query);
    return {
      date: dateData.getDate(),
      mont: dateData.getMonth(),
      year: dateData.getFullYear(),
      all: dateData.toDateString(),
    };
  };
  const getIconComponent = (iconKey) => {
    switch (iconKey) {
      case "Yoga":
        return <GiBodyBalance className="fill-primary scale-150 mb-1" />;
      case "Boxing":
        return <GiBoxingGlove className="fill-primary scale-150 mb-1" />;
      case "Cycling":
        return <BiCycling className="fill-primary scale-150 mb-1" />;
      case "Swimming":
        return <BiSwim className="fill-primary scale-150 mb-1" />;
      case "Running":
        return <FaRunning className="fill-primary scale-150 mb-1" />;
      default:
        return <BsActivity className="fill-primary scale-150 mb-1" />;
    }
  };
  const filterType = async (category) => {
    if (category === "All") {
      setFilterDataType(activity), setReload(!reload);
    }
    setFilterDataType(
      activity.filter((item) => {
        return item.ActivityType === category;
      })
    );
  };
  return (
    <Layout>
      <Fade cascade damping={0.1}>
        {/* Choose history type */}
        <div className="xl:container xl:mx-auto  px-5 xl:px-10 ">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="hidden bg-primary text-slate-100  justify-between pt-[75px] rounded-lg  lg:flex scroll-smooth">
            <button
              onClick={() => {
                setFilterDataType(activity), setReload(!reload);
              }}
              className="btn btn-ghost normal-case lg:text-xl"
            >
              All
            </button>
            {activityType.map((item, index) => (
              <button
                key={index}
                onClick={() => filterType(`${item.ActivityTypeName}`)}
                className="btn btn-ghost normal-case lg:text-xl"
              >
                {item.ActivityTypeName}
              </button>
            ))}
          </div>

          <div className="flex justify-end lg:hidden me-5">
            <select
              className="select select-primary max-w-xs mt-24"
              onChange={(e) => filterType(e.target.value)}
            >
              <option value={"All"}>All</option>

              {activityType.map((item, index) => (
                <option key={index} value={item.ActivityTypeName}>
                  {item.ActivityTypeName}
                </option>
              ))}
            </select>
          </div>
          {/* Card */}
          {filterDataType.map((item, index) => (
            <div
              key={index}
              className=" glass mt-5  flex flex-col text-white rounded-lg  p-5 lg:p-5 lg:flex-row justify-between drop-shadow-md   shadow-xl lg:w-full"
            >
              {/* icon */}
              <div className=" m-5  justify-center hidden lg:flex lg:justify-center flex-col border-solid">
                <div className="text-slate-900 text-20 lg:text-4xl   ">
                  {getIconComponent(item.ActivityType)}
                </div>
              </div>

              {/* Card image */}
              <div className="justify-center   flex-col hidden lg:flex h-auto   rounded-lg w-52 ps-5">
                <img
                  src={item.ActivityImage}
                  alt="activityImage"
                  className="h-40   rounded-lg w-full "
                />
              </div>
              {/* Description */}
              <div className="text-slate-700 lg:max-w-72   w-100 lg:ml-2 lg:ps-5 lg:w-52">
                <div className="">
                  <p className="text-sm lg:text-base  text-slate-500 ">
                    Activity Name
                  </p>
                  <p className="text-lg lg:text-2xl font-bold ">
                    {item.ActivityName}
                  </p>

                  <p className="text-sm  lg:text-base mt-3 text-slate-500">
                    Description
                  </p>

                  <p className="text-lg lg:text-2xl font-bold w-auto">
                    {item.ActivityDesc}
                  </p>
                </div>
              </div>
              {/* History Infomation */}
              <div className=" text-slate-700  lg:gap-10 gap-5 flex flex-row  lg:ps-5 mt-2 ">
                <div className="w-30">
                  <div className=" ">
                    <p className="text-sm  lg:text-base text-slate-500">
                      Date{" "}
                    </p>
                    <p className="text-lg font-bold lg:text-2xl ">
                      {changeDateFormat(item.ActivityDate).all}
                    </p>
                  </div>
                </div>

                <div className=" ">
                  <div className=" ">
                    <p className="text-sm  lg:text-base text-slate-500">
                      Duration (Mins)
                    </p>
                    <p className="text-lg font-bold lg:text-2xl">
                      {item.ActivityDuration}
                    </p>
                  </div>
                </div>
              </div>
              {/* Delete and Edit Button */}
              {/* Edit */}
              <div className=" text-2xl ml-5 text-end  lg:justify-end lg:flex items-end ">
                <button className=" text-white">
                  <Link to={`/editHistory/${item._id}`}>
                    <button className="hidden lg:block btn btn-sm bg-primary text-white   me-2 ">
                      <div className="flex gap-2 ">
                        Edit
                        <TbPencil />
                      </div>
                    </button>
                  </Link>
                  <Link to={`/editHistory/${item._id}`}>
                    <div className="lg:hidden text-slate-800 ">
                      <TbPencil />
                    </div>
                  </Link>
                </button>

                {/* Open the modal using document.getElementById('ID').showModal() method */}

                <button>
                  <button
                    onClick={() => deleteData(item._id)}
                    className="hidden lg:block btn btn-sm bg-red-600 text-white  "
                  >
                    <div className="flex gap-2">
                      Delete
                      <TbTrash />
                    </div>
                  </button>

                  <button
                    onClick={() => deleteData(item._id)}
                    className="lg:hidden  text-slate-800"
                  >
                    <TbTrash />
                  </button>
                </button>
                <dialog
                  id="my_modal_1"
                  className="modal text-black text-base text-start"
                >
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-600 text-white">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg text-center text-red ">
                      Delete Activity
                      <p className="text-center text-red-600 flex justify-center text-5xl">
                        <GoAlertFill />
                      </p>
                    </h3>

                    <img src="/trash_ja.png" alt="" />
                    <p className="py-4 text-center  ">
                      Deleting this activity will permanently remove it from
                      your workout record. Are you sure you want to delete this
                      activity?
                    </p>
                    <div className="modal-action flex justify-center">
                      <div className="text-center">
                        <form method="dialog " className="">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn bg-green-500 text-white  w-72 lg:w-32 lg:me-2">
                            Cancel
                          </button>
                          <button className="btn bg-red-600 text-white  w-72 lg:w-32 ">
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </Layout>
  );
}

export default History;
