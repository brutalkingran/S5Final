// Modelos de datos
// Modelo pais
// 2)

import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({
    name: { official: { type: String, required: true } },
    capital: [String],
    borders: [String],
    area: Number,
    population: Number,
    gini: { type: Map, of: Number },
    timezones: [String],
    creador: { type: String, default: "Patricio" },
    createdAt: { type: Date, default: Date.now }
});


const Pais = mongoose.model('Grupo-03', paisSchema, 'Grupo-03');
export default Pais;
