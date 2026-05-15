// FIXME: This is the entry point of the application, write your code here

import { calculateLayout } from "./utils";
import { redirectToLoginPage } from "../utils/redirect";
import { authenticate } from "../utils/auth";

// Initialize the layout
calculateLayout();

// console.log(createLink());

if (await authenticate()) {
    console.log("User is authanticated");
} else {
    redirectToLoginPage();
}
