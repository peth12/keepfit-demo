import React from "react";
import { Layout } from "../../components/Layout";
import "./Dashboard.css";
import {
  UserCard,
  DurationStackCard,
  NewChart,
  ColumnChart,
} from "../../components";
import ActivityChart from "../../components/DashboardComponent/ActivityChart";
import DurationChart from "../../components/DashboardComponent/DurationChart";

export const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-center mt-40">
        <div className="flex-col  space-y-12">
          <div className="flex gap-5  justify-center">
            <div className="shadow-xl rounded-xl p-10  gradient-background-user w-1/3">
              <UserCard />
            </div>
            <div className="shadow-xl rounded-xl p-10 bg-orange-400 w-2/3">
              <DurationStackCard />
            </div>
          </div>
          <div className="flex gap-5 justify-center items-top">
            <div className="flex-col items-center shadow-xl overflow-hidden rounded-xl p-10 w-2/3 font-bold">
              <div className="mb-5">Duration Summary Overview</div>
              <div className="">
                <ActivityChart className="" />
              </div>
            </div>
            <div className=" shadow-xl overflow-hidden rounded-xl p-10 w-1/3 font-bold">
              <div className="mb-5">Activity Count Overview</div>
              <div>
                <DurationChart className=" scale-150" />
              </div>
            </div>
          </div>
          <div className="col-span-12 row-span-1 place-items-center my-auto">
            <button
              className="btn btn-primary w-fit h-[50px] text-white text-lg rounded-full scale-150 mr-20 mb-20"
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
              add activity +
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
