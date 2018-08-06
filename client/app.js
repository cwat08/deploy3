import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Pictures from './components/pictures'
import Word from './components/word'
import SpeechRecognition from './speech_recognition'
import Home from './components/home'

const App = props => {
  return (
    <div>
      <Word
        transcript={props.transcript}
        reset={props.resetTranscript}
        stop={props.stopListening}
        listening={props.listening}
        start={props.startListening}
      />
      {/* <Home
        transcript={props.transcript}
        reset={props.resetTranscript}
        stop={props.stopListening}
      /> */}
    </div>
  )
}

export default SpeechRecognition(App)
