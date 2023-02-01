package com.sofka.bingo.controller;

import com.sofka.bingo.modelo.*;
import com.sofka.bingo.repository.PartidaBingoRepository;
import com.sofka.bingo.service.BingoCardService;
import com.sofka.bingo.modelo.Dto.BingoCardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(
        origins =  "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        allowedHeaders = {"Content-Type", "Authorization"}
)
@RestController
@RequestMapping("api/BingoCard")
public class BingoCardController {

    @Autowired
    private BingoCardService bingoCardService;
    @Autowired
    private PartidaBingoRepository partidaBingoRepository;

    @GetMapping("/all")
    public List<BingoCard> getBingoCard() {
        return bingoCardService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<BingoCard> getBingoCard(@PathVariable("id") int id) {
        return bingoCardService.getBingoCard(id);
    }

    @GetMapping("/newCarton")
    public String crearCarton(){
        return bingoCardService.crearCarton();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public BingoCard save(@RequestBody BingoCard bingoCard) {
        return bingoCardService.save(bingoCard);
    }

    @PutMapping("/addPartidaBingo/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<BingoCard> addPartidaBingo(@PathVariable int id, @RequestBody PartidaBingo partidaBingo) {
        return bingoCardService.addPartidaBingo(id, partidaBingo);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public BingoCard update(@RequestBody BingoCard bingoCard) {
        return bingoCardService.update(bingoCard);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") int id) {
        bingoCardService.delete(id);
    }
}
