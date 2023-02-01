package com.sofka.bingo.controller;

import com.sofka.bingo.modelo.Balotario;
import com.sofka.bingo.service.BalotarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(
        origins =  "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
        allowedHeaders = {"Content-Type", "Authorization"}
)
@RestController
@RequestMapping("api/Balotario")
public class BalotarioController {

    @Autowired
    private BalotarioService balotarioService;

    @GetMapping("/all")
    public List<Balotario> getBalotarios() {
        return balotarioService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Balotario> getBalotario(@PathVariable("id") int id) {
        return balotarioService.getBalotario(id);
    }

    @GetMapping("/balota")
    public String getBalota() {
        String balota=balotarioService.getBalota();
        return  balota;

    }

    @GetMapping("/balotas")
    public List<String> getBalotas() {
        return balotarioService.getBalotas();
    }

    @GetMapping("/numeros")
    public Set<Integer> getNumeros() {
        return balotarioService.getNumeros();
    }

    @GetMapping("/parar")
    public String parar() {
      return balotarioService.detener();
    }

    @GetMapping("/iniciar")
    public String iniciar() {
        return balotarioService.iniciar();
    }

    @GetMapping("/reiniciar")
    public String reiniciar() {
        return balotarioService.reiniciar();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Balotario save(@RequestBody Balotario balotario) {
        return balotarioService.save(balotario);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Boolean delete(@PathVariable("id") int id) {
        return balotarioService.delete(id);
    }
}
