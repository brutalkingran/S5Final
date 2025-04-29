// Modelos de datos
// Modelo pais
// 2)

import mongoose from "mongoose";

const paisesSchema = new mongoose.Schema({
    nombrePais: { type: String, required: true },
    capital: { type: String, required: true },
    borders: { type: Number, min: 0 },
    area: { type: String, default: 'Desconocido' },
    population: String,
    gini: [String],
    creador: { type: String, default: 'Patricio Esparza' },
    createdAt: { type: Date, default: Date.now }
});

const paises = mongoose.model('paises', paisesSchema, 'Grupo-03');
export default paises;