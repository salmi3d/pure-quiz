import React, { Component } from 'react'
import { MenuToggle } from '../components/Navigation/MenuToggle'
import Drawer from '../components/Navigation/Drawer'
import { connect } from 'react-redux'

class Layout extends Component {

  state = {
    menu: false
  }

  onMenuToggleHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  onMenuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.onMenuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.onMenuToggleHandler}
          isOpen={this.state.menu}
        />
        <main className="layout">
          {this.props.children}
        </main>
      </>
    )
  }

}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(Layout)
