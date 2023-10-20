import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import './style.scss';

interface MultiSelectCheckboxProps {
  filterType: string;
  options: {
    value: string;
    label: string;
  }[];
  handleSelect: Function;
  label: string;
}

const MultiSelectCheckbox = (props: MultiSelectCheckboxProps) => {
  const { filterType, options, handleSelect, label } = props;
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    handleSelect(selectedOptions, filterType);
  }, [selectedOptions]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!selectedOptions.includes(event.target.name)) {
      setSelectedOptions([...selectedOptions, event.target.name]);
    } else {
      const updatedSelectedOptions = selectedOptions.filter(
        (option) => option !== event.target.name
      );
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  const removeOption = (event: MouseEvent<HTMLButtonElement>, option: string) => {
    event?.preventDefault();
    console.log('option', option);
    const updatedSelectedOptions = selectedOptions.filter((opt) => option !== opt);
    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <div className="multiselect-checkbox">
      <div className="multiselect-label">{label}</div>
      <div className="multiselect-field" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
        {selectedOptions.length > 0 ? (
          <div className="filters-container">
            {selectedOptions.map((option, index) => {
              console.log('option:', option);
              return (
                <div key={index} className="selected-option">
                  <div id={option}>{option}</div>
                  <button className="close" onClick={(event) => removeOption(event, option)}>
                    <i className="fas fa-times-circle"></i>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          `Select ${filterType}...`
        )}
      </div>
      {/* {dropdownIsOpen &&  */}
      <div className={`multiselect-dropdown ${!dropdownIsOpen ? 'hidden' : ''}`}>
        {Array.isArray(options) &&
          options.map((option: Record<string, string>, index: number) => {
            return (
              <div key={`${option.value}-${index}`} className="multiselect-filter">
                <input
                  id={option.value}
                  name={option.value}
                  type="checkbox"
                  onChange={onChange}
                  checked={selectedOptions.includes(option.value)}
                ></input>
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            );
          })}
      </div>
      {/* } */}
    </div>
  );
};

export default MultiSelectCheckbox;
