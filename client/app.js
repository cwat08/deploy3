import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Pictures from './components/pictures'
import Word from './components/word'
import SpeechRecognition from './speech_recognition'

const App = props => {
  console.log('APP PROPS', props)
  return (
    <div>
      {/* <Navbar />
      <Routes /> */}
      <Word
        transcript={props.transcript}
        reset={props.resetTranscript}
        stop={props.stopListening}
      />
    </div>
  )
}

export default SpeechRecognition(App)
