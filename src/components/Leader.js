import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

class Leader extends Component {
   
  render() {
    const { currentUser, answeredQuestionsList } = this.props 
    return(
        <div>
        <Container>
        <Row>
            <Col xs={2}>
                <img 
                    src={currentUser.avatarURL} 
                    alt={`Avatar of ${currentUser.id}`} 
                    className='avatar'
                    height="100" width="100"
                />
            </Col>
            <Col xs={8}>
                <Row>
                    <Col>
                        <Navbar bg="light" expand="lg">
                        <NavbarBrand>{currentUser.name}</NavbarBrand>
                        </Navbar>
                    </Col>
                    <Col>
                        <Navbar bg="light" expand="lg">
                        <NavbarBrand>Score</NavbarBrand>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Answered Questions {answeredQuestionsList.length}<br/>
                        Created Questions {currentUser.questions.length}
                    </Col>
                    <Col>
                        <div className="numberCircle">
                        {answeredQuestionsList.length + currentUser.questions.length}
                        </div>               
                    </Col>
                </Row>
            </Col> 
            </Row>
            </Container>
        </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
    const answeredQuestionsList = []
    authedUser && Object.keys(users[authedUser].answers).forEach((key) => {
        answeredQuestionsList.push(key)
    })
    return {
        currentUser : users[authedUser],
        answeredQuestionsList  
    }
}

export default connect(mapStateToProps)(Leader)