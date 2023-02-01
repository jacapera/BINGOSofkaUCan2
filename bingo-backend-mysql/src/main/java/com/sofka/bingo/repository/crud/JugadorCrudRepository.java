package com.sofka.bingo.repository.crud;

import com.sofka.bingo.modelo.Jugador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JugadorCrudRepository extends JpaRepository<Jugador, String> {
}
