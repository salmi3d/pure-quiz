import React, { Component } from 'react'
import Layout from './hoc/Layout'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Auth from './containers/Auth'
import QuizBuilder from './containers/QuizBuilder'
import Quiz from './containers/Quiz'
import QuizList from './containers/QuizList'
import { connect } from 'react-redux'
import Logout from './components/Logout'
import { autoLogin } from './store/actions/auth.action'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    return (
      <Layout>
        <Switch>
          {!this.props.isAuthenticated && <Route path="/auth" component={Auth} />}
          {this.props.isAuthenticated && <Route path="/logout" component={Logout} />}
          {this.props.isAuthenticated && <Route path="/quiz-builder" component={QuizBuilder} />}
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    )
  }

}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
