import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import NavItem from 'react-bootstrap/NavItem'

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'


class NavWYR extends Component {
   
  render() {
    const { currentUser } = this.props 
    return(
        <div>
          <Navbar bg='primary' variant='dark'>
            <NavbarBrand>Would You Rather?</NavbarBrand>       
            <Nav className='mr-auto'>
            
              {currentUser != null &&
                <Fragment>
                <NavLink className='nav-link' to='/' activeClassName='active'>Home</NavLink>
                <NavLink className='nav-link' to='/new-question' activeClassName='active'>New Question</NavLink>
                <NavLink className='nav-link' to='/leaderboard' activeClassName='active'>LeaderBoard</NavLink>
                </Fragment>
              }

            </Nav>
            <Nav>
              <Nav>
              <NavItem></NavItem>
              </Nav>
              <Navbar.Text>{(currentUser != null) ? currentUser.name : "Anonymous"}</Navbar.Text>
              {currentUser != null &&
              <NavLink className='nav-link' to='/'>Logoff</NavLink>
              }
            </Nav>
          </Navbar>
        </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
    return {
        currentUser : authedUser ? users[authedUser] : null      
    }
}



export default connect(mapStateToProps)(NavWYR)