import React from 'react'

function Word(props){
  return(
    <div>
      {props.words.id}: {props.words.original}
      Correct: {props.words.correct_count}
      Incorrect: {props.words.incorrect_count}
    </div>
  )
}

export default Word;