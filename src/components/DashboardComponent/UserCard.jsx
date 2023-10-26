function UserCard(props) {
  const {userName, userHeight, userWeight, userimage} = props
  return (
    <div className="flex-col ">
      <div className="">
        <div className="avatar col-span-2 row-span-2 grid place-items-center ">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
            <img src={userimage}
            alt="User Avatar"
            className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center text-black mt-4">

          <p className="">{userName}</p>
          <div className="w-full flex justify-around pt-10 gap-5">
            <p className="">{userHeight}</p>
            <p className="">{userWeight}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
