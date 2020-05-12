import React from 'react'

export const MenuToggle = props => {
  const cls = [
    'menu-toggle',
    'fa',
  ]

  if (props.isOpen) {
    cls.push('fa-times')
    cls.push('open')
  } else {
    cls.push('fa-bars')
  }

  return (
    <i
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  )
}
