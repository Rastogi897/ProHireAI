import React from "react";

const ProfileLayout = ({ data, index }) => {
  return (
    <div className="mb-4 mt-8">
      <div className="mx-auto p-6 bg-zinc-900 rounded-lg flex items-center relative max-w-2xl border border-zinc-700">
        <p className="absolute top-1 -left-14 text-white px-4 py-2 rounded-full bg-zinc-800">
          {index + 1}
        </p>
        <div className="max-w-4xl">
          <div className="border-l-2 pl-4 border-gray-600">
            <div className="text-md text-zinc-300 font-semibold capitalize">
              {data.name}
            </div>
            <p className="text-zinc-200 mb-3 mt-1 text-base">{data.role}</p>
          </div>
          <p className=" mt-10 text-sm mb-2 text-zinc-400">
            Profile Discription:
          </p>
          <p className="text-zinc-100 border-l-2 pl-4 border-gray-600 text-base">
            {data.text.slice(0, 4000)}
          </p>
        </div>
        <div className="absolute top-6 right-6">
          <button
            onClick={data.linkdin}
            className="px-3 py-2 text-white rounded-md hover:bg-zinc-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3A9CFF"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>
          <button
            onClick={data.email}
            className="px-3 py-2 text-white rounded-md hover:bg-zinc-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3A9CFF"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-at-sign"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
            </svg>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-at-sign"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
            </svg> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
