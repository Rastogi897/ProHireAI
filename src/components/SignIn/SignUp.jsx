// import { useState } from "react";

const SignUp = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  return (
    <section className="pt-16 flex flex-col min-h-screen overflow-hidden bg-gradient-to-tl from-zinc-950 to-zinc-950">
      <div className="relative z-10">
        <div className="absolute inset-x-0 top-60 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
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
      </div>
      <div
        className="text-3xl font-semibold cursor-pointer flex justify-center pt-4 pb-6 bg-gradient-to-b from-zinc-600 to-zinc-200 bg-clip-text text-transparent"
        // onClick={redirectHome}
      >
        ProHire
      </div>
      <div className="max-w-md mx-auto bg-zinc-950 relative z-50 rounded-lg p-6 border border-zinc-700 shadow-2xl shadow-zinc-900">
        <div className="text-center z-50">
          <h2 className="pt-4 text-4xl font-bold text-zinc-300">
            Create a new Account
          </h2>
          <p className="mt-4 text-md text-zinc-400">
            Already have an account?
            <a href="/" className="ml-2 font-medium text-blue-400">
              LogIn →
            </a>
          </p>
        </div>

        <form className="space-y-6 mt-8">
          <div>
            <label className="block text-md text-zinc-200" htmlFor="email">
              Email address
            </label>
            <div className="mt-1">
              <input
                className="appearance-none block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none sm:text-sm border-zinc-700 placeholder-zinc-400 focus:ring-blue-400 focus:border-blue-400"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                required
                // autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-md text-zinc-200" htmlFor="password">
              Password
            </label>
            <div className="mt-1">
              <input
                className="appearance-none block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none sm:text-sm border-zinc-700 placeholder-zinc-400 focus:ring-blue-400 focus:border-blue-400"
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-md text-zinc-200" htmlFor="password">
              Re-enter Password
            </label>
            <div className="mt-1">
              <input
                className="appearance-none block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none sm:text-sm border-zinc-700 placeholder-zinc-400 focus:ring-blue-400 focus:border-blue-400"
                id="password"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>

          <div className="hidden flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href=""
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex bg-gradient-to-r from-blue-700 to-blue-500 items-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-base bg-black font-medium text-white hover:bg-gray-800 border border-black focus:ring-black w-full justify-center"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
