import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import Word from '../../components/Word/Word'

class DashboardRoute extends Component {

  state = {
    language: '',
    words: [],
    totalScore: 0,
  }

  componentDidMount(){
    let accessToken = TokenService.getAuthToken();

    const myOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    return fetch(config.API_ENDPOINT + '/language?language=Italian', myOptions)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json()
    )
    .then(res=> {
      let scores = [];
      res.words.map(word => {
        scores.push(word.correct_count)
      })
      function sum(total, num) {
        return total + num;
      };
      let total = scores.reduce(sum)
      this.setState({
        language: res.language.name,
        words: res.words,
        totalScore: total
      })
    })
  }

  render() {
    const mappedWords = this.state.words.map((word, index) => {
      return(
        <li><Word words={this.state.words[index]}/></li>)
      });

    return (
      <section className="dashboard">
        <h2 className="language-header">Italian</h2>
        <div className="bar">
          <p className="score">
            Total Score: {this.state.totalScore}
          </p>
        <button className="start" onClick={() => this.history.props.push('/learn')}>Start Practicing</button>
        </div>
        <div className="practice-words">
        <h3 className="words-header">Words to Practice</h3>
          <ul>
            {mappedWords}
          </ul>
        </div>
      </section>
    );
  }
}

export default DashboardRoute
