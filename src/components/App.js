import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AskList from './AskList'
import Answer from './Answer'
import NewQuestion from './NewQuestion'
import QuestionResults from './QuestionResults'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
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
                <Switch>
                <Route path="/" exact
                  render={() => (
                      currentUser ? 
                      <AskList  user={this.props.users[currentUser]} />
                      : <Logon />
                    )}       
                 />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' render={({history}) => (
                  currentUser ? <LeaderList /> : history.push('/')
                )} />
                <Route path='/answer/:questionId' component={Answer} />
                <Route path='/question/:questionId' component={QuestionResults} />
                <Route path='/logoff' render={({history}) => {
                  this.props.dispatch(setAuthedUser(null));
                  history.push('/')
                }} />

                <Route path='/logon' render={({history}) => (
                  currentUser ? 
                  history.push('/')
                  : <Logon />
                )}       
                />
                <Route path='/notfound' render={({history}) => (
                  <div> Page Not Found. Click <Link to="/logon">here</Link> to logon. </div>
                  )} />
                </Switch>
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