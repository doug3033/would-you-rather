import React, { Component } from 'react'
import { FormCheck } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { handleAnswerQuestion } from '../actions/users'

class Answer extends Component {
    state = {
        value: null,
        toResults: false
    }

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
        this.setState({ value: event.target.value });
    })

    render() {
        const { toResults, value } = this.state
        const { question, users } = this.props
        if (toResults === true) {
            return (<Redirect to={`/question/${question.id}`} />)
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>{users[question.author].name} ask "Would you rather..."</h1>
                    <Row>
                        <Col>
                            <img
                                src={users[question.author].avatarURL}
                                alt={`Avatar of ${question.author}`}
                                className='avatar'
                                height="100" width="100"
                            />
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>

                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    const { questionId } = props.match.params
    return {
        authedUser,
        question: questions[questionId],
        users
    }
}


export default connect(mapStateToProps)(Answer)