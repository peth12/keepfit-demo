import React, { useEffect, useState } from "react";
import { LayoutAdmin } from "../../../components/LayoutAdmin";
import SearchBox from "../SearchBox.jsx";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoAlertFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`https://keepfit-backend.onrender.com/user`)
      .then((result) => setUserData(result.data))
      .catch((err) => console.error(err));
  }, [reload]);
  const notify = () => toast.success("delete success");
  const deleteData = async (data) => {
    if (window.confirm(`Are you sure delete`)) {
      await axios
        .delete(`https://keepfit-backend.onrender.com/user/${data}`)
        .then((res) => {
          console.log(res.data);
          navigate("/admin/user");
          setReload(!reload);
          notify();
        })
        .catch((err) => console.error(err));
    }
  };

  const changeDateFormat = (query) => {
    const dateData = new Date(query);
    const date = new Date()
    return {
      date: dateData.getDate(),
      mont: dateData.getMonth(),
      year: dateData.getFullYear(),
      all: dateData.toDateString(),
      birthday: date.getFullYear() - dateData.getFullYear(),
      getAll : `${ dateData.getDate()}-${dateData.getMonth()}-${dateData.getFullYear()}`
    };
  };
  
  return (
    <LayoutAdmin>
        <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[90%] mx-auto">
        {/* Container for h1 and search bar */}
        <div className="pt-36 pb-7 w-full ">
          <h1 className="text-primary text-3xl font-bold flex gap-2 items-center">
            User Management <FaHouseChimneyUser />
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="table border-collapse">
            {/* Table head */}
            <thead className="text-[18px] text-slate-600">
              <tr>
                <th className="w-[3%] border border-r">No.</th>
                <th className="w-1/5 border border-r">Firstname</th>
                <th className="w-1/5 border border-r">Lastname</th>
                <th className="w-1/5 border border-r">Email</th>
                <th className="w-1/5 border border-r">Date Of Birth</th>
                <th className="w-1/5 border border-r">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              {userData.map((item, index) => (
                <tr className="hover" key={index}>
                  <th className="w-[3%] border border-r">{index + 1}</th>
                  <td className="w-1/5 border border-r">{item.Userfname}</td>
                  <td className="w-1/5 border border-r">{item.Userlname}</td>
                  <td className="w-1/5 border border-r">{item.UserEmail}</td>
                  <td className="w-1/5 border border-r">{changeDateFormat(item.UserDateOfBirth).all}</td>
                  <td className="border-r flex gap-2">
                    <Link to={`/admin/user/edit/${item._id}`}>
                      <button className="h-full px-3 text-sm font-medium text-center inline-flex items-center rounded-lg gap-1 bg-blue-500 hover:bg-blue-600 text-white">
                        Edit
                        <BiEditAlt />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteData(item._id)}
                      className="p-1 px-3 rounded-lg items-center gap-1 bg-red-500 hover:bg-red-600 text-white flex"
                    >
                      Delete
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default UserManagement;
