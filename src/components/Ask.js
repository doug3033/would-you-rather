import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

class Ask extends Component {
   
  render() {
    const { user, question, questionsAnswered } = this.props 
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <NavbarBrand>{user.name}</NavbarBrand>
            </Navbar>
            <Row>
                <Col>
                    <img 
                    src={user.avatarURL} 
                    alt={`Avatar of ${user.id}`} 
                    className='avatar'
                    height="100" width="100"
                    />
                </Col>
                <Col>
                    <h2>Would you rather</h2>
                    <br/>
                    <h4>{question.optionOne.text.substring(0,9)}...</h4>
                    {!questionsAnswered.includes(question.id) ?  
                                                
                        <Link to={`./answer/${question.id}`}>
                        <Button  size="lg" block> 
                        Answer Poll
                        </Button>
                        </Link>
                        :
                        <Link to={`./questionResults/${question.id}`}>
                        <Button variant="primary" size="lg" block>
                        View Poll
                        </Button>
                        </Link>
                    }

                </Col>
            </Row>
        </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}) {
    
    return {
        questions,
        questionsAnswered: Object.keys(users[authedUser].answers)   
    }
}


export default connect(mapStateToProps)(Ask)