import React, { useState } from "react";
import axios from "axios";

const JobDescriptionForm = ({ onJobDescriptionSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onJobDescriptionSubmit(jobDescription); // Pass the job description to the parent
    }
  };

  return (
    <div>
      <h2>Enter Job Description</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description with required skills, experience, etc."
          rows="6"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Save Job Description</button>
      </form>
    </div>
  );
};

export default JobDescriptionForm;
