import React, {useState} from "react";
import { Layout } from "../../components/Layout";
import {
  ActivityCard,
  ActivityData,
  ActivitySlide,
  AddActivityButton,
} from "../../components";
import "./activity.css";
import TempoShow from "../../components/ActivityComponent/TempoShow";
import AddActivityForm from "../../components/ActivityComponent/AddActivityForm";

const Activity = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <Layout>
      <ActivityData>
        {/* <AddActivityButton /> */}
        <div className="xl:container xl:mx-auto pt-[75px]">
          {/* <ActivitySlide /> */}
          <ActivityCard toggleFormVisibility={toggleFormVisibility} />
          {isFormVisible && (
        <AddActivityForm toggleFormVisibility={toggleFormVisibility} />
      )}
        </div>
        <div>
          {/* <TempoShow /> */}
        </div>
      </ActivityData>
    </Layout>
  );
};

export default Activity;
