import React, { useEffect, useState } from 'react'
import './style.scss'

const RecipeSnippet = ({ title, image, summary }) => {
  const abbreviatedSummary = summary.slice(0, 330)

  return (
    <div className="recipe-snippet">
      <img src={image} alt={title} />
      <div className="recipe-snippet-right">
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: `${abbreviatedSummary}...` }}></p>
      </div>
    </div>
  )
}

export default RecipeSnippet
