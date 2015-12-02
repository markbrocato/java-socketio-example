package com.sencha.ws.client;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.net.URISyntaxException;
import java.util.Timer;
import java.util.TimerTask;

/**
 * A simple client that connects on port 3000 and sends a message "hi".
 */
public class Main {

    static Timer timer;
    static Socket socket;

    static class MessageTask extends TimerTask {
        public void run() {
            socket.emit("message", getNumber(), getNumber(), getNumber());
        }

        public int getNumber() {
            return (int)(Math.random() * 10);
        }
    }

    public static void main(String[] args) throws URISyntaxException {
        timer = new Timer();
        socket = IO.socket("http://localhost:3000");

        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                timer.scheduleAtFixedRate(
                        new MessageTask(),
                        3000,  //delay in ms
                        3000   //interval in ms
                );

                //socket.emit("message", "hi");
                //socket.disconnect();
            }

        }).on("event", new Emitter.Listener() {

            @Override
            public void call(Object... args) {}

        }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {}

        });

        socket.connect();
    }

}
