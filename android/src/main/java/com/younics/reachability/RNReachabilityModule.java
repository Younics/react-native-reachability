package com.younics.reachability;

import android.os.AsyncTask;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNReachabilityModule extends ReactContextBaseJavaModule {
    private ReachabilityAsyncTask task = null;
    private final ReactApplicationContext reactContext;
    private final Reachability reachability;


    public RNReachabilityModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.reactContext = reactContext;
        this.reachability = new Reachability();
    }

    @Override
    public String getName() {
        return "RNReachability";
    }

    @ReactMethod
    public void isReachable(String hostname, int port, int timeout, final Promise promise) {
        reachability.isReachable(hostname, port, timeout, promise);
    }

    @ReactMethod
    public void startListener(String hostname, int port, int timeout) {
        task = new ReachabilityAsyncTask(hostname, port, timeout, reactContext);
        task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    @ReactMethod
    public void stopListener() {
        if (task != null && !task.isCancelled()) {
            task.cancel(true);
            task = null;
        }
    }
}
