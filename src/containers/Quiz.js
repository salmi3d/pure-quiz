import React, { Component } from 'react'
import { ActiveQuiz } from '../components/ActiveQuiz'
import { FinishedQuiz } from '../components/FinishedQuiz'

export default class Quiz extends Component {

  state = {
    results: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    quiz: [
      {
        id: 1,
        question: 'What is the name of the network of computers from which the Internet has emerged?',
        trueAnswerId: 3,
        answers: [
          { text: 'Silkroad', id: 1 },
          { text: 'Skynet', id: 2 },
          { text: 'Arpanet', id: 3 },
          { text: 'Turbonet', id: 4 }
        ]
      },
      {
        id: 2,
        question: 'In what year was Google launched on the web?',
        trueAnswerId: 2,
        answers: [
          { text: '1997', id: 1 },
          { text: '1998', id: 2 },
          { text: '1999', id: 3 },
          { text: '2000', id: 4 }
        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') return
    }
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results
    if (question.trueAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results
      })
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 500)
    } else {
      results[question.id] = 'fail'
      this.setState({
        answerState: { [answerId]: 'fail' },
        results
      })
    }
  }

  onRetryClickHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  isQuizFinished = () => this.state.activeQuestion + 1 === this.state.quiz.length

  render() {
    return (
      <div className="quiz">
        <div className="quiz-wrapper">
          <h1>Please answer all the questions</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetryClick={this.onRetryClickHandler}
              />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }

}
