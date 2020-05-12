import React, { Component } from 'react'
import { Backdrop } from '../UI/Backdrop'

const links = [1, 2, 3]

export default class Drawer extends Component {

  renderLinks() {
    return links.map((link, idx) => {
      return (
        <li key={idx}>
          <a>Link {link}</a>
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
