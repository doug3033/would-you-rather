import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Logon from './Logon'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  componentDidMount() {
    console.log("HERE1")
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <div className="App">
        <div className='container'>
          {this.props.loading === true
          ? null 
            : <div>
                <Logon />
              </div>}
        </div>

      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
    return {
      loading: authedUser === null
    }
  }


export default connect(mapStateToProps)(App)