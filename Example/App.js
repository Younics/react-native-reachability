// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Network from '../index' TODO: figure out if this can be done

export default class App extends Component {
  state = {
    isReachable: true
  }

  // we use the same value for thread sleep and for the timer here, just for consistency
  _reachabilityTimeout = 3000

  _checkIfNetworkIsReachable = () => {
    Network.isReachable(this._reachabilityTimeout)
      .then(isReachable => this.setState({ isReachable }))
      .catch(error => console.error(error))
  }

  _setReachabilityTimer = () => {
    this._checkIfNetworkIsReachable()
    this.reachabilityTimer = setTimeout(
      this._setReachabilityTimer,
      this._reachabilityTimeout
    )
  }

  componentDidMount () {
    this._setReachabilityTimer()
  }

  componentWillMount () {
    clearTimeout(this.reachabilityTimer)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.reachabilityParent}>
          Network is{' '}
          <Text
            style={{
              fontWeight: 'bold',
              color: this.state.isReachable ? 'green' : 'red'
            }}
          >
            {this.state.isReachable ? 'reachable' : 'not reachable'}
          </Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10
  },
  reachability: {
    fontSize: 24,
    textAlign: 'center'
  }
})
