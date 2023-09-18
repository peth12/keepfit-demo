import { Link } from "react-router-dom";
import { NavbarLandingPage } from "../../components/NavbarLogin";
import "./Login.css";

export const Login = () => {
  return (
    <>
      <NavbarLandingPage />
      <div className=" flex h-[100vh]">
        {/* section 1 */}
        <div className="left hidden md:block h-[100%] w-[100%]"></div>
        {/* section 2 */}
        <div className="right h-[100%] bg-white w-[100%]">
          <div className="flex justify-center items-center w-[100%] h-[100%] ">
            <div className="flex-col">

              <h1 className=" text-[80px] text-primary  italic font-bold text-center py-3">
                Login
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email or Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email or Username"
                  className="input input-bordered w-80"
                />
              </div>
              <div className="form-control py-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter password"
                  className="input input-bordered w-80"
                />
              </div>
              <p className="">No account? <Link to={"signup"} className="createAccountSuggest">Create one!</Link></p>
              <button className="btn-primary w-80 rounded-md p-1 text-[24px] font-semibold text-white mt-4">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
