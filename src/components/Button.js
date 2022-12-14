import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  return (
    <button onClick={props.onClick} style={{backgroundColor: props.color}} className='btn'> {props.text} </button>
  )
}

//Alternate destructured way =>

// const Button = ({text, color}) => {
//     return (
//       <button style={{backgroundColor: color}} className='btn'>{text}</button>
//     )
//   }

Button.defaultProps ={
    color:'steelblue',
}

Button.propTypes ={
    text : PropTypes.string,
    color : PropTypes.string,
    onClick: PropTypes.func,
}

export default Button