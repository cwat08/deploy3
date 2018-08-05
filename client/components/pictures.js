import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPictures, searchPicturesThunk} from '../store/pictures'

class Pictures extends Component {
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
    this.setState({prompt: this.props.prompts[Math.floor(Math.random() * 3)]})
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log('WORD**', this.state.word)
  }
  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      console.log('HERE')
      console.log('sTATE', this.state.word)
      await this.props.searchPicturesThunk(this.state.word)
      console.log('PICs', Array.isArray(this.props.pictures))
      //this.setState({word: ''})
    } catch (err) {
      console.error(err.message)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Word:
            <input onChange={this.handleChange} type="text" name="word" />
          </label>
          <button type="submit">Submit</button>
        </form>
        <h1>Pictures to go here! lala</h1>
        {this.props.pictures.length ? (
          <div>
            <h4>{this.props.words}</h4>
            {/* <img
              //   // src={
              //   //   this.props.pictures[Math.floor(Math.random() * 25)].images
              //   //     .fixed_height.gif_url
              //   // }
              // src={this.props.pictures[Math.floor(Math.random() * 5)].url}

            /> */}
            <iframe src="https://giphy.com/embed/qygzgFH2BXmhi" />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pictures: state.pictures
})

const mapDispatchToProps = dispatch => {
  return {
    searchPicturesThunk: word => dispatch(searchPicturesThunk(word)),
    fetchPictures: () => dispatch(fetchPictures())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)
