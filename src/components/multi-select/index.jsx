import React, { useEffect, useState } from 'react'
import { Field } from 'formik'
import './style.scss'

const MultiSelect = ({ listType, options }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    console.log("selectedOptions have changed [USE_EFFECT]", selectedOptions)
  }, [selectedOptions])

  const addOption = (option) => {
    console.log('CALLED', option)
    if (!selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.concat(option))
    }
    console.log('selectedOptions', selectedOptions)
  }

  return (
    <div className="multiselect">
      <div className="multiselect-field" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>{selectedOptions.length > 0 ? (
        <div>{selectedOptions.map((option, index) => {
          console.log('Heh, yea...')
          return (
            <input id={option.label} key={`input-${option.value}-${index}`} name={option.label} type="text" className="selected-option" value={option.value} size={option.label && option.label.length + 1}></input>
          )
        }
        )}
        </div>) : `Select ${listType}...`}</div>
      {dropdownIsOpen && (
        <div className="multiselect-dropdown">
          <ul>{options.map((option, index) => {
            return (
              <li key={`${option.value}-${index}`} className="multiselect-li" onClick={() => addOption(option)}>{option.label}</li>
            )
          })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
