import React from 'react'
import Video from 'react-native-video'
import MusicControl from 'react-native-music-control'
import { View } from 'react-native'

export default class Player extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    MusicControl.setNowPlaying({
      title: 'Billie Jean',
      artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
      artist: 'Michael Jackson',
      album: 'Thriller',
      genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
      duration: 294, // (Seconds)
      description: '', // Android Only
      color: 0xFFFFFF, // Notification Color - Android Only
      date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
      rating: 84, // Android Only (Boolean or Number depending on the type)
      notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
    })
    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableControl('stop', false)
    MusicControl.enableControl('nextTrack', true)
    MusicControl.enableControl('previousTrack', false)
  }

  mapAudio = (component) => {
    this.audio = component
  }

  render() {
    const uri = this.props.track.mp3Url
    const paused = !this.props.isPlaying
    const repeat = this.props.mode === 'repeat-one'
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
          repeat={ repeat }
          playInBackground={ true }
          playWhenInactive={ true }
          ignoreSilentSwitch={'obey'}
          onEnd={this.props.onEnd}
          onLoad={this.props.onLoad}
          onLoadStart={this.props.onLoadStart}
          onProgress={this.props.onProgress}
        />
      </View>
    )
  }
}
