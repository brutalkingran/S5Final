import mongoose from "mongoose";
import Pais from "./src/models/Paises.mjs";

const endpoint = `https://restcountries.com/v3.1/all`;
const connect_data = `mongodb+srv://Grupo-03:grupo03@cursadanodejs.ls9ii.mongodb.net/Node-js`;

const cargarPaises = async () => {
    try {
        // conexión a mongodb
        await mongoose.connect(connect_data);
        console.log("Conectado a MongoDB");

        const respuesta = await fetch(endpoint);
        const data = await respuesta.json();

        // filtrar países por idioma español
        const data_filtro = data.filter( ( pais ) => {
            return pais.languages && Object.keys(pais.languages).includes("spa");
        } );

        const propiedadesAEliminar = [
            "translations", "tld", "cca2", "ccn3", "cioc", "idd", "altSpellings",
            "car", "coatOfArms", "postalCode", "demonyms"
        ];  
        
        // filtrar propiedades
        const data_final = data_filtro.map( ( pais ) => {
            const nuevoPais = { ...pais };

            // Elimina propiedades sin usar
            propiedadesAEliminar.forEach(prop => delete nuevoPais[prop]);

            // Nuevo campo: nombre creador
            nuevoPais.creador = "Patricio";

            return nuevoPais;
        })

        // Cargar a base de datos
        // const resultado = await Pais.insertMany(data_final, { ordered: false});

        for (const pais of data_final) {
            const nuevoPais = new Pais(pais);
            await nuevoPais.save();
        }

        console.log(`${resultado.length} países insertados`);
    } catch (error) {
        console.error("Error al procesar los países:", error);
    } finally {
        mongoose.disconnect();
    }
}

cargarPaises();