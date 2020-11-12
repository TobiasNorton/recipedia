import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Recipe = (props) => {
  const [instructions, setInstructions] = useState([])
  const apiKey = '7115e309409d4387a6369108cd7185fd'
  const { match: { params: { recipeId } } } = props
  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions/?apiKey=${apiKey}`).then(response => {
      const steps = response.data && response.data[0] && response.data[0].steps
      setInstructions(steps)
    })
  }, [])

  return (
    <div className="recipe">
      This is the recipe page.
    </div>
  );
}

export default Recipe;
