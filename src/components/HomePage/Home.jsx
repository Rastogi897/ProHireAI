/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HowDoesItwork from "./HowDoesItwork";
import Features from "./Features";
import ToolsSection from "./ToolsSection";
import Feedback from "./Feedback";
import { Zap, Brain, Gauge, Archive } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  console.log("Testing change in Home component");

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position on mount
  }, []);

  return (
    <div className="pt-14 relative">
      <div className="flex justify-center">
        <h3 className="flex items-center text-zinc-950 mx-auto text-md font-normal mb-12 px-8 py-1.5 rounded-xl shadow-md bg-white">
          <Zap className="text-orange-600 inline-block w-4 h-4 ml-2 mr-2" />{" "}
          {/* Added ml-1 and mr-1 for spacing */}
          Powered with Google Gemini
        </h3>
      </div>
      <h4 className="z-50 flex justify-center text-7xl font-normal font-display tracking-tight text-slate-900">
        <div className="bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
          Stand-out in Job Application
        </div>
      </h4>
      <h4 className="z-50 pt-4 flex justify-center text-6xl font-normal font-display tracking-tight text-slate-900">
        <span className="inline-block bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
          with
        </span>
        <span className="relative whitespace-nowrap text-blue-600 pl-4">
          {/* <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-12 left-0 h-[0.58em] w-full fill-zinc-400 opacity-40"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
          </svg> */}
          <span className="relative bg-gradient-to-b font-normal from-blue-700 to-blue-500 bg-clip-text text-transparent">
            AI Assistance
          </span>
        </span>
      </h4>

      {/* <p className="flex justify-center font-normal mt-8 text-lg max-w-lg text-center mx-auto text-zinc-500">
        Provides the basket of tools which helps making your job application
        stand out from the crowd.
      </p> */}
      <p className="text-center pt-1 text-md font-semibold"></p>

      <div className="z-50 flex items-center justify-center gap-5 mt-20 mb-8 flex-row w-full">
        <div
          className="flex items-center p-3 rounded-xl shadow-md shadow-zinc-200 bg-white"
          style={{ maxWidth: "fit-content" }}
        >
          <div className="p-2 mr-4 bg-blue-50 rounded-lg flex-shrink-0">
            <Brain className="text-blue-500 w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-gray-800 text-md font-medium leading-tight">
              AI Powered
            </span>
            <span className="text-gray-600 text-sm leading-tight">
              Automates your process
            </span>
          </div>
        </div>
        <div
          className="flex items-center p-3 rounded-xl shadow-md shadow-zinc-200 bg-white"
          style={{ maxWidth: "fit-content" }}
        >
          <div className="p-2 mr-4 bg-blue-50 rounded-lg flex-shrink-0">
            <Gauge className="text-blue-500 w-6 h-6 " />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-gray-800 text-md font-medium leading-tight">
              Fast & Easy
            </span>
            <span className="text-gray-600 text-sm leading-tight">
              Get started in minutes
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        {/* <button
          className="flex font-light text-base w-auto justify-center items-center text-center min-w-[200px] px-4 py-2 text-white transition-all rounded-lg sm:w-auto bg-gradient-to-r from-zinc-800 to-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-zinc-300 shadow-md shadow-zinc-300"
          onClick={() => navigate("/hireForm")}
        >
          <Archive className="text-white w-4 h-4 mr-3" />
          View Product Basket
        </button> */}
        <button className="group relative flex font-light text-base w-auto justify-center items-center text-center min-w-[200px] px-4 py-2 text-white transition-all rounded-lg sm:w-auto bg-gradient-to-r from-zinc-800 to-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-zinc-300 shadow-md shadow-zinc-300">
          <span className="relative z-10 flex items-center">
            <Archive className="text-white w-4 h-4 mr-3" />
            View Product Basket
          </span>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
          </span>
        </button>
      </div>
      <ToolsSection />
      <HowDoesItwork />
      <Feedback />
    </div>
  );
};

export default Home;
