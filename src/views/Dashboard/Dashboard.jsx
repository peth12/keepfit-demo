import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import "./dashboard.css";
import { UserCard, DurationStackCard } from "../../components";
import DurationChart from "../../components/DashboardComponent/DurationChart";
import ActivityChartHorizon from "../../components/DashboardComponent/ActivityChartHorizon";
import DashboardData from "../../components/DashboardComponent/DashboardData";
import toast, { Toaster } from "react-hot-toast";
import AnotherBarChart from '../../components/DashboardComponent/AnotherBarChart'
import { useSelector } from "react-redux";
import { currentUser } from "../../function/auth";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [userName, setUserName] =useState('')
  const [userHeight, setUserHeight] =useState('')
  const [userWeight, setUserWeight] =useState('')
  const [userimage, setUserImage] =useState('')

  useEffect(() => {
    if (user.token) {
      currentUser(user.token)
        .then((res) => {
          setUserWeight(res.data.Weight)
          setUserHeight(res.data.Height)
          setUserName(res.data.UserEmail)
          setUserImage(res.data.UserImage)
          console.log("data in Dashboard => ", res.data);
  
        })
        .catch((err) => console.error(err));
    }
  },[])

  
  return (
    <Layout>
    <Toaster />
    <DashboardData>

      <div className="xl:container xl:mx-auto pt-[150px] ">
        <div className="mx-auto px-5 space-y-20 xl:space-y-20">
          <div className="flex flex-col xl:flex-row gap-5 justify-center ">
            <div className="shadow-xl rounded-xl p-10  gradient-background-user h-auto w-full ">
              <UserCard userName={userName} userHeight={userHeight} userWeight={userWeight} userimage={userimage} />

            </div>
            <div className="shadow-xl rounded-xl  bg-orange-400 h-auto w-full">
              <DurationStackCard />
            </div>
            {/* <div className="shadow-xl rounded-xl  bg-orange-400 h-auto w-full">
              <LastestActivity/>
            </div> */}
          </div>
          <div className="flex flex-col xl:flex-row gap-5 w-full">
            <div className="shadow-xl  rounded-xl  w-full xl:w-4/6 font-bold text-2xl h-auto bg-white">
              <div className="hidden xl:flex flex-col ">
                <div className="py-10 pl-4 border-b-4">Activity Count Overview</div>
                <div className="pt-16 w-full">
                  {/* <ActivityChart /> */}
                  <AnotherBarChart/>
                </div>
              </div>
              <div className="block xl:hidden py-10">
              <div className="py-10 pl-4 border-b-4">Activity Count Overview</div>
                <ActivityChartHorizon />
              </div>
            </div>
            <div className=" shadow-xl  rounded-xl  w-full xl:w-2/6 font-bold  text-2xl bg-white">
              <div className="py-10 pl-4 border-b-4">Duration Summary Overview</div>
              <div className="p-10">
                <DurationChart className="" />
              </div>
            </div>
          </div>
          <div className="col-span-12 row-span-1 place-items-center "></div>
        </div>
      </div>
    </DashboardData>
  </Layout>
  );
};

export default Dashboard;
