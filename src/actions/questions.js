import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestion } from '../util/_DATA.js'
import { ADD_QUESTION, RECEIVE_QUESTIONS } from './types'


function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question) {
    return (dispatch, getState) => {
        const optionOneText = question.optionOne.text
        const optionTwoText = question.optionTwo.text
        const author = question.author

        dispatch(showLoading())

        return _saveQuestion({ optionOneText: optionOneText, optionTwoText: optionTwoText, author: author })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}