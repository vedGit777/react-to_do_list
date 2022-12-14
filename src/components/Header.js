import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = (props) => {
    const location = useLocation()

  return (
    <header className='header'>
        <h1>{props.title}</h1>
        {location.pathname==='/' && <Button onClick={props.onAdd} text={props.showAdd ? 'Close' : 'Add'} color={props.showAdd ? 'red' :'green'}/>}
    </header>
  )
}

Header.defaultProps = { 
    title:'ye consider nahi hoga, because we have OVERWRITTEN default prop set in App.js',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header