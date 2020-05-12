import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from '../utils/axios'
import { Loader } from '../components/UI/Loader'

export default class QuizList extends Component {

  state = {
    quizzes: [],
    loading: true
  }

  renderQuizzes() {
    return this.state.quizzes.map(quiz => (
      <li
        key={quiz.id}
      >
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
      </li>
    ))
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quizzes.json')
      const quizzes = []
      Object.keys(response.data).forEach((key, idx) => {
        quizzes.push({
          id: key,
          name: `Quiz #${idx + 1}`
        })
      })
      this.setState({ quizzes, loading: false })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1>Quiz List</h1>
          {
            this.state.loading
              ? <Loader />
              : <ul>{this.renderQuizzes()}</ul>
          }
        </div>
      </div>
    )
  }

}
