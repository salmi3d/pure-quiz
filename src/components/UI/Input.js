import React from 'react'

const isInvalid = ({ valid, touched, shouldValidate }) => !valid && shouldValidate && touched

export const Input = props => {
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`
  const cls = ['input-element']
  if (isInvalid(props)) cls.push('invalid')

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMsg || 'Please input correct value'}</span>
          : null
      }

    </div>
  )
}
