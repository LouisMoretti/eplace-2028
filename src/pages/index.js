// FIXME: This is the entry point of the application, write your code here

import { calculateLayout } from "./utils";
import { authenticate } from "../utils/auth";
import { initSocket } from "../utils/streams";

// Initialize the layout
calculateLayout();

// console.log(createLink());

if (await authenticate()) {
    console.log("User is authanticated.");

    console.log("Starting socket...");
    localStorage.setItem("token", "BAD TOKEN");
    await initSocket();
} else {
    console.log("Error cannot authanticate user.");
}
