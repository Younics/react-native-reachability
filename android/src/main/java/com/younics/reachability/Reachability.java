package com.younics.reachability;

import com.facebook.react.bridge.Promise;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;

/* TODO: refactor -> one-time configuration into constructor */
class Reachability {
    public void isReachable(String hostname, int port, int timeout, final Promise promise) {
        int tm = timeout > 0 ? timeout : 5000;
        String hn = hostname != null && !hostname.isEmpty() ? hostname : "8.8.8.8";
        int pt = port > 0 ? port : 443;

        try {
            Socket soc = new Socket();
            try {
                soc.connect(new InetSocketAddress(InetAddress.getByName(hn), pt), tm);
            } finally {
                soc.close();
            }
            promise.resolve(true);
        } catch (IOException ex) {
            promise.resolve(false);
        }
    }
}
