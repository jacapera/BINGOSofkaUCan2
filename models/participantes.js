const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const participantesSchema = new Schema({
  usuario: {type:String, Trim:true, unique:true},
  password: {type:String, Trim:true},
  estado: {type:String, Trim:true, require:true, defaultValue:"OnLine"}
});

module.exports = mongoose.model('participantes', participantesSchema);