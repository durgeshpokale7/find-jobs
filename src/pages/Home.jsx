import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import InternshipList from "../components/InternshipList";
import Pagination from "../components/Pagination";

import { fetchInternships } from "../services/api";

import { filterInternships } from "../utilis/FilterInternships";
import UsePagination from "../Hooks/UsePagination.jsx";

const Home = () => {
  const [internships, setInternships] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    profiles: [],
    locations: [],
    duration: "",
    stipend: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const internshipsPerPage = 5;

  const getInternships = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await fetchInternships();

      setInternships(data);
    } catch (err) {
      console.error(err);

      setError("Failed to fetch internships");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getInternships();
  }, [getInternships]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleFilterChange = useCallback((name, value) => {
    if (name === "clear") {
      setFilters({
        profiles: [],
        locations: [],
        duration: "",
        stipend: 0,
      });

      return;
    }

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const filteredInternships = filterInternships(internships, filters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const {
    totalPages,
    currentData: currentInternships,
    getPaginationButtons,
  } = UsePagination(filteredInternships, currentPage, internshipsPerPage);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[300px] flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>

              <button
                onClick={() => handleFilterChange("clear")}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Clear All
              </button>
            </div>

            <Filters
              internships={internships}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div id="internship-section" className="flex-1 pr-1 lg:pr-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 mb-5">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredInternships.length} Total Internships
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest internships matching your filters
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <InternshipList internships={currentInternships} loading={loading} />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            getPaginationButtons={getPaginationButtons}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
