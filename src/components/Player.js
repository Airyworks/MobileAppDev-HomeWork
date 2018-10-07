import React from 'react'
import Video from 'react-native-video'
import MusicControl from 'react-native-music-control'

export default class Player extends React.Component {
  constructor(props){
    super(props)
    this.state = { play: false, audio: null }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  play() {}

  pause() {}

  render() {
    const uri = this.props.uri || 'http://www.ytmp3.cn/down/53510.mp3'
    const paused = this.props.paused || false
    const repeat = this.props.repeat || false
    return (
      <Video 
        style={{ height: 0, width: 0 }}
        ref={ (video) => this.setState({audio: video}) }
        source={{ uri }}
        volume={ 1.0 }
        muted={ false }
        paused={ paused }
        repeat={ repeat }
        playInBackground={ true }
        playWhenInactive={ true }
        ignoreSilentSwitch={ 'obey' }
      />
    )
  }
}