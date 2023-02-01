package com.sofka.bingo.repository;

import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.repository.crud.SesionCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SesionRepository {

    @Autowired
    private SesionCrudRepository sesionCrudRepository;

    public List<Sesion> getAll() {
        return (List<Sesion>) sesionCrudRepository.findAll();
    }

    public Optional<Sesion> getSesion(int id) {
        return sesionCrudRepository.findById(id);
    }

    public Optional<Sesion> getLastSesion() {
        return sesionCrudRepository.findFirstByOrderByIdDesc();
    }

    public Sesion save(Sesion sesion) {
        return sesionCrudRepository.save(sesion);
    }

    public void delete(Sesion sesion) {
        sesionCrudRepository.delete(sesion);
    }


}
