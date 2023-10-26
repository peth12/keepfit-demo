import { AiOutlineMenu } from "react-icons/ai";
import { FaMedal  } from "react-icons/fa";
import { FaChartPie, FaDumbbell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { currentUser } from "../function/auth";


export const Navbar = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch()
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  }
  useEffect(() => {
    if (user.token) {
      currentUser(user.token)
        .then((res) => {


          setImage(res.data.UserImage)
          console.log("data in Dashboard => ", res.data);
  
        })
        .catch((err) => console.error(err));
    }
  },[])

  const [image, setImage] = useState(user)

  
  return (
    <nav className="flex justify-center ">
      <div
        style={{ "box-shadow": "0px 4px 50px rgba(255, 137.70, 0, 0.30)" }}
        className="navbar justify-between lg:px-10 px-3 z-10 bg-white fixed"
      >
        <div className="dropdown dropdown-bottom  flex lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <AiOutlineMenu size={35} className="  " />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li >
              <Link to={"/dashboard"}>
                <a className="text-lg">Dashboard</a>
                
              </Link>
            </li>
            <li>
              <Link to={"/activity"}>
                <a className="text-lg">Work Out</a>

              </Link>
            </li>
            <li>
              <Link to={"/history"}>
                <a className="text-lg">MyActivity</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h1 className="text-[30px] font-bold italic">
            Keep<span className="text-primary">Fit</span>
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl font-bold text-[#252525]">
            <li >
              <Link to={"/dashboard"}>
                <a href="">Dashboard</a>
                <FaChartPie/>
              </Link>
            </li>
            <li className="px-20">
              <Link to={"/activity"}>
                <a>Workout</a>
                {/* <FaDumbbell/> */}
                <FaDumbbell />
                
              </Link>
            </li>
            <li>
              <Link to={"/history"}>
                <a>My Activity</a>
                <FaMedal />
              </Link>
            </li>
          </ul>
        </div>

        <div className="">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={image}/>
                </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"}>
                  <a className="justify-between">Profile</a>
                </Link>
              </li>
              <li className="text-red-600">
                <Link onClick={logout} >
                  <a>Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
