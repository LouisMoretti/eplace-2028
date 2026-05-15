// FIXME: This file should handle the authentication
// Functions may include:
// - getToken (exchanges the code for a token)
// - refreshToken (refreshes the token using the refresh_token)
// - authenticate (checks if the user is authenticated)
// - authedAPIRequest (makes an authenticated request to the API)

/**
 * @param {string} code the authorization code received from the OIDC
 * provider
 * @returns {Promise<boolean>} true if the token was fetched, false otherwise
 */
export async function getToken(code) {
    const formData = new FormData();

    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", window.location.href);
    formData.append("client_id", import.meta.env.VITE_CLIENT_ID);

    const auth_url = import.meta.env.VITE_AUTH_URL;

    return fetch(auth_url + "/token", { body: formData, method: "post" });
}

/**
 * @param {string} refreshToken the refresh token (optional)
 * @returns {Promise<boolean>} whether the token has been refreshed or not
 */
// export async function refreshToken(refreshToken) {}
