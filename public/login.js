    import { postUsers } from "./services/llamados.js"
const logInUser = document.getElementById("LogInUser")
const logInPassword = document.getElementById("logInPassword")
const logInBtn = document.getElementById("logInBtn")

const users = {
    "admin" : "hi123", 
    "student" : "bye123"
}

logInBtn.addEventListener("click", function(){
    postUsers(logInUser.value, logInPassword.value)
})

 document.getElementById("logInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const logInUser = document.getElementById("LogInUser").value;
    const logInPassword = document.getElementById("logInPassword").value;

    if (users[logInUser] && users [logInUser] === logInPassword) {
        Swal.fire({
            icon: "success",
            title: "Logged In",
            text: "You've succesfully logged in!",
          });
          setTimeout(() => {
            window.location.href = "inicio.html";              
          }, 2000);
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
    }
})

