import { Outlet, Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  return (
    <>
      <header className="text-white py-3 shadow-lg bg-zinc-950 bg-opacity-50 flex justify-between max-w-5xl mx-auto">
        <div className="">
          <div
            className="text-xl font-semibold cursor-pointer flex"
            onClick={redirectHome}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chart-no-axes-gantt"
              className="mt-auto mr-1"
            >
              <path d="M8 6h10" />
              <path d="M6 12h9" />
              <path d="M11 18h7" />
            </svg>
            ProHire
          </div>
        </div>
        <div className="flex">
          <p className="text-zinc-100 px-4 hover:text-zinc-300 cursor-pointer">
            Home
          </p>
          <p className="text-zinc-100 px-4 hover:text-zinc-300 cursor-pointer">
            About
          </p>
          <p className="text-zinc-100 px-4 hover:text-zinc-300 cursor-pointer">
            Need Help?
          </p>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
