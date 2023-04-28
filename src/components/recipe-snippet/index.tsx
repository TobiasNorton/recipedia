import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

interface RecipeSnippetProps {
  id: number;
  title: string;
  image: string;
  summary: string;
}

const RecipeSnippet = (props: RecipeSnippetProps) => {
  const { id, title, image, summary } = props;
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
