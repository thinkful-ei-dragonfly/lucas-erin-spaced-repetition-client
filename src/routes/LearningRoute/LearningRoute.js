import React, { Component } from 'react'

export default class LearningRoute extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`'Hi, you've submitted an answer`);
  }
  render() {
    return (
      <section className='LearningRoute'>
        <h2>Translate the word: <span className='nextWord'>{`{nextWord}`}</span></h2>
        <div className='form-section'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='word'>What's the translation of this word?</label>
            <input type='text' name='word' id='word' placeholder='type the word here'></input>
            <button>Submit your answer</button>
          </form>
        </div>
        <div className='results'>
          <div className='correct'>
            <p>You have answered this question correctly {`{correctNum}`} times</p>
          </div>
          <div className='incorrect'>
            <p>You have answered this question incorrectly {`{incorrectNum}`} times</p>
          </div>
          <div></div>
        </div>
      </section>
    );
  }
}
