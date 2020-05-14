import React from 'react'

export const Button = props => {
  return (
    <button
      onClick={props.onClick}
      className={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
