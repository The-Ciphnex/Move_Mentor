function login() {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    // For simplicity, a hardcoded check (can replace with real authentication later)
    if (id === "admin" && password === "admin123") {
        alert("Login successful!");
    } else {
        document.getElementById("error-message").classList.remove("hidden");
    }
}
