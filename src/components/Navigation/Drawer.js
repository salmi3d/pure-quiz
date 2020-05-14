import React, { Component } from 'react'
import { Backdrop } from '../UI/Backdrop'
import { NavLink } from 'react-router-dom'

export default class Drawer extends Component {

  renderLinks(links) {
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

    const links = [{ to: '/', label: 'Quiz List', exact: true }]

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-builder', label: 'Build a quiz', exact: false })
      links.push({ to: '/logout', label: 'Logout', exact: false })
    } else {
      links.push({ to: '/auth', label: 'Authorization', exact: false })
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    )
  }

}
