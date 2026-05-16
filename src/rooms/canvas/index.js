// FIXME: This file should handle the room canvas API
// Link buttons to their respective functions
// Functions may include:
// - getCanvas (get the canvas of a room and deserialize it)
// - subscribeToRoom (subscribe to the stream of a room)
// - getPixelInfo (get the pixel info of a room)
// - placePixel (place a pixel in a room)

import { getCurrentRoomConfig } from "..";

export async function getCanvas() {
    let slug = location.pathname.split("/")[1];

    if (!slug) {
        slug = "epi-place";
    }

    const token = localStorage.getItem("token");
    const api_url = import.meta.env.VITE_URL;

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        method: "GET",
    };

    const response = await fetch(
        `${api_url}/api/rooms/${slug}/canvas`,
        options,
    );

    // console.log(response);

    const canvas = await response.json();

    let binCanvas = "";

    for (let i = 0; i < canvas.pixels.length; i++) {
        const charCode = canvas.pixels.charCodeAt(i);

        for (let j = 7; j >= 0; j--) {
            binCanvas += (charCode >> j) & 1;
        }
    }

    // console.log(canvas);
    // console.log(binCanvas);

    const canvasDimensions = getCurrentRoomConfig().metadata.canvasDimensions;

    const pixels = [];

    for (let i = 0; i < canvasDimensions * canvasDimensions; i++) {
        pixels.push(parseInt(binCanvas.substring(i * 5, i * 5 + 5), 2));
    }

    return pixels;
}
