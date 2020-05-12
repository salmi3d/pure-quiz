import React, { Component } from 'react'
import { ActiveQuiz } from '../components/ActiveQuiz'
import { FinishedQuiz } from '../components/FinishedQuiz'
import axios from '../utils/axios'
import { Loader } from '../components/UI/Loader'

export default class Quiz extends Component {

  state = {
    results: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    loading: true,
    quiz: []
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') return
    }
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results
    if (question.rightAnswerId === answerId) {
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

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizzes/${this.props.match.params.id}.json`)
      const quiz = response.data
      this.setState({ quiz, loading: false })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="quiz">
        <div className="quiz-wrapper">
          <h1>Please answer all the questions</h1>
          {
            this.state.loading
              ? <Loader />
              : this.state.isFinished
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
