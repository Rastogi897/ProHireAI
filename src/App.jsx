import "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Layout from "./components/Layout";
// import NoPage from "./components/NoPage";
import UserProfileForm from "./components/UserProfileForm";
// import HireForm from "./components/HireForm";
// import ListUsers from "./components/ListUsers";
import SignUp from "./components/SignIn/SignUp";
import OptimizeResumeMain from "./components/OptimizeResume/OptimizeResumeMain";

const App = () => {
  console.log(import.meta.env.VITE_TEST);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userForm" element={<UserProfileForm />} />
          <Route path="/OptmizeResume" element={<OptimizeResumeMain />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
