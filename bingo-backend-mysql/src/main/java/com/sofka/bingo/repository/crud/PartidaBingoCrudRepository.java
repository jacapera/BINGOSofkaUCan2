package com.sofka.bingo.repository.crud;

import com.sofka.bingo.modelo.PartidaBingo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartidaBingoCrudRepository extends JpaRepository<PartidaBingo, Integer> {

    Optional<PartidaBingo> findFirstByOrderByIdPartidaBingoDesc();
}
