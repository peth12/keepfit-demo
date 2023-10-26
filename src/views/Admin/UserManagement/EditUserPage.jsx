import { React, useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { LayoutAdmin } from "../../../components/LayoutAdmin";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditUserPage = () => {
  const { id } = useParams();
  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [wieght, setWieght] = useState("");
  const [hieght, setHeight] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  const [userPassword, setuserPassword] = useState(""); 
  const [userRole, setUserRole] = useState(""); 
  const [previewSource, setPreviewSource] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}user/${id}`)
      .then((result) => {
        setUserfname(result.data.Userfname);
        setUserlname(result.data.Userlname);
        setUserDateOfBirth(result.data.UserDateOfBirth);
        setGender(result.data.Gender);
        setWieght(result.data.Wieght);
        setHeight(result.data.Hieght);
        setUserEmail(result.data.UserEmail);
        setUserImage(result.data.UserImage);
        setuserPassword(result.data.UserPassword);
        setUserRole(result.data.UserRole);
      })
      .catch((err) => console.error(err));
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(`${import.meta.env.VITE_API_URL}user/update/${id}`, {
        Userfname: userfname,
        Userlname: userlname,
        UserDateOfBirth: userDateOfBirth,
        Gender: gender,
        Wieght: wieght,
        Hieght: hieght,
        UserEmail :userEmail,
        UserPassword :userPassword,
        UserImage: userImage,
        UserRole: userRole,
      })
      .then((res) => {
        console.log(res);
        navigate("/admin/user");
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
      setUserImage(reader.result)
    }
}
  return (
    <LayoutAdmin>
      <div className="xl:container xl:mx-auto">
        <div className="px-4 pt-[75px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl shadow-lg">
              {/* Profile picture card */}
              <div className="bg-white rounded-lg shadow-md p-4 pb-10">
                <div className="text-xl font-black flex">
                  <strong className=" bg-primary rounded-full text-white px-10 p-2 flex gap-x-5">
                    Edit User <FaUserAstronaut />{" "}
                  </strong>
                </div>
                <div className="text-center mt-4">
                  {/* Profile picture image */}
                  <img
                    className="w-48 h-48 mx-auto rounded-full mb-2 border-primary border-4 object-cover"
                    src={previewSource ? previewSource : userImage}
                    alt=""
                  />
                  {/* Profile picture help block */}

                  <div className="text-xl text-black my-10 ">{userEmail}</div>

                  {/* Profile picture edit button */}

                  <label className="bg-primary hover:bg-primary-focus duration-150 text-white font-semibold py-2 px-4 rounded cursor-pointer">
                    <input type="file" className="hidden" onChange={handleFileInput}/> Upload new image
                  </label>
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
                        Firstname
                      </label>

                      <input
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                        id="inputFirstName"
                        type="text"
                        value={userfname}
                        placeholder="Enter your first name"
                        onChange={(e) => setUserfname(e.target.value)}
                      />
                    </div>
                    {/* Form Group (last name) */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-600"
                        htmlFor="inputLastName"
                      >
                        Lastname
                      </label>

                      <input
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                        type="text"
                        value={userlname}
                        placeholder="Enter your last name"
                        onChange={(e) => setUserlname(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Form Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600">
                        Gender
                      </label>

                      <select
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option>{gender}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <button
                      className="btn btn-primary text-white  font-semibold py-2 px-4 rounded"
                      onClick={updateUser}
                    >
                      Save changes
                    </button>
                    <Link to={"/admin/user"}>
                      <button className="btn  bg-slate-500 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded">
                        Discard Changes
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default EditUserPage;
