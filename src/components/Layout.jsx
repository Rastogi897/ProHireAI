import { Outlet, useNavigate } from "react-router-dom";
import { ChevronsUp, ChevronDown, FileCheck2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  // Ref for the dropdown container to detect clicks outside
  const toolsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the dropdown ref, close the dropdown
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target)
      ) {
        setShowToolsDropdown(false);
      }
    };

    // Add event listener when dropdown is visible
    if (showToolsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Clean up event listener when dropdown is hidden
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function for the effect
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showToolsDropdown]);

  return (
    <div className="relative">
      {/* Fixed background */}
      {/* <div className="fixed top-0 z-[-2] h-screen w-screen bg-gray-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      {/* <div className="fixed inset-0 -z-10 h-full w-full bg-gray-50 bg-[radial-gradient(#e0e0e0_1px,transparent_2px)] [background-size:16px_16px]"></div> */}
      {/* <div className="fixed inset-0 -z-10 w-full h-full bg-gray-50 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}
      {/* <div className="fixed top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
      {/* <div className="fixed inset-0 -z-10 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}
      <section className="flex flex-col min-h-screen bg-gray-100">
        <header className="sticky top-0 z-10 shadow-sm backdrop-filter backdrop-blur-sm bg-opacity-30">
          {/*  */}
          <nav className="container max-w-6xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div
                className="text-lg font-normal cursor-pointer flex justify-center items-center bg-gradient-to-b from-zinc-950 to-zinc-800 bg-clip-text text-transparent"
                onClick={redirectHome}
              >
                <ChevronsUp className="w-6 h-6 mr-2 text-zinc-700" />
                JobLift
              </div>
              <div className="flex justify-center space-x-6">
                <div className="text-zinc-800 font-normal px-4 py-2 hover:text-blue-700 transition-all duration-100 cursor-pointer text-base ">
                  Home
                </div>
                <div className="relative" ref={toolsDropdownRef}>
                  <button
                    className="flex items-center justify-center px-4 py-2 text-zinc-800 font-normal rounded-lg hover:bg-gray-100 hover:text-blue-700 transition-colors duration-200"
                    onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                  >
                    <ChevronDown className="w-5 h-5 mr-2" /> Product Basket
                  </button>
                  {showToolsDropdown && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 transform w-60 bg-white border border-gray-200 rounded-lg shadow-xl">
                      <ul className="py-2">
                        <li
                          className="z-50 flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                          onClick={() => {
                            navigate("/optimize-resume");
                            setShowToolsDropdown(false);
                          }}
                        >
                          <FileCheck2 className="w-5 h-5" /> Optimize Resume
                        </li>
                        <li
                          className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                        // onClick={() => handleToolClick('Workflow Automation', '/workflow-automation')}
                        >
                          <ChevronsUp className="w-5 h-5" /> Something
                        </li>
                        <li
                          className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                        // onClick={() => handleToolClick('Predictive Insights', '/predictive-insights')}
                        >
                          <ChevronsUp className="w-5 h-5" /> Something
                        </li>
                        <li
                          className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                        // onClick={() =>
                        //   handleToolClick(
                        //     "Data Dashboards",
                        //     "/custom-dashboards"
                        //   )
                        // }
                        >
                          <ChevronsUp className="w-5 h-5" /> Something
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Outlet />

        <footer className="w-full bg-gradient-to-b from-gray-50 to-zinc-100 border-t border-gray-100 py-8 px-4 mt-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Side: Site Name */}
            <div className="text-center md:text-left">
              <div
                className="text-xl font-normal cursor-pointer flex justify-center items-center bg-gradient-to-b from-zinc-950 to-zinc-800 bg-clip-text text-transparent"
                onClick={redirectHome}
              >
                <ChevronsUp className="w-6 h-6 mr-2 text-zinc-700" />
                JobLift
              </div>
            </div>

            {/* Right Side: Navigation Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-gray-600 font-medium">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Tools
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JobLift. All rights reserved.
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Layout;
