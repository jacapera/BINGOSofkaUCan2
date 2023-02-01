package com.sofka.bingo.repository.crud;

import com.sofka.bingo.modelo.Sesion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SesionCrudRepository extends JpaRepository<Sesion, Integer> {

    Optional<Sesion> findFirstByOrderByIdDesc();
}
