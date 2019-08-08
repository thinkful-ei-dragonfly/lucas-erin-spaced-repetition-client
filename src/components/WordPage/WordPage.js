import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import LanguageContext from '../../contexts/LanguageContext'

export default class WordPage extends Component {
  static contextType = LanguageContext

  componentDidMount() {
    // resets the component for each load
    this.context.setIsCorrect(null)
    this.context.setAnswer(null)
    this.context.setNextWord(null)
    this.context.setWordCorrectCount(0)
    this.context.setWordIncorrectCount(0)
    this.context.setTotalScore(null)

    let accessToken = TokenService.getAuthToken();

    const myOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    return fetch(`${config.API_ENDPOINT}/language/head`, myOptions)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json()
    )
    .then(res=> {
      this.context.setNextWord(res.nextWord)
      this.context.setWordCorrectCount(res.wordCorrectCount)
      this.context.setWordIncorrectCount(res.wordIncorrectCount)
      this.context.setTotalScore(res.totalScore)
    })
  }

  //finish tomorrow (next button)
  resetContext = () => {
    this.context.setIsCorrect(null)
    this.context.setAnswer(null)
  }

  handleSubmit(userGuess) {
    this.context.setGuess(userGuess)
    let accessToken = TokenService.getAuthToken();
    let guessBody = JSON.stringify({guess: userGuess})
    console.log(guessBody)

    const myOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: guessBody
    };

    return fetch(`${config.API_ENDPOINT}/language/guess`, myOptions)
    .then(res => (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
    .then(res=> {
      // we get back the linkedlist with a head
      // the head has a value and a next property
      console.log(res);
      this.context.setIsCorrect(res.isCorrect)
      this.context.setAnswer(res.answer)
      this.context.setPrevWord(this.context.nextWord)
      this.context.setNextWord(res.nextWord)
      this.context.setWordCorrectCount(res.wordCorrectCount)
      this.context.setWordIncorrectCount(res.wordIncorrectCount)
      this.context.setTotalScore(res.totalScore)
    })
  }

  render() {
    let body;
    let response;

    (this.context.isCorrect === false)
      ? response = <h2>Good try, but not quite right :(</h2>
      : response = <h2>You were correct! :D</h2>

    if(!this.context.answer){
      // return learningRoute form with question
      body =
        <article className="word-page-body" aria-controls="learningRoute-aria">

            <header className="DisplayScore">
              <p>Your total score is: {this.context.totalScore}</p>
            </header>


            <h2>Translate the word:</h2>
            <span className="bold word"><h3>{this.context.nextWord}</h3></span>

            <section className="flexbox answers-count">
              <p className="count">You have answered this word correctly <span className="bold green">{this.context.wordCorrectCount}</span> times.</p>
              <p className="count">You have answered this word incorrectly <span className="bold red">{this.context.wordIncorrectCount}</span> times.</p>
            </section>

            <div className="container">
              <form id="learn-guess-form" onSubmit={(e) => {
                e.preventDefault();
                this.handleSubmit(e.target.learn.value)
                }}>
                <label htmlFor="learn-guess-input">What's the translation for this word?</label>
                <input type="text"
                id="learn-guess-input"
                name="learn"
                placeholder="Your guess here"
                aria-label="Word guess entry"
                aria-required="true"
                tabIndex='1'
                required></input>
                <button type="submit">Submit your answer</button>
              </form>
            </div>
        </article>
    } else {
      // return body for incorrectGuess & next word button
      body =
      <div className="word-page-body" aria-controls="learningRoute-aria">

        <header className="DisplayScore">
          <p>Your total score is: {this.context.totalScore}</p>
          {response}
        </header>
        <div className="DisplayFeedback">
          <p>The correct translation for <span className="bold">{this.context.prevWord}</span> was <span className="bold">{this.context.answer}</span> and you chose {this.context.guess}!</p>
          <button onClick={this.resetContext}>Try another word!</button>
        </div>
      </div>
    }

    return (
      <section className='LearningRoute' id='learningRoute-aria' aria-live="polite">
        {body}
      </section>
    );
  }
}
