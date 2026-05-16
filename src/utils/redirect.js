// FIXED: This file should handle the redirection to the AUTH URL
// Functions may include:
// - createLink (construct and return the URL to redirect the user to the login page)
// - redirectToLoginPage (redirect the user to the Forge ID login page)

/**
 * @returns {URL} the URL to redirect the user to the login page.
 */
export function createLink() {
    const auth_url = import.meta.env.VITE_AUTH_URL;
    const base_uri = import.meta.env.VITE_URL;

    const client_id = import.meta.env.VITE_CLIENT_ID;
    const response_type = "code";
    const redirect_uri = base_uri + "/complete/epita/";
    const scope = ["epita", "profile", "picture"];

    return new URL(
        `/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope.join("+")}`,
        auth_url,
    );
}

/**
 * @returns {void}
 */
export function redirectToLoginPage() {
    window.location.href = createLink();
}

// module.exports = {
//     createLink,
//     redirectToLoginPage,
// };
