interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  maxPageNumbers?: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  maxPageNumbers = 5,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    onPageChange(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
      const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

      if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const renderPageNumbers = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map((pageNumber) => (
      <li
        aria-hidden
        key={pageNumber}
        className={`${
          pageNumber === currentPage ? "bg-slate-200" : ""
        } flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 hover:bg-slate-100`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </li>
    ));
  };

  return (
    <nav>
      <ul className="pagination flex items-center gap-2">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
