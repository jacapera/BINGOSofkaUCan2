package com.sofka.bingo.repository;

import com.sofka.bingo.modelo.Balotario;
import com.sofka.bingo.repository.crud.BalotarioCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BalotarioRepository {

    @Autowired
    private BalotarioCrudRepository balotarioCrudRepository;

    public List<Balotario> getAll() {
        return (List<Balotario>) balotarioCrudRepository.findAll();
    }

    public Optional<Balotario> getBalotario(int id) {
        return balotarioCrudRepository.findById(id);
    }

    public Balotario save(Balotario balotario) {
        return balotarioCrudRepository.save(balotario);
    }

    public void delete(Balotario balotario) {
        balotarioCrudRepository.delete(balotario);
    }
}
