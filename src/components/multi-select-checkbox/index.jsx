import React, { useEffect, useState } from 'react'
import { Field } from 'formik'
import './style.scss'

const MultiSelectCheckbox = ({listType, options, handleChange, checkboxState, setSelection}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    console.log("selectedOptions have changed [USE_EFFECT]", selectedOptions)
  }, [selectedOptions])

  const onChange = (event) => {
    console.log('onChange: ', event.target)
    if (!selectedOptions.includes(event.target.name)) {
      setSelectedOptions(selectedOptions.concat(event.target.name))
    }

    if (selectedOptions.includes(event.target.name)) {
      const targetIndex = selectedOptions.indexOf(event.target.name)
      console.log('targetIndex', targetIndex)
      const selectedOptionsShallowCopy = selectedOptions.slice()
      selectedOptionsShallowCopy.splice(targetIndex, 1)
      console.log('selectedOptionsCopy', selectedOptionsShallowCopy)
      console.log('selectedOptions', selectedOptions)
      setSelectedOptions(selectedOptionsShallowCopy)
    }
    console.log('selectedOptions', selectedOptions)
    setSelection(selectedOptions)
    handleChange(event)
  }

  return (
    <div className="multiselect-checkbox">
      <div className="multiselect-field" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>{selectedOptions.length > 0 ? (
        <div className="filters-container">{selectedOptions.map((option, index) => {
          return (
            <div id={option} key={`input-${option}-${index}`} className="selected-option">{option}</div>
          )}
        )}
      </div>) : `Select ${listType}...checkbox...`}</div>
      {dropdownIsOpen && (
          <div className="multiselect-dropdown">{options.map((option, index) => {
            return (
              <div key={`${option.value}-${index}`} className="multiselect-filter">
                <input id={option.value} name={option.value} type="checkbox" onChange={onChange}></input>
                <label htmlFor={option.value}>{option.label}</label>
              </div>  
            )})}
          </div>
        )
      }
    </div>
  );
}

// What if we 

export default MultiSelectCheckbox;
