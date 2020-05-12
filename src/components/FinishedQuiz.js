import React from 'react'
import { Button } from './UI/Button'
export const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') total++
    return total
  }, 0)

  return (
    <div className="finished-quiz">
      <ul>
        {props.quiz.map((quizItem, idx) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'fail'
              ? 'fa-times'
              : 'fa-check',
            props.results[quizItem.id]
          ]
          return (
            <li
              key={idx}
            >
              <strong>{idx + 1} &nbsp;</strong>
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p>Correct {successCount} of {props.quiz.length}</p>
      <div>
        <Button
          type="primary"
          onClick={props.onRetryClick}
        >Retry Quiz</Button>
        <Button
          type="success"
          onClick={null}
        >Quiz list</Button>
      </div>
    </div>
  )
}
