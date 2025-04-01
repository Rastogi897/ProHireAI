import React, { useState } from "react";
import ProfileLayout from "./ProfileLayout";

const Carousel = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="">
      <ProfileLayout data={profiles[currentIndex]} index={currentIndex} />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={handlePrev}
          className="px-3 pt-1 pb-2 bg-zinc-800 text-white rounded-md shadow-md hover:bg-zinc-700 font-semibold"
        >
          {"<"}
        </button>
        <button
          onClick={handleNext}
          className="px-3 pt-1 pb-2 bg-zinc-800 text-white rounded-md shadow-md hover:bg-zinc-700 font-semibold"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
