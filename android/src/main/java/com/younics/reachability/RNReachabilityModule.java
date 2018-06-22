
package com.younics.reachability;

import android.app.Activity;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;

public class RNReachabilityModule extends ReactContextBaseJavaModule {

  private ReachabilityAsyncTask task = null;
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
    try {
      promise.resolve(InetAddress.getByName("8.8.8.8").isReachable(timeout));
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void startListener() {
    task = new ReachabilityAsyncTask();
    task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
  }

  @ReactMethod
  public void stopListener() {
    if (task != null && !task.isCancelled()) {
      task.cancel(true);
      task = null;
    }
  }

  private class ReachabilityAsyncTask extends AsyncTask<Void, Void, Boolean> {
    private Boolean localStatus = null;
    private Boolean isRunning;

    @Override
    protected void onPreExecute() {
      super.onPreExecute();

      this.isRunning = true;
    }

    @Override
    public Boolean doInBackground(Void... records) {
      Activity currentActivity = getCurrentActivity();

      Boolean internalStatus;

      while (isRunning) {
        try {
          if (isNetworkAvailable(currentActivity)) {
            try {
              HttpURLConnection urlc = (HttpURLConnection) (new URL("https://www.google.com/").openConnection());
              urlc.setConnectTimeout(3000);
              urlc.connect();
              internalStatus = urlc.getResponseCode() == 200;
            } catch (IOException e) {
              Log.e(getName(), "Error checking internet connection", e);
              sendErrorMessage("Error checking internet connection", e);
              internalStatus = false;
            }
          } else {
            // Log.d(getName(), "No network available!");
            internalStatus = false;
          }
        } catch (Exception e) {
          // Log.d(getName(), "No network available!");
          sendErrorMessage(
              "Could not determine network reachability! Please check if the library has permissions to access network state.",
              new IOException());
          internalStatus = false;
        }

        if (localStatus == null || localStatus != internalStatus) {
          localStatus = internalStatus;
          updateReachabilityStatus(internalStatus);
        }

        try {
          Thread.sleep(3000);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }

      return true;
    }

    @Override
    protected void onPostExecute(Boolean result) {
      super.onPostExecute(result);
    }

    @Override
    protected void onCancelled() {
      super.onCancelled();

      isRunning = false;
    }

    private boolean isNetworkAvailable(Context context) {
      ConnectivityManager connectivityManager = (ConnectivityManager) context
          .getSystemService(Context.CONNECTIVITY_SERVICE);
      NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
      return activeNetworkInfo != null;
    }

    private void updateReachabilityStatus(boolean isReachable) {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit("com.younics.reachability:onReachabilityChange", isReachable);
    }

    private void sendErrorMessage(String errorMessage, IOException nativeException) {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit("com.younics.reachability:onError", errorMessage + nativeException.getMessage());
    }
  }
}