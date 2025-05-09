// Modelos de datos
// Modelo pais
// 2)

import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({
    name: { official: { type: String, required: true, minlength: 3, maxlength: 90 } },
    capital: { type: [String], required: true },
    borders: { type: [String] },
    area: { type: Number, min: [0, 'El área debe ser un número positivo.'] },
    population: { type: Number, min: [0, 'La población debe ser un número entero positivo.'], default: "N/A" },
    gini: { type: Map, of: { type: Number, min: 0, max: 100, default: "N/A" } },
    timezones: { type: [String], required: true },
    creador: { type: String, default: "Patricio" },
    createdAt: { type: Date, default: Date.now }
});

const Pais = mongoose.model('Grupo-03', paisSchema, 'Grupo-03');
export default Pais;
