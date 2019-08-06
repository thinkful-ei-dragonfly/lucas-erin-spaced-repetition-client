import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'

export default class WordPage extends Component {
  static contextType = UserContext

  componentDidMount() {
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
      this.context.setCurrentWord(res)
    })
  }

  handleSubmit(userGuess) {
    //api POST request to language/guess
    // update context with res
      let resExample = {
        "nextWord": "italian word",
        "wordCorrectCount": 888,
        "wordIncorrectCount": 111,
        "totalScore": 999,
        "answer": "right answer",
        "isCorrect": false
      }
      this.context.setGuess(userGuess)
      this.context.setGuessRes(resExample)

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
      console.log(res);
      // this.context.setGuess({
      //   }
      // })
    })
  }

  render() {
    let body;
    let response;

    (this.context.guessRes.isCorrect === false) 
      ? response = <h2>Good try, but not quite right :(</h2>
      : response = <h2>You were correct! :D</h2>

    if(!this.context.userGuess){
      // return learningRoute form with question
      body = 
        <div className="word-page-body">
            <div className="DisplayScore">
              <p>Your total score is: {this.context.currentWord.totalScore}</p>
            </div>
            
            <h2>Translate the word:</h2>
            <span className="bold word"><h3>{this.context.currentWord.nextWord}</h3></span>
          
            <div className="flexbox">
              <p className="count">You have answered this word correctly <span className="bold green">{this.context.currentWord.wordCorrectCount}</span> times.</p>
              <p className="count">You have answered this word incorrectly <span className="bold red">{this.context.currentWord.wordIncorrectCount}</span> times.</p>
            </div>

            <div className="container">
            <form id="learn-guess-form" onSubmit={(e) => {
              e.preventDefault();
              console.log(`Submitted ${e.target.learn.value}`)
              this.handleSubmit(e.target.learn.value)
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
          </div>
    } else {
      // return body for incorrectGuess & next word button
      body = 
      <div className="word-page-body">
        <div className="DisplayScore">
          <p>Your total score is: {this.context.guessRes.totalScore}</p>
          {response}
        </div>
        <div className="DisplayFeedback">
          <p>The correct translation for <span className="bold">{this.context.guessRes.nextWord}</span> was <span className="bold">{this.context.guessRes.answer}</span> and you chose {this.context.userGuess}!</p>
          <button type="submit">Try another word!</button>
        </div>
      </div>
    } 

    return (
      <section className='LearningRoute'>
        {body}
      </section>
    );
  }
}
