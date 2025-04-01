import React, { useState } from "react";
import service from "../appwrite/config";

const UserProfileForm = () => {
  const [createNewProfile, setCreateNewProfile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Upload Profile");
  const [userformData, setUserFormData] = useState({
    name: "",
    email: "",
    linkdin: "",
    role: "",
    text: "",
  });

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
      console.error(error);
      setMessage("An error occurred while creating the profile.");
    }
  };

  return (
    <div>
      <div className="text-center text-3xl font-semibold pt-8 pb-8">
        Let's know you <span className="blue">better!</span>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-zinc-800 rounded-lg shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-200"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={userformData.role}
                onChange={handleChange}
                className="bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Product Designer">Product Designer</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userformData.name}
                onChange={handleChange}
                className="bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter Full Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userformData.email}
                onChange={handleChange}
                className=" bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter Email ID"
              />
            </div>
            <div>
              <label
                htmlFor="linkdin"
                className="block text-sm font-medium text-gray-200"
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
                className="bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Example - https://ProHire.in"
              />
            </div>
          </div>

          {/* Right side of the form (Text Area) */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-200"
              >
                Additional Information
              </label>
              <textarea
                // maxLength={5}
                required
                id="text"
                name="text"
                value={userformData.text}
                onChange={handleChange}
                rows="9"
                placeholder="Describe your Previous role, Experience, and skill set. Max char limit is 500."
                className="bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="flex-grow py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
              >
                {submitMessage}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
