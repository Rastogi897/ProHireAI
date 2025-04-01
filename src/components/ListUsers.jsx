import React, { useEffect, useRef, useState } from "react";
import ProfileLayout from "./ProfileLayout";
import { useLocation } from "react-router-dom";

const ListUsers = ({ profiles }) => {
  //   const modalRef = useRef(null);
  const location = useLocation();
  const { finalResult } = location.state || {};

  return (
    <div className="max-w-5xl mx-auto">
      {/* <div
        // ref={modalRef}
        className={`bg-black p-6 rounded-lg w-[80%] h-[80%] overflow-auto relative transition-all duration-1000 ease-in-out border border-zinc-500
          `}
      > */}
      {/* <button
          onClick={closeModal}
          className="absolute top-2 right-6 text-white font-bold text-2xl"
        >
          ×
        </button> */}
      <div className="">
        <div className="text-center">
          <div className="pt-10 text-3xl font-semibold text-zinc-200">
            <span className="text-blue-500">Yahoo!</span> We got shortlisted
            candidates!
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4">
          {finalResult?.slice(0, 4).map((data, index) => {
            return <ProfileLayout data={data} index={index} key={index} />;
          })}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ListUsers;
