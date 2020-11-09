import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import './style.scss'
import { INTOLERANCES, CUISINES } from '../../constants'

const AdvancedSearch = ({ onSubmit, backToSimpleSearch }) => {

  return (
    <Formik
      initialValues={{ keyword: '', intolerances: [], cuisines: [] }}
      onSubmit={onSubmit}
    >
      {({ values, status, isSubmitting }) => {
        return (
          <Form className="advanced-search">
            <Field className="text-field" type="text" name="keyword" placeholder="Type a keyword"></Field>
            <button className="search-button" type="submit" disabled={isSubmitting}>
              Search
            </button>
            <button className="search-button" onClick={() => backToSimpleSearch()}>
              Back to Search
            </button>
            {status && status.error ? <p>{status.error}</p> : null}
            <div className="advanced-options">
              <div className="options-section-label">Intolerances to omit: </div>
              <div className="intolerances">
                {INTOLERANCES.map((intolerance, index) => {
                  return (
                    <button key={`${intolerance}-${index}`} type="button" className="option-button" onClick={() => values.intolerances.push(intolerance.value)}>{intolerance.label}</button>
                  )
                })}
              </div>
              <div className="options-section-label">Filter by cuisine-type:</div>
              <div className="cuisines">
                {CUISINES.map((cuisine, index) => {
                  return (
                    <button key={`${cuisine}-${index}`} type="button" className="option-button" onClick={() => values.cuisines.push(cuisine.value)}>{cuisine.label}</button>
                  )
                })}
              </div>
            </div>

          </Form>
        )
      }}
    </Formik>
  );
}

export default AdvancedSearch;
