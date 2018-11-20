package com.younics.reachability;

import android.os.AsyncTask;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;

class ReachabilityAsyncTask extends AsyncTask<Void, Void, Boolean> {
    private Boolean isRunning;
    private Boolean isReachable;
    private int timeout = 5000;
    String hostname = "8.8.8.8";
    int port = 443;
    private final ReactApplicationContext reactContext;

    public ReachabilityAsyncTask(String hostname, int port, int timeout, ReactApplicationContext reactContext) {
        this.reactContext = reactContext;

        if (timeout > 0) this.timeout = timeout;
        if (hostname != null && !hostname.isEmpty()) this.hostname = hostname;
        if (port > 0) this.port = port;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        this.isRunning = true;
    }

    @Override
    public Boolean doInBackground(Void... records) {
        while (isRunning) {
            try {
                try (Socket soc = new Socket()) {
                    soc.connect(new InetSocketAddress(InetAddress.getByName(hostname), port), timeout);
                }
                if (isReachable == null || isReachable == false) {
                    isReachable = true;
                    updateReachabilityStatus(true);
                }
            } catch (IOException ex) {
                if (isReachable == null || isReachable == true) {
                    isReachable = false;
                    updateReachabilityStatus(false);
                }
            }

            try {
                Thread.sleep(timeout);
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

    private void updateReachabilityStatus(boolean isReachable) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("com.younics.reachability:onReachabilityChange", isReachable);
    }

    private void sendErrorMessage(String errorMessage, IOException nativeException) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("com.younics.reachability:onError", errorMessage + nativeException.getMessage());
    }
}