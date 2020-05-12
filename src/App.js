import React from 'react'
import Layout from './hoc/Layout'
import { Switch, Route } from 'react-router-dom'
import Auth from './containers/Auth'
import QuizBuilder from './containers/QuizBuilder'
import Quiz from './containers/Quiz'
import QuizList from './containers/QuizList'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-builder" component={QuizBuilder} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
      </Switch>
    </Layout>
  )
}

export default App
