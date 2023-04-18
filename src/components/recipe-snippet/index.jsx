import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const RecipeSnippet = ({ id, title, image, summary }) => {
  const abbreviatedSummary = summary.slice(0, 330);

  return (
    <div className="recipe-snippet">
      <img className="recipe-snippet-image" src={image} alt={title} />
      <div className="recipe-snippet-right">
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: `${abbreviatedSummary}...` }}></p>
        <Link to={`/recipes/${id}`} className="more-info">
          More Information
        </Link>
      </div>
    </div>
  );
};

export default RecipeSnippet;
