/* eslint-disable react/prop-types */
// import React from 'react';
import { Lightbulb, FileInput, BarChart2 } from "lucide-react"; // Importing relevant Lucide icons

const HowDoesItwork = () => {
  const HowItWorksStep = ({ icon: Icon, stepNumber, title, description }) => (
    <div className="relative flex flex-col items-center text-center p-6 pt-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Step Number */}
      <div className="absolute text-7xl font-bold -top-4 left-4 z-0 select-none p-2 rounded-lg bg-zinc-100 shadow-md shadow-zinc-300">
        <Icon className="text-blue-500 w-9 h-9" />
      </div>
      {/* Icon */}
      {/* <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <Icon className="text-blue-500 w-6 h-6" />
      </div> */}
      {/* Title */}
      <h3 className="text-xl font-normal text-zinc-800 mb-2">{title}</h3>
      {/* Description */}
      <p className="text-zinc-500 text-md mt-4">{description}</p>
    </div>
  );

  return (
    <div className="mt-12 mb-12 bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* "How It Works" Section */}
      <section className="w-full max-w-6xl px-4 py-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-normal text-gray-900">
            How does it work?
          </h2>
          <div className="text-lg text-zinc-500 font-normal mt-2">
            Let&apos;s understand how we make things simpler for you
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {/* Connector lines (hidden on small screens) */}
          <div className="hidden lg:block absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-16 pointer-events-none">
            <div className="w-full h-0.5 bg-gradient-to-r from-zinc-200 to-zinc-200 absolute left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>

          {/* Step 1 */}
          <HowItWorksStep
            icon={Lightbulb}
            stepNumber={1}
            title="Ideate Your Need"
            description="Select the right tool from the basket based on your requirement and get started with ease."
          />

          {/* Step 2 */}
          <HowItWorksStep
            icon={FileInput}
            stepNumber={2}
            title="Upload Resume"
            description="Upload your resume / Summary and let our AI tool do the heavy lifting for you."
          />

          {/* Step 3 */}
          <HowItWorksStep
            icon={BarChart2}
            stepNumber={3}
            title="Analyze & Optimize"
            description="Evaluate your required results to be used in your job applications, interviews, & more."
          />

          {/* Step 4 */}
          {/* <HowItWorksStep
            icon={CheckCircle}
            stepNumber={4}
            title="Launch & Succeed"
            description="Deploy your project confidently and achieve your objectives with robust support."
          /> */}
        </div>
      </section>
    </div>
  );
};

export default HowDoesItwork;
