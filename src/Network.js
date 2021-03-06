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
  timeout: number,
  hostname: string,
  port: number,
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
    const { hostname = "8.8.8.8", port = 443, timeout = 5000 } = this.props

    const startListener = RNReachability.startListener

    // TODO: refactor
    Platform.OS === "android"
      ? startListener(hostname, port, timeout)
      : startListener()

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
