package com.sofka.bingo.repository.crud;

import com.sofka.bingo.modelo.BingoCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface BingoCardCrudRepository extends JpaRepository<BingoCard, Integer> {
}
