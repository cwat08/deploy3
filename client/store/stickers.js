import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_STICKER = 'GET_STICKER'

/**
 * INITIAL STATE
 */
const defaultSticker = {}

/**
 * ACTION CREATORS
 */
//const getPictures = () => ({type: GET_PICTURES, pictures})
const getSticker = sticker => ({type: GET_STICKER, sticker})
// const clearPictures = () => ({type: CLEAR_PICTURES})

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

export const getStickerThunk = () => async dispatch => {
  try {
    const res = await axios.get(`/api/stickers`)
    dispatch(getSticker(res.data || defaultSticker))
  } catch (err) {
    console.error(err)
  }
}

// export const clearPicturesThunk = () => async dispatch => {
//   try {
//     dispatch(clearPictures())
//   } catch (err) {
//     console.error(err.message)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultSticker, action) {
  switch (action.type) {
    case GET_STICKER:
      return action.sticker
    default:
      return state
  }
}
