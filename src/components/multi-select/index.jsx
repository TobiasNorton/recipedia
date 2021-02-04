import React, { useEffect, useState } from 'react'
import { Field } from 'formik'
import './style.scss'

const MultiSelect = ({filterType, options, handleSelect}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    console.log("selectedOptions have changed [USE_EFFECT]", selectedOptions)
    handleSelect(selectedOptions, filterType)
  }, [selectedOptions])

  // const addOption = (option) => {
  //   console.log('CALLED', option)
  //   if (!selectedOptions.includes(option)) {
  //     setSelectedOptions(selectedOptions.concat(option))
  //   }
  //   console.log('selectedOptions', selectedOptions)
  // }

  // const handleClick = (event) => {
  //   console.log('event.target', event.target)
  //   console.log('event.target.value', event.target.value)
  //   if (!selectedOptions.includes(event.target.value)) {
  //     setSelectedOptions([...selectedOptions, event.target.value])
  //   } else {
  //     const updatedSelectedOptions = selectedOptions.filter(option => option !== event.target.value)
  //     setSelectedOptions(updatedSelectedOptions)
  //   }
  // }

  // const toggleSelect = (event) => {
  //   console.log('toggleSelect multiselect')
  //   if (!selectedOptions.includes(event.target.id)) {
  //     setSelectedOptions([...selectedOptions, event.target.id])
  //   } else {
  //     const updatedSelectedOptions = selectedOptions.filter(option => option !== event.target.id)
  //     setSelectedOptions(updatedSelectedOptions)
  //   }
  // }

  const onChange = (event) => {
    console.log('onchange multiselect BARS')
    if (!selectedOptions.includes(event.target.name)) {
      setSelectedOptions([...selectedOptions, event.target.name])
    } else {
      const updatedSelectedOptions = selectedOptions.filter(option => option !== event.target.name)
      setSelectedOptions(updatedSelectedOptions)
    }
  }

  return (
    <div className="multiselect">
      <div className="multiselect-field" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>{selectedOptions.length > 0 ? (
        <div className="filters-container">{selectedOptions.map((option, index) => {
          return (
            <div id={option} key={`input-${option}-${index}`} className="selected-option">{option}</div>
            // <input id={option.label} key={`input-${option.value}-${index}`} name={option.label} type="text" className="selected-option" value={option.value} size={option.label && option.label.length + 1}></input>
          )
        }
        )}
      </div>) : `Select ${filterType}...Part Two`}</div>
      {/* {dropdownIsOpen &&  */}
      
        <div className={`multiselect-dropdown ${!dropdownIsOpen ? 'hidden' : ''}`}>
          {/* <ul>{options.map((option, index) => {
            return (
              <li key={`${option.value}-${index}`} className="multiselect-li" 
              // onClick={() => addOption(option)}
              value={option.value}
              onClick={handleClick}
              >{option.label}</li>
            )
          })}
          </ul> */}
          {options.map((option, index) => {
            return (
              <div key={`${option.value}-${index}`} id={option.value} className="multiselect-filter">
                <input id={option.value} name={option.value} type="checkbox" onChange={onChange}></input>
                <label htmlFor={option.value}>{option.label}</label>
              </div>  
            )})}
        </div>
      
      {/* } */}
    </div>
  );
}

export default MultiSelect;
