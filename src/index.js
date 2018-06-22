/* @flow */

import { Component } from "react"
import { NativeModules } from "react-native"

export { Network } from "./Network"

const { RNReachability } = NativeModules

export const getReachabilityAsync = (
  timeout?: number = 5000
): Promise<boolean, Error> => RNReachability.isReachable(timeout)

/* NOTE: for backward compatibilty - will be removed in future versions */
const isReachableWithWarning = (timeout?: number) => {
  console.warn(
    "Network object and its methods are deprecated. Please use Network component for listening to reachability changes or getReachabilityAsync to get actual reachability status."
  )
  return getReachabilityAsync(timeout)
}

export const isReachable = isReachableWithWarning
export default {
  isReachable
}
/* <<< */
