const router = require('express').Router()
module.exports = router

// const client = new GoogleImages(
//   '000128253343267719416:85tgos8q1og',
//   'AIzaSyAjij1WPTftayqAPj3HM1VNNih1tzPJKlY'
// )

const GphApiClient = require('giphy-js-sdk-core')
const client = GphApiClient('9uU86eL48gf9ItaM8OQ6qC801LQ6Owe3')

// router.get('/', async (req, res, next) => {
//   // let picsArr = []
//   // const pics = await client.search(req.query.word).then(images => {
//   //   picsArr.push(images)
//   res.send('PLEASE PICK A WORD')
// })

router.get('/', async (req, res, next) => {
  try {
    let stickerArr = []
    // const pics = await client.search(req.params.word).then(images => {
    //   picsArr.push(images)

    const stickers = await client.random('stickers', {}).then(response => {
      res.send(response.data)
    })
  } catch (err) {
    next(err)
  }
})

// router.get(`http://api.giphy.com/v1/gifs/search?q=${word1}+${word2}&api_key=9uU86eL48gf9ItaM8OQ6qC801LQ6Owe3&limit=5`, async(req, res, next) => {
//   console.log('GIPHS', )
// }
// router.post('/', async(req,res,next) => {
//   const pics = await client.search(req.body).then(images) => {
//     picsArr.push(images)
//     res.send(picsArr[0])
//   }
// })
