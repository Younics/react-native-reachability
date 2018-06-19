// @flow

import { PureComponent } from 'react'
import { DeviceEventEmitter, NativeModules } from "react-native"

const { RNReachability } = NativeModules

type Props = {
  onReachabilityChange: (isReachable: boolean) => void,
}

class NetworkComponent extends PureComponent<Props> {
  _handleError = message => {
    console.error("Error while fetching network state: ", message)
  }

  _handleReachabilityChange = isReachable => {
    const { onReachabilityChange } = this.props

    if (typeof onReachabilityChange === "function") {
      onReachabilityChange(isReachable)
    }
  }

  componentDidMount() {
    RNReachability.startListener()

    DeviceEventEmitter.addListener(
      "com.younics.reachability:onReachabilityChange",
      this._handleReachabilityChange,
    )

    DeviceEventEmitter.addListener(
      "com.younics.reachability:onError",
      this._handleError,
    )
  }

  componentWillUnmount() {
    RNReachability.stopListener()
  }

  render() {
    return null
  }
}

export default NetworkComponent
