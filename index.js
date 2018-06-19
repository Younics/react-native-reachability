// @flow

import { Component } from "react"
import { NativeModules } from "react-native"

import NetworkComponent from './network'

const { RNReachability } = NativeModules

const getReachabilityAsync = (timeout?: number = 5000): Promise<boolean> =>
  RNReachability.isReachable(timeout)
    .then(result => !!result) // iOS returns 1 or 0 here so we convert the value to boolean
    .catch(error => {
      throw error
    })

export {
  getReachabilityAsync,
  NetworkComponent,
}