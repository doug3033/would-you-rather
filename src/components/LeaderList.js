import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Leader from './Leader'
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class LeaderList extends Component {

   
  render() {
    const {  userList, authedUser } = this.props
    if ( authedUser === null )  {
        return (<Redirect to='/logon' />)
    }
    
    return(
        <div>
            <h1>Leaderboard</h1>
            {   
                userList.map((user) => {
                    return (
                        <Row key={user.id}>
                            <Leader key={user.id} userKey={user.id} 
                                answerCount={user.answeredQuestionsList.length} 
                                questionCount={user.questions.length} 
                                totalCount={user.totalScore} />
                        </Row>
                    )
            })}
        </div>
    )
  }

}

function mapStateToProps({users, authedUser}) {
    const userList = []
    Object.keys(users).forEach((key) => {
        userList.push(users[key])
    })
    userList.forEach((user) => {
        user.answeredQuestionsList = []
        Object.keys(user.answers).forEach((key) => {
            user.answeredQuestionsList.push(key)
        })
        user.totalScore = user.questions.length + user.answeredQuestionsList.length
    })
    return {
        authedUser,
        userList: userList
            .sort((a,b) => b.totalScore - a.totalScore)
    }
}


export default connect(mapStateToProps)(LeaderList)