/* eslint-disable react/prop-types */
import { Loader2, CheckCircle, X } from "lucide-react";

const MatchCircle = ({ percentage }) => {
  const radius = 40; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference for stroke-dasharray

  // Calculate the offset for the stroke to represent the percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on percentage for visual feedback
  let circleColorClass = "text-red-500"; // Default for low
  if (percentage >= 70) {
    circleColorClass = "text-green-500"; // Good match
  } else if (percentage >= 50) {
    circleColorClass = "text-yellow-500"; // Moderate match
  } else {
    circleColorClass = "text-red-500"; // Low match
  }

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Background circle (grey) */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          className="text-zinc-200" // Grey background for the circle
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        {/* Progress circle */}
        <circle
          // Apply color and animation for the progress bar
          className={`${circleColorClass} transition-all duration-700 ease-out`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // Rounded ends for the stroke
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
      </svg>
      {/* Percentage text in the center */}
      <span className="absolute text-xl font-bold text-zinc-800">
        {percentage}%
      </span>
    </div>
  );
};

const AnalysisModal = ({ analysisResult, isLoading, onClose, error }) => {
  if (!analysisResult && !isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-[80vw] h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 pl-6 border-b border-gray-200">
          <h2 className="flex justify-center items-center text-xl font-semibold bg-gradient-to-b from-zinc-900 to-zinc-600 text-transparent bg-clip-text">
            Review Analysis
            <button className="mt-1 ml-4 text-sm font-normal w-auto justify-center items-center text-center px-4 py-0.5 text-zinc-100 transition-all rounded-md sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer shadow-zinc-300">
              AI Generated
            </button>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="mt-4 text-gray-700 text-center text-base">
                The AI is working its magic
              </p>
            </div>
          )}

          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-red-600 bg-red-50 p-4 rounded-md">
                {error}
              </p>
            </div>
          )}

          {analysisResult && !error && (
            <div className="space-y-8">
              {/* Match Score Analysis */}
              <div>
                <h3 className="text-base font-semibold text-zinc-800 mb-1">
                  Match Score Analysis
                </h3>
                <p className="mb-4 text-sm text-zinc-600">
                  Calculates the match of resume and job description.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-around rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:space-x-4  w-full justify-center items-stretch">
                    {/* Current Match Section */}
                    {/* Ensured full width on small screens, half width on sm and up */}
                    <div className="w-full sm:w-1/2 p-4 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-lg shadow-sm border border-zinc-200 flex flex-col items-center text-center">
                      {/* Heading for current match with an icon */}
                      <h4 className="text-md font-semibold text-zinc-700 mb-3 flex items-center gap-2">
                        Current Match
                      </h4>
                      <MatchCircle
                        percentage={analysisResult.beforeMatchPercentage}
                      />
                      {/* Contextual explanation */}
                      <p className="text-sm text-zinc-500 mt-1">
                        Your current resume alignment with the job requirement.
                      </p>
                    </div>

                    {/* Potential Match Section */}
                    {/* Distinct background and border color for "potential" to highlight importance */}
                    {/* Ensured full width on small screens, half width on sm and up */}
                    <div className="w-full sm:w-1/2 p-4 bg-gradient-to-br from-blue-50 to-blue-50 rounded-lg shadow-sm border border-indigo-200 flex flex-col items-center text-center">
                      {/* Heading for potential match with an icon */}
                      <h4 className="text-md font-semibold text-blue-600 mb-3 flex items-center gap-2">
                        Potential Match
                      </h4>
                      <MatchCircle
                        percentage={analysisResult.afterMatchPercentage}
                      />
                      {/* Contextual explanation */}
                      <p className="text-sm text-blue-600 mt-1">
                        Achievable match score after suggested improvements.
                      </p>
                    </div>
                  </div>

                  {/* Actionable Insight / Next Steps */}
                  {/* Added a prominent call to action/tip for the user */}
                </div>
              </div>
              {/* <div className="w-full p-4 bg-zinc-100 rounded-lg text-center text-blue-800 mt-6">
                <p className="text-sm sm:text-base font-medium">
                  💡 Review the detailed analysis below to identify areas for
                  improvement and boost your score!
                </p>
              </div> */}

              {/* Detailed Changes */}
              {analysisResult.detailedChanges &&
                analysisResult.detailedChanges.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-zinc-800 mb-1">
                      Suggested Changes
                    </h3>
                    <p className="mb-4 text-sm text-zinc-600">
                      Consider the following changes to reach the potential
                      match score
                    </p>
                    <div className="space-y-4">
                      {analysisResult.detailedChanges.map((change, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200"
                        >
                          <p className="text-zinc-600 italic text-sm mb-3">
                            {change.from}
                          </p>
                          <div className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50 rounded-r-lg">
                            <p className="text-sm font-semibold text-amber-800 mb-1">
                              Suggestion:
                            </p>
                            <p className="text-gray-800 text-sm">{change.to}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Suggested Improvements */}
              <div>
                <h3 className="text-base font-semibold text-zinc-800 mb-4">
                  Actionable Items
                </h3>
                <div className="space-y-0">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <p
                      key={index}
                      className="flex items-start p-2 rounded-md hover:bg-gray-50"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        {suggestion}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
