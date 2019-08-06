import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'

export default class WordPage extends Component {
  static contextType = UserContext

  componentDidMount() {
    //api GET request to /language/head
    // .then(res => this.context.setCurrentWord({}))

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
      console.log('hello');
      // this.context.setCurrentWord(res)
    })
  }

  handleSubmit(userGuess) {
    //setState with guess
    //api POST request to language/guess
    // update context with res

    let accessToken = TokenService.getAuthToken();
    let guessBody = JSON.stringify(userGuess);

    const myOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body:guessBody
    };

    return fetch(`${config.API_ENDPOINT}/language/guess`, myOptions)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json()
    )
    .then(res=> {
      console.log(res);
      // this.context.setGuess({
      //   guess: {
      //     userGuess,
      //     response: res
      //   }
      // })
    })
  }

  render() {
    let body;
    let response;

    (this.context.guess.response.isCorrect === false) 
      ? response = <h2>Good try, but not quite right :(</h2>
      : response = <h2>You were correct! :D</h2>

    if(!this.context.guess.userGuess){
      // return learningRoute form with question
      body = 
        <div className="word-page-body">
            <div className="DisplayScore">
              <p>Your total score is: {this.context.currentWord.totalScore}</p>
            </div>
            
            <h2>Translate the word:</h2>
            <h3><span className="bold word">{this.context.currentWord.nextWord}</span></h3>
          
            <div className="flexbox">
              <p className="count">You have answered this word correctly <span className="bold green">{this.context.currentWord.wordCorrectCount}</span> times.</p>
              <p className="count">You have answered this word incorrectly <span className="bold red">{this.context.currentWord.wordIncorrectCount}</span> times.</p>
            </div>
            
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
          </div>
    } else {
      // return body for incorrectGuess & next word button
      body = 
      <div className="word-page-body">
        <div className="DisplayScore">
          <p>Your total score is: {this.context.guess.response.totalScore}</p>
          {response}
        </div>
        <div className="DisplayFeedback">
          <p>The correct translation for {this.context.guess.response.nextWord} was {this.context.guess.response.answer} and you chose {this.context.guess.userGuess}!</p>
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
