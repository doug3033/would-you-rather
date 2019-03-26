import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Ask from './Ask'
import 'bootstrap/dist/css/bootstrap.css';

class AskList extends Component {

   
  render() {
    const { answeredQuestionList, unansweredQuestionList, users, user } = this.props
    return(
        user ? 
        <div>
            <Tabs defaultActiveKey="UnansweredQuestions">
                <Tab eventKey="UnansweredQuestions" title="Unanswered Questions">
                    { 
                        
                        unansweredQuestionList.map((question) => {
                            return (
                                <Row key={question.id}>
                                    <Ask key={question.id} user={users[question.author]} question={question} />
                                </Row>
                            )
                    })}
                </Tab>
                <Tab eventKey="AnsweredQuestions" title="Answered Questions">
                    {   
                        answeredQuestionList.map((question) => {
                            return (
                                <Row key={question.id}>
                                    <Ask key={question.id} user={users[question.author]} question={question} />
                                </Row>
                            )
                    })}
                </Tab>
            </Tabs>
        </div> : null
    )
  }

}

function mapStateToProps({questions, users}, {user}) {
    const answeredQuestionList = []
    const unansweredQuestionList = []
    user && Object.keys(questions).forEach((key) => {
        if (Object.keys(user.answers).includes(key)) {
            answeredQuestionList.push(questions[key])
        }
    })
    questions && user && Object.keys(questions).forEach((key) => {
        if (!Object.keys(user.answers).includes(key)) {
            unansweredQuestionList.push(questions[key])
        } 
    })
    return {
        answeredQuestionList,
        unansweredQuestionList,
        users
    }
}


export default connect(mapStateToProps)(AskList)