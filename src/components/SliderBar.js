import React from 'react'
import { Slider } from 'react-native-elements'

export default class SliderBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: 0}
  }

  componentWillReceiveProps (props) {
    if (!props.isSliding) {
      this.setState({value: props.value})
    }
  }

  render () {
    return (
      <Slider
        value={this.state.value} 
        style={this.props.style}
        maximumTrackTintColor="#FFF8"
        maximumValue={100}
        minimumTrackTintColor="#2089dc"
        minimumValue={0}
        trackStyle={{height: 2, borderRadius: 2}}
        thumbStyle={{height: 16, width: 16, borderRadius: 8}}
        thumbTintColor="#FFF"
        // onValueChange={this.props.onValueChange}
        onSlidingStart={this.props.onSlidingStart}
        onSlidingComplete={this.props.onSlidingComplete}
      />
    )
  }
}