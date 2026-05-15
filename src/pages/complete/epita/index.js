// FIXME: This file should handle the auth redirection
// Get the code from the URL parameters and redirect to the relevant page

const params = new URLSearchParams(window.location.search);

import { getToken } from "../../../utils/auth";

// for (const [key, value] of params) {
//     console.log(key, ": ", value);
// }

getToken(params.get("code"));
