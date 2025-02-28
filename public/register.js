import { postUsers } from "./services/llamadoslogin.js"

const username = document.getElementById("username")
const pass = document.getElementById("pass")
const email = document.getElementById("email")
const register = document.getElementById("register")

register.addEventListener("click", function() {

    postUsers(pass.value,email.value, username.value);
    
})