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

    // console.log(code);

    const response = await fetch(proxy_url + "/auth-api/token", {
        body: formData,
        method: "POST",
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
export async function refreshToken(refreshToken) {
    if (!refreshToken) {
        refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            console.log("No token found!");
        }
    }

    const formData = new FormData();

    formData.append("grant_type", "refresh_token");
    formData.append("refresh_token", refreshToken);
    formData.append("redirect_uri", location.origin + location.pathname);
    formData.append("client_id", import.meta.env.VITE_CLIENT_ID);

    const proxy_url = import.meta.env.VITE_URL;

    // console.log(refreshToken);

    const response = await fetch(proxy_url + "/auth-api/token", {
        body: formData,
        method: "POST",
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
 * @returns {Promise<boolean>} true if the user is authenticated, false otherwise
 */
export async function authenticate() {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");

    if (token) {
        return true;
    }

    if (refresh_token) {
        return refreshToken(refresh_token);
    }

    localStorage.clear();
    redirectToLoginPage();

    return false;
}

/**
 * @param {string} endpoint
 * @param {object} options this object should at least contain the method.
 * @returns {Promise<Response>} the response or null
 * We want a {Promise<Response>} so we can read the headers as well as the
 * body, rather than just the body
 */
export async function authedAPIRequest(endpoint, options) {
    if (!(await authenticate())) {
        return null;
    }

    const api_url = import.meta.env.VITE_URL;

    let token = localStorage.getItem("token");

    let headers = {
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    let response = await fetch(
        api_url + "/api" + endpoint,
        ...options,
        headers,
    );

    if (response.status == 401) {
        const message = await response.text();

        if (message.includes("Token expired")) {
            if (!refreshToken()) {
                return null;
            }

            token = localStorage.getItem("token");

            headers = {
                Authorization: `Bearer ${token}`,
                ...options.headers,
            };

            response = await fetch(
                api_url + "/api" + endpoint,
                ...options,
                headers,
            );
        } else {
            localStorage.clear();
            redirectToLoginPage();
            return null;
        }
    }

    return response;
}
