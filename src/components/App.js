import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AskList from './AskList'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <div className="App">
        <div className='container'>
          {this.props.loading === true
            ? null 
            : <div>
                <AskList user={this.props.users['sarahedo']} />
              </div>
          }
        </div>

      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
    return {
      loading: authedUser === null,
      users
    }
  }


export default connect(mapStateToProps)(App)