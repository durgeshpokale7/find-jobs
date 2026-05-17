import { useMemo } from "react";

const UsePagination = (data, currentPage, itemsPerPage) => {
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const getPaginationButtons = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return {
    totalPages,
    currentData,
    getPaginationButtons,
  };
};

export default UsePagination;
