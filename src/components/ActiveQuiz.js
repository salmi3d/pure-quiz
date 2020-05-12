import React from 'react'
import { AnswersList } from './AnswersList'

export const ActiveQuiz = props => (
  <div className="active-quiz">
    <p className="question">
      <span>
        <strong>{props.answerNumber}. &nbsp;</strong>
        {props.question}
      </span>
      <small>{props.answerNumber} of {props.quizLength}</small>
    </p>
    <AnswersList
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
)
