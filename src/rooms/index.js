// FIXME: This file should handle the rooms API
// Functions may include:
// - fetchRoomConfig (get the configuration of a room)
// - setCurrentRoomConfig (set the current room configuration and update the DOM accordingly)
// - getCurrentRoomConfig (get the current room configuration)
// - joinRoom (join a room by its slug)
// - listRooms (list all the rooms available)
// - createRoom (create a room)
// - updateRoom (update a room's configuration)
// - deleteRoom (delete a room)

import { authedAPIRequest } from "../utils/auth";

let roomConfig = null;

export async function fetchRoomConfig() {
    let slug = location.pathname.split("/")[1];

    if (!slug) {
        slug = "epi-place";
    }

    const response = await authedAPIRequest(`/rooms/${slug}/config`, {
        headers: {
            Accept: "application/json",
        },
        method: "GET",
    });

    if (!response) {
        return null;
    }

    // console.log(response);

    return await response.json();
}

export function setCurrentRoomConfig(config) {
    roomConfig = config;

    const name = config.metadata.name;
    const description = config.metadata?.description;

    console.log(
        `Name: ${name}${description ? `, Description: ${description}` : ""}`,
    );

    // localStorage.setItem("name", name);
    // localStorage.setItem("description", description);

    const nameElement = document.getElementById("room-name");

    nameElement.innerHTML = name;

    const descriptionElement = document.getElementById("room-description");

    if (description) {
        descriptionElement.innerHTML = description;
        // descriptionElement.style.display = "";
    }
}

export function getCurrentRoomConfig() {
    return roomConfig;
}
