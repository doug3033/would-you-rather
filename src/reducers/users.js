import { RECEIVE_USERS , ANSWER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS: 
            return {
            ...state,
            ...action.users
            }
        case ANSWER_QUESTION:
            const updatedUser = { ...state[action.userId] }
            updatedUser.answers = { 
                ...updatedUser.answers,  
                ...action.answer } 
            return { 
                ...state,
                [ action.userId ]: updatedUser
            }
        default :
            return state
            
    }
}