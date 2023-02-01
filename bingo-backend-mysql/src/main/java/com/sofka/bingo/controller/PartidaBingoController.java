package com.sofka.bingo.controller;


import com.sofka.bingo.modelo.Balotario;
import com.sofka.bingo.modelo.PartidaBingo;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.service.PartidaBingoService;
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
@RequestMapping("api/PartidaBingo")
public class PartidaBingoController {

    @Autowired
    private PartidaBingoService partidaBingoService;

    @GetMapping("/all")
    public List<PartidaBingo> getPartidas() {
        return partidaBingoService.getAll();
    }

    @GetMapping("/{idPartidaBingo}")
    public Optional<PartidaBingo> getPartida(@PathVariable("idPartidaBingo") int idPartidaBingo) {
        return partidaBingoService.getPartidaBingo(idPartidaBingo);
    }

    @GetMapping("/ultimaPartidaBingo")
    public Optional<PartidaBingo> getLastPartidaBingo() {
        return partidaBingoService.getLastPartidaBingo();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public PartidaBingo save(@RequestBody PartidaBingo partidaBingo) {
        return partidaBingoService.save(partidaBingo);
    }

    @PutMapping("/addSesion/{idPartidaBingo}")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<PartidaBingo> addSesion(@PathVariable int idPartidaBingo, @RequestBody Sesion sesion) {
        return partidaBingoService.addSesion(idPartidaBingo, sesion);
    }

    @PutMapping("/addBalotario/{idPartidaBingo}")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<PartidaBingo> addBalotario(@PathVariable int idPartidaBingo, @RequestBody Balotario balotario) {
        return partidaBingoService.addBalotario(idPartidaBingo, balotario);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public PartidaBingo update(@RequestBody PartidaBingo partidaBingo) {
        return partidaBingoService.update(partidaBingo);
    }

    @DeleteMapping("/{idPartidaBingo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("idPartidaBingo") int idPartidaBingo) {
        return partidaBingoService.delete(idPartidaBingo);
    }
}
