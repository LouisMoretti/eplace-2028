// FIXME: This file should handle the authentication
// Functions may include:
// - getToken (exchanges the code for a token)
// - refreshToken (refreshes the token using the refresh_token)
// - authenticate (checks if the user is authenticated)
// - authedAPIRequest (makes an authenticated request to the API)

import { redirectToLoginPage } from "./redirect";

/**
 * @param {string} code the authorization code received from the OIDC
 * provider
 * @returns {Promise<boolean>} true if the token was fetched, false otherwise
 */
export async function getToken(code) {
    const formData = new FormData();

    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", location.origin + location.pathname);
    formData.append("client_id", import.meta.env.VITE_CLIENT_ID);

    const proxy_url = import.meta.env.VITE_URL;

    console.log(code);

    const response = await fetch(proxy_url + "/auth-api/token", {
        body: formData,
        method: "post",
    });

    if (!response.ok) {
        localStorage.clear();
        redirectToLoginPage();
        return false;
    }

    const json = await response.json();
    // console.log(json);

    // console.log(json["id_token"]);
    localStorage.setItem("token", json["id_token"]);

    // console.log(json["refresh_token"]);
    localStorage.setItem("refresh_token", json["refresh_token"]);

    return true;
}

/**
 * @param {string} refreshToken the refresh token (optional)
 * @returns {Promise<boolean>} whether the token has been refreshed or not
 */
// export async function refreshToken(refreshToken) {}
