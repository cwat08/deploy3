import React, {Component} from 'react'

export default function SpeechRecognition(options) {
  const SpeechRecognitionInner = function(WrappedComponent) {
    const BrowserSpeechRecognition =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition ||
        window.oSpeechRecognition)
    const recognition = BrowserSpeechRecognition
      ? new BrowserSpeechRecognition()
      : null
    const browserSupportsSpeechRecognition = recognition !== null
    let listening
    if (
      !browserSupportsSpeechRecognition ||
      (options && options.autoStart === false)
    ) {
      listening = false
    } else {
      console.log('START')
      recognition.start()
      listening = true
    }
    let pauseAfterDisconnect = false
    let interimTranscript = ''
    let finalTranscript = ''

    return class SpeechRecognitionContainer extends Component {
      constructor(props) {
        super(props)

        this.state = {
          interimTranscript,
          finalTranscript,
          listening: false
        }
      }

      componentWillMount() {
        console.log('HERE_')
        if (recognition) {
          recognition.continuous = true
          recognition.interimResults = true
          recognition.onresult = this.updateTranscript.bind(this)
          recognition.onend = this.onRecognitionDisconnect.bind(this)
          this.setState({listening})
        }
      }

      disconnect = disconnectType => {
        if (recognition) {
          switch (disconnectType) {
            case 'ABORT':
              pauseAfterDisconnect = true
              recognition.abort()
              break
            case 'RESET':
              pauseAfterDisconnect = false
              recognition.abort()
              break
            case 'STOP':
            default:
              pauseAfterDisconnect = true
              recognition.stop()
          }
        }
      }

      onRecognitionDisconnect() {
        listening = false
        if (pauseAfterDisconnect) {
          this.setState({listening})
        } else {
          this.startListening()
        }
        pauseAfterDisconnect = false
      }

      updateTranscript(event) {
        interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript = this.concatTranscripts(
              finalTranscript,
              event.results[i][0].transcript
            )
          } else {
            interimTranscript = this.concatTranscripts(
              interimTranscript,
              event.results[i][0].transcript
            )
          }
        }
        this.setState({finalTranscript, interimTranscript})
      }

      concatTranscripts(...transcriptParts) {
        return transcriptParts
          .map(t => t.trim())
          .join(' ')
          .trim()
      }

      resetTranscript = () => {
        interimTranscript = ''
        finalTranscript = ''
        this.disconnect('RESET')
        this.setState({interimTranscript, finalTranscript})
      }

      startListening = () => {
        if (recognition && !listening) {
          try {
            console.log('LISTENING')
            recognition.start()
          } catch (DOMException) {
            // Tried to start recognition after it has already started - safe to swallow this error
          }
          listening = true
          this.setState({listening})
        }
      }

      abortListening = () => {
        listening = false
        this.setState({listening})
        this.disconnect('ABORT')
      }

      stopListening = () => {
        listening = false
        this.setState({listening})
        this.disconnect('STOP')
      }

      render() {
        const transcript = this.concatTranscripts(
          finalTranscript,
          interimTranscript
        )
        console.log('TRANSCRIPT', transcript)

        return (
          <WrappedComponent
            resetTranscript={this.resetTranscript}
            startListening={this.startListening}
            abortListening={this.abortListening}
            stopListening={this.stopListening}
            transcript={transcript}
            recognition={recognition}
            browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
            listening={this.state.listening}
            {...this.state}
            {...this.props}
          />
        )
      }
    }
  }

  if (typeof options === 'function') {
    return SpeechRecognitionInner(options)
  } else {
    return SpeechRecognitionInner
  }
}
