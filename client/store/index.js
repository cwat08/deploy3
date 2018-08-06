import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import pictures from './pictures'
import words from './words'
import prompts from './prompt'
import colors from './colors'
import stickers from './stickers'

const reducer = combineReducers({
  user,
  pictures,
  words,
  prompts,
  colors,
  stickers
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
