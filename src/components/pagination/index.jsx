import React from 'react';

const Pagination = ({ currentPage, pageNumbers, setCurrentPage }) => {
  return (
    <div>
      {pageNumbers &&
        pageNumbers.length > 1 &&
        pageNumbers.map((number) => {
          return (
            <button key={`page-${number}`} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
