package com.sofka.bingo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BingoBackendMysqlApplication {

    public static void main(String[] args) {
        SpringApplication.run(BingoBackendMysqlApplication.class, args);

        //GenerarBalotas generarBalotas = new GenerarBalotas();
        //Balotas balota = generarBalotas.generarBalota();
        //System.out.println(balota.toString());
    }

}
