import React from 'react'
import { connect } from 'react-redux'
import { View, Dimensions, Image, FlatList } from 'react-native'
import { Text, Icon, Header, List, ListItem } from 'react-native-elements'
import { Actions as RouterActions } from 'react-native-router-flux'
import * as Actions from '../actions'
const headerHeight = 48

function mapStateToProps (state) {
  return {
    track: state.player.track,
    playlist: state.player.playlist,
    history: state.player.history,
    mode: state.player.mode,
    isShowing: state.player.isShowing
  }
}

function mapDispatchToProps (dispatch) {
  return {
    play () { return dispatch(Actions.musicPlayAction()) },
    pause () { return dispatch(Actions.musicPauseAction()) },
    next () { return dispatch(Actions.nextTrackAction()) },
    prev () { return dispatch(Actions.prevTrackAction()) },
    update (payload) { return dispatch(Actions.updateTrackAction(payload)) },
    updateList (payload) { return dispatch(Actions.updatePlaylistAction(payload)) },
    showPlayer () { return dispatch(Actions.playerShowAction()) },
    hidePlayer () { return dispatch(Actions.playerHideAction()) }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(
  class PlaylistPage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {listName: ''}     // do not use redux because of simplifying
    }

    componentDidMount () {
      const listId = 168065148 || 122870952  
      fetch(`http://10.0.2.2:3000/playlist/detail?id=${listId}`)
        .then(response => response.json())
        .then(resJson => {
          const tracksNoMp3 = resJson.playlist.tracks
          const tracks = tracksNoMp3.map(i => ({
            ...i, 
            mp3Url: `http://music.163.com/song/media/outer/url?id=${i.id}.mp3`,
            isLocal: false
          }))
          this.props.updateList(tracks)
          this.setState({listName: resJson.playlist.name})
        })
        .then(_ => {
          this.props.next()
        })
        // .then(_ => {
        //   this.props.update()
        // })
    }

    redirectPlayer = () => {
      this.props.showPlayer()
      this.props.play()
      // RouterActions.player()
    }

    redirectLocalTrack = () => {}

    renderTrack = (item) => {
      const isPlayingItem = item.item === this.props.track
      return (
        <ListItem
          leftIcon={
            isPlayingItem ? {
              name: 'play-arrow', color: '#4589ff'
            } : {
              name: 'play-arrow', color: 'transparent'    // place holder
            }
          }
          // hideChevron
          key={item.item.id.toString()}
          title={item.item.name}
          subtitle={item.item.ar[0].name}
          onPress={() => {
            this.props.update(item.item)
            this.redirectPlayer()
          }}
          rightIcon={
            item.item.isLocal ?
            {name: 'sd-storage', style: {fontSize: 20}}:
            {name: 'cloud-download', style: {fontSize: 20}}}
        />
      )
    }

    renderAddLocalTrack () {
      return (<Icon 
        name='playlist-add'
        color='#fff'
        onPress={this.redirectLocalTrack}
        underlayColor={styles.button.underlayColor}
      />)
    }

    renderListName () {
      return (<Text style={styles.title}>{this.state.listName}</Text>)
    }

    renderOpenPlayer () {
      return (<Icon 
        name='library-music'
        color='#fff'
        onPress={this.redirectPlayer}
        underlayColor={styles.button.underlayColor}
      />)
    }

    render () {
      return (
        <View style={{flex: 3, justifyContent: 'space-between', flexDirection: 'column'}}>
          <Header
            leftComponent={this.renderAddLocalTrack()}
            centerComponent={this.renderListName()}
            rightComponent={this.renderOpenPlayer()}
            outerContainerStyles={{ height: headerHeight }}
          />
          <List
            containerStyle={{marginTop: 0}}
          >
            <FlatList
              data={this.props.playlist}
              renderItem={this.renderTrack}
              extraData={this.props.track}
              keyExtractor={item => item.id.toString()}
            />
            {/* { this.props.playlist.map(i => this.renderTrack({item: i}))
            } */}
          </List>
        </View>
      )
    }
  }
)

const styles = {
  title: {
    fontSize: 18,
    color: '#FFF'
  },
  button: {
    underlayColor: '#E7E7E780'
  }
}
