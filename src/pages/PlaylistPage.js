import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Image, FlatList } from 'react-native'
import { Text, Icon, Header, List, ListItem } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import * as Actions from '../actions'

function mapStateToProps (state) {
  return {
    track: state.player.track,
    playlist: state.player.playlist,
    history: state.player.history,
    mode: state.player.mode
  }
}

function mapDispatchToProps (dispatch) {
  return {
    play () { return dispatch(Actions.musicPlayAction()) },
    pause () { return dispatch(Actions.musicPauseAction()) },
    next () { return dispatch(Actions.nextTrackAction()) },
    prev () { return dispatch(Actions.prevTrackAction()) },
    update (payload) { return dispatch(Actions.updateTrackAction(payload)) },
    updateList (payload) { return dispatch(Actions.updatePlaylistAction(payload)) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class PlaylistPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {listName: ''}     // do not use redux because of simplifying
    }

    componentDidMount () {
      const listId = 122870952 || 168065148
      fetch(`http://true.airyworks.cn:3000/playlist/detail?id=${listId}`)
        .then(response => response.json())
        .then(resJson => {
          const tracksNoMp3 = resJson.playlist.tracks
          const tracks = tracksNoMp3.map(i => ({
            ...i, 
            mp3Url: `http://music.163.com/song/media/outer/url?id=${i.id}.mp3`
          }))
          this.props.updateList(tracks)
          this.setState({listName: resJson.playlist.name})
        })
        // .then(_ => {
        //   this.props.next()
        // })
        // .then(_ => {
        //   this.props.update()
        // })
    }

    redirectPlayer = () => {
      this.props.play()
      RouterActions.player()
    }

    renderTrack = (item) => {
      const isPlayingItem = item.item.id === this.props.track.id && !this.props.track.isLocal
      return (
        <ListItem
          leftIcon={
            isPlayingItem ? {
              name: 'play-arrow', color: '#4589ff'
            } : {
              name: 'play-arrow', color: 'transparent'    // place holder
            }
          }
          hideChevron
          title={item.item.name}
          subtitle={item.item.ar[0].name}
          onPress={() => {
            this.props.update(item.item)
            this.redirectPlayer()
          }}
        />
      )
    }

    render () {
      return (
        <View>
          <Text>{this.state.listName}</Text>
          <List>
            <FlatList
              data={this.props.playlist}
              renderItem={this.renderTrack}
              keyExtractor={item => item.id.toString()}
            />
          </List>
        </View>
      )
    }
  }
)