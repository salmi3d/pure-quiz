import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Loader } from '../components/UI/Loader'
import { connect } from 'react-redux'
import { fetchQuizzes } from '../store/actions/quiz.action'

class QuizList extends Component {

  renderQuizzes() {
    return this.props.quizzes.map(quiz => (
      <li
        key={quiz.id}
      >
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.theme}</NavLink>
      </li>
    ))
  }

  componentDidMount() {
    this.props.fetchQuizzes()
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1>Quiz List</h1>
          {
            this.props.loading && this.props.quizzes.length !== 0
              ? <Loader />
              : <ul>{this.renderQuizzes()}</ul>
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  quizzes: state.quiz.quizzes,
  loading: state.quiz.loading
})

const mapDispatchToProps = dispatch => ({
  fetchQuizzes: () => dispatch(fetchQuizzes())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
