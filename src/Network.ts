import { PureComponent } from 'react';
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

const { RNReachability } = NativeModules;

interface Props {
  timeout: number;
  hostname: string;
  port: number;
  onChange: (isReachable: boolean) => void;
  onError: (message: string) => void;
  onPing: (isReachable: boolean) => void;
}

export class Network extends PureComponent<Props> {
  reachabilityListener: any;

  handleError = (message: string) => {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      onError(message);
    }
  };

  handleReachabilityChange = (isReachable: boolean) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(isReachable);
    }
  };

  handlePing = (isReachable: boolean) => {
    const { onPing } = this.props;

    if (typeof onPing === 'function') {
      onPing(isReachable);
    }
  };

  registerAndroidListeners = () => {
    DeviceEventEmitter.addListener(
      'com.younics.reachability:onReachabilityChange',
      this.handleReachabilityChange,
    );

    DeviceEventEmitter.addListener(
      'com.younics.reachability:onPing',
      this.handlePing,
    );


    DeviceEventEmitter.addListener(
      'com.younics.reachability:onError',
      this.handleError,
    );
  };

  _registerIOSListeners = () => {
    const reachabilityEmitter = new NativeEventEmitter(RNReachability);

    this.reachabilityListener = reachabilityEmitter.addListener(
      'onReachabilityChange',
      this.handleReachabilityChange,
    );
  };

  componentDidMount() {
    const { hostname = '8.8.8.8', port = 443, timeout = 5000 } = this.props;

    const startListener = RNReachability.startListener;

    if (Platform.OS === 'android') {
      startListener(hostname, port, timeout);
      this.registerAndroidListeners();
    } else {
      startListener();
      this._registerIOSListeners();
    }
  }

  componentWillUnmount() {
    RNReachability.stopListener();
    if (this.reachabilityListener) this.reachabilityListener.remove();
  }

  render() {
    return null;
  }
}
