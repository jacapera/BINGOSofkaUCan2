package com.sofka.bingo.repository;

import com.sofka.bingo.modelo.Jugador;
import com.sofka.bingo.repository.crud.JugadorCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class JugadorRepository {

    @Autowired
    private JugadorCrudRepository jugadorCrudRepository;

    public List<Jugador> getAll() {
        return (List<Jugador>) jugadorCrudRepository.findAll();
    }

    public Optional<Jugador> getJugador(String idJugador) {
        return jugadorCrudRepository.findById(idJugador);
    }

    public Jugador save(Jugador jugador) {
        return jugadorCrudRepository.save(jugador);
    }

    public void delete(Jugador jugador) {
        jugadorCrudRepository.delete(jugador);
    }
}
