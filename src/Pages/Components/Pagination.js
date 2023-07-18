import React, { useState } from "react";
import { ReactComponent as ArrowUp } from "./../../img/svg/up-arrow.svg";

function Pagination({ maxPages, updateFilter }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (e) => {
    // console.log(currentPage, e.target.value * 1);
    setCurrentPage(e.target.value * 1);
    updateFilter("page", e.target.value * 1);
  };

  const handleGoToPrevious = (e) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateFilter("page", currentPage - 1);
    }
  };

  const handleGoToNext = (e) => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      updateFilter("page", currentPage + 1);
    }
  };

  const calculatePagesToShow = (currentPage, maxPages) => {
    let pagesToShow;
    if (currentPage < 5) {
      pagesToShow = [2, 3, 4, 5];
    } else if (currentPage > 4 && currentPage <= maxPages - 4) {
      pagesToShow = [currentPage - 1, currentPage, currentPage + 1];
    } else if (currentPage > maxPages - 4) {
      pagesToShow = [maxPages - 4, maxPages - 3, maxPages - 2, maxPages - 1];
    }
    return pagesToShow;
  };

  let content;

  if (maxPages <= 5) {
    content = (
      <>
        {Array.from({ length: maxPages - 2 }, (_, index) => index + 2).map(
          (page) => (
            <button
              onClick={handleClick}
              key={page}
              value={page}
              className={`${page === currentPage ? "active" : ""}`}
            >
              {page}
            </button>
          )
        )}
      </>
    );
  } else {
    content = (
      <>
        {calculatePagesToShow(currentPage, maxPages).map((page) => (
          <button
            onClick={handleClick}
            key={page}
            value={page}
            className={`${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
      </>
    );
  }

  return (
    <div className="pagination mb-2">
      <button className="go-to-previous" onClick={handleGoToPrevious}>
        <ArrowUp id="arrow-left"></ArrowUp>
      </button>

      <button
        className={`${1 === currentPage ? "active" : ""} `}
        onClick={handleClick}
        value={1}
      >
        {1}
      </button>
      <button
        className={`dots ${
          maxPages === 5 || maxPages === 6 || currentPage <= 4
            ? "invisible"
            : ""
        }`}
      >
        ...
      </button>

      {content}

      <button
        className={`dots ${
          maxPages === 5 || maxPages === 6 || currentPage >= maxPages - 3
            ? "invisible"
            : ""
        }`}
      >
        ...
      </button>

      <button
        className={`${maxPages === currentPage ? "active" : ""} ${
          maxPages === 1 ? "invisible" : ""
        }`}
        onClick={handleClick}
        value={maxPages}
      >
        {maxPages}
      </button>

      <button className="go-to-next" onClick={handleGoToNext}>
        <ArrowUp id="arrow-right"></ArrowUp>
      </button>
    </div>
  );
}

export default Pagination;
