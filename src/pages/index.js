// FIXME: This is the entry point of the application, write your code here

import { calculateLayout } from "./utils";
import { authenticate } from "../utils/auth";

// Initialize the layout
calculateLayout();

// console.log(createLink());

if (await authenticate()) {
    console.log("User is authanticated.");
} else {
    console.log("Error cannot authanticate user.");
}
