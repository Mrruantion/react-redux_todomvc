import { combineReducers } from 'redux'
import todos from './todos'

const rootReducer = combineReducers({ todos })
console.log(todos,'todos')
console.log(rootReducer,'rootReducer')
export default rootReducer