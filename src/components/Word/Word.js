import React from 'react'

function Word(props){
  return(
    <div className="word">
      <h4>{props.words.original}</h4>
      <p>correct answer count: {props.words.correct_count}</p>
      <p>incorrect answer count: {props.words.incorrect_count}</p>
    </div>
  )
}

export default Word;