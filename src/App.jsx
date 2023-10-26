import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { currentUser } from "./function/auth";
import { useDispatch } from "react-redux";
import {
  Activity,
  ActivityManagement,
  Dashboard,
  EditHistory,
  History,
  LandingPage,
  Login,
  Profile,
  SignUp,
  UserManagement,
  WorkoutManagement,
  EditActivityPage,
  EditUserPage,
  EditWorkoutPage,
} from "./views";

import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
function App() {


  const idToken = localStorage.token;
  const dispatch = useDispatch();
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        console.log("data in App => ", res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            useremail: res.data.UserEmail,
            role: res.data.UserRole,
          },
        });
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route path="/activity" element={<UserRoute><Activity /></UserRoute>} />
        <Route path="/history" element={<UserRoute><History /></UserRoute>} />
        <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
        <Route path="/editHistory/:id" element={<UserRoute><EditHistory /></UserRoute>} />
        <Route path="/admin/activity" element={<AdminRoute><ActivityManagement /></AdminRoute>} />
        <Route path="/admin/activity/edit/:id" element={<AdminRoute><EditActivityPage /></AdminRoute>} />
        <Route path="/admin/workout" element={<AdminRoute><WorkoutManagement /></AdminRoute>} />
        <Route path="/admin/workout/edit/:id" element={<AdminRoute><EditWorkoutPage /></AdminRoute>} />
        <Route path="/admin/user" element={<AdminRoute><UserManagement /></AdminRoute>} />
        <Route path="/admin/user/edit/:id" element={<AdminRoute><EditUserPage /></AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;
