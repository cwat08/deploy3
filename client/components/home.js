import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Word from './word'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      hasClicked: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    console.log(this.state.hasClicked)
    this.setState({hasClicked: true})
  }

  render() {
    if (this.state.hasClicked) {
      return <Redirect to="/play" />
    } else {
      return (
        <div>
          <button className="centered" onClick={this.handleClick} type="submit">
            PLAY
          </button>
        </div>
      )
    }
  }
}
