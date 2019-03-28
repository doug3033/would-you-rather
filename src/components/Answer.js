import React, { Component } from 'react'
import { FormCheck } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/users'

class Answer extends Component {
    state = { value: null,
              toResults: false  }

    handleSubmit = (e) => {
        e.preventDefault() 
        const { authedUser, question, dispatch } = this.props
        dispatch(handleAnswerQuestion(authedUser, question.id, this.state.value)) 

        this.setState((prevState) => ({
            value: null,
            toResults: true
        }))
      }

    handleChange = ((event) => {
        this.setState({value: event.target.value});
    })

    render() {
        const { toResults, value } = this.state
        const { question } = this.props
        if (toResults === true) {
            return (<Redirect to={`/question/${question.id}`} />)
        }

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Would you rather...</h1>
                    <FormCheck 
                    type='radio'
                    value="optionOne"
                    checked={value === "optionOne"}
                    label={question.optionOne.text}
                    onChange={this.handleChange}
                    />
                    <FormCheck 
                    type='radio'
                    value="optionTwo"
                    checked={value === "optionTwo"}
                    label={question.optionTwo.text}
                    onChange={this.handleChange}
                    />

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

function mapStateToProps({ authedUser, questions }, props ) {
    const { questionId } = props.match.params
    return {
      authedUser,
      question : questions[questionId]
    }
  }


export default connect(mapStateToProps)(Answer)