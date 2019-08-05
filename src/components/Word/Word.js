import React from 'react'

function Word(props){
  return(
    <div className="word">
      <h3>{props.words.original}</h3>
      <p>Correct: {props.words.correct_count}</p>
      <p>Incorrect: {props.words.incorrect_count}</p>
    </div>
  )
}

export default Word;