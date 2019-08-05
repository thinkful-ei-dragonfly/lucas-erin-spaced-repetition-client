import React, { Component } from 'react'

export default class LearningRoute extends Component {
  // setting basic class states to show correct or incorrect answers:
  state = {
    guess: 'huh',
    original: 'ciao',
    answer: 'hello',
    correctNum: 0,
    incorrectNum: 0,
    totalScore: 0,
    nextWord: null
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Hi, you've submitted an answer`);
  }
  render() {
    let subtitle = ('Translate the word: <span className=`nextWord`>{`{nextWord}`}</span>')
    let correctAnswers = (`You have answered this question correctly ${this.state.correctNum} times`)
    let incorrectAnswers = (`You have answered this question incorrectly ${this.state.incorrectNum} times`)
    let totalScore = (`Your total score is: ${this.state.totalScore}`)
    let alertMessage = ''
    let buttonText = 'Submit your answer'
    if (this.state.guess === this.state.answer) {
      subtitle = ('You were correct!')
      alertMessage = (
        <p className='green'>
          The correct translation for {this.state.original} was {this.state.answer} and you chose {this.state.guess}!
        </p>
      )
      buttonText = `Try another word`
    } else if (this.state.guess !== this.state.answer) {
      subtitle = (`Good try, but not quite right :(`)
      alertMessage = (
        <p className='red'>
          The correct translation for {this.state.original} was {this.state.answer} and you chose {this.state.guess}!
        </p>
      )
      buttonText = `Try another word`
    }
    return (
      <section className='LearningRoute'>
        <h2>{subtitle}</h2>
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
        </div>
      </section>
    );
  }
}
