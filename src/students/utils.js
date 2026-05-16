// FIXME: This file should handle the students DOM manipulation
// Link buttons to their respective functions
// Functions may include:
// - displayStudentProfile (display the student's profile in the DOM)
// - showModal (add a form modal to the DOM)

import $ from "jquery";
import { getStudent, updateStudent } from ".";

export async function displayStudentProfile() {
    const student = await getStudent();

    console.log(student);

    $("#profile-info-avatar").attr(
        "src",
        student.avatarURL ?? "/default-avatar.png",
    );

    $("#profile-info-login")[0].innerHTML = student.login;
    $("#profile-info-quote")[0].innerHTML = student.quote;
}

export async function showModal() {
    // TODO
}

$("#profile-update")[0].addEventListener("click", () => {
    // const state = colorWheelContainer.style.display;
    // colorWheelContainer.style.display =
    //     !state || state === "none" ? "block" : "none";
    console.log("Updating profile");
    updateStudent("https://avatars.githubusercontent.com/u/41584101", null);
});
