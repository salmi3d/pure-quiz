import React, { Component } from 'react'
import { Button } from '../components/UI/Button'
import { createControl, validate, validateForm } from '../utils/formFactory'
import { Input } from '../components/UI/Input'
import { Auxiliary } from '../hoc/Auxiliary'
import { Select } from '../components/UI/Select'
import { connect } from 'react-redux'
import { createQuizQuestion, createQuiz } from '../store/actions/build.action'

function createOptionControl(n) {
  return createControl({
    label: `Option #${n}`,
    errorMsg: 'Value cannot be empty',
    id: n
  }, { required: true })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Question',
      errorMsg: 'Please enter a question'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizBuilder extends Component {

  state = {
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  }

  addQuestionHandler = event => {
    event.preventDefault()
    const { question, option1, option2, option3, option4 } = this.state.formControls
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  addQuizHandler = event => {
    event.preventDefault()
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
    this.props.createQuiz()
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((item, idx) => {
      const control = this.state.formControls[item]

      return (
        <Auxiliary key={item + idx}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMsg={control.errorMsg}
            onChange={event => this.changeHandler(event.target.value, item)}
          />
          {idx === 0 ? <hr /> : null}
        </Auxiliary>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    const select = <Select
      label='Please choose correct option'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />
    return (
      <div className="quiz-builder">
        <div>
          <h1>Quiz Builder</h1>
          <form onSubmit={e => e.preventDefault()}>
            {this.renderControls()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >Add Question</Button>

            <Button
              type="success"
              onClick={this.addQuizHandler}
              disabled={this.props.quiz.length === 0}
            >Create quiz</Button>
          </form>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  quiz: state.build.quiz
})

const mapDispatchToProps = dispatch => ({
  createQuizQuestion: item => dispatch(createQuizQuestion(item)),
  createQuiz: () => dispatch(createQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizBuilder)
