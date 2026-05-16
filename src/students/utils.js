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
    $("body").append(
        `<div class="FormOverlay">
            <form class="StylisedForm" id="student-update-form">
                <div class="FormHeader">
                    <h2 class="FormTitle">Update Profile</h2>
                </div>
                <div class="FormItem">
                    <label for="avatar-url" class="FormLabel">
                        Avatar URL
                    </label>
                    <input
                        type=""
                        class="FormInput"
                        id="avatar-url"
                        name="avatar-url"
                        placeholder="Enter avatar URL"
                    />
                </div>

                <div class="FormItem">
                    <label for="guild-tag" class="FormLabel">
                        Guild Tag
                    </label>
                    <input
                        type="text"
                        class="FormInput"
                        id="guild-tag"
                        name="guild-tag"
                        placeholder="Enter guild tag"
                    />
                </div>
                <div class="FormItem">
                    <label for="quote" class="FormLabel">
                        Quote
                    </label>
                    <input
                        type="text"
                        class="FormInput"
                        id="quote"
                        name="quote"
                        placeholder="Enter a quote"
                    />
                </div>
                <div class="FormButtons">
                    <button type="button" id="close-modal">
                        Cancel
                    </button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>`,
    );
    $("#close-modal")[0].addEventListener("click", () => {
        console.log("test");
        $(".FormOverlay").remove();
    });
    $("#student-update-form")[0].onsubmit = function (event) {
        event.preventDefault();
        const avatarUrl = $("#avatar-url")[0];
        const guildTag = $("#guild-tag")[0];
        const quote = $("#quote")[0];

        console.log(avatarUrl.value, guildTag.value, quote.value);

        updateStudent(avatarUrl.value, guildTag.value, quote.value);
        $(".FormOverlay").remove();
        return true;
    };
}

$("#profile-update")[0].addEventListener("click", () => {
    // const state = colorWheelContainer.style.display;
    // colorWheelContainer.style.display =
    //     !state || state === "none" ? "block" : "none";
    console.log("Updating profile");
    showModal();
    // updateStudent("https://avatars.githubusercontent.com/u/41584101", "YAKAKA");
});
