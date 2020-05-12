import React from 'react'
import { AnswerItem } from './AnswerItem'

export const AnswersList = props => (
  <ul className="answers-list">
    {props.answers.map((answer, idx) => (
      <AnswerItem
        key={idx}
        answer={answer}
        onAnswerClick={props.onAnswerClick}
        state={props.state ? props.state[answer.id] : null}
      />
    ))}
  </ul>
)
