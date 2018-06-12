// @flow

import { NativeModules } from 'react-native'

const { RNReachability } = NativeModules

export const isReachable = (timeout: Number = 5000): Promise =>
  RNReachability.isReachable(timeout)
    .then(result => !!result) // iOS returns 1 or 0 here so we convert the value to boolean
    .catch(error => {
      throw error
    })

export default {
  isReachable
}
