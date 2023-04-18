import React from 'react';
import './style.scss';

const Pagination = ({ currentPage, pageNumbers, setCurrentPage }) => {
  let numbersToDisplay;
  const firstPages = pageNumbers.slice(0, 3);
  const lastPages = pageNumbers.slice(pageNumbers.length - 3);

  if (firstPages.includes(currentPage)) {
    numbersToDisplay = firstPages;
  } else if (lastPages.includes(currentPage)) {
    numbersToDisplay = lastPages;
  }

  return (
    <div>
      {numbersToDisplay &&
        numbersToDisplay.length > 1 &&
        numbersToDisplay.map((number) => {
          const numberIsCurrentPage = number === currentPage;
          return (
            <button
              key={`page-${number}`}
              className={`pagination-button${numberIsCurrentPage ? ' current-page' : ''}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
