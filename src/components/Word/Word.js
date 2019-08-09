import React from 'react'

export default function Word(props) {
  return (
    <div className='word-list-item'>
      <h4>{props.word.original}</h4>
      <p>correct answer count: {props.word.correct_count}</p>
      <p>incorrect answer count: {props.word.incorrect_count}</p>
    </div>
  )
}
