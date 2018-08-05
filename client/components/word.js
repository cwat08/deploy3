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
  async handleChange(evt) {
    try {
      console.log('HANDLING CHANGE ***', this.props.transcript)
      this.setState({word: evt.target.value})
      if (this.state.word.length) {
        await this.props.addWordThunk(this.state.word)
        if (this.props.words.length === 3) {
          await this.props.searchPicturesThunk(this.props.words.join(' '))
        } else {
          this.props.reset()
          this.setState({
            word: '',
            prompt: this.props.prompts[Math.floor(Math.random() * 3)]
          })
        }
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      //await this.setState({word: evt.target.value})
      //if word length < 3 add word to state otherwise search pictures
      await this.props.addWordThunk(this.props.transcript)

      if (this.props.words.length === 3) {
        await this.props.searchPicturesThunk(this.props.words.join(' '))
      } else {
        this.props.reset()
        console.log('RESET TRANSCRIPT', this.props.transcript)
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
          {/* <img
            className="centered"
            src={this.props.pictures[Math.floor(Math.random() * 5)].url}
            // src='https://giphy.com/embed/qygzgFH2BXmhi'
          /> */}
          <iframe
            className="centered"
            src={this.props.pictures[Math.floor(Math.random() * 25)].embed_url}
          />
          <h4>{this.props.words.join(' ')}</h4>
        </div>
      )
    } else {
      return (
        <div className="centered">
          <form className="centered" onSubmit={this.handleSubmit}>
            <label>
              <input
                onChange={this.handleSubmit}
                type="text"
                name="word"
                value={this.props.transcript}
                autoFocus="true"
              />
            </label>
            {/* <h3 className="centered-text"> __________________________ </h3> */}
            <h3 className="centered-text">{this.state.prompt}</h3>

            <button className="centered-text" type="submit">
              Submit
            </button>
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
