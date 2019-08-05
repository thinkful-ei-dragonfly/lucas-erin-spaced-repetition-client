import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import Word from '../../components/Word/Word'
// import './DashboardRoute.css'
// import learningroute

class DashboardRoute extends Component {

  // Add a state
  // totalscore stored in state
  // pass in function to update total score to each component

  // componentDidMount()
  // fetch all words
  // pass in words to each learningRoute component as a prop

  // create updateScore function to pass down to components
  // if the score is correct then update the parent "total score" in Dashboard component

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
      console.log(res.words)
      this.setState({
        language: res.language.name,
        words: res.words
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
