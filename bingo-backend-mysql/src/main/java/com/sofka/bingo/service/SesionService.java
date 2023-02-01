package com.sofka.bingo.service;

import com.sofka.bingo.modelo.PartidaBingo;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.repository.PartidaBingoRepository;
import com.sofka.bingo.repository.SesionRepository;
import jakarta.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class SesionService {

    @Autowired
    private SesionRepository sesionRepository;

    @Autowired
    private PartidaBingoRepository partidaBingoRepository;

    @Transactional(readOnly = true)
    public List<Sesion> getAll() {
        return sesionRepository.getAll();
    }

    @Transactional(readOnly = true)
    public Optional<Sesion> getSesion(int id) {
        return sesionRepository.getSesion(id);
    }

    @Transactional(readOnly = true)
    public Optional<Sesion> getLastSesion() {
        return sesionRepository.getLastSesion();
    }

    @Transactional
    public Sesion save(Sesion sesion) {
        if ( sesion.getId() == null) {
            return sesionRepository.save(sesion);
        }
        return sesion;
    }

    @Transactional
    public Optional<Sesion> addPartidaBingo(int id, PartidaBingo partidaBingo) {
        Optional<Sesion> sesion = sesionRepository.getSesion(id);
        if (sesion.isPresent()) {
            if (partidaBingo.getIdPartidaBingo() != null) {
                Optional<PartidaBingo> auxPartidaBingo = partidaBingoRepository.getPartidaBingo(partidaBingo.getIdPartidaBingo());
                if(auxPartidaBingo.isPresent()) {
                    //if(!sesion.get().getPartidaBingo().equals(partidaBingo));
                    sesion.get().setPartidaBingo(auxPartidaBingo.get());
                    return Optional.of(sesionRepository.save(sesion.get()));
                }
            }
        }
        return sesion;
    }

    @Transactional
    public Sesion update(Sesion sesion) {
        if (sesion.getId() != null) {
            Optional<Sesion> aux = sesionRepository.getSesion(sesion.getId());
            if ( aux.isPresent()) {
                if (sesion.getJugadores() != null) {
                    aux.get().setJugadores(sesion.getJugadores());
                }
                if (sesion.getPartidaBingo() != null) {
                    aux.get().setPartidaBingo(sesion.getPartidaBingo());
                }
                sesionRepository.save(aux.get());
                return aux.get();
            } else {
                return sesion;
            }
        } else {
            return sesion;
        }
    }

    @Transactional
    public boolean delete(int id) {
        boolean flag = false;
        Optional<Sesion> sesion = sesionRepository.getSesion(id);
        if (sesion.isPresent()) {
            sesionRepository.delete(sesion.get());
           flag = true;
        }
        return flag;
    }

}
