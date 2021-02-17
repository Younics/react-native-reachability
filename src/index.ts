import { NativeModules } from "react-native"

export { Network } from "./Network"

const { RNReachability } = NativeModules

export const isReachable = (timeout: number = 5000): Promise<boolean> =>
  RNReachability.isReachable(timeout)

export default {
  isReachable
}
