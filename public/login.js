import { getUsers } from "./services/llamadoslogin.js"
const logInUser = document.getElementById("LogInUser")
const logInPassword = document.getElementById("logInPassword")
const logInBtn = document.getElementById("logInBtn")

logInBtn.addEventListener("click", async function() {
    const usuariosRegistrados = await getUsers()
    
    for (let index = 0; index < usuariosRegistrados.length; index++) {

        if (logInUser.value === usuariosRegistrados[index].username && logInPassword.value === usuariosRegistrados[index].pass && usuariosRegistrados[index].type==="Admin"){
            Swal.fire({
                icon: "success",
                title: "Logged In",
                text: "You've succesfully logged in!",
              });
              setTimeout(() => {
            window.location.href="inicio.html";
            }, 2000);   

        }

        if (logInUser.value === usuariosRegistrados[index].username && logInPassword.value === usuariosRegistrados[index].pass && usuariosRegistrados[index].type==="student"){
            Swal.fire({
                icon: "success",
                title: "Logged In",
                text: "You've succesfully logged in!",
              });
              setTimeout(() => {
            window.location.href="students.html";
            }, 2000);   
        }
    }    
})

