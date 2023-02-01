package com.sofka.bingo.service;

import com.sofka.bingo.modelo.Balotario;
import com.sofka.bingo.modelo.Jugador;
import com.sofka.bingo.modelo.PartidaBingo;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.repository.JugadorRepository;
import com.sofka.bingo.repository.PartidaBingoRepository;
import com.sofka.bingo.repository.SesionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class PartidaBingoService {

    @Autowired
    private PartidaBingoRepository partidaBingoRepository;

    //se requiere inyectar dependencia de SesionRepository para poder encontrar la sesion actual y asociarla a la partida actual
    @Autowired
    private SesionRepository sesionRepository;

    @Transactional(readOnly = true)
    public List<PartidaBingo> getAll() {
        return partidaBingoRepository.getAll();
    }

    @Transactional(readOnly = true)
    public Optional<PartidaBingo> getPartidaBingo(int idPartidaBingo) {
        return partidaBingoRepository.getPartidaBingo(idPartidaBingo);
    }

    @Transactional(readOnly = true)
    public Optional<PartidaBingo> getLastPartidaBingo() {
        return partidaBingoRepository.getLastPartidaBingo();
    }

    @Transactional
    public PartidaBingo save(PartidaBingo partidaBingo) {
        if ( partidaBingo.getIdPartidaBingo() == null) {
            return partidaBingoRepository.save(partidaBingo);
        }
        return partidaBingo;
    }

    /**
     *
     * @param idPartidaBingo para buscar la partida actual
     * @param sesion objeto que contiene a los jugadores a agregar a la partida actual
     * @return retornara la partida guardada ya con la sesion actual para esta partida
     */
    @Transactional
    public Optional<PartidaBingo> addSesion(int idPartidaBingo, Sesion sesion) {
        Optional<PartidaBingo> partidaBingo = partidaBingoRepository.getPartidaBingo(idPartidaBingo);
        if (partidaBingo.isPresent()) {
            if (sesion.getId() != null){
                Optional<Sesion> auxSesion = sesionRepository.getSesion(sesion.getId());
                if (auxSesion.isPresent()) {
                    // Se valida si el id de la sesion ya existe en las sesiones del jugador
                    partidaBingo.get().setSesion(sesion);
                    return Optional.of(partidaBingoRepository.save(partidaBingo.get()));
                }
            }
        }
        return partidaBingo;
    }

    /**
     * inmediatamente despues de haber ganador, se agregara el balotario con las balotas hasta ese momento
     * a la partida de bingo actual
     * @param idPartidaBingo para buscar la partida actual
     * @param balotario balotas que saldran durante el juego
     * @return objeto PartidaBingo con balotario agregado
     */
    @Transactional
    public Optional<PartidaBingo> addBalotario(int idPartidaBingo, Balotario balotario) {
        //me permitira manejar un resultado null en caso de que no exista la partida, si existe me trae todo el objeto
        Optional<PartidaBingo> partidaBingo = partidaBingoRepository.getPartidaBingo(idPartidaBingo);
        //validar si la partida existe o si ya fue creada
        if (partidaBingo.isPresent()) {
            //validamos si esa partida en su atributo balotario es null
            if(partidaBingo.get().getBalotario()==null){
                //si es null creara una instancia de Balotario y una instancia de la colección balotas
                partidaBingo.get().setBalotario(new Balotario());
                partidaBingo.get().getBalotario().setBalotas(new ArrayList<>());
            }
            //en este paso se agregara las balotas que salieron en el juego al objeto Balotario que fue
            //agregado a la partida actual
            partidaBingo.get().getBalotario().getBalotas().addAll(balotario.getBalotas());
            //por ultimo se guarda la partida actual
            return Optional.of(partidaBingoRepository.save(partidaBingo.get()));
        }
        return partidaBingo;
    }

    @Transactional
    public PartidaBingo update(PartidaBingo partidaBingo) {
        if (partidaBingo.getIdPartidaBingo() != null) {
            Optional<PartidaBingo> aux = partidaBingoRepository.getPartidaBingo(partidaBingo.getIdPartidaBingo());
            if ( aux.isPresent()) {
                if (partidaBingo.getFechaPartidaBingo() != null) {
                    aux.get().setFechaPartidaBingo(partidaBingo.getFechaPartidaBingo());
                }
                if (partidaBingo.getBingoCards() != null) {
                    aux.get().setBingoCards(partidaBingo.getBingoCards());
                }
                if (partidaBingo.getBalotario() != null) {
                    aux.get().setBalotario(partidaBingo.getBalotario());
                }
                if (partidaBingo.getGanador() != null) {
                    aux.get().setGanador(partidaBingo.getGanador());
                }
                if (partidaBingo.getSesion() != null) {
                    aux.get().setSesion(partidaBingo.getSesion());
                }
                if (partidaBingo.getJugadorGanador() != null) {
                    aux.get().setJugadorGanador(partidaBingo.getJugadorGanador());
                }
                    partidaBingoRepository.save(aux.get());
                return aux.get();
            } else {
                return partidaBingo;
            }
        } else {
            return partidaBingo;
        }
    }

    @Transactional
    public boolean delete(int idPartidaBingo) {
        boolean flag = false;
        Optional<PartidaBingo> partidaBingo = partidaBingoRepository.getPartidaBingo(idPartidaBingo);
        if (partidaBingo.isPresent()) {
            partidaBingoRepository.delete(partidaBingo.get());
           flag = true;
        }
        return flag;
    }

}
