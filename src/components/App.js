import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AskList from './AskList'
import Answer from './Answer'
import NewQuestion from './NewQuestion'
import QuestionResults from './QuestionResults'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import NavWYR from './NavWYR'
import Logon from './Logon'
import LeaderList from './LeaderList'
import { setAuthedUser } from '../actions/authedUser'

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    const { currentUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <NavWYR />
          <div className='container'>
              {this.props.loading === true
              ? null 
            : <div>
                <Route path="/" exact
                  render={() => (
                      currentUser ? 
                      <AskList  user={this.props.users[currentUser]} />
                      : <Logon />
                    )}       
                 />
                <Route path='/new-question' component={NewQuestion} />
                <Route path='/leaderboard' render={({history}) => (
                  currentUser ? <LeaderList /> : history.push('/')
                )} />
                <Route path='/answer/:questionId' component={Answer} />
                <Route path='/questionResults/:questionId' component={QuestionResults} />
                <Route path='/logoff' render={({history}) => {
                  this.props.dispatch(setAuthedUser(null));
                  history.push('/')
                }} />

                <Route path='/logon' component={Logon} />
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
    return {
      loading: users === null,
      users,
      currentUser : authedUser
    }
  }


export default connect(mapStateToProps)(App)