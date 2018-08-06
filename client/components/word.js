import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addWordThunk, clearWordsThunk} from '../store/words'
import {
  fetchPictures,
  searchPicturesThunk,
  clearPicturesThunk
} from '../store/pictures'
import {getStickerThunk} from '../store/stickers'
//if state.word.length < 3 --> ask for an input, otherwise render pictures and fetch pics

// const wordTypeArr = ['noun', 'adjective', 'verb']
// var prompt = this.state.prompt[
//   Math.floor(Math.random() * this.state.prompt.length)
// ]

class Word extends Component {
  constructor() {
    super()
    this.state = {
      prompt: '',
      hasClicked: false,
      color: '',
      count: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount(evt) {
    await this.setState({
      prompt: this.props.prompts[Math.floor(Math.random() * 3)],
      color: this.props.colors[Math.floor(Math.random() * 5)]
    })

    document.body.style.backgroundColor = this.state.color
  }

  handleClick(evt) {
    if (evt.target.name === 'play') {
      this.setState({hasClicked: true})
    } else if (evt.target.name === 'again') {
      this.props.clearWordsThunk()
      this.props.clearPicturesThunk()
      this.props.reset()
      this.setState({count: 0})
      this.props.start()
    }
  }

  async handleSubmit(evt) {
    try {
      if (evt) {
        evt.preventDefault()
      }
      clearTimeout()
      //evt.preventDefault()
      //await this.setState({word: evt.target.value})
      //if word length < 3 add word to state otherwise search pictures
      if (this.state.count < 3) {
        await this.props.addWordThunk(this.props.transcript)
        this.setState({count: (this.state.count += 1)})
        console.log('COUNT', this.state.count)
      }
      if (this.state.count === 3) {
        await this.props.searchPicturesThunk(this.props.words.join(' '))
        await this.props.reset()
        await this.props.stop()
      } else {
        this.props.reset()

        await this.setState({
          prompt: this.props.prompts[Math.floor(Math.random() * 18)],
          color: this.props.colors[Math.floor(Math.random() * 5)]
        })
        document.body.style.backgroundColor = this.state.color
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  render() {
    if (!this.props.pictures.length && this.props.listening) {
      setTimeout(() => {
        if (this.props.transcript.length) this.handleSubmit()
      }, 5000)
    }

    console.log('IN RENDER', this.props.transcript)
    // const prompt = this.state.prompts[
    //   Math.floor(Math.random() * this.state.prompts.length)
    // ]
    if (!this.state.hasClicked) {
      return (
        <div className="center-div">
          <h1>MAD GIPHS</h1>
          <button onClick={this.handleClick} type="submit" name="play">
            PLAY
          </button>
          <iframe
            src="https://giphy.com/embed/2bW31ktSBIYYBf2Lbu"
            width="300"
            height="300"
            frameBorder="0"
            className="giphy"
            allowFullScreen
          />
          <iframe
            className="giphy_constant"
            src="https://giphy.com/embed/9xk5cHfWqF2XaR10O6"
            width="250"
            height="250"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )
    } else if (this.props.pictures && this.props.pictures.length) {
      return (
        <div className="center-div">
          <div>
            <iframe src={this.props.pictures[0].embed_url} />
          </div>
          <div>
            <p>{this.props.words.join(' ')}</p>
            <button type="submit" onClick={this.handleClick} name="again">
              PLAY AGAIN
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="center-div">
          {console.log('RENDERING_________________')}
          <form className="centered" onSubmit={this.handleSubmit}>
            <label>
              <input
                id="input"
                onChange={this.handleChange}
                type="text"
                name="word"
                value={this.props.transcript}
                autoFocus="true"
                // backgroundColor={this.state.color}
              />
            </label>
            <h3 className="centered-text">{this.state.prompt}</h3>
            <iframe
              src={
                !this.props.words.length
                  ? 'https://giphy.com/embed/l4pT1YVunxJ7g11O8'
                  : this.props.words.length === 1
                    ? 'https://giphy.com/embed/l378hhjDB5kjSs0qk'
                    : 'https://giphy.com/embed/l378w6DoOV26903Sg'
              }
              width="300"
              height="300"
              frameBorder="0"
              className="giphy"
              allowFullScreen
            />
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  words: state.words,
  pictures: state.pictures,
  prompts: state.prompts,
  stop: ownProps.stop,
  colors: state.colors,
  sticker: state.stickers
})

const mapDispatchToProps = dispatch => {
  return {
    addWordThunk: word => dispatch(addWordThunk(word)),
    searchPicturesThunk: words => dispatch(searchPicturesThunk(words)),
    clearWordsThunk: () => dispatch(clearWordsThunk()),
    clearPicturesThunk: () => dispatch(clearPicturesThunk()),
    getStickerThunk: () => dispatch(getStickerThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word)

//set timer once page loads?/ or speaking starts??
//validate function --> if this.props.transcript.length && if the word is prompt then
