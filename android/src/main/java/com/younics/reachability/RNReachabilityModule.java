
package com.younics.reachability;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.net.Socket;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.InetAddress;

public class RNReachabilityModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNReachabilityModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNReachability";
  }

  @ReactMethod
  public void isReachable(int timeout, final Promise promise) {
    int timeOutMillis = 5000;
    if(timeout>0) timeOutMillis = timeout;
    try {
		try (Socket soc = new Socket()) {
        	soc.connect(new InetSocketAddress(InetAddress.getByName("8.8.8.8"), 443), timeOutMillis);
	    }
    	promise.resolve(true);
	} catch (IOException ex) {
    	promise.resolve(false);
  	}
  }
}
