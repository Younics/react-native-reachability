import { Platform, NativeModules } from 'react-native'

const { RNReachability } = NativeModules

export const isReachable = (timeout: Number = 5000): Promise =>
  RNReachability.isReachable(timeout)
    .then(result => !!result)
    .catch(error => {
      throw error
    })

export default {
  isReachable
}
