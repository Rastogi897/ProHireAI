import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  return (
    <>
      <section className="flex flex-col min-h-screen overflow-hidden bg-gray-50">
        {/* <div className="relative z-10">
          <div className="absolute inset-x-0 top-96 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-zinc-600 opacity-40"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-none">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  strokeWidth="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div> */}

        <header className="text-zinc-200 py-4 px-4 z-50">
          {/*  */}
          <nav className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div
                className="text-2xl font-semibold cursor-pointer flex bg-gradient-to-b from-zinc-950 to-zinc-800 bg-clip-text text-transparent"
                onClick={redirectHome}
              >
                ProHire
              </div>
              <div className="flex justify-center space-x-6">
                <div className="text-zinc-700 font-medium px-4 py-2 hover:text-zinc-900 cursor-pointer text-lg">
                  Home
                </div>
                <div className="text-zinc-700 font-medium px-4 py-2 hover:text-zinc-900 cursor-pointer text-lg">
                  Support
                </div>
                <div
                  onClick={() => navigate("/signup")}
                  className="text-zinc-950 px-4 py-2 bg-zinc-200 rounded-md cursor-pointer text-lg"
                >
                  Sign In →
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* <div className="text-zinc-200 py-6 mt-4 px-4 container mx-auto z-50">
          <div className="">
            <div>ProHire</div>
          </div>
          <div className="flex z-50 space-x-6">
            {" "}
            Add space between the items
            <p className="text-zinc-300 px-4 hover:text-zinc-200 cursor-pointer text-lg">
              Home
            </p>
            <p className="text-zinc-300 px-4 hover:text-zinc-200 cursor-pointer text-lg">
              About
            </p>
            <p className="text-zinc-300 px-4 hover:text-zinc-200 cursor-pointer text-lg">
              Need Help?
            </p>
          </div>
        </div> */}

        <Outlet />
      </section>
    </>
  );
};

export default Layout;
