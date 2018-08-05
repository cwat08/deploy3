import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addWordThunk} from '../store/words'
import {fetchPictures, searchPicturesThunk} from '../store/pictures'
//if state.word.length < 3 --> ask for an input, otherwise render pictures and fetch pics

// const wordTypeArr = ['noun', 'adjective', 'verb']
// var prompt = this.state.prompt[
//   Math.floor(Math.random() * this.state.prompt.length)
// ]

class Word extends Component {
  constructor() {
    super()
    this.state = {
      word: '',
      prompt: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(evt) {
    console.log('PROP TRANSCRIPT', this.props.transcript)
    this.setState({prompt: this.props.prompts[Math.floor(Math.random() * 3)]})
  }
  handleChange(evt) {
    console.log('WORDS', this.props.transcript)
    this.setState({word: evt.target.value})
    console.log('WORD**', this.state.prompt)
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      //await this.setState({word: evt.target.value})
      //if word length < 3 add word to state otherwise search pictures
      await this.props.addWordThunk(this.state.word)

      if (this.props.words.length === 3) {
        await this.props.searchPicturesThunk(this.props.words.join(' '))
      } else {
        this.setState({
          word: '',
          prompt: this.props.prompts[Math.floor(Math.random() * 3)]
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  render() {
    console.log('IN RENDER', this.props.transcript)
    // const prompt = this.state.prompts[
    //   Math.floor(Math.random() * this.state.prompts.length)
    // ]
    if (this.props.pictures && this.props.pictures.length) {
      return (
        <div>
          <img src={this.props.pictures[Math.floor(Math.random() * 5)].url} />
        </div>
      )
    } else {
      return (
        <div className="centered">
          <form className="centered" onSubmit={this.handleSubmit}>
            <label>
              <input
                onChange={this.handleChange}
                type="text"
                name="word"
                value={this.state.word}
                autoFocus="true"
              />
            </label>

            <h3 className="centered-text">{this.state.prompt}</h3>

            <button type="submit">Submit</button>
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
  stop: ownProps.stop
})

const mapDispatchToProps = dispatch => {
  return {
    addWordThunk: word => dispatch(addWordThunk(word)),
    searchPicturesThunk: words => dispatch(searchPicturesThunk(words))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word)
