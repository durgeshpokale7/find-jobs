function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  getPaginationButtons,
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-10 flex-wrap min-h-[70px]">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition
        ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {getPaginationButtons().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition
            ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition
        ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
