/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HowDoesItwork from "./HowDoesItwork";
import Features from "./Features";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-14 z-50 relative">
      <div className="flex justify-center">
        <h3
          className="text-zinc-950 z-50 mx-auto text-lg font-normal mb-16 px-6 py-2 rounded-3xl shadow-md shadow-zinc-300 bg-gradient-to-b from-zinc-300 to-zinc-200"
          // className=" text-lg font-normal mb-16 px-6 py-2 rounded-3xl shadow-md bg-gradient-to-r from-zinc-500 to-zinc-300 text-white focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
        >
          Powered with Hugging Face AI
        </h3>
      </div>
      <h1 className="z-50 flex justify-center text-9xl font-medium font-display tracking-tight text-slate-900 sm:text-8xl">
        <span className="inline-block pr-4">
          <span className="bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
            Your
          </span>
          <span className="relative whitespace-nowrap text-blue-600 pl-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-20 left-0 h-[0.58em] w-full fill-zinc-400 opacity-40"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <span className="relative bg-gradient-to-b from-blue-700 to-blue-500 bg-clip-text text-transparent">
              AI Hiring
            </span>
          </span>
        </span>
        <span className="inline-block bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
          Partner
        </span>
      </h1>
      <p className="flex justify-center font-normal pt-12 text-xl max-w-2xl text-center mx-auto text-zinc-900">
        We match the right candidates with the right job profiles. <br />
        In less than a minute. Simple and Quick!
      </p>
      <p className="text-center pt-1 text-md font-semibold"></p>

      <div className="z-50 flex flex-col items-center justify-center gap-5 mt-20 mb-12 md:flex-row">
        <div
          className="z-50 font-medium text-lg inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white shadow-lg transition-all rounded-md sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 cursor-pointer hover:shadow-xl hover:shadow-blue-200"
          onClick={() => navigate("/hireForm")}
        >
          Hire Professionals
        </div>

        <div
          className="z-50 font-medium text-lg inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white shadow-lg transition-all bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-md sm:w-auto cursor-pointer hover:shadow-xl hover:shadow-zinc-300"
          onClick={() => navigate("/userForm")}
        >
          Create User Profile
        </div>
      </div>

      {/* <div className="max-w-md mx-auto rounded-md">
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
      </div> */}
      <HowDoesItwork />
      <Features />
    </div>
  );
};

export default Home;
