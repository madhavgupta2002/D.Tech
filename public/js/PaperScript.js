function changePDF(url) {
    // alert("hi")
    var myIframe = document.getElementById("myIframe");
    myIframe.src = url;

}
// Page markup is rendered by React (src/pages/question-papers.js); it calls window.initPapers() on mount.
function showPapers() {
    document.getElementById("navigator").innerHTML = "";
    var currentSubject = null; // Variable to keep track of the current subject

    for (var i = 0; i < drive.length; i++) {
        var clickableItem = document.createElement("span");
        clickableItem.style.cursor = "pointer"; // Make it look clickable
        clickableItem.id = "span-id";
        clickableItem.innerText = drive[i].Name;

        // Check if the subject has changed
        if (drive[i].Subject !== currentSubject) {
            // Create a new div for the new subject
            var subjectDiv = document.createElement("div");
            subjectDiv.id = "subject-div"; // Set the id to "subject-div"
            var htmlString = '<h2 type="button" class="collapsible" id="click-me">' + drive[i].Subject + "</h2>";

            // subjectDiv.innerHTML = htmlString;
            document.getElementById("navigator").innerHTML += htmlString;
            document.getElementById("navigator").appendChild(subjectDiv);


            currentSubject = drive[i].Subject; // Update the current subject

        }

        subjectDiv.appendChild(clickableItem);
        subjectDiv.appendChild(document.createElement("br")); // Add a line break
    }


    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }



    var elements = document.querySelectorAll('#click-me');

    // Simulate a click on each element
    elements.forEach(function (element) {
        element.click();
    });
    elements.forEach(function (element) {
        element.click();
    });

}

window.initPapers = function () {
    document.getElementById('display').onclick = showPapers;
};


function CallchangePDF(element) {

    for (let i = 0; i < drive.length; i++)
        if (drive[i].Name == element.innerText)
            changePDF(drive[i].URL)

}

document.addEventListener("click", function (event) {
    try {
        if (event.target.innerText.trim() !== "" && event.target instanceof HTMLSpanElement)
            CallchangePDF(event.target);
    }
    catch (err) {
        console.log(err)
    }

});