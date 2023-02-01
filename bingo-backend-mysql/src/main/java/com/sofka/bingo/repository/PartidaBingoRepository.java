package com.sofka.bingo.repository;

import com.sofka.bingo.modelo.PartidaBingo;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.repository.crud.PartidaBingoCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PartidaBingoRepository {

    @Autowired
    private PartidaBingoCrudRepository partidaBingoCrudRepository;

    public List<PartidaBingo> getAll() {
        return (List<PartidaBingo>) partidaBingoCrudRepository.findAll();
    }

    public Optional<PartidaBingo> getPartidaBingo(int id) {
        return partidaBingoCrudRepository.findById(id);
    }

    public Optional<PartidaBingo> getLastPartidaBingo() {
        return partidaBingoCrudRepository.findFirstByOrderByIdPartidaBingoDesc();
    }

    public PartidaBingo save(PartidaBingo partidaBingo) {
        return partidaBingoCrudRepository.save(partidaBingo);
    }

    public void delete(PartidaBingo partidaBingo) {
        partidaBingoCrudRepository.delete(partidaBingo);
    }
}
