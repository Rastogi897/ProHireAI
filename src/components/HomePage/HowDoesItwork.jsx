const HowDoesItwork = () => {
  return (
    <section id="works" className="relative bg-zinc-100 py-32">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent font-bold mx-auto">
            How does it work?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-zinc-700 leading-relaxed text-xl">
            We match the right candidates based on the job profiles. <br />
          </p>
        </div>
        <div className="relative mt-24">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              alt=""
              loading="lazy"
              width="1000"
              height="500"
              decoding="async"
              data-nimg="1"
              className="w-full"
              //   style={{ color: "transparent" }}
              style={{ filter: "brightness(0.2)" }}
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
            ></img>
          </div>
          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow">
                <span className="text-xl font-semibold text-white">1</span>
              </div>
              <h3 className="mt-6 text-2xl  text-zinc-950 font-semibold leading-tight md:mt-10">
                Job Description
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                Enter the job description to get started
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow">
                <span className="text-xl font-semibold text-white">2</span>
              </div>
              <h3 className="mt-6 text-2xl text-zinc-950 font-semibold leading-tight md:mt-10">
                Sit back & Relax
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                AI will analyze the description and find the best match
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow">
                <span className="text-xl font-semibold text-white">3</span>
              </div>
              <h3 className="mt-6 text-2xl text-zinc-950 font-semibold leading-tight md:mt-10">
                Finalize the candidate
              </h3>
              <p className="mt-4 text-zinc-700 text-lg">
                Choose the best candidate based on your requirements
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)",
        }}
      ></div>
    </section>
  );
};

export default HowDoesItwork;
