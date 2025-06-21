// import React from "react";
import { Send } from "lucide-react";

const Feedback = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <section className="w-full max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 p-8 bg-white rounded-xl shadow-lg shadow-zinc-200 border border-gray-100">
          {/* Left Side: Heading */}
          <div className="flex-shrink-0 text-left md:text-left md:w-1/3">
            <h2 className="text-4xl font-normal text-gray-900">
              We value your{" "}
              <span className="text-4xl font-medium text-blue-500">
                Feedback!
              </span>
            </h2>
            <div className="text-base text-zinc-500 font-normal mt-2">
              Thinking of ways to improve our product?
            </div>
          </div>

          {/* Right Side: Feedback Input and Button */}
          <div className="flex-grow flex flex-col items-end gap-4 w-full md:w-2/3 h-full">
            {" "}
            {/* Added h-full here */}
            <textarea
              className="flex-grow w-full bg-zinc-100 h-full resize-none p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 min-h-[120px]" // Added h-full and min-h
              placeholder="We would love to hear your thoughts here..."
              //   value={feedback}
              //   onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              className="flex z-50 font-light text-base w-auto justify-center items-center text-center min-w-[170px] px-4 py-1 text-white transition-all rounded-lg sm:w-auto bg-gradient-to-r from-zinc-800 to-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-zinc-300 shadow-md shadow-zinc-300"

              //   onClick={handleSendFeedback}
            >
              <Send className="w-4 h-4 mr-2" /> Share to us!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
