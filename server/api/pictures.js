const router = require('express').Router()
module.exports = router

const GoogleImages = require('google-images')

const client = new GoogleImages(
  '000128253343267719416:85tgos8q1og',
  'AIzaSyAjij1WPTftayqAPj3HM1VNNih1tzPJKlY'
)

// router.get('/', async (req, res, next) => {
//   // let picsArr = []
//   // const pics = await client.search(req.query.word).then(images => {
//   //   picsArr.push(images)
//   res.send('PLEASE PICK A WORD')
// })

router.get('/:word', async (req, res, next) => {
  let picsArr = []
  const pics = await client.search(req.params.word).then(images => {
    picsArr.push(images)
  })
  console.log('pics', picsArr)
  res.send(picsArr[0])
})

// router.post('/', async(req,res,next) => {
//   const pics = await client.search(req.body).then(images) => {
//     picsArr.push(images)
//     res.send(picsArr[0])
//   }
// })
