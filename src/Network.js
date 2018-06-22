/* @flow */

import { PureComponent } from "react"
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform
} from "react-native"

const { RNReachability } = NativeModules

type Props = {
  onChange: (isReachable: boolean) => void,
  onError: (message: string) => void
}

export class Network extends PureComponent<Props> {
  reachabilityListener: any

  _handleError = message => {
    const { onError } = this.props

    if (typeof onError === "function") {
      onError(message)
    }
  }

  _handleReachabilityChange = isReachable => {
    const { onChange } = this.props

    if (typeof onChange === "function") {
      onChange(isReachable)
    }
  }

  _registerAndroidListeners = () => {
    DeviceEventEmitter.addListener(
      "com.younics.reachability:onReachabilityChange",
      this._handleReachabilityChange
    )

    DeviceEventEmitter.addListener(
      "com.younics.reachability:onError",
      this._handleError
    )
  }

  _registerIOSListeners = () => {
    const reachabilityEmitter = new NativeEventEmitter(RNReachability)

    this.reachabilityListener = reachabilityEmitter.addListener(
      "onReachabilityChange",
      this._handleReachabilityChange
    )
  }

  componentDidMount() {
    RNReachability.startListener()

    Platform.OS === "android"
      ? this._registerAndroidListeners()
      : this._registerIOSListeners()
  }

  componentWillUnmount() {
    RNReachability.stopListener()
    if (this.reachabilityListener) this.reachabilityListener.remove()
  }

  render() {
    return null
  }
}
