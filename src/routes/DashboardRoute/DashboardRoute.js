import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import Word from '../../components/Word/Word'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

class DashboardRoute extends Component {
  static contextType = UserContext

  componentDidMount(){
    let accessToken = TokenService.getAuthToken();

    const myOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    return fetch(`${config.API_ENDPOINT}/language`, myOptions)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json()
    )
    .then(res=> {
      this.context.setWords(res.words)
      this.context.setLanguage(res.language.name)
      this.context.setScore(res.language.total_score)
    })
  }

  render() {
    const mappedWords = this.context.words.map((word, index) => {
      return(
        <li key={word.id}><Word word={word}/></li>)
      });

    return (
      <section className="dashboard">
        <h2 className="language-header">{this.context.language}</h2>
        <div className="bar">
          <p className="score">
          Total correct answers: {this.context.total_score}
          </p>
          <Link
            to='/learn'
            >
            <button className="start">Start practicing</button>
          </Link>
        </div>
        <div className="practice-words">
        <h3 className="words-header">Words to practice</h3>
          <ul>
            {mappedWords}
          </ul>
        </div>
      </section>


    );
  }
}

export default DashboardRoute
