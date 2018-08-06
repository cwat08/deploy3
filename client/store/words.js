import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_WORD = 'ADD_WORD'
const CLEAR_WORDS = 'CLEAR_WORDS'

/**
 * INITIAL STATE
 */
const defaultWords = []

/**
 * ACTION CREATORS
 */
//const getPictures = () => ({type: GET_PICTURES, pictures})
const addWord = word => ({type: ADD_WORD, word})
const clearWords = () => ({type: CLEAR_WORDS})
/**
 * THUNK CREATORS
 */
// export const fetchPictures = () => async dispatch => {
//   try {
//     const res = await axios.get(`/api/pictures/`)
//     dispatch(getPictures(res.data || defaultPictures))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const addWordThunk = word => async dispatch => {
  try {
    //console.log('STORE**', word)
    //const res = await axios.get(`/api/pictures/${word}`)
    //console.log('ARRAY', Array.isArray(res.data))
    dispatch(addWord(word))
  } catch (err) {
    console.error(err)
  }
}

export const clearWordsThunk = () => async dispatch => {
  try {
    dispatch(clearWords())
  } catch (err) {
    console.error(err.message)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultWords, action) {
  switch (action.type) {
    case ADD_WORD:
      return [...state, action.word]
    case CLEAR_WORDS:
      return []
    default:
      return state
  }
}
