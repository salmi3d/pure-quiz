import React, { Component } from 'react'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import axios from 'axios'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMsg: 'Please enter a valid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMsg: 'Please enter a password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const { email: { value: email }, password: { value: password } } = this.state.formControls
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, authData)
      console.warn(response.data);

    } catch (e) {
      console.error(e)
    }
  }

  registerHandler = async () => {
    const { email: { value: email }, password: { value: password } } = this.state.formControls
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, authData)
      console.warn(response.data);

    } catch (e) {
      console.error(e)
    }
  }

  submitHandler = event => event.preventDefault()

  validateControl = (value, validation) => {
    if (!validation) return true

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({ formControls, isFormValid })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((item, idx) => {
      const control = this.state.formControls[item]
      return (
        <Input
          key={item + idx}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMsg={control.errorMsg}
          onChange={event => this.onChangeHandler(event, item)}
        />
      )
    })
  }

  render() {
    return (
      <div className="auth">
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Sign IN</Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Sign UP</Button>
          </form>
        </div>
      </div>
    )
  }

}
