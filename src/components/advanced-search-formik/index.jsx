import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { Multiselect } from 'multiselect-react-dropdown';
import './style.scss'
import { INTOLERANCES, CUISINES } from '../../constants'

const AdvancedSearchFormik = ({ onSubmit, backToSimpleSearch }) => {

  const [selectedIntolerances, setSelectedIntolerances] = useState([])
  const [selectedCuisines, setSelectedCuisines] = useState([])

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
              {/* <div className="intolerances">
                {INTOLERANCES.map((intolerance, index) => {
                  return (
                    <button key={`${intolerance}-${index}`} type="button" className="option-button" onClick={() => values.intolerances.push(intolerance.value)}>{intolerance.label}</button>
                  )
                })}
              </div> */}
              <Multiselect
                options={INTOLERANCES} // Options to display in the dropdown
                selectedValues={selectedIntolerances} // Preselected value to persist in dropdown
                onSelect={() => values.intolerances = selectedIntolerances} // Function will trigger on select event
                // onRemove={} // Function will trigger on remove event
                displayValue="label" // Property label to display in the dropdown options
              />
              <div className="options-section-label">Filter by cuisine-type:</div>
              {/* <div className="cuisines">
                {CUISINES.map((cuisine, index) => {
                  return (
                    <button key={`${cuisine}-${index}`} type="button" className="option-button" onClick={() => values.cuisines.push(cuisine.value)}>{cuisine.label}</button>
                  )
                })}
              </div> */}
              <Multiselect
                options={CUISINES} // Options to display in the dropdown
                selectedValues={selectedCuisines} // Preselected value to persist in dropdown
                onSelect={setSelectedCuisines(selectedCuisines)} // Function will trigger on select event
                // onRemove={} // Function will trigger on remove event
                displayValue="label" // Property name to display in the dropdown options
              />
            </div>

          </Form>
        )
      }}
    </Formik >
  );
}

export default AdvancedSearchFormik;
