import React, { Component } from 'react'
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
  render() {

    // <li><Link to='/learn' classname"bold" onSubmit={this.updateScore}>{this.state.words[i].word}</h3>
    return (
      <section className="dashboard">
        <h2 className="language-header">Italian</h2>
        <div className="bar">
          <p className="score">
            Total Score: 4
          </p>
        <button className="start">Start Practicing</button>
        </div>
        <div className="practice-words">
        <h3 className="words-header">Words to Practice</h3>
          <ul>
            <li><h3 className="bold">Word 1</h3>  <p className="green">Correct: 1</p>  <p className="red">Incorrect: 2</p></li>
            <li><h3 className="bold">Word 2</h3>  <p className="green">Correct: 2</p>  <p className="red">Incorrect: 1</p></li>
            <li><h3 className="bold">Word 3</h3>  <p className="green">Correct: 1</p>  <p className="red">Incorrect: 0</p></li>
            <li><h3 className="bold">Word 4</h3>  <p className="green">Correct: 2</p>  <p className="red">Incorrect: 1</p></li>
            <li><h3 className="bold">Word 5</h3>  <p className="green">Correct: 1</p>  <p className="red">Incorrect: 0</p></li>
            <li><h3 className="bold">Word 6</h3>  <p className="green">Correct: 2</p>  <p className="red">Incorrect: 1</p></li>
            <li><h3 className="bold">Word 7</h3>  <p className="green">Correct: 1</p>  <p className="red">Incorrect: 0</p></li>
            <li><h3 className="bold">Word 8</h3>  <p className="green">Correct: 2</p>  <p className="red">Incorrect: 1</p></li>
            <li><h3 className="bold">Word 9</h3>  <p className="green">Correct: 1</p>  <p className="red">Incorrect: 0</p></li>
          </ul>
        </div>
      </section>
    );
  }
}

export default DashboardRoute
