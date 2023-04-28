import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

type RecipePageProps = RouteComponentProps;

const Recipe = (props: RecipePageProps) => {
  console.log('props', props);
  const [recipe, setRecipe] = useState<Record<string, any>>({});
  const ingredients = recipe && recipe.extendedIngredients;
  const steps =
    recipe &&
    recipe.analyzedInstructions &&
    recipe.analyzedInstructions[0] &&
    recipe.analyzedInstructions[0].steps;
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const {
    match: {
      params: { recipeId },
    },
  } = props;

  useEffect(() => {
    axios
      .get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
      .then((response) => {
        console.log('response.data', response.data);
        setRecipe(response.data);
      });
  }, []);

  return (
    <div className="recipe">
      <h1>{recipe && recipe.title}</h1>
      {recipe && recipe.creditsText && (
        <p className="byline">
          Recipe by <a href={recipe.sourceUrl}>{recipe.creditsText}</a>
        </p>
      )}
      <img className="main-image" src={recipe && recipe.image} />
      <h2>Ingredients:</h2>
      <div>
        {ingredients &&
          ingredients.map((ingredient, index) => {
            return (
              <p key={`ingredient-${index}`} className="ingredient">
                {ingredient.original}
              </p>
            );
          })}
      </div>

      <h2>Preparation:</h2>
      <div>
        {steps &&
          steps.map((step: Record<string, any>, index: number) => {
            return (
              <p key={`step-${index}`} className="step">
                <span>{step.number}.</span> {step.step}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Recipe;
