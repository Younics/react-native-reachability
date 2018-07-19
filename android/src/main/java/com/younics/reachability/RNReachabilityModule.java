
package com.younics.reachability;

import android.os.AsyncTask;
import java.net.Socket;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
  public void isReachable(final int timeout, final Promise promise) {
    AsyncTask.execute(new Runnable() {
      @Override
      public void run() {
        try {
          try (Socket soc = new Socket()) {
            soc.connect(new InetSocketAddress(InetAddress.getByName("8.8.8.8"), 443), timeout);
          }
          promise.resolve(true);
        } catch (IOException ex) {
          promise.resolve(false);
        }
      }
    });
  }
}