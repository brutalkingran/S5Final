import { borrarPaisIDController, modificarPaisFormularioController } from "./paisesController.mjs";

console.log("Conexión exitosa");

const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');

const heroeID = editButton.getAttribute('data-id');

editButton.addEventListener('click', async () => {
    try {
        await modificarPaisFormularioController( heroeID )
    } catch (error) {
        console.error(error);
    }
});

deleteButton.addEventListener('click', async () => {
    const decision = confirm(`¿Estás seguro que deseas eliminar este país?`);
    if (decision) {
        try {
            await borrarPaisIDController( heroeID )
        } catch (error) {
            console.error(error);
        }
    } else {
        return;
    }
});