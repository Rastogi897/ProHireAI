import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import service from "../appwrite/config";

const HireForm = () => {
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [hireFormData, setHireFormData] = useState({
    role: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHireFormData({
      ...hireFormData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Running fnc");
    console.log(hireFormData);
    let profileTexts, userProfiles;

    try {
      const response = await service.fetchAllProfile(hireFormData.role);
      console.log(response.documents);

      userProfiles = response.documents;
      profileTexts = userProfiles.map((profile) => profile.text);
      console.log("Extracted Profile Names: ", profileTexts);
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-MiniLM-L6-v2",
        {
          inputs: {
            source_sentence: hireFormData.text,
            sentences: profileTexts,
          },
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_AUTH_KEY,
          },
        }
      );

      const similarity = response.data;
      console.log("Similarity:", similarity);

      const finalResult = userProfiles.map((profile, index) => ({
        ...profile,
        score: similarity[index],
      }));

      finalResult.sort((a, b) => b.score - a.score);
      console.log("Final result", finalResult);
      setProfiles(finalResult);
      // navigate("/listCandidates", { state: { finalResult } });

      setShowModal(true);
      setLoading(false);
    } catch (error) {
      console.log("ERROR: ", error.response);
      console.log("ERROR MSG: ", error.response.data.error);
      if (
        error.response &&
        error.response.data.error ===
          "Model sentence-transformers/paraphrase-MiniLM-L6-v2 is currently loading"
      ) {
        console.log("Inside if");
        const estimatedTime = error.response.data.estimated_time;
        setTimeout(() => {
          handleSubmit();
        }, estimatedTime * 1000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-8 max-w-5xl mx-auto">
        <div className="max-h-fit pt-6 pb-6 p-6 bg-zinc-800 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-100 pb-1"
              >
                Hiring for
              </label>
              <select
                id="role"
                name="role"
                value={hireFormData.role}
                onChange={handleChange}
                className="bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                htmlFor="text"
                className="block text-sm font-medium text-gray-100 pb-1"
              >
                Job Description
              </label>
              <textarea
                required
                id="text"
                name="text"
                value={hireFormData.text}
                onChange={handleChange}
                rows="9"
                placeholder="Describe the job role and, What are you looking in the candidate?"
                className="bg-black mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1 justify-self-end">
              <button
                disabled={loading}
                onClick={handleSubmit}
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
              >
                Start searching
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>

        <div className="font-semibold text-5xl pt-20 pl-6 text-zinc-500 leading-snug">
          {loading == false && <div>Let&apos;s find</div>}
          {loading == true && (
            <div className="flex">
              <span className="text-zinc-100">Looking</span>
              <div className="loader my-auto ml-4"></div>
            </div>
          )}
          a <span className="text-gray-50">perfect</span> match <br /> for you!
        </div>

        {showModal && profiles.length > 0 && (
          <Modal closeModal={closeModal} profiles={profiles} showModal />
        )}
      </div>
    </div>
  );
};

export default HireForm;
