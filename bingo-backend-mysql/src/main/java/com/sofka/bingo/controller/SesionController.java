package com.sofka.bingo.controller;

import com.sofka.bingo.modelo.PartidaBingo;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.service.SesionService;
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
@RequestMapping("api/Sesion")
public class SesionController {

    @Autowired
    private SesionService sesionService;

    @GetMapping("/all")
    public List<Sesion> getSesiones() {
        return sesionService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Sesion> getSesion(@PathVariable("id") int id) {
        return sesionService.getSesion(id);
    }

    @GetMapping("/ultimaSesion")
    public Optional<Sesion> getLastSesion() {
        return sesionService.getLastSesion();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Sesion save(@RequestBody Sesion sesion) {
        return sesionService.save(sesion);
    }

    @PutMapping("/addPartidaBingo/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<Sesion> addPartidaBingo(@PathVariable int id, @RequestBody PartidaBingo partidaBingo) {
        return sesionService.addPartidaBingo(id, partidaBingo);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Sesion update(@RequestBody Sesion sesion) {
        return sesionService.update(sesion);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") int id) {
        sesionService.delete(id);
    }
}
