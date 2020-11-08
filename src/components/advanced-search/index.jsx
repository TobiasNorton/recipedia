import React from 'react';
import { Formik, Form, Field } from 'formik'
import './style.scss'
import { INTOLERANCES, CUISINES } from '../../constants'

const index = ({ search, backToSimpleSearch }) => {

  return (
    <Formik
      initialValues={{ keyword: '', ingredients: [], cuisine: '' }}
      onSubmit={() => search()}

    >
      {({ status, isSubmitting }) => {
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
                    <button key={`${intolerance}-${index}`} className="option-button">{intolerance}</button>
                  )
                })}
              </div>
              <div className="options-section-label">Filter by cuisine-type:</div>
              <div className="cuisines">
                {CUISINES.map((cuisine, index) => {
                  return (
                    <button key={`${cuisine}-${index}`} className="option-button">{cuisine}</button>
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

export default index;
