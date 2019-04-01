import { _saveQuestionAnswer } from '../util/_DATA.js'
import { showLoading, hideLoading } from 'react-redux-loading'
import { RECEIVE_USERS, ANSWER_QUESTION } from './types'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}


function answerQuestion(userId, answer) {
    return {
        type: ANSWER_QUESTION,
        userId,
        answer
    }
}

export function handleAnswerQuestion(userId, questionId, answer) {
    return (dispatch, getState) => {

        dispatch(showLoading())
        console.log('the answer is: ' + userId)
        return _saveQuestionAnswer({ authedUser: userId, qid: questionId, answer: answer })
            .then((response) => dispatch(answerQuestion(userId, { [questionId]: answer })))
            .then(() => dispatch(hideLoading()))
    }
}