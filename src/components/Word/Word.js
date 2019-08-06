import React from 'react'
import UserContext from '../../contexts/UserContext'

export default function Word(props) {
  return (
    <div className='word-list-item'>
      <h4>{props.word.original}</h4>
      <p>correct: {props.word.correct_count}</p>
      <p>incorrect: {props.word.incorrect_count}</p>
    </div>
  )
}
