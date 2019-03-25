import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import middleware from './middleware'

const store = createStore(reducer, middleware)
/* store.dispatch(handleInitialData())


let question = {"id": "1234",
"author": "doug",
"optionOne": {},
"optionTwo": {},
"timestamp": 123567}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

sleep(10000).then(() => {
    store.dispatch(addQuestion(question))
})


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

sleep(10000).then(() => {
    store.dispatch(answerQuestion('sarahedo', {'vthrdm985a262al8qx3do': 'optionOne' }))
})
*/


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, 
    document.getElementById('root')
    )


