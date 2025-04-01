import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [redirect, setRedirect] = useState("apply");
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (redirect === "apply") {
      navigate("/userForm");
    } else if (redirect === "hire") {
      navigate("/hireForm");
    }
  };

  return (
    <div className="pt-20">
      <h2 className="flex justify-center text-6xl font-semibold">
        Your
        <span className="blue px-4">AI</span> Hiring Partner
      </h2>
      <p className="flex justify-center pt-6 text-lg">
        Apply & Hire for job profiles around the world, with AI powered search
      </p>
      <p className="text-center pt-1 text-md font-semibold"></p>

      <div className="bg-zinc-800 max-w-md mx-auto rounded-md">
        <div className="flex justify-center mt-20 pt-8">
          <select
            onChange={(e) => setRedirect(e.target.value)}
            defaultValue="apply"
            className="bg-zinc-950 text-gray-100 rounded-md py-2 px-6 focus:outline-none"
          >
            <option value="apply">Apply for Job</option>
            <option value="hire">Hire Professionals</option>
            <option value="admin">Site Admin</option>
          </select>
          <button
            className="ml-4 bg-blue-600 text-gray-100 rounded-md py-2 px-6 hover:bg-blue-700"
            onClick={handleRedirect}
          >
            Get Started
          </button>
        </div>
        <div className="text-center text-sm mt-4 pb-8">
          {redirect === "apply" &&
            "Post your skills, and let the world reach out to you!"}
          {redirect === "hire" &&
            "Find the perfect match for your job profile with AI"}
          {redirect === "admin" &&
            "Check all the posted user profiles. Access Required"}
        </div>
      </div>
    </div>
  );
};

export default Home;
