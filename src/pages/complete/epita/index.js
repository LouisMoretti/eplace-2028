// FIXME: This file should handle the auth redirection
// Get the code from the URL parameters and redirect to the relevant page

const params = new URLSearchParams(window.location.search);

import { getToken } from "../../../utils/auth";
import { redirectToLoginPage } from "../../../utils/redirect";

// for (const [key, value] of params) {
//     console.log(key, ": ", value);
// }

console.log("Getting token...");

if (!params.get("code") || !(await getToken(params.get("code")))) {
    redirectToLoginPage();
} else {
    // Redirect to home page
    window.location.href = import.meta.env.VITE_URL;
}
