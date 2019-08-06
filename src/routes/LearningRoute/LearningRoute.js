import React, { Component } from 'react'
import WordPage from '../../components/WordPage/WordPage'

export default class LearningRoute extends Component {
  // turn this into the WordPage component. Get the value from context.words[0]
  state = {
    word: null
  }

  componentDidMount() {

    // make fetch request to /api/head
    // set state or context
    // pass in the word[0] as a prop
  }

  render() {
    return (
      <WordPage/>
    )
  }
}
