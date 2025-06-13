import { Outlet, useNavigate } from "react-router-dom";
import { ChevronsUp } from "lucide-react";
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
    <>
      <section className="flex flex-col min-h-screen bg-gray-100">
        <header className="text-zinc-200 py-4 px-4 z-50">
          {/*  */}
          <nav className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div
                className="text-xl font-normal cursor-pointer flex justify-center items-center bg-gradient-to-b from-zinc-950 to-zinc-800 bg-clip-text text-transparent"
                onClick={redirectHome}
              >
                <ChevronsUp className="w-6 h-6 mr-2 text-zinc-700" />
                JobLift
              </div>
              <div className="flex justify-center space-x-6">
                <div className="text-zinc-700 font-normal px-4 py-2 hover:text-zinc-900 cursor-pointer text-lg">
                  Home
                </div>
                <div className="relative" ref={toolsDropdownRef}>
                  <button
                    className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                  >
                    <ChevronsUp className="w-5 h-5 mr-2" /> All Tools
                  </button>
                  {showToolsDropdown && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 transform w-60 bg-white border border-gray-200 rounded-lg shadow-xl">
                      <ul className="py-2">
                        <li
                          className="z-50 flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                          // onClick={() => handleToolClick('Content Creator', '/content-creator')}
                        >
                          <ChevronsUp className="w-5 h-5" /> Something
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

        <footer className="w-full bg-gray-50 border-t border-gray-100 py-8 px-4 mt-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Side: Site Name */}
            <div className="text-center md:text-left">
              <span className="text-gray-800 text-2xl font-bold">
                YourSiteName
              </span>
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
                About Us
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Contact
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
            &copy; {new Date().getFullYear()} YourSiteName. All rights reserved.
          </div>
        </footer>
      </section>
    </>
  );
};

export default Layout;
