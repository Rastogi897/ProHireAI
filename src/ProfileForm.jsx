import React, { useState } from "react";

const ProfileForm = ({ onProfileSubmit }) => {
  const [profile, setProfile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile.trim()) {
      onProfileSubmit(profile); // Pass the profile data to the parent
    }
  };

  return (
    <div>
      <h2>Enter Your Job Profile</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          placeholder="Describe your skills, experience, and preferred roles"
          rows="6"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
