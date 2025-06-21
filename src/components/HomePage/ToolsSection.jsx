/* eslint-disable react/prop-types */
import {
  ArrowRight,
  FileText,
  LetterText,
  FileCheck2,
  AtSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ToolsSection = () => {
  const TwoColumnFeatureItem = ({
    index,
    icon: Icon,
    title,
    description,
    redirectTo,
  }) => {
    const navigate = useNavigate();
    const handleRedirect = () => {
      navigate(redirectTo);
      console.log(`Redirecting to: ${redirectTo}`);
    };

    return (
      <div
        className="flex flex-col items-start p-5 cursor-pointer transition-all duration-300 relative group
                   bg-white border-1 border-zinc-100 hover:bg-zinc-50 overflow-hidden"
        onClick={handleRedirect}
      >
        <div className="absolute mb-3 flex-shrink-0 opacity-60 group-hover:opacity-0 text-6xl -top-1 left-1 font-medium text-zinc-200 transition-opacity duration-200">
          0{index}
        </div>
        <div className="mb-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <Icon className="text-zinc-300 w-7 h-7 transition-colors duration-300 group-hover:text-blue-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-1 text-left group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-zinc-500 text-left text-base mb-4 group-hover:text-zinc-600">
          {description}
        </p>
        {/* Call to action - arrow appears on hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
          <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-blue-600" />
        </div>
      </div>
    );
  };
  return (
    <div className="mt-12 mb-12 bg-transparent flex flex-col items-center justify-center p-4">
      {/* "How It Works" Section */}
      <section className="w-full max-w-6xl px-4 py-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-normal text-gray-900">
            Our Product Basket
          </h2>
          <div className="text-md text-zinc-500 font-normal mt-2">
            Powered to ease your job application process
          </div>
        </div>
        <div className="grid grid-cols-2 bg-white rounded-xl shadow-lg shadow-zinc-200">
          <TwoColumnFeatureItem
            index="1"
            icon={FileText}
            title="Summarize Resume"
            description="Generate concise techinical summaries of your resume."
            redirectTo="/content-creator"
          />
          <TwoColumnFeatureItem
            index="2"
            icon={LetterText}
            title="Generate Cover Letter"
            description="Generate personalized cover letters based on your resume."
            redirectTo="/workflow-automation"
          />
          <TwoColumnFeatureItem
            index="3"
            icon={AtSign}
            title="Cold Emails"
            description="Get personalized cold emails for job applications based on your profile and tareget company."
            redirectTo="/predictive-insights"
          />
          <TwoColumnFeatureItem
            index="4"
            icon={FileCheck2}
            title="Check Resume Fit"
            description="Get insights on how well your resume fits a job description, and suggestions for improvement."
            redirectTo="/OptmizeResume"
          />
          {/* <TwoColumnFeatureItem
            icon={ArrowRight}
            title="Customer Support AI"
            description="Enhance customer satisfaction."
            redirectTo="/customer-support-ai"
          />
          <TwoColumnFeatureItem
            icon={ArrowRight}
            title="Resource Management"
            description="Allocate resources efficiently."
            redirectTo="/resource-optimization"
          /> */}
        </div>
      </section>
    </div>
  );
};

export default ToolsSection;
