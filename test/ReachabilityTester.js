import { NativeModules } from 'react-native';

const { NativeReachability } = NativeModules;

export const ReachabilityTypes = {
  NOT_REACHABLE: 'NOT_REACHABLE',
  REACHABLE: 'REACHABLE',
};

const ReachabilityTypesArray = [
  ReachabilityTypes.NOT_REACHABLE,
  ReachabilityTypes.REACHABLE,
];

export const isReachable = async (url?: String, timeout?: Number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ReachabilityTypes.NOT_REACHABLE);
    }, timeout ? timeout : 5000)

    NativeReachability.isReachable(url,
      (error, result) => {
        error && reject(error);
        result && resolve(ReachabilityTypesArray[result]);
      }
    );
  })
}

export default NativeReachability;
