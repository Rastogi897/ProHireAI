/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import pdfToText from "react-pdftotext";
import { Loader2, UploadCloud, FileText, Wand2 } from "lucide-react";
import PreviewModal from "./PreviewModal";
import { generatePrompt } from "./coverLetterPrompt";

const CoverLetterMain = () => {
  const [name, setName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetterSections, setCoverLetterSections] = useState(null);

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
    if (!resumeText || !name) {
      setError("Please fill out your name and upload your resume.");
      return;
    }
    setIsLoading(true);
    setCoverLetterSections(null);
    setError("");
    setIsModalOpen(true);

    const prompt = generatePrompt(name, resumeText, jobDescription);
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
              introduction: { type: "STRING" },
              body: { type: "STRING" },
              conclusion: { type: "STRING" },
            },
            required: ["introduction", "body", "conclusion"],
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

      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const generatedText = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(generatedText);
        setCoverLetterSections(parsedJson);
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error(
          "Failed to generate cover letter. The API returned an unexpected response."
        );
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
  console.log(coverLetterSections);

  const closeModal = () => {
    setIsModalOpen(false);
    setCoverLetterSections(null);
    setIsLoading(false);
    setError(""); // Clear error when closing modal
  };

  return (
    <div className="mt-8 mb-8 font-sans text-gray-800 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          {/* <Wand2 className="h-12 w-12 text-indigo-600 mx-auto mb-2" /> */}
          <h1 className="text-4xl pb-2 font-semibold bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent">
            Get you Cover Letter
          </h1>
          <p className="text-zinc-600">
            Generate personalized cover letters based on your resume and job
            description.
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="mb-6">
            <label className="block text-base font-medium text-zinc-700 mb-2">
              Full Name
            </label>
            <input
              value={name}
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-zinc-50 shadow-sm focus:ring-0 text-sm px-4 py-3 outline-none focus:outline-none"
              placeholder="Enter your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
                  : "hover:bg-zinc-50"
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
              Job Description{" "}
              <span className="text-sm text-zinc-500 font-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="job-description"
              rows="8"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-zinc-50 shadow-sm focus:ring-0 text-sm px-4 py-3 outline-none focus:outline-none"
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
              disabled={isLoading || !resumeText || !name}
              className="flex z-50 font-normal text-sm w-auto justify-center items-center text-center px-4 py-2 text-white transition-all rounded-lg sm:w-auto bg-gradient-to-r from-zinc-800 to-zinc-700 cursor-pointer hover:shadow-lg hover:shadow-zinc-300 shadow-md shadow-zinc-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="text-white w-4 h-4 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </button>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <PreviewModal
          coverLetterSections={coverLetterSections}
          setCoverLetterSections={setCoverLetterSections}
          isLoading={isLoading}
          onClose={closeModal}
          error={error}
          name={name}
        />
      )}
    </div>
  );
};

export default CoverLetterMain;
