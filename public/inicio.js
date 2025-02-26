import { getUsers, patchData, postUsers} from "./services/llamados.js"

const userID = document.getElementById("userID")
const location = document.getElementById("location")
const borrowDate = document.getElementById("borrowDate")
const returnDate = document.getElementById("returnDate")
const computerID = document.getElementById("computerID")
const terms = document.getElementById("terms")
const addBtn = document.getElementById("addBtn")
const listaPrestamos = document.getElementById("listaPrestamos")
const acceptedContainer = document.getElementById("acceptedContainer")
const rejectedContainer = document.getElementById("rejectedContainer")

addBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    let permiso = {
        "idUsuario": userID.value,
        "locationPC": location.value,
        "borrowDate": borrowDate.value,
        "returnDate": returnDate.value,
        "computerId": computerID.value,
        "terms": terms.value,
        "estado": false
    }
    await postUsers(permiso,"permisos")
})
//Para seleccionar la lista de Aceptados y rechazados
    async function showPermits() {
    const permits = await getUsers("permisos")
    const listaAceptados = permits.filter(permiso=>permiso.estado === true)
    console.log(listaAceptados);
    //PRUEBA///////////HACER FOR EACH
    permits.forEach( (estado) => { 
        const listaAceptados = document.createElement(div)
        
    });



    for (let index = 0; index < permits.length; index++) {

        let table = document.createElement("table")
        let thIdUsuario = document.createElement("tr")
        let thlocationPC = document.createElement("tr")
        let thborrowDate = document.createElement("tr")
        let threturnDate = document.createElement("tr")
        let thcomputerId = document.createElement("tr")
        let thterms = document.createElement("tr")
        
        thIdUsuario.textContent = permits[index].idUsuario
        thlocationPC.textContent = permits[index].locationPC
        thborrowDate.textContent = permits[index].borrowDate
        threturnDate.textContent = permits[index].returnDate
        thcomputerId.textContent = permits[index].computerId
        thterms.textContent = permits[index].terms

        table.appendChild(thIdUsuario)
        table.appendChild(thlocationPC)
        table.appendChild(thborrowDate)
        table.appendChild(threturnDate)
        table.appendChild(thcomputerId)
        table.appendChild(thterms)

        listaPrestamos.appendChild(table)

        const rejectBtn = document.createElement("button")
        rejectBtn.textContent = "REJECT"
        const acceptBtn = document.createElement("button")
        acceptBtn.textContent = "ACCEPT"

        table.appendChild(rejectBtn)
        table.appendChild(acceptBtn)

        rejectBtn.addEventListener("click", async function(){
            await patchData(
                false,"permisos",permits[index].id
            )

        })
        acceptBtn.addEventListener("click", async function(){
            await patchData(
                true,"permisos",permits[index].id
            )
        })
        
    }}
showPermits()
