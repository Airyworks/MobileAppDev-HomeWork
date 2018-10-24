import React from 'react'
import Video from 'react-native-video'
import MusicControl from 'react-native-music-control'
import { View } from 'react-native'

export default class Player extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    MusicControl.enableBackgroundMode(true)
    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('stop', false)
    MusicControl.enableControl('nextTrack', true)
    MusicControl.enableControl('previousTrack', true)
    MusicControl.enableControl('seekForward', false)
    MusicControl.enableControl('seekBackward', false)
    MusicControl.on('play', this.props.play)
    MusicControl.on('pause', this.props.pause)
    MusicControl.on('nextTrack', this.props.next)
    MusicControl.on('previousTrack', this.props.prev)
  }

  componentWillUnmount () {
    MusicControl.resetNowPlaying()
  }

  mapAudio = (component) => {
    this.audio = component
  }

  onLoad = (payload) => {
    this.props.onLoad(payload)
    const track = this.props.track
    MusicControl.setNowPlaying({
      title: track.name,
      artwork: track.al.picUrl,
      artist: track.ar.map(ar => ar.name).join(', '),
      duration: payload.duration
    })
  }

  render() {
    const uri = this.props.track.mp3Url
    const paused = !this.props.isPlaying
    return (
      <View>
        <Video 
          ref={this.mapAudio}
          style={{ height: 0, width: 0 }}
          audioOnly
          source={{ uri }}
          volume={ 1.0 }
          muted={ false }
          paused={ paused }
          repeat={ false }
          playInBackground={ true }
          playWhenInactive={ true }
          ignoreSilentSwitch={'obey'}
          onEnd={() => { this.props.next(); this.props.update() }}
          onLoad={this.onLoad}
          onLoadStart={this.props.onLoadStart}
          onProgress={this.props.onProgress}
        />
      </View>
    )
  }
}
