import { getUsers } from "./services/llamadoslogin.js"
const logInUser = document.getElementById("LogInUser")
const logInPassword = document.getElementById("logInPassword")
const logInBtn = document.getElementById("logInBtn")

logInBtn.addEventListener("click", async function() {
    const usuariosRegistrados = await getUsers()
    
    for (let index = 0; index < usuariosRegistrados.length; index++) {

        if (logInUser.value === usuariosRegistrados[index].username && logInPassword.value === usuariosRegistrados[index].pass && usuariosRegistrados[index].type==="Admin"){
           
     
            window.location.href="inicio.html";


        }

        if (logInUser.value === usuariosRegistrados[index].username && logInPassword.value === usuariosRegistrados[index].pass && usuariosRegistrados[index].type==="student"){
           
     
            window.location.href="students.html";

        }
    }    
})

