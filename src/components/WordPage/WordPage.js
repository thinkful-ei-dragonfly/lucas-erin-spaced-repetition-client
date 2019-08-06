import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'

export default class WordPage extends Component {
  static contextType = UserContext
  
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Hi, you've submitted an answer`);
  }

  componentDidMount() {

    //api request to /language/head
    // .then(res => this.context.setCurrentWord({}))
  
  }

  render() {
   
    // let subtitle = (`Translate the word: <span className='word'>${this.state.word}</span>`)
    // let correctAnswers = (`You have answered this question correctly ${this.state.word} times`)
    // let incorrectAnswers = (`You have answered this question incorrectly ${this.state.word} times`)
    // let totalScore = (`Your total score is: ${this.state.word}`)
    // let alertMessage = ''
    // let buttonText = 'Submit your answer'

    return (
      <section className='LearningRoute'>
        {/* <h2>{subtitle}</h2>
        {alertMessage}
        <div className='form-section'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='word'>What's the translation of this word?</label>
            <input type='text' name='word' id='word' placeholder='type the word here'></input>
            <button>{buttonText}</button>
          </form>
        </div>
        <div className='results'>
          <div className='correct'>
            <p>{correctAnswers}</p>
          </div>
          <div className='incorrect'>
            <p>{incorrectAnswers}</p>
          </div>
          <div className='total'>
            <p>{totalScore}</p>
          </div>
        </div> */}
      </section>
    );
  }
}
