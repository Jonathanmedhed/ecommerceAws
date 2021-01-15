import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { sendEmailReducer } from './reducers/reducers'

const reducer = combineReducers({
	sendEmail: sendEmailReducer,
})
const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
