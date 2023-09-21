import React from 'react';
import './style.scss';

interface PaginationProps {
  currentPage: number;
  pageNumbers: number[];
  setCurrentPage: Function;
}

const Pagination = (props: PaginationProps) => {
  const { currentPage, pageNumbers, setCurrentPage } = props;
  console.log('Pagination props', props);
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
