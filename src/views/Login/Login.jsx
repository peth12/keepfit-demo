import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// redux
import { useDispatch } from "react-redux";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const roleBaseRedirect = (role) => {
    if(role == "admin") {
      navigate('/admin/activity')
    }else{
      navigate('/dashboard')
    }
  }

  const handleLogin = () => {
    if (userEmail == "" && userPassword == "") {
      toast.error("Please check your input data");
      return;
    }
    axios
      .post(`https://keepfit-backend.onrender.com/auth/login`, {
        UserEmail: userEmail,
        UserPassword: userPassword,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.message == "login success") {
          console.log("eiei");
          navigate("/dashboard");
          dispatch({ type: "LOGIN", payload: {
            token:result.data.token,
            useremail: result.data.payload.user.UserEmail,
            role: result.data.payload.user.UserRole,
        } });
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('userEmail', result.data.payload.user.UserEmail)

        roleBaseRedirect(result.data.payload.user.UserRole)
          setTimeout(() => {
            toast.success("Login Success 🎉", {
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
        }
      })
      .catch((err) => {
        
        console.error(err)
        toast.error("Wrong email or password ❌", {
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      
      }
      );
  };

  return (
    <>
      {/* <NavbarLandingPage /> */}
      <div className=" flex h-[100vh]">
        <Toaster />
        {/* section 1 */}
        <div className="left hidden md:block h-[100%] w-[100%] "></div>
        {/* section 2 */}
        <div className="right h-[100%] w-[100%] ">
          <div className="flex justify-center items-center max-w-[100%] h-[100%]">
            <div className="  flex-col flex items-center px-10 pb-14 rounded-xl bg-white drop-shadow-xl pt-2 ">
              <h1 className=" text-[80px] text-primary  italic font-bold text-center py-3">
                Login
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="input input-bordered w-80"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className="form-control py-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered w-80"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              <p className="text-end py-2">
                No account?{" "}
                <Link to={"/signUp"} className="createAccountSuggest">
                  Create one!
                </Link>
              </p>

              <button
                className="btn-primary w-80 rounded-md p-1 text-[24px] font-semibold text-white mt-4"
                onClick={handleLogin}
              >
                Login
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login