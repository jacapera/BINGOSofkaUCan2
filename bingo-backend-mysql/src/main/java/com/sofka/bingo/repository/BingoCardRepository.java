package com.sofka.bingo.repository;

import com.sofka.bingo.modelo.BingoCard;
import com.sofka.bingo.repository.crud.BingoCardCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BingoCardRepository {

    @Autowired
    private BingoCardCrudRepository bingoCardCrudRepository;

    public List<BingoCard> getAll() {
        return (List<BingoCard>) bingoCardCrudRepository.findAll();
    }

    public Optional<BingoCard> getBingoCard(int id) {
        return bingoCardCrudRepository.findById(id);
    }

    public BingoCard save(BingoCard bingoCard) {
        return bingoCardCrudRepository.save(bingoCard);
    }

    public void delete(BingoCard bingoCard) {
        bingoCardCrudRepository.delete(bingoCard);
    }
}
