import React from 'react'
import UserContext from '../../contexts/UserContext'

export default class Word extends React.Component {
  static contextType = UserContext
  state = {
    word: null
  }
  componentDidMount() {
    if (this.props) {
      let word = this.context.words.find(word => word.original === this.props.words.original)
      this.setState({
        word
      })
    }
  }
  render() {
    return(
            <div className='word-list-item'>
              {this.props.words.id}: {this.props.words.original}
              Correct: {this.props.words.correct_count}
              Incorrect: {this.props.words.incorrect_count}
            </div>
    )
  }

}
