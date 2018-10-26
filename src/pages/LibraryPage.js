import React from 'react'
import { Animated, View, Dimensions, FlatList } from 'react-native'
import { Text, Icon, Header, List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions as RouterActions } from 'react-native-router-flux'
import idGenerator from 'unique-id-generator'
import * as Actions from '../actions'
import Player from '../components/Player'
import SliderBar from '../components/SliderBar'
const { width, height } = Dimensions.get('window')
const headerHeight = 48
import RNFetchBlob from 'rn-fetch-blob'
const dirs = RNFetchBlob.fs.dirs
const musicRoot = dirs.MusicDir

function mapStateToProps (state) {
  return {
    playlist: state.player.playlist
  }
}

function mapDispatchToProps (dispatch) {
  return {
    next () { return dispatch(Actions.nextTrackAction()) },
    updateList (payload) { return dispatch(Actions.updatePlaylistAction(payload)) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class LibraryPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = { tracks: [] }
    }

    componentDidMount () {
      RNFetchBlob.fs.ls(musicRoot).then(res => this.setState({
        tracks: res.map(item => ({
          name: item,
          asset: 'file://' + musicRoot + '/' + item,
          path: musicRoot + '/' + item
        }))
      }))
    }

    redirectBack = () => {
      RouterActions.pop()
    }

    addToPlaylist = (item) => {
      const isInPlaylist = this.props.playlist.find(
        v => v.isLocal && v.name === item.name
      ) !== undefined
      if (isInPlaylist) {
        return
      }
      const playlist = Array.from(this.props.playlist)
      const track = {
        id: idGenerator(),
        name: item.name,
        mp3Url: item.asset,
        lyric: '',
        isLocal: true,
        al: {
          id: 0,
          name: '',
          picUrl: undefined
        },
        ar: [{
          id: 0,
          name: '本地音乐'
        }]
      }
      playlist.push(track)
      new Promise(() => {
        this.props.updateList(playlist)
      })
      .then(() =>
        this.props.next()
      )
    }

    renderRow = ({item}) => {
      const isInPlaylist = this.props.playlist.find(
          v => v.isLocal && v.name === item.name
        ) !== undefined
      return (
        <ListItem
          title={item.name}
          subtitle={item.path}
          rightIcon={{name: isInPlaylist ? 'done' : 'add', style: {fontSize: 22}}}
          onPress={() => { isInPlaylist || this.addToPlaylist(item)} }
        />
      )
    }

    renderBack () {
      return (<Icon 
        name='keyboard-arrow-left'
        color='#fff'
        onPress={this.redirectBack}
        // size={30}
        underlayColor={styles.button.underlayColor}
      />)
    }

    render () {
      return (
        <View>
          <Header
            leftComponent={this.renderBack()}
            centerComponent={<Text style={styles.title}>Add to playlist</Text>}
            rightComponent={<Icon name="block" color="transparent" />} // place holder
            outerContainerStyles={{ height: headerHeight }}
          />
          <List>
            <FlatList
              data={this.state.tracks}
              renderItem={this.renderRow}
              keyExtractor={item => item.name}
              extraData={this.props.playlist}
            />
          </List>
        </View>
      )
    }
  }
)

const styles = {title: {
  fontSize: 18,
    color: '#FFF'
  },
  button: {
    underlayColor: '#E7E7E780'
  }
}