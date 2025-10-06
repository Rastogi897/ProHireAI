import { Outlet, useNavigate } from "react-router-dom";
import { ChevronsUp, ChevronDown, FileCheck2, LetterText } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  const toolsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target)
      ) {
        setShowToolsDropdown(false);
      }
    };

    if (showToolsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showToolsDropdown]);

  return (
    <div className="relative">
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
                {/* <div className="text-zinc-800 font-normal px-4 py-2 hover:text-blue-700 transition-all duration-100 cursor-pointer text-base ">
                  Home
                </div> */}
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
                          onClick={() => {
                            navigate("/generate-cover-letter");
                            setShowToolsDropdown(false);
                          }}
                        // onClick={() => handleToolClick('Workflow Automation', '/workflow-automation')}
                        >
                          <LetterText className="w-5 h-5" /> Generate Cover Letter
                        </li>
                        {/* <li
                          className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                        >
                          <ChevronsUp className="w-5 h-5" /> More coming soon...
                        </li> */}
                        {/* <li
                          className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-700 transition-colors duration-150"
                        
                        >
                          <ChevronsUp className="w-5 h-5" /> Something
                        </li> */}
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
            <div className="text-center md:text-left">
              <div
                className="text-xl font-normal cursor-pointer flex justify-center items-center bg-gradient-to-b from-zinc-950 to-zinc-800 bg-clip-text text-transparent"
                onClick={redirectHome}
              >
                <ChevronsUp className="w-6 h-6 mr-2 text-zinc-700" />
                JobLift
              </div>
            </div>

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
