import React, { useState, useEffect } from "react";
import { LayoutAdmin } from "../../../components/LayoutAdmin.jsx";
import { LiaEvernote } from "react-icons/lia";
import DeleteActivity from "./DeleteActivity.jsx";
import SearchBox from "../SearchBox.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

const ActivityManagement = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [userById, setUserById] = useState([]);
  const [activityTypeById, setactivityTypeById] = useState([]);
  const [filterDataUser, setFilterDataUser] = useState([]);

  const [userSelect, setUserSelect] = useState([]);

  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://keepfit-backend.onrender.com/activity`)
      .then((result) => setUser(result.data))
      .catch((err) => console.log(err));
    axios
      .get(`https://keepfit-backend.onrender.com/user`)
      .then((result) => setUserSelect(result.data))
      .catch((err) => console.log(err));
  }, [reload]);

  useEffect(() => {
    setFilterDataUser(user);
  }, [user]);

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

      axios
        .get(`https://keepfit-backend.onrender.com/activityType`)
        .then((result) => {
          setactivityTypeById(result.data);
          setReload(!reload);
          // This might not be necessary if you're not using 'reload' for other purposes
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  const notify = () => toast.success("delete success");

  const deleteData = async (data) => {
    if (window.confirm(`Are you sure delete`)) {
      await axios
        .delete(`https://keepfit-backend.onrender.com/activity/${data}`)
        .then((res) => {
          console.log(res.data);
          navigate("/admin/activity");
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
  const filterUser = (UserEmail) => {
    if (UserEmail === "All") {
      setFilterDataUser(user), setReload(!reload);
      return;
    }
    console.log(UserEmail);
    setFilterDataUser(
      user.filter((item) => (item.UserEmail == UserEmail))
    );
  };
  return (
    <>
      <LayoutAdmin>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="w-[90%] mx-auto">
          {/* Container for h1 and search bar */}
          <div className="pt-36 pb-7 w-full ">
            <h1 className="text-primary text-3xl font-bold flex gap-2 items-center">
              Acitivity Management <LiaEvernote />
            </h1>
          </div>
          <div className="flex justify-end pb-6">
            <select
              className="select select-primary max-w-xs"
              onChange={(e) => filterUser(e.target.value)}
            >
              <option value={"All"}>All</option>

              {userSelect.map((item, index) => {
                
                return (
                  <option key={index} value={item.UserEmail}>
                    {item.UserEmail}
                  </option>
                );
              })}
            </select>

            {/* <SearchBox /> */}
          </div>

          <div className="overflow-x-auto">
            <table className="table border-collapse">
              {/* Table head */}
              <thead className="text-[18px] text-slate-600">
                <tr>
                  <th className="w-1/5 border border-r ">Activity Owner</th>
                  <th className="w-1/5 border border-r">Activity name</th>
                  <th className="w-1/5 border border-r">Description</th>
                  <th className="w-1/5 border border-r">Duration</th>
                  <th className="w-1/5 border border-r">Workout </th>
                  <th className="w-1/12  border border-r">Created Date</th>
                  <th className="w-1/5 border border-r">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                {filterDataUser.map((item, index) => {
                  return (
                    <tr className="hover border " key={index}>
                      <td className="w-1/5 border border-r">
                        {item.UserEmail}
                      </td>
                      <td className="w-1/5 border border-r">
                        {item.ActivityName}
                      </td>
                      <td className="w-1/5 border border-r">
                        {item.ActivityDesc}
                      </td>
                      <td className="w-1/5 border border-r">
                        {item.ActivityDuration}
                      </td>
                      <td className="w-1/12 border border-r">
                        {item.ActivityType}
                      </td>
                      <td className="w-1/5 border border-r">
                        {changeDateFormat(item.ActivityDate).all}
                      </td>
                      <td className="flex gap-1">
                        <Link to={`/admin/activity/edit/${item._id}`}>
                          <button
                            className="px-3 text-sm font-medium text-center inline-flex items-center rounded-lg gap-1 bg-blue-500 hover:bg-blue-600 text-white h-full"
                            onClick={() =>
                              document.getElementById("my_modal_4").showModal()
                            }
                          >
                            Edit
                            <BiEditAlt />
                          </button>
                        </Link>
                        {/* <EditActivity
                          userById={userById}
                          activityTypeById={activityTypeById}
                        /> */}

                        <Link onClick={() => deleteData(item._id)}>
                          <button>
                            <button className="p-1 px-3 rounded-lg items-center gap-1 bg-red-500 hover:bg-red-600 text-white flex">
                              Delete
                              <RiDeleteBin6Line />
                            </button>
                            <div className="lg:hidden text-black "></div>
                          </button>
                        </Link>
                        <DeleteActivity />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default ActivityManagement;
