package com.sofka.bingo.service;

import com.sofka.bingo.modelo.Jugador;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.repository.JugadorRepository;
import com.sofka.bingo.repository.SesionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;


/**
 * Clase de servicio para gestionar las operaciones relacionadas con los objetos Jugador
 */
@Service
public class JugadorService {

    /**
     * Instancia de JugadorRepository para interactuar con la base de datos
     */
    @Autowired
    private JugadorRepository jugadorRepository;

    @Autowired
    private SesionRepository sesionRepository;

    /**
     * Obtiene todos los Jugadores de la base de datos
     * @return Lista de Jugadores
     */
    @Transactional(readOnly = true)
    public List<Jugador> getAll() {
        return jugadorRepository.getAll();
    }

    /**
     * Obtiene un Jugador por su id
     * @param idJugador Id del Jugador a obtener
     * @return Jugador correspondiente al id especificado
     */
    @Transactional(readOnly = true)
    public Optional<Jugador> getJugador(String idJugador) {
        return jugadorRepository.getJugador(idJugador);
    }

    /**
     * Guarda un Jugador en la base de datos
     * @param jugador Jugador a guardar
     * @return Jugador guardado
     */
    @Transactional
    public Jugador save(Jugador jugador) {
        if (jugador.getIdJugador() == null || jugador.getIdJugador() == "") {
            return jugador;
        }
        Optional<Jugador> aux = jugadorRepository.getJugador(jugador.getIdJugador());
        if ( !aux.isPresent()) {
            return jugadorRepository.save(jugador);
        }
        return jugador;
    }

    /**
     * Agrega una Sesion a un Jugador específico
     * @param idJugador Id del Jugador al que se agregará la Sesion
     * @param sesion Sesion a agregar
     * @return Jugador con la Sesion agregada
     */
    @Transactional
    public Optional<Jugador> addSesion(String idJugador, Sesion sesion) {
        Optional<Jugador>jugador = jugadorRepository.getJugador(idJugador);
        if (jugador.isPresent()) {
            if (sesion.getId() != null){
                Optional<Sesion> auxSesion = sesionRepository.getSesion(sesion.getId());
                if (auxSesion.isPresent()) {
                    // Se valida si el id de la sesion ya existe en las sesiones del jugador
                    //if(!jugador.get().getSesion().equals(sesion))
                    //{
                        jugador.get().setSesion(sesion);
                        return Optional.of(jugadorRepository.save(jugador.get()));
                    //}
                }
            }
        }
        return jugador;
    }

    /**
     * Actualiza un Jugador específico en la base de datos
     * @param jugador Jugador actualizado
     * @return Jugador actualizado
     */
    @Transactional
    public Jugador update(Jugador jugador) {
        if (jugador.getIdJugador() != null) {
            Optional<Jugador> aux = jugadorRepository.getJugador(jugador.getIdJugador());
            if ( aux.isPresent()) {
                if (jugador.getUsuario() != null) {
                    aux.get().setUsuario(jugador.getUsuario());
                }
                if (jugador.getEstado() != null) {
                    aux.get().setEstado(jugador.getEstado());
                }
                if (jugador.getCartones() != null) {
                    aux.get().setCartones(jugador.getCartones());
                }
                if (jugador.getSesion() != null) {
                    aux.get().setSesion(jugador.getSesion());
                }
                jugadorRepository.save(aux.get());
                return aux.get();
            } else {
                return jugador;
            }
        } else {
            return jugador;
        }
    }

    /**
     * Elimina un Jugador específico de la base de datos
     * @param idJugador Id del Jugador a eliminar
     * @return true si la eliminación fue exitosa, false en caso contrario
     */
    @Transactional
    public boolean delete(String idJugador) {
        boolean flag = false;
        Optional<Jugador> jugador = jugadorRepository.getJugador(idJugador);
        if (jugador.isPresent()) {
            jugadorRepository.delete(jugador.get());
           flag = true;
        }
        return flag;
    }

}
