// FIXME: This file should handle the students API
// Functions may include:
// - getStudent (get a student from the API by its uid or login)
// - getUserUidFromToken (get the user's uid from the token in local storage)
// - updateStudent (update the student's profile through the API)

import jwt_decode from "jwt-decode";

import { authedAPIRequest } from "../utils/auth";
import { displayStudentProfile } from "./utils";

export async function getStudent() {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    const _uid = decoded.uid;

    const response = await authedAPIRequest(`/students/${_uid}`, {
        method: "GET",
    });

    return await response.json();
}

export async function updateStudent(avatarURL, quote) {
    const body = {
        avatarURL: avatarURL,
        quote: quote,
    };

    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    const _uid = decoded.uid;

    const response = await authedAPIRequest(`/students/${_uid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response) {
        console.log("Error when updating user");
    }

    await displayStudentProfile();
}
