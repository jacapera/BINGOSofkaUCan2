package com.sofka.bingo.controller;

import com.sofka.bingo.modelo.Jugador;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.service.JugadorService;
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
@RequestMapping("api/Jugador")
public class JugadorController {

    @Autowired
    private JugadorService jugadorService;

    @GetMapping("/all")
    public List<Jugador> getJugadores() {
        return jugadorService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Jugador> getJugador(@PathVariable("id") String id) {
        return jugadorService.getJugador(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Jugador save(@RequestBody Jugador jugador) {
        return jugadorService.save(jugador);
    }

    @PutMapping("/addSesion/{idJugador}")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<Jugador> addSesion(@PathVariable String idJugador, @RequestBody Sesion sesion) {
        return jugadorService.addSesion(idJugador, sesion);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Jugador update(@RequestBody Jugador jugador) {
        return jugadorService.update(jugador);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") String id) {
        jugadorService.delete(id);
    }
}
