import { getUsers, patchData, postUsers } from "./services/llamados.js"

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
    if(!terms.checked) {
    const { value: accept } = await Swal.fire({
        title: "Terms and conditions",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: `
            ○ Si viajas en transporte público, debes resguardar tu equipo en tu bolso
            personal, no exponerlo.
            
            ○ Si llevas el equipo, procura ir acompañado.

            ○ Si está lloviendo, procura llevar el equipo en un vehículo apropiado para
            evitar algún daño.

            ○ Evitar jugar, descargar o utilizar el equipo para otros motivos que no sean
            relacionados con el estudio.

            ○ El equipo será revisado antes y después de ser entregado.
            Cualquier alteración o instalación indebida podría resultar en la pérdida de privilegios.
            
            ○ Si retiras una computadora sin haber completado el formulario y la boleta
            física, podrías ser amonestado.
            
            ○ Este formulario debe llenarse junto con la boleta física, que debe estar
            firmada por la persona encargada.

            I agree with the terms and conditions
        `,
        confirmButtonText: `
          Continue&nbsp;<i class="fa fa-arrow-right"></i>
        `,
        inputValidator: (result) => {
          return !result && "You need to agree with T&C";
        }
      });
      if (accept) {
        Swal.fire("You agreed with T&C :)");
      }
    }

    let permiso = {
        "idUsuario": userID.value,
        "locationPC": location.value,
        "borrowDate": borrowDate.value,
        "returnDate": returnDate.value,
        "computerId": computerID.value,
        "terms": terms.value,
        "estado": false
    }
    await postUsers(permiso, "permisos")

})
//Para seleccionar la lista de Aceptados y rechazados
async function showPermits() {
    const permits = await getUsers("permisos")
    const listaAceptados = permits.filter(permiso => permiso.estado === true)
    console.log(listaAceptados);

    const listaUlAceptados = document.createElement("ul")
    const listaUlRechazados = document.createElement("ul")

    const listaFiltradaAceptados = permits.filter(permit => permit.estado === true)

    const listaFiltradaRechazados = permits.filter(permit => permit.estado === false)
    listaFiltradaRechazados.forEach((permit) => {
        const liUsuario = document.createElement("li")
        const locationPC = document.createElement("li")
        const borrowDate = document.createElement("li")
        const returnDate = document.createElement("li")
        const computerId = document.createElement("li")
        const terms = document.createElement("li")
        const estado = document.createElement("li")
        const hr = document.createElement("hr")

        liUsuario.textContent = permit.idUsuario
        locationPC.textContent = permit.locationPC
        borrowDate.textContent = permit.borrowDate
        returnDate.textContent = permit.returnDate
        computerId.textContent = permit.computerId
        terms.textContent = permit.terms
        estado.textContent = permit.estado

        listaUlRechazados.appendChild(liUsuario)
        listaUlRechazados.appendChild(locationPC)
        listaUlRechazados.appendChild(borrowDate)
        listaUlRechazados.appendChild(returnDate)
        listaUlRechazados.appendChild(computerId)
        listaUlRechazados.appendChild(terms)
        listaUlRechazados.appendChild(estado)

        rejectedContainer.appendChild(listaUlRechazados)

        const btnReject = document.createElement("button")
        btnReject.setAttribute("class", "btnReject")
        btnReject.textContent = "Reject"

        btnReject.addEventListener("click", async function () {
            await patchData(false, "permisos", permit.id)
        })

        const btnAccept = document.createElement("button")
        btnAccept.setAttribute("class", "btnAccept")
        btnAccept.textContent = "Accept"

        btnAccept.addEventListener("click", async function () {
            await patchData(true, "permisos", permit.id)
        })
        liUsuario.appendChild(btnReject)
        liUsuario.appendChild(btnAccept)

        rejectedContainer.appendChild(listaUlRechazados)
        listaUlRechazados.appendChild(hr)
    });

    ///////////////ACCEPTED LIST//////////

    listaFiltradaAceptados.forEach((permit) => {
        const btnAccept = document.createElement("button")
        btnAccept.setAttribute("class", "btnAccept") 

        const btnReject = document.createElement("button")
        btnReject.setAttribute("class", "btnReject")

        const hr = document.createElement("hr")
        btnReject.textContent ="Reject"
        const liUsuario = document.createElement("li")
        const locationPC = document.createElement("li")
        const borrowDate = document.createElement("li")
        const returnDate = document.createElement("li")
        const computerId = document.createElement("li")
        const terms = document.createElement("li")
        const estado = document.createElement("li")

        liUsuario.textContent = permit.idUsuario
        locationPC.textContent = permit.locationPC
        borrowDate.textContent = permit.borrowDate
        returnDate.textContent = permit.returnDate
        computerId.textContent = permit.computerId
        terms.textContent = permit.terms
        estado.textContent = permit.estado
        btnAccept.textContent = "Accept"
        listaUlAceptados.appendChild(liUsuario)
        listaUlAceptados.appendChild(locationPC)
        listaUlAceptados.appendChild(borrowDate)
        listaUlAceptados.appendChild(returnDate)
        listaUlAceptados.appendChild(computerId)
        listaUlAceptados.appendChild(terms)
        listaUlAceptados.appendChild(estado)

        acceptedContainer.appendChild(listaUlAceptados)
        listaUlAceptados.appendChild(hr)

        btnReject.addEventListener("click", async function () {
            await patchData(
                false, "permisos", permit.id
            )
        })
        liUsuario.appendChild(btnReject)

        liUsuario.appendChild(btnAccept)
        btnAccept.addEventListener("click", async function () {
            await patchData(
                true, "permisos", permit.id
            )
        })
    });
}
showPermits()