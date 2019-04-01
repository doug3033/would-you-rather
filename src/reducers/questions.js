import { ADD_QUESTION, RECEIVE_QUESTIONS } from '../actions/types'
import { ANSWER_QUESTION } from '../actions/types'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        case ANSWER_QUESTION:
            const answerQuestion = state[Object.keys(action.answer)[0]]
            const response = action.answer[Object.keys(action.answer)[0]]
            answerQuestion[response].votes = answerQuestion[response].votes.concat(action.userId)
            return {
                ...state,
                [answerQuestion.id]: answerQuestion
            }
        default:
            return state


    }
}