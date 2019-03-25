import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = { optionOne: null,
        optionTwo: null,
        toRoot: false  }

handleSubmit = (e) => {
  e.preventDefault() 
    const { dispatch, authedUser } = this.props
    const { optionOne, optionTwo } = this.state

    const now = Date.now()

    dispatch(addQuestion(
      {id: "ccc12345",
        author: authedUser,
        optionOne: { votes: [], text: optionOne },
        optionTwo: { votes: [], text: optionTwo },
        timestamp: now
        })) 

    this.setState((prevState) => ({
      optionOne: null,
      optionTwo: null,
      toRoot: true
  })) 
}

handleChange = ((event) => {
    this.setState({[event.target.name]: event.target.value});
})

render() {
  const { toRoot } = this.state
  if (toRoot === true) {
      return (<Redirect to='/' />)
  } 

  return(
      <div>
            <h2>Complete the question:</h2>
          <form onSubmit={this.handleSubmit}>
              <h1>Would you rather...</h1>
              <input
              type='text'
              name="optionOne"
              id="optionOne"
              required
              placeholder="Enter first option"
              maxLength="100"
              onChange={this.handleChange}
              /><br/>
              <input
              type='text'
              name="optionTwo"
              id="optionTwo"
              required
              placeholder="Enter secound option"
              maxLength="100"
              onChange={this.handleChange}
              /><br/>

              <button 
                  className='btn-primary'
                  type='submit'
                  >Submit
              </button>
          </form>
      </div>
  )
}
}

function mapStateToProps({authedUser}) {  
    return {
        authedUser  
    }
}

export default connect(mapStateToProps)(NewQuestion)