const sesiones = require('../models/sesiones')
const participantes = require('../models/participantes');
const { default: mongoose } = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const urlUltimaPartidaBingo = process.env.URL_ULTIMA_PARTIDA_BINGO;
const urlSesionSave = process.env.URLSESIONSAVE;
const urlPartidaSave = process.env.URLPARTIDASAVE;
const urlULtimaSesion = process.env.URL_ULTIMA_SESION;
const urlPartidaBingoAddSesion = process.env.URL_PARTIDA_ADDSESION;
//***GET */
//listar todos los participantes o sesiones, funcion parametrizada
exports.list = async (req, res, next) => {
const todos = require('../models/' + req.params.table);
  try {
    const listaTodos = await todos.find({});
    res.json(listaTodos);
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
};

//consultar los jugadores que estan en linea, funcion configurada con Agregaciones
exports.sesionEnlinea = async (req, res, next) => {
  const jugadores = require('../models/sesiones')
  try {
    const colSesiones = await jugadores.aggregate(
      [
        {
          '$lookup': {
            'from': 'participantes',
            'localField': 'jugadores.jugadorId',
            'foreignField': '_id',
            'as': 'jugador'
          }
        }, {
            '$unwind': {
              'path': '$jugador'
            }
        }, {
            '$project': {
              'usuario': '$jugador.usuario',
              'estado': '$jugador.estado',
              'id': '$jugador._id'
            }
        }
    ]
    )
    res.json(colSesiones)
  } catch (err) {
    console.error(err)
    res.send(err)
    next()
  }
}

//listar ultima sesion creada en la base de datos
exports.SesionOneLast = async (req, res, next) => {
const sesiones = require('../models/sesiones');
  try {
    const oneSesion = await sesiones.findOne().sort({createdAt: -1})
    res.json({oneSesion})
  } catch (err) {
    console.error(err);
    res.send(err)
    next()
  }
}

//valida si un participante existe para inicio de sesion
exports.login = async (req, res, next) => {
  const participantes = require('../models/participantes');
  try {
    const participante = await participantes.find({"usuario":req.params.usuario, "password":req.params.password})
    res.json(participante)
  } catch (err) {
    console.error(err);
    res.send(err)
    next()
  }
}

//***POST */

exports.crearParticipante = async (req, res, next) => {
  try {
    const participante = new participantes(req.body);
    await participante.save();
    res.json({participante})
    console.log(participante)
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
}

//agregar un participante a la sesion
exports.addParticipantes = async (req, res, next) => {
  try {
    const sesion = await sesiones.findById(req.body)
    sesion.jugagores.push({jugadorId})
    await sesion.save();
    res.json({sesion});
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
};

exports.addSesion = async (req, res, next) => {
  try {
    //const jugadorId = new mongoose.Types.ObjectId(req.body.jugadorId)
    const sesion = new sesiones();
    await sesion.save();
    res.json({sesion})
    console.log(sesion)
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
};

//***PUT */
//Actualizar o modificar un participante
exports.update = async (req, res, next) => {
  const todos = require('../models/participantes');
  try {
    const one = await todos.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {new: true}
    );
    res.send({message: req.params.table + ' modificado exitosamente'});
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
};


exports.updateSesion = async (req, res, next) => {
  try {
    const sesion = await sesiones.findById(req.params.sesionId);
    const jugadorExistente = sesion.jugadores.find(jugador => jugador.jugadorId.toString() === req.body.jugadorId.toString())
    if ( !jugadorExistente) {
      sesion.jugadores.push({jugadorId:req.body.jugadorId});
      await sesion.save()
      .then(response => {
        res.json({sesion})
      })
    }
  } catch (err) {
    console.error(err.message);
    res.send({message:err.message});
    next();
  }
}

// exports.updateEstadoJugador = async (req, res, next) => {
//   try {
//     const sesion = await sesiones.findById(req.params.sesionId);
//     const participante = sesion.jugadores.find( p => p.jugadorId.equals(req.body.jugadorId));
//     participante.estado = req.body.estado
//     await sesion.save();
//     res.json({sesion})
//   } catch (err) {
//     console.error(err);
//     res.send(err);
//     next();
//   }
// }


//***DELETE */

// elminar un participante
exports.eliminar = async (req, res, next) => {
  const todos = require('../models/' + req.params.table);
  try {
    const one = await todos.findByIdAndDelete({_id: req.params.id});
    res.json({message: req.params.table + ' eliminado exitosamente'});
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
}

exports.eliminarJugadorSesion = async (req, res, next) => {
  try {
    const sesion = await sesiones.findById(req.params.sesionId);
    sesion.jugadores.pull({jugadorId:req.params.jugadorId});
    await sesion.save();
    res.json({message: "jugador OffLine"})
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
}

//***ACCIONES FUERA DE LA BASE DE DATOS */

peticionPostSesion = async() =>{
  await axios.post( urlSesionSave, {})
  .then(response => {
    console.log(response.data);
  }).catch(err => {
    console.error(err.message);
  })
}

peticionPostPartida = async() =>{
  await axios.post( urlPartidaSave, {ganador:"false"})
  .then(response => {
    console.log(response.data);
  }).catch(err => {
    console.error(err.message);
  })
}

//=====================================================================================================
//                                   AGREGAR SESION A PARTIDA
//=====================================================================================================
let formSesion = {
  id:null
}
let formPartida = {
  idPartidaBingo:null
}
  /*
   * trae la ultima sesion y se ejecuta async/await
   */
  agregarSesionAPartida = async () => {
    await peticionPostPartida();
    await peticionPostSesion();
    await axios.get( urlUltimaPartidaBingo ).then( response => {
      formPartida.idPartidaBingo = response.data.idPartidaBingo
    }).catch( err => { console.log( err.message ); });
    await axios.get( urlULtimaSesion ).then( response => {
      formSesion.id = response.data.id
    }).catch( err => { console.log( err.message ); });
    await axios.put( urlPartidaBingoAddSesion + '/' +formPartida.idPartidaBingo, formSesion  ).then ( response => {
      console.log(response.data);
    }).catch (err => { console.error(err.message); })
  }

/**
 * objeto creado para almacenar las variables que requiere la funcion cronometro para que se cree el efecto temporizador
 */
cronometroData = {
  segundos: 0,
  minutos: 0,
  horas:0,
  segundosAux:0,
  minutosAux:0,
  horasAux:0,
  intervalo:0
}

/**
 * funcion para simular un cronometro que vaya en retroceso por un determinado tiempo en minutos
 */
cronometro = (tiempoEspera, cronometroData) => {
  cronometroData.segundos = 1;
  cronometroData.minutos = tiempoEspera;
  cronometroData.segundosAux = 0;
  cronometroData.minutosAux = 0;
  cronometroData.horas = 0;
  cronometroData.horasAux = 0;

  cronometroData.intervalo = setInterval(() => {
    try {
      cronometroData.segundos--
      if (cronometroData.segundos === -1) {
        cronometroData.minutos--
        cronometroData.segundos = 59
      }
      if(cronometroData.segundos < 10) {
        cronometroData.segundosAux = "0" + cronometroData.segundos
      } else {
        cronometroData.segundosAux = cronometroData.segundos
      }
      if(cronometroData.minutos < 10) {
        cronometroData.minutosAux = "0" + cronometroData.minutos
      } else {
        cronometroData.minutosAux = cronometroData.minutos
      }
      if ( cronometroData.horas < 10) {
        cronometroData.horasAux = "0" + cronometroData.horas
      } else {
        cronometroData.horasAux = cronometroData.horas
      }
      console.log(`${cronometroData.horasAux}:${cronometroData.minutosAux}:${cronometroData.segundosAux}`)
    } catch (err) {
      console.error(err);
    }
    if(cronometroData.minutos === 0 && cronometroData.segundos === 0){
      clearInterval(cronometroData.intervalo)
      agregarSesionAPartida();
    }
  }, 1000)
}

/**
 * función que atraves de una peticion post desde el Frontend se ejecuta la funcion cronometro
 * @param {*} req se requiere el valor de tiempoEspera que es el tiempo en minutos que ira el cronometro en reversa
 * @param {*} res confimacion de que se ejecuto exitosamente el valor a tiempoEspera a la funcion cronometro
 */
exports.startCronometro = async (req, res, next) => {
  try {
    const { tiempoEspera } = req.body;
    cronometro(tiempoEspera, cronometroData);
    res.json({tiempoEspera});
  } catch (err) {
    console.error(err);
    res.send(err);
    next();
  }
}

/**
 * función que por medio de una peticion GET del Frontend se consulta el estado de las variables afectada de la función cronometro
 * que es lo que simula el cronometro en decremento.
 * @param {*} req para esta funcion no se utiliza
 * @param {*} res se envia los valores que afectan las variables al ejecutarse la funcion cronometro
 */
exports.consultarCronometro = (req, res, next) => {
  try {
  res.send({
    minutos:cronometroData.minutos,
    segundos:cronometroData.segundos,
    segundosAux:cronometroData.segundosAux,
    minutosAux:cronometroData.minutosAux,
    horasAux:cronometroData.horasAux
  });
  } catch (err) {
    console.error(err);
    res.send(err)
    next()
  }
}
