let dialog = document.getElementById("welcome_dialog");
let dialog_btn = document.getElementById("welcome_close");
let input_box = document.getElementById("interests");
let submit_btn = document.getElementById("submit_interests");
let msgbox = document.getElementById("message_content");

window.addEventListener("load", () => dialog.showModal());
dialog_btn.addEventListener("click", () => dialog.close());

submit_btn.addEventListener("click", () => {
    let int_value = input_box.value.trim();
    // Check if the user entered a comma-separated list
    if (!int_value.includes(",")) {
        alert("Please enter your interests as a comma-separated list.");
        return;
    }

    let interests = int_value.split(",");

    // Remove empty interests
    interests = interests.filter((interest) => interest.trim() != "");

    // Make sure there are at least two interests
    if (interests.length < 2) {
        alert("Please enter at least two interests separated by commas.");
        return;
    }

    // Remove the old list if one is already displayed
    let old_list = msgbox.querySelector("ul");
    if (old_list) {
        old_list.remove();
    }
    msgbox.hidden = false;

    // Create the new interests list
    let test_list = document.createElement("ul");

    interests.forEach((interest) => {
        let listItem = test_list.appendChild(
            document.createElement("li")
        );
        listItem.textContent = interest.trim();
    });

    msgbox.appendChild(test_list);

});