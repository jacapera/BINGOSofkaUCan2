const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const sesionesSchema = new Schema({
  jugadores: [{
    jugadorId:{type:mongoose.Types.ObjectId, unique:true, trim:true, ref:'participantes', required:true},
  }]
});

module.exports = mongoose.model('sesiones', sesionesSchema);


