import React from 'react'

export const Select = props => {
  const htmlFor = `${props.label}-${Math.random()}`

  return (
    <div className="select">
      <label htmlFor={htmlFor}>{props.label}</label>
      <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, idx) => (
          <option
            key={option.value + idx}
            value={option.value}
          >{option.text}</option>
        ))}
      </select>
    </div>
  )
}
