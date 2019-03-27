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
    const { currentUser, answerCount, questionCount, totalCount } = this.props 
    return(
        <div>
        <Container>
        <Row>
            <Col xs={4}>
                <img 
                    src={currentUser.avatarURL} 
                    alt={`Avatar of ${currentUser.id}`} 
                    className='avatar'
                    height="100" width="100"
                />
            </Col>
            <Col xs={8}>
                <Row>
                    <Col xs={10}>
                        <Navbar bg="light" expand="lg">
                        <NavbarBrand>{currentUser.name}</NavbarBrand>
                        </Navbar>
                    </Col>
                    <Col xs={2}>
                        <Navbar bg="white" expand="lg">
                        <NavbarBrand>Score</NavbarBrand>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10}>
                        Answered Questions {answerCount}<br/>
                        Created Questions {questionCount}
                    </Col>
                    <Col xs={2}>
                        <div className="numberCircle">
                        {totalCount}
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

function mapStateToProps({users}, {userKey, answerCount, questionCount, totalCount}) {
    const answeredQuestionsList = []
    userKey && Object.keys(users[userKey].answers).forEach((key) => {
        answeredQuestionsList.push(key)
    })
    return {
        currentUser : users[userKey],
        answerCount,
        questionCount,
        totalCount
    }
}

export default connect(mapStateToProps)(Leader)