import React from 'react'

export const AnswerItem = props => {
  const cls = ['answer-item']
  if (props.state) {
    cls.push(props.state)
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  )
}
