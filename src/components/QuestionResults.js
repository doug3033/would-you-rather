import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class QuestionResults extends Component {
   
  render() {
    const { question, user, authedUser } = this.props 
    if (question === null) {
        console.log("HERE")
        return(<Redirect to="/notfound" />)
    }
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <NavbarBrand>Ask by {user.name}</NavbarBrand>
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
                    <h2>Results</h2>
                    <br/>
                    <Row>
                    {question.optionOne.text}
                    </Row>
                    <Row>
                    <Col id={8}>
                    </Col>
                    <Col>
                    {question.optionOne.votes.includes(authedUser) && 
                        <img 
                        src='https://www.digitalyalo.com/sites/default/files/checkmark.png' 
                        alt='check'
                        className='avatar'
                        height="40" width="40"
                        />
                    }
                    </Col>
                    </Row>
                    <Row>
                    <progress value={question.optionOne.votes.length} max={question.optionOne.votes.length + question.optionTwo.votes.length} />
                    </Row>
                    <Row>
                    {`${question.optionOne.votes.length} out of ${question.optionOne.votes.length + question.optionTwo.votes.length} votes.`}
                    </Row>
                    <Row>
                    {question.optionTwo.text}
                    </Row>
                    <Row>
                    <Col id={8}>
                    </Col>
                    <Col>
                    {question.optionTwo.votes.includes(authedUser) && 
                        <img 
                        src='https://www.digitalyalo.com/sites/default/files/checkmark.png' 
                        alt='check'
                        className='avatar'
                        height="40" width="40"
                        />
                    }
                    </Col>
                    </Row>
                    <Row>
                    <progress value={question.optionTwo.votes.length} max={question.optionOne.votes.length + question.optionTwo.votes.length} />
                    </Row>
                    <Row>
                    {`${question.optionTwo.votes.length} out of ${question.optionOne.votes.length + question.optionTwo.votes.length} votes.`}
                    </Row>

                </Col>
            </Row>
        </div>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, props) {   
    const { questionId } = props.match.params
    return {
        question: questions[questionId] ? questions[questionId] : null,
        user: questions[questionId] ? users[questions[questionId].author] : null,
        authedUser
    }
}


export default connect(mapStateToProps)(QuestionResults)