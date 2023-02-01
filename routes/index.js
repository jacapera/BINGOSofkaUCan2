const { Router } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

module.exports = () => {
  //Peticiones GET
  router.get('/:table', controller.list);
  router.get('/:table/:usuario/:password', controller.login)
  router.get('/sesiones/onesesion', controller.SesionOneLast);
  router.get('/sesiones/linea', controller.sesionEnlinea)
  router.get('/cronometro/sesion', controller.consultarCronometro)

  //Peticiones POST
  router.post('/participantes', controller.crearParticipante);
  router.post('/sesiones/participantes', controller.addParticipantes);
  router.post('/sesiones', controller.addSesion)
  router.post('/start-cronometro', controller.startCronometro);


  //Peticiones PUT
  router.put('/participantes/:id', controller.update);
  router.put('/sesiones/:sesionId', controller.updateSesion);
  //router.put('/sesiones/:sesionId/estado', controller.updateEstadoJugador);

  //Peticiones DELETE
  router.delete('/:table/:id', controller.eliminar);
  router.delete('/sesiones/:sesionId/:jugadorId', controller.eliminarJugadorSesion)

  return router
};
