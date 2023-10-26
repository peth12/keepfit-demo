import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";


const DashboardDataContext = createContext();

const DashboardData = ({children}) => {
  const [activityData, setActivityData] = useState([]);
  const [running, setRunning] = useState([]);
  const [swimming, setSwimming] = useState([]);
  const [boxing, setBoxing] = useState([]);
  const [yoga, setYoga] = useState([]);
  const [cycling, setCycling] = useState([]);
  const [duration, setDuration] = useState({
    running: 0,
    swimming: 0,
    boxing: 0,
    yoga: 0,
    cycling: 0,
  });
  const userEmail = localStorage.userEmail

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post("https://keepfit-backend.onrender.com/activity",{
          UserEmail :userEmail
        });
        const data = response.data;
        setActivityData(data);

        const runningActivities = data.filter((activity) => activity.ActivityType === "Running");
        const swimmingActivities = data.filter((activity) => activity.ActivityType === "Swimming");
        const boxingActivities = data.filter((activity) => activity.ActivityType === "Boxing");
        const yogaActivities = data.filter((activity) => activity.ActivityType === "Yoga");
        const cyclingActivities = data.filter((activity) => activity.ActivityType === "Cycling");

        setRunning(runningActivities);
        setSwimming(swimmingActivities);
        setBoxing(boxingActivities);
        setYoga(yogaActivities);
        setCycling(cyclingActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setDuration((prevDuration) => ({
      ...prevDuration,
      running: calculateTotalDuration(running),
      swimming: calculateTotalDuration(swimming),
      boxing: calculateTotalDuration(boxing),
      yoga: calculateTotalDuration(yoga),
      cycling: calculateTotalDuration(cycling),
    }));
  }, [running, swimming, boxing, yoga, cycling]);

  const calculateTotalDuration = (activities) => {
    return activities.reduce((total, activity) => total + activity.ActivityDuration, 0);
  };

  const countUniqueUsers = (activities) => {
    const uniqueUsers = new Set(activities.map((activity) => activity.UserId));
    return uniqueUsers.size;
  };

  return (
    <>
      <DashboardDataContext.Provider value={{ duration, running, swimming, boxing, cycling, yoga  }}>
        {children}
      </DashboardDataContext.Provider>
    </>
  );
};

export function useData() {
    return useContext(DashboardDataContext);
  }

export default DashboardData;
