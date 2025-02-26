import { getUsers, postUsers} from "./services/llamados.js"

const userID = document.getElementById("userID")
const location = document.getElementById("location")
const borrowDate = document.getElementById("borrowDate")
const returnDate = document.getElementById("returnDate")
const computerID = document.getElementById("computerID")
const terms = document.getElementById("terms")
const addBtn = document.getElementById("addBtn")
const listaPrestamos = document.getElementById("listaPrestamos")

addBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    let permiso = {
        "idUsuario": userID.value,
        "locationPC": location.value,
        "borrowDate": borrowDate.value,
        "returnDate": returnDate.value,
        "computerId": computerID.value,
        "terms": terms.value
    }
    await postUsers(permiso,"permisos")
})

async function showPermits() {
    const permits = await getUsers("permisos")

    for (let index = 0; index < permits.length; index++) {

        //let idUsuario = document.createElement("p")

        //idUsuario.textContent = permits[index].idUsuario


        let p = document.createElement("p")

        p.textContent = permits[index].idUsuario,
                        permits[index].locationPC,
                        permits[index].borrowDate, 
                        permits[index].returnDate,
                        permits[index].computerId,
                        permits[index].terms

        const rejectBtn = document.createElement("button")
        rejectBtn.textContent = "REJECT"
        const acceptBtn = document.createElement("button")
        acceptBtn.textContent = "ACCEPT"

        rejectBtn.addEventListener("click", function(){

    
        })

        acceptBtn.addEventListener("click", function(){

        
        })
        listaPrestamos.appendChild(p)

    }
}
showPermits()




