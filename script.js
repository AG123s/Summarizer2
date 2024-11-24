function summarizeText() {
    const inputText = document.getElementById('inputText').value;

    if (!inputText) {
        alert("Please enter some text!");
        return;
    }

    if (inputText.length > 2000) {
        alert("Text too long! Please summarize fewer than 2000 characters at a time.");
        return;
    }

    document.getElementById("loadingSpinner").style.display = "block";

    fetch("https://crimson-karoly-6.tiiny.site/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("loadingSpinner").style.display = "none";
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                document.getElementById("summaryText").textContent = data.summary;
                document.getElementById("summaryBox").style.display = "block";
            }
        })
        .catch((error) => {
            document.getElementById("loadingSpinner").style.display = "none";
            alert("An error occurred. Please try again.");
        });
}
