import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      {/* Previous Page Button */}
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 mx-1 border rounded-md bg-gray-100 hover:bg-gray-200 text-slate-500 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 border rounded-md ${
            page === currentPage
              ? "bg-blue-300 text-slate-900"
              : "bg-gray-300 hover:bg-gray-200 text-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={handleNext}
        className={`px-4 py-2 mx-1 border rounded-md bg-gray-100 hover:bg-gray-200 text-slate-500 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
