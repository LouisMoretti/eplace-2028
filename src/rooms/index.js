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

export async function fetchRoomConfig() {
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
        `${api_url}/api/rooms/${slug}/config`,
        options,
    );

    console.log(response);

    const message = await response.json();

    console.log(message);

    const name = message.metadata.name;
    const description = message.metadata?.description;

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
        descriptionElement.style.display = "";
    }
}
