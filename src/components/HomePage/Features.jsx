const Features = () => {
  return (
    <div className="mb-20">
      <div className="flex flex-col items-center">
        <h2 className="mt-5 pb-2 text-center text-5xl bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent font-bold">
          FAQs
        </h2>
        <p className="mt-3 text-lg text-zinc-700 md:text-xl">
          Frequenty asked questions
        </p>
      </div>
      <div className="relative w-full bg-white px-6 pt-10 pb-8 mt-8 shadow-md sm:mx-auto max-w-5xl sm:rounded-lg sm:px-10">
        <div className="mx-auto px-5">
          <div className="mx-auto grid max-w-4xl divide-y divide-neutral-300">
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-zinc-800 text-xl">
                  <span> Can I search for jobs using ProHire?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-zinc-700 py-2 text-xl">
                  Not directly! We connect hiring managers with job seekers. You
                  can create a user profile, which will be visible to hiring
                  managers.
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-zinc-800 text-xl">
                  <span>Is it both for Hiring manager and Job Seeker?</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-zinc-700 py-2 text-xl">
                  Yes, we assist both hiring managers and job seekers. The
                  hiring manager can search through the AI shortlisted
                  candidates among 1000+ profiles, and the job seeker can create
                  those user profile.
                </p>
              </details>
            </div>
            <div className="py-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-zinc-800 text-xl">
                  <span>
                    {" "}
                    Do i have to pay as a hiring manager or as a Job Seeker?
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-3 text-zinc-700 py-2 text-xl">
                  NO, it is completely free for both hiring managers and job
                  seekers.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
