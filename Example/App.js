// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NetworkComponent } from 'react-native-reachability'

export default class App extends Component {
  state = {
    isReachable: true
  }

  render() {
    return (
      <View style={styles.container}>
        <NetworkComponent
          onReachabilityChange={isReachable => this.setState({ isReachable })}
        />
        <Text style={styles.reachability}>
          Network is{' '}
          <Text
            style={{
              fontWeight: 'bold',
              color: this.state.isReachable ? '#21903F' : '#DD1B21'
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
  reachability: {
    fontSize: 22,
    textAlign: 'center'
  }
})
