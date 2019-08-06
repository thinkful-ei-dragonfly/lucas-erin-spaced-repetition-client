import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'

export default class WordPage extends Component {
  static contextType = UserContext
  
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(`Submitted ${e.target.learn.value}`);
  // }

  componentDidMount() {
    //api request to /language/head
    // .then(res => this.context.setCurrentWord({}))
  }

  render() {

    return (
      <section className='LearningRoute'>
        <p className="banner">Your total score is: {this.context.currentWord.totalScore}</p>
        <h2>Translate the word:</h2>
        <h3><span className="bold word">{this.context.currentWord.nextWord}</span></h3>
      
        <div className="container">
        <form id="learn-guess-form" onSubmit={(e) => {
          e.preventDefault();
          console.log(`Submitted ${e.target.learn.value}`)
          }}>
          <label htmlFor="learn-guess-input">What's the translation for this word?</label>
          <input type="text" 
          id="learn-guess-input" 
          name="learn" 
          placeholder="Your guess here" 
          aria-label="Word guess entry"
          aria-required="true"
          required></input>
          <button type="submit">Submit your answer</button>
        </form>
        </div>

        <p className="count">You have answered this word correctly <span className="bold green">{this.context.currentWord.wordCorrectCount}</span> times.</p>
        <p className="count">You have answered this word incorrectly <span className="bold red">{this.context.currentWord.wordIncorrectCount}</span> times.</p>
      </section>
    );
  }
}
