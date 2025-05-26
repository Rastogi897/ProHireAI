import { useState, useRef } from "react";
import service from "../appwrite/config";
import pdfToText from "react-pdftotext";

const UserProfileForm = () => {
  const [createNewProfile, setCreateNewProfile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Upload Profile");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [userformData, setUserFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkdin: "",
    role: "",
    text: "",
  });

  const fileInputRef = useRef(null);

  const summarizeResume = async (text) => {
    if (!text) {
      console.log("No text to summarize.");
      return;
    }

    setIsSummarizing(true); // Set loading state
    try {
      const prompt = `Summarize the following resume text, focusing on technical skills, coding languages, experience, and achievements. Keep the summary concise within 7 lines and highlight key qualifications. Rather than using name, start the result as "I am":\n\n${text}`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setUserFormData((prevData) => ({ ...prevData, text: text }));
      } else {
        console.error("Unexpected API response structure:", result);
        setUserFormData((prevData) => ({
          ...prevData,
          summary: "Failed to generate summary.",
        }));
      }
    } catch (error) {
      console.error("Error summarizing resume:", error);
      setUserFormData((prevData) => ({
        ...prevData,
        text: "Error generating summary. Please fill manually",
      }));
    } finally {
      setIsSummarizing(false); // Reset loading state
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const extractData = async (text) => {
    const nameRegex = /^([A-Z]+\s?){1,6}/;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex =
      /(?:(?:\+?\d{1,3}[\s-])?(?:\(\d{2,4}\)|\d{2,4})[\s-]?)?\d{3,4}[\s-]?\d{3,4}/;

    const cleanText = text
      .replace(/[^\x20-\x7E]+/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    let nameMatch = cleanText.match(nameRegex);

    let extractedName = "";
    if (nameMatch && nameMatch[0]) {
      let nameCandidate = nameMatch[0].trim();

      const nameParts = nameCandidate
        .split(" ")
        .filter((part) => part.length > 0);

      let finalNameParts = [];
      for (let i = 0; i < nameParts.length; i++) {
        if (
          nameParts[i].length === 1 &&
          i + 1 < nameParts.length &&
          nameParts[i + 1].length > 1 &&
          nameParts[i + 1].toUpperCase() === nameParts[i + 1]
        ) {
          finalNameParts.push(nameParts[i] + nameParts[i + 1]);
          i++;
        } else {
          finalNameParts.push(nameParts[i]);
        }
      }
      extractedName = finalNameParts.join(" ");
    }
    nameMatch = extractedName ? [extractedName] : [];

    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);

    const result = {
      name: nameMatch ? nameMatch[0] : "",
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? phoneMatch[0] : "",
      fullText: text,
    };

    setUserFormData({
      ...userformData,
      name: result.name,
      phone: result.phone,
      email: result.email,
    });

    await summarizeResume(result.fullText);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    pdfToText(file)
      .then((text) => {
        console.log(text);
        extractData(text);
      })
      .catch((error) =>
        console.error("Failed to extract text from pdf", error)
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userformData,
      [name]: value,
    });
  };

  const handleCreateNewProfile = () => {
    setSubmitMessage("Upload Profile");
    setCreateNewProfile(false);
    setUserFormData({
      name: "",
      email: "",
      linkdin: "",
      role: "",
      text: "",
    });
  };

  const handleSubmit = async (e) => {
    if (submitMessage !== "Upload Profile") return;
    e.preventDefault();
    console.log(userformData);

    setSubmitMessage("Submitting details...");

    try {
      const response = await service.createProfile(userformData);

      if (response) {
        setSubmitMessage("Profile create successfully");
        setCreateNewProfile(true);
      } else {
        setSubmitMessage("Failed to create profile. Try again later!");
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage("An error occurred while creating the profile.");
    }
  };

  return (
    <div>
      <div
        className={`pb-12 ${
          isSummarizing ? "filter blur-lg pointer-events-none" : ""
        }`}
      >
        {/* {isSummarizing ? "wait" : "done"} */}
        <div className="text-center text-4xl font-semibold pt-8 pb-12 bg-gradient-to-b from-zinc-950 to-zinc-700 bg-clip-text text-transparent">
          Let&apos;s know you{" "}
          <span className="bg-gradient-to-b from-blue-600 to-blue-500 bg-clip-text text-transparent">
            better!
          </span>
        </div>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex justify-center items-center gap-8 text-lg font-normal text-zinc-950 mb-6 select-none">
          <div>Enter Details Manually</div>
          <div className="font-bold text-2xl text-zinc-300">|</div>
          <div
            className={`${
              isSummarizing
                ? "bg-zinc-200"
                : "bg-gradient-to-r from-blue-600 to-blue-500"
            } z-50 text-md font-normal select-none inline-block w-auto text-center min-w-[200px] px-4 py-2 text-zinc-50 shadow transition-all rounded-md sm:w-auto cursor-pointer`}
            onClick={handleButtonClick}
          >
            Parse Resume with AI
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-zinc-950 pl-2 select-none"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userformData.name}
                  onChange={handleChange}
                  className="bg-zinc-100 mt-1 text-lg text-zinc-950 block w-full px-4 py-3 rounded-md shadow-sm focus:outline-none focus:bg-zinc-100"
                  required
                  placeholder="Enter Full Name"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-lg font-medium text-zinc-950 pl-2 select-none"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userformData.phone}
                  onChange={handleChange}
                  className=" bg-zinc-100 mt-1 text-lg text-zinc-950 block w-full px-4 py-3 text-lg rounded-md shadow-sm focus:outline-none focus:bg-zinc-100"
                  required
                  placeholder="Enter Phone Number"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-zinc-950 pl-2 select-none"
                >
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userformData.email}
                  onChange={handleChange}
                  className=" bg-zinc-100 mt-1 text-lg text-zinc-950 block w-full px-4 py-3 text-lg rounded-md shadow-sm focus:outline-none focus:bg-zinc-100"
                  required
                  placeholder="Enter Email ID"
                />
              </div>
              <div>
                <label
                  htmlFor="linkdin"
                  className="block text-lg font-medium text-gray-950 pl-2 select-none"
                >
                  Linkdin Profile
                  {/* https://in.linkedin.com/in/tusharstg */}
                </label>
                <input
                  type="url"
                  id="linkdin"
                  name="linkdin"
                  value={userformData.linkdin}
                  onChange={handleChange}
                  className=" bg-zinc-100 mt-1 text-lg text-zinc-950 block w-full px-4 py-3 text-lg rounded-md shadow-sm focus:outline-none focus:bg-zinc-100"
                  required
                  placeholder="Example - https://ProHire.in"
                />
              </div>

              {/* Right side of the form (Text Area) */}
              <div>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-lg font-medium text-gray-950 pl-2 pt-4 select-none"
                  >
                    Profile Summary
                  </label>
                  <div>
                    <select
                      id="role"
                      name="role"
                      value={userformData.role}
                      onChange={handleChange}
                      className="bg-zinc-100 mt-2 text-lg text-zinc-700 block w-full px-4 py-3 rounded-md shadow-sm"
                      required
                    >
                      <option value="" disabled>
                        Select Your Role
                      </option>
                      <option value="Software Engineer">
                        Software Engineer
                      </option>
                      <option value="Data Analyst">Data Analyst</option>
                      <option value="Product Designer">Product Designer</option>
                    </select>
                  </div>
                  <textarea
                    // maxLength={5}
                    required
                    id="text"
                    name="text"
                    value={userformData.text}
                    // value={parsedData}
                    onChange={handleChange}
                    rows="9"
                    placeholder="Describe your Previous role, Experience, and skill set. Max char limit is 500."
                    className=" bg-zinc-100 mt-2 text-lg text-zinc-950 block w-full px-4 py-3 text-lg rounded-md shadow-sm focus:outline-none focus:bg-zinc-100"
                  />
                </div>

                <div className="col-span-1 justify-self-end flex w-auto">
                  {createNewProfile && (
                    <button
                      onClick={handleCreateNewProfile}
                      className="flex-grow py-2 px-4 bg-zinc-800 text-white font-semibold rounded-md shadow-md hover:bg-zinc-700 mr-4"
                    >
                      Create new Profile
                    </button>
                  )}
                  <button
                    disabled={submitMessage !== "Upload Profile"}
                    type="submit"
                    className="z-50 mt-6 font-medium text-lg inline-block w-auto text-center min-w-[200px] px-6 py-3 text-white transition-all rounded-md sm:w-auto bg-gradient-to-r from-zinc-700 to-zinc-600 cursor-pointer"
                  >
                    {submitMessage}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSummarizing && (
        <div className="fixed inset-0 bg-opacity-75 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center text-white">
            {/* Modern Bouncing Dots Loader */}
            <div className="flex flex-col space-y-1 mb-4">
              <div className="w-6 h-1.5 bg-zinc-600 animate-[pulse_0.6s_ease-in-out_infinite]"></div>
              <div className="w-6 h-1.5 bg-zinc-600 animate-[pulse_0.6s_ease-in-out_infinite] [animation-delay:0.1s]"></div>
              <div className="w-6 h-1.5 bg-zinc-600 animate-[pulse_0.6s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
            </div>

            <p className="mt-4 font-normal text-xl text-zinc-800">
              Analyzing Resume
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;
