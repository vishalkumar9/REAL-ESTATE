import React, { useState } from 'react'

import './ShowOption.css'

const ShowOption = ({ options, onChange, text, flag }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionClick = (option) => {
    if (flag) setSelectedOption(option.city)
    else setSelectedOption(option)
    setIsOpen(false)
    onChange(option)
  }

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        <p>{selectedOption ? selectedOption : text}</p>
      </div>
      {isOpen && (
        <div className="options-container">
          {flag
            ? options.map((option) => (
                <div
                  key={option.city}
                  className="option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.city}
                </div>
              ))
            : options.map((option) => (
                <div
                  key={option}
                  className="option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

export default ShowOption
