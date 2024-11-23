const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

fistForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = secondForm.querySelector('input[type="email"]').value;
    const password = secondForm.querySelector('input[type="password"]').value;

    if (email === "admin@example.com" && password === "admin") {
        window.location.href = "control_caja.html";
    } else {
        alert("Correo electrónico o contraseña incorrectos.");
    }
});