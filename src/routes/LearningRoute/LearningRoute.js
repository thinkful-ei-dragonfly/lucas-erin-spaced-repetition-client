import React, { Component } from 'react'
import WordPage from '../../components/WordPage/WordPage'

export default class LearningRoute extends Component {
  state = {
    word: null
  }

  componentDidMount() {
    let word = this.props.location.state.word
    this.setState({
      word
    })
    // make fetch request to /api/head
    // set state or context
    // pass in the word[0] as a prop
  }

  render() {
    return (
      <WordPage word={this.state.word}/>
    )
  }
}
