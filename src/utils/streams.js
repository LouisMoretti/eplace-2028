// FIXME: This file should handle the sockets and the subscriptions
// Exports must include
// - initSocket (initialize the connection to the socket server)
// - socket (variable resulting of initSocket function)

// Functions may include:
// - subscribe (subscribe to a room's stream or chat)
// - unsubscribe (unsubscribe from a room's stream or chat)
// - sendMessage (send a message to a room's chat)

import { io } from "socket.io-client";
import { authenticate } from "./auth";

export let socket = null;

export async function initSocket() {
    if (socket || !(await authenticate())) {
        return;
    }

    const api_url = import.meta.env.VITE_URL;

    const token = localStorage.getItem("token");

    socket = io(api_url, {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(socket);

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err}`);
        console.log(`connect_error due to ${err.message}`);
        if (err.message.includes("Token expired")) {
            // if (!refreshToken()) {
            //     return;
            // }

            socket = null;
            initSocket();
        }
    });
}
