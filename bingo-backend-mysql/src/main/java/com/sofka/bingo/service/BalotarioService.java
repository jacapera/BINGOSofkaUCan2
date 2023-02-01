package com.sofka.bingo.service;

import com.sofka.bingo.modelo.Balotario;
import com.sofka.bingo.repository.BalotarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
@EnableScheduling
public class BalotarioService {

    @Autowired
    private BalotarioRepository balotarioRepository;
    private boolean habilitado = false;
    private List<String> balotas = new ArrayList<>();
    private Set<Integer> numeros = new HashSet<>();
    private String balota;

    //--------------------------------------------------------------------
    //------------------GETTERS Y SETTERS---------------------------------
    public List<String> getBalotas() {
        return balotas;
    }

    public void setBalotas(List<String> balotas) {
        this.balotas = balotas;
    }
    public String getBalota() {
        return balota;
    }
    public void setBalota(String balota) {
        this.balota = balota;
    }
    public Set<Integer> getNumeros() {
        return numeros;
    }

    public void setNumeros(Set<Integer> numeros) {
        this.numeros = numeros;
    }

    public List<Balotario> getAll() {
        return balotarioRepository.getAll();
    }

    public Optional<Balotario> getBalotario(int id) {
        return balotarioRepository.getBalotario(id);
    }

    //-----------------------------------------------------------------------

    public Balotario save(Balotario balotario) {
        if ( balotario.getId() == null) {
            return balotarioRepository.save(balotario);
        }
        return balotario;
    }

    public boolean delete(int id) {
        boolean flag = false;
        Optional<Balotario> balotario = balotarioRepository.getBalotario(id);
        if (balotario.isPresent()) {
            balotarioRepository.delete(balotario.get());
           flag = true;
        }
        return flag;
    }

    /***
     * Generador de balotas cada 5 segundos
     */
    @Scheduled(fixedRate = 1000)
    public void generarBalota() {
        //valida variable para detener la generación de balotas
        if (!habilitado) {
            return;
        }
        char[] letras = {'B', 'I', 'N', 'G', 'O'};
        char letra;
        int numero = 0;

        letra = letras [new Random().nextInt(letras.length)];

        switch (letra) {
            case 'B':
                numero = new Random().nextInt(15) + 1;
                break;
            case 'I':
                numero = new Random().nextInt(15) + 1 + 15;
                break;
            case 'N':
                numero = new Random().nextInt(15) + 1 + 30;
                break;
            case 'G':
                numero = new Random().nextInt(15) + 1 + 45;
                break;
            case 'O':
                numero = new Random().nextInt(15) + 1 + 60;
                break;
        }
        //valida si ya se encuentran las 75 balotas detener la generación de balotas
        if(balotas.size() > 75){
            habilitado = false;
            return;
        }
        //valida si la balota no existe, con esto se evita tener balotas repetidas
        if (!balotas.contains(letra + Integer.toString(numero))) {
            setBalota(letra + Integer.toString(numero));
            balotas.add(getBalota());
            numeros.add(numero);
        }
        //System.out.println(balota.toString());
        //System.out.println(balotas.toString());
    }

    @Transactional
    public String detener(){
        habilitado = false;
        return "Balotario detenido";
    }

    @Transactional
    public String iniciar(){
        habilitado = true;
        return "Balotario iniciado";
    }

    public String reiniciar() {
        balotas.clear();
        numeros.clear();
        return "Balotario reiniciado";
    }

}
