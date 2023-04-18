import React, { useEffect, useState } from 'react'
import './style.scss'

const MultiSelectCheckbox = ({filterType, options, handleSelect}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    handleSelect(selectedOptions, filterType)
  }, [selectedOptions])

  const onChange = (event) => {
    if (!selectedOptions.includes(event.target.name)) {
      setSelectedOptions([...selectedOptions, event.target.name])
    } else {
      const updatedSelectedOptions = selectedOptions.filter(option => option !== event.target.name)
      setSelectedOptions(updatedSelectedOptions)
    }
    handleSelect(selectedOptions, filterType)
  }
  
  return (
    <div className="multiselect-checkbox">
      <div className="multiselect-field" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>{selectedOptions.length > 0 ? (
        <div className="filters-container">{selectedOptions.map((option, index) => {
          return (
            <div className="selected-option">
              <div id={option} key={`input-${option}-${index}`}>{option}</div>
              <button className="close"><i className="fas fa-times-circle"></i></button>
            </div>
          )}
        )}
      </div>) : `Select ${filterType}...`}</div>
      {/* {dropdownIsOpen &&  */}
        
          <div className={`multiselect-dropdown ${!dropdownIsOpen ? 'hidden' : ''}`}>{options.map((option, index) => {
            return (
              <div key={`${option.value}-${index}`} className="multiselect-filter">
                <input id={option.value} name={option.value} type="checkbox" onChange={onChange}></input>
                <label htmlFor={option.value}>{option.label}</label>
              </div>  
            )})}
          </div>
        
      {/* } */}
    </div>
  );
}

export default MultiSelectCheckbox;
