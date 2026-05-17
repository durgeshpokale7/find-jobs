const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            FindJobs
          </h1>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <button className="hover:text-blue-600 transition">
              Internships
            </button>

            <button className="hover:text-blue-600 transition">Jobs</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-gray-700 hover:text-blue-600">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
