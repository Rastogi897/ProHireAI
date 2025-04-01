import React, { useEffect, useRef, useState } from "react";
import ProfileLayout from "./ProfileLayout";
import Carousel from "./Carousel";

const Modal = ({ closeModal, profiles }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-400 bg-opacity-10 backdrop-blur-md flex justify-center items-center">
      <div
        ref={modalRef}
        className={`bg-black p-6 rounded-lg w-[79%] h-[83%] overflow-auto relative transition-all duration-1000 ease-in-out border border-zinc-600
          `}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-6 text-white font-bold text-2xl"
        >
          ×
        </button>
        <div className="modal-content">
          <div className="text-center">
            <div className="pt-2 text-3xl font-semibold text-zinc-300">
              <span className="text-blue-500">Yahoo!</span> We got shortlisted
              candidates!
            </div>
          </div>
          <Carousel profiles={profiles.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
