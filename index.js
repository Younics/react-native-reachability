// @flow

import React, { Component } from 'react'
import { DeviceEventEmitter, NativeModules } from 'react-native'

const { RNReachability } = NativeModules

export const getReachabilityAsync = (timeout: Number = 5000): Promise =>
  RNReachability.isReachable(timeout)
    .then(result => !!result) // iOS returns 1 or 0 here so we convert the value to boolean
    .catch(error => {
      throw error
    })

class Network extends Component {
  _handleError = message => {
    console.error('Error while fetching network state: ', message)
  }

  _handleReachabilityChange = isReachable => {
    if (typeof this.props.onReachabilityChange === 'function') {
      this.props.onReachabilityChange(isReachable)
    }
  }

  componentDidMount () {
    RNReachability.startListener()
    DeviceEventEmitter.addListener(
      'com.younics.reachability:onReachabilityChange',
      this._handleReachabilityChange
    )

    DeviceEventEmitter.addListener(
      'com.younics.reachability:onError',
      this._handleError
    )
  }

  componentWillUnmount () {
    RNReachability.stopListener()
  }

  render () {
    return null
  }
}

export default Network
