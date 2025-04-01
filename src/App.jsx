import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import UserProfileForm from "./components/UserProfileForm";
import HireForm from "./components/HireForm";
import ListUsers from "./components/ListUsers";
import Test from "./components/Test";

const App = () => {
  console.log(import.meta.env.VITE_TEST);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userForm" element={<UserProfileForm />} />
          <Route path="/hireForm" element={<HireForm />} />
          <Route path="/listCandidates" element={<ListUsers />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
