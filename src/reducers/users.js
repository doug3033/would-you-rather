import { RECEIVE_USERS, ANSWER_QUESTION } from '../actions/types'
import { ADD_QUESTION } from '../actions/types'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            const updatedUser = { ...state[action.userId] }
            updatedUser.answers = {
                ...updatedUser.answers,
                ...action.answer
            }
            return {
                ...state,
                [action.userId]: updatedUser
            }
        case ADD_QUESTION:
            const { question } = action
            const questionList = state[question.author].questions.concat(question.id)
            const userInfo = { ...state[question.author], questions: questionList }
            return {
                ...state,
                [question.author]: userInfo
            }
        default:
            return state

    }
}