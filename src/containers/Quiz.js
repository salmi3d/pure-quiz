import React, { Component } from 'react'
import { ActiveQuiz } from '../components/ActiveQuiz'
import { FinishedQuiz } from '../components/FinishedQuiz'
import { Loader } from '../components/UI/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../store/actions/quiz.action'

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className="quiz">
        <div className="quiz-wrapper">
          <h1>Please answer all the questions</h1>
          {
            this.props.loading || !this.props.quiz
              ? <Loader />
              : this.props.isFinished
                ? <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetryClick={this.props.retryQuiz}
                />
                : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  results: state.quiz.results,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  isFinished: state.quiz.isFinished,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading
})

const mapDispatchToProps = dispatch => ({
  fetchQuizById: id => dispatch(fetchQuizById(id)),
  quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
  retryQuiz: () => dispatch(retryQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
