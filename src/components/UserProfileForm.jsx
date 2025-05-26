import { useState, useRef } from "react";
import service from "../appwrite/config";
import pdfToText from "react-pdftotext";

const UserProfileForm = () => {
  const [createNewProfile, setCreateNewProfile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Upload Profile");
  const [userformData, setUserFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkdin: "",
    role: "",
    text: "",
  });

  // const [parsedData, setParsedData] = useState("");

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const extractData = (text) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex =
      /(?:(?:\+?\d{1,3}[\s-])?(?:\(\d{2,4}\)|\d{2,4})[\s-]?)?\d{3,4}[\s-]?\d{3,4}/;

    const cleanText = text
      .replace(/[^\x20-\x7E]+/g, "") // remove non-ASCII characters
      .replace(/\s{2,}/g, " ") // replace multiple spaces with one
      .trim();

    // Step 2: Attempt to extract name (first 4 capitalized words at most)
    const nameRegex = /^([A-Z][A-Z]+\s){1,4}/; // e.g. "MUSKAN RASTOGI "
    const nameMatch = cleanText.match(nameRegex);

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
      text: result.fullText,
    });

    // setParsedData(JSON.stringify(result, null, 2));
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
    <div className="mb-12">
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

      <div className="flex justify-center items-center gap-8 text-lg font-medium text-zinc-700 mb-6 select-none">
        <div>Enter Details Manually</div>
        <div className="font-bold text-2xl text-zinc-300">|</div>
        <div
          className="z-50 text-md select-none inline-block w-auto text-center min-w-[200px] px-8 py-2 text-zinc-50 shadow transition-all bg-gradient-to-r from-blue-600 to-blue-500 rounded-md sm:w-auto cursor-pointer"
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
                Linkdin Profile URL
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
                  Additional Information
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
                    <option value="Software Engineer">Software Engineer</option>
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
  );
};

export default UserProfileForm;
