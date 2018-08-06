import axios from 'axios'

/**
 * ACTION TYPES
 */
// const GET_PICTURES = 'GET PICTURES'
// const SEARCH_PICTURES = 'SEARCH_PICTURES'

/**
 * INITIAL STATE
 */
export const defaultPrompts = [
  'noun',
  'verb',
  'adjective',
  'city',
  'animal',
  'actor',
  'country',
  'artist',
  'musician',
  'color',
  'texture',
  'person',
  'vehicle',
  'land form',
  'monument',
  'movie',
  'garment',
  'body part'
]

/**
 * ACTION CREATORS
 */

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultPrompts, action) {
  // switch (action.type) {
  //   // case SEARCH_PICTURES:
  //   //   return action.pictures
  // default:
  return state
  // }
}
