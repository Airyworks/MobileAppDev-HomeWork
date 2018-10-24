import React from 'react'
import { View, Dimensions, Image } from 'react-native'
import { Text, Icon, Header } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions as RouterActions } from 'react-native-router-flux'
import * as Actions from '../actions'
import Player from '../components/Player'
import SliderBar from '../components/SliderBar'
const { width, height } = Dimensions.get('window')
const headerHeight = 48

function mapStateToProps (state) {
  return {
    track: state.player.track,
    playlist: state.player.playlist,
    history: state.player.history,
    isPlaying: state.player.isPlaying,
    mode: state.player.mode,
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    isSliding: state.player.isSliding
  }
}

function mapDispatchToProps (dispatch) {
  return {
    play () { return dispatch(Actions.musicPlayAction()) },
    pause () { return dispatch(Actions.musicPauseAction()) },
    next () { return dispatch(Actions.nextTrackAction()) },
    prev () { return dispatch(Actions.prevTrackAction()) },
    update (payload) { return dispatch(Actions.updateTrackAction(payload)) },
    toggleSlide (status) {
      return dispatch(status ?
        Actions.slideStartAction() : 
        Actions.slideCompleteAction()
      )
    },
    setSlideTime (value) { return dispatch(Actions.setSlideTimeAction(value)) },
    onEnd () { return dispatch(Actions.nextTrackAction()) }, // maybe next track?
    onLoad (payload) { return dispatch(Actions.audioLoadAction(payload)) },
    onLoadStart () { return dispatch(Actions.audioLoadStartAction()) },
    onProgress (payload) { return dispatch(Actions.audioProgressAction(payload)) },
    changeMode (payload) { return dispatch(Actions.changeModeAction(payload)) }
  }
}

function formatTime (time) {
  const padding = num => num < 10 ? '0' + num : num
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)
  return `${padding(min)}:${padding(sec)}`
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class PlayerPage extends React.Component {
    constructor (props) {
      super(props)
    }

    changeMode = () => {
      const currentMode = this.props.mode
      this.props.changeMode(currentMode)
    }

    openPlaylist = () => {
      RouterActions.playerlist()
    }

    mapPlayer = (component) => {
      this.player = component
    }

    redirectBack = () => {
      RouterActions.playerlist()
    }

    renderSlider ({duration, currentTime, isSliding}) {
      let value = parseFloat(((currentTime / duration) * 100 || 0).toFixed(2))
      value = value >= 100 ? 100 : value
      const isValid = duration && currentTime && (duration - currentTime > 0)
      return (
        <View style={styles.group}>
          <Text style={[styles.timer, {marginLeft: 16}]}>{formatTime(isValid ? currentTime : 0)}</Text>
          <SliderBar
            style={{width: width - 160, marginHorizontal: 20}}
            duration={duration}
            currentTime={currentTime}
            value={value}
            isSliding={isSliding}
            onSlidingStart={this.onSlidingStart}
            onSlidingComplete={this.onSlidingComplete}
          />
          <Text style={[styles.timer, {marginRight: 16}]}>{formatTime(isValid ? duration : 0)}</Text>
        </View>
      )
    }
  
    renderCover (url) {
      return ( 
        <View style={styles.coverWrap}>
          <Image
            style={styles.cover}
            source={{uri:url}}
            resizeMode={"cover"}
          />
        </View>
      )
    }

    renderBackBtn () {
      return (
        <Icon
          name="navigate-before"
          containerStyle={{top: 5}}
          color="#FFF"
          onPress={this.redirectBack}
          size={36}
          underlayColor={styles.button.underlayColor}
        />
      )
    }

    renderName (track) {
      return (
        <View styles={{}}>
          <Text style={[styles.text, styles.name, {fontSize: 16}]}>{track.name}</Text>
          <Text style={[styles.text, styles.name, {fontSize: 12}]}>{track.ar.map(ar => ar.name).join(', ')}</Text>
        </View>
      )
    }

    onSlidingStart = () => {
      this.props.toggleSlide(true)
    }
  
    onSlidingComplete = (value) => {
      const time = Math.floor(this.props.duration * (value / 100))
      this.props.setSlideTime(time)
      this.props.toggleSlide(false)
      this.player.audio.seek(time)
    }

    render() {
      const {
        track,
        playlist,
        history,
        isPlaying,
        mode,
        currentTime,
        duration,
        play,
        pause,
        prev,
        next,
        update,
        onEnd,
        onLoad,
        onLoadStart,
        onProgress,
        isSliding
      } = this.props
      const props = {
        track, playlist, history, isPlaying, prev, next,
        mode, currentTime, duration, play, pause, update,
        onEnd, onLoad, onLoadStart, onProgress, isSliding
      }
      const coverUrl = track.al.picUrl || undefined
      let modeIcon = ''
      switch (mode) {
        case 'repeat':
          modeIcon = 'repeat'
          break
        case 'repeat-one':
          modeIcon = 'repeat-one'
          break
        case 'shuffle':
          modeIcon = 'shuffle'
          break
        case 'serial':
        default:
          modeIcon = 'playlist-play'
      }
      return (
        <View>
          <View
            style={styles.upper}>
            <Header
              leftComponent={this.renderBackBtn()}
              centerComponent={this.renderName(track)}
              rightComponent={<Icon name="share" color="transparent" size={36}/>} // make a placeholder
              outerContainerStyles={{ height: headerHeight, backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#EEE5' }}
              innerContainerStyles={{ justifyContent: 'space-between' }}
            />
          </View>
          <Image 
            blurRadius={10}
            style={styles.bg}
            source={{uri:coverUrl}}
          />
          <View style={styles.darkLayer}></View>
          <View style={styles.upper}>
            <View>
              {/* <Text>sdasd</Text> */}
            </View>
            {this.renderCover(coverUrl)}
          </View>
          <View style={[styles.upper, {position: 'absolute', top: height - 128 }]}>
            <Player ref={this.mapPlayer} {...props}/>
            {this.renderSlider(props)}
            <View style={styles.group}>
              <Icon
                name={modeIcon}
                onPress={this.changeMode}
                size={28}
                containerStyle={{marginLeft: 20}}
                color='#FFF'
                underlayColor={styles.button.underlayColor}
              />
              <Icon
                name='skip-previous'
                onPress={() => { this.props.prev(); this.props.update() } }
                size={40}
                containerStyle={[styles.buttonContainer]}
                color='#FFF'
                underlayColor={styles.button.underlayColor}
              />
              <Icon
                name={this.props.isPlaying ? 'pause' : 'play-arrow'}
                onPress={this.props.isPlaying ? this.props.pause : this.props.play}
                size={40}
                containerStyle={[styles.buttonContainer]}
                color='#FFF'
                underlayColor={styles.button.underlayColor}
              />
              <Icon
                name='skip-next'
                onPress={() => { this.props.next(); this.props.update() } }
                size={40}
                containerStyle={[styles.buttonContainer]}
                color='#FFF'
                underlayColor={styles.button.underlayColor}
              />
              <Icon
                name='library-music'
                onPress={this.openPlaylist}
                size={28}
                containerStyle={{marginRight: 20}}
                color='#FFF'
                underlayColor={styles.button.underlayColor}
              />
            </View>
          </View>
        </View>
      )
    }
  }
)

const styles = {
  bg: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    zIndex: 1,
    opacity: 0.4
  },
  darkLayer: {
    zIndex: 2, 
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.2,
    backgroundColor: '#000'
  },
  upper: {
    zIndex: 100
  },
  coverWrap: {
    position: 'absolute',
    shadowColor: '#111',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: (width - 200) / 2,
    marginVertical: (height - 30 - 200) / 2 - headerHeight,
  },
  cover: {
    width: 200,
    height: 200,
    // borderRadius: 100
  },
  button: {
    underlayColor: '#E7E7E780'
  },
  buttonContainer: {
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#FFF'
  },
  timer: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  text: {
    color: '#FFF'
  },
  name: {
    textAlign: 'center',
    top: 10,
    fontSize: 16
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}