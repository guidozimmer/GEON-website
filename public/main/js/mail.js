
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from refreshing the page

    const form = e.target;
    const formData = new FormData(form);

    fetch("https://dev.geongroup.de/test.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Display success or error message
        document.getElementById("form-response").textContent = data;
        form.reset(); // Optionally reset the form after submission
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("form-response").textContent =
          "An error occurred. Please try again.";
      });
  });

