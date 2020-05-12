import React, { Component } from 'react'
import { Backdrop } from '../UI/Backdrop'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Quiz List', exact: true },
  { to: '/auth', label: 'Authorization', exact: false },
  { to: '/quiz-builder', label: 'Build a quiz', exact: false },
]

export default class Drawer extends Component {

  renderLinks() {
    return links.map((link, idx) => {
      return (
        <li key={idx}>
          <NavLink
            to={link.to}
            exact={link.exact}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = ['drawer']
    if (!this.props.isOpen) {
      cls.push('close')
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    )
  }

}
