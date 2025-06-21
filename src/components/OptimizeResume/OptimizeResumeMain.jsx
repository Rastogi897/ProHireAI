/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import pdfToText from "react-pdftotext";
import { Loader2, UploadCloud, FileText, Wand2 } from "lucide-react";
import AnalysisModal from "./AnalysisModal";
import { generatePrompt } from "./prompt";

const App = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position on mount
  }, []);

  const handleResumeToText = async (file) => {
    if (!file || file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    pdfToText(file)
      .then((text) => {
        console.log(text);
        setResumeText(text);
      })
      .catch((error) =>
        console.error("Failed to extract text from pdf", error)
      );
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setResumeText(""); // Reset previous text
    setError("");

    setFileName(file.name);
    handleResumeToText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError("Please upload a resume and paste the job description.");
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    setError("");
    setIsModalOpen(true);

    const prompt = generatePrompt(resumeText, jobDescription);
    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              beforeMatchPercentage: {
                type: "NUMBER",
                description: "The match score before changes, from 0 to 100.",
              },
              afterMatchPercentage: {
                type: "NUMBER",
                description:
                  "The projected match score after changes, from 0 to 100.",
              },
              suggestions: {
                type: "ARRAY",
                items: { type: "STRING" },
                description: "A list of actionable suggestions.",
              },
              detailedChanges: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    from: {
                      type: "STRING",
                      description: "The original text from the resume.",
                    },
                    to: {
                      type: "STRING",
                      description: "The suggested replacement text.",
                    },
                  },
                  required: ["from", "to"],
                },
                description: "A list of specific from/to text changes.",
              },
            },
            required: [
              "beforeMatchPercentage",
              "afterMatchPercentage",
              "suggestions",
              "detailedChanges",
            ],
          },
        },
      };

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(text);
        console.log("Parsed JSON:", parsedJson);
        setAnalysisResult(parsedJson);
      } else {
        throw new Error("Unexpected response structure from the API.");
      }
    } catch (e) {
      console.error("Analysis failed:", e);
      setError(
        "Sorry, the analysis failed. This could be a network issue or a problem with the AI model. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnalysisResult(null);
    setIsLoading(false);
    setError(""); // Clear error when closing modal
  };

  return (
    <div className="mt-8 mb-8 bg-gray-50 font-sans text-gray-800 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          {/* <Wand2 className="h-12 w-12 text-indigo-600 mx-auto mb-2" /> */}
          <h1 className="text-4xl font-semibold bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
            Optimize Resume
          </h1>
          <p className="text-zinc-600 mt-2">
            Get instant feedback to align your resume with any job description.
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
          {/* Resume Upload Component */}
          <div className="mb-6">
            <label className="block text-base font-medium text-zinc-700 mb-2">
              Upload Resume (PDF only)
            </label>
            <div
              {...getRootProps()}
              className={`flex justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragActive
                  ? "bg-indigo-50 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} className="sr-only" />
              <div className="text-center">
                <UploadCloud className="mx-auto h-8 w-8 text-blue-500" />
                <p className="mt-2 text-sm text-gray-700">
                  {isDragActive
                    ? "Drop the file here..."
                    : "Drag & drop or click to upload"}
                </p>
                <p className="text-sm text-gray-500">PDF file up to 5MB</p>
              </div>
            </div>
            {fileName && (
              <div className="mt-3 flex items-center justify-center text-sm font-medium text-blue-600 bg-blue-50 p-3 rounded-md">
                <FileText className="h-5 w-5 mr-2" />
                <span>{fileName}</span>
                {/* <CheckCircle className="h-5 w-5 ml-2" /> */}
              </div>
            )}
          </div>

          {/* Job Description Input */}
          <div className="mb-6">
            <label
              htmlFor="job-description"
              className="block text-base font-medium text-zinc-700 mb-2"
            >
              Job Description
            </label>
            <textarea
              id="job-description"
              rows="8"
              className="mt-1 block w-full rounded-md border border-gray-200 bg-zinc-50 shadow-sm focus:ring-0 text-sm p-4"
              placeholder="The full job description goes here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Display error message if any */}
          {error && !isModalOpen && (
            <p className="mb-4 text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </p>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !resumeText || !jobDescription}
              className="flex z-50 font-normal text-sm w-auto justify-center items-center text-center px-4 py-2 text-white transition-all rounded-lg sm:w-auto bg-gradient-to-r from-zinc-800 to-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-zinc-300 shadow-md shadow-zinc-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Wand2 className="text-white w-4 h-4 mr-2" />
                  Generate Analysis
                </>
              )}
            </button>
            {/* <button
              className="flex z-50 font-light text-base w-auto justify-center items-center text-center min-w-[200px] px-4 py-2 text-white transition-all rounded-lg sm:w-auto bg-gradient-to-r from-zinc-800 to-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-zinc-300 shadow-md shadow-zinc-300"
            >
              <Archive className="text-white w-4 h-4 mr-3" />
              View Product Basket
            </button> */}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <AnalysisModal
          analysisResult={analysisResult}
          isLoading={isLoading}
          onClose={closeModal}
          error={error}
        />
      )}
    </div>
  );
};

export default App;
