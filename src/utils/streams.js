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
import { fetchRoomConfig, setCurrentRoomConfig } from "../rooms";
import { getCanvas } from "../rooms/canvas";
import { initCanvas, renderCanvasUpdate } from "../rooms/canvas/utils";

export let socket = null;

export async function initSocket() {
    if (socket || !(await authenticate())) {
        return;
    }

    console.log("Starting socket...");

    const api_url = import.meta.env.VITE_URL;

    const token = localStorage.getItem("token");

    socket = io(api_url, {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    // console.log(socket);

    // socket.on("connect_error", (err) => {
    //     if (err.message.includes("Token expired")) {
    //         socket = null;
    //         initSocket();
    //     }
    // });

    socket.on("message", async (data) => {
        // console.log(data);

        if (data?.error) {
            if (data.error.json.message.includes("Token expired")) {
                console.log("Expired token");
                // TODO: Error recovery.
            } else {
                console.log("Message error");
            }
        } else if (data.result.type == "started") {
            console.log("Subcribed");
            // Fetch and set config.
            const config = await fetchRoomConfig();

            if (!config) {
                console.log("FetchRoomConfig failed");
                return;
            }

            console.log(config);
            setCurrentRoomConfig(config);

            // Fetch and init canva.
            const pixels = await getCanvas();

            if (!pixels) {
                console.log("GetCanvas failed");
                return;
            }

            // console.log(pixels);
            initCanvas(config, pixels);
        }
    });

    socket.on("pixel-update", (data) => {
        console.log(data);
        renderCanvasUpdate(
            data.result.data.json.color,
            data.result.data.json.posX,
            data.result.data.json.posY,
        );
    });

    socket.on("connect", () => {
        console.log("Socket connected");

        let slug = location.pathname.split("/")[1];

        if (!slug) {
            slug = "epi-place";
        }

        // console.log("Slug: ", slug);

        subscribe(slug);
    });
}

async function subscribe(slug) {
    if (socket && (await authenticate())) {
        console.log("Subscribing to: ", slug);
        socket.send({
            id: "six-sevennnn-louis.moretti",
            method: "subscription",
            params: {
                path: "rooms.canvas.getStream",
                input: {
                    json: {
                        roomSlug: slug,
                    },
                },
            },
        });
    }
}

// async function unsubscribe(slug) {
//     if (socket && (await authenticate())) {
//         console.log("uNSubscribing to: ", slug);
//         socket.send({
//             id: "six-sevennnn-louis.moretti",
//             method: "subscription.stop",
//         });
//     }
// }
