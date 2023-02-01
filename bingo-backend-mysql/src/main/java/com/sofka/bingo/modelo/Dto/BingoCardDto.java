package com.sofka.bingo.modelo.Dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@lombok.Data
@NoArgsConstructor
@AllArgsConstructor
public class BingoCardDto {

    private String jugadorId;
    private String usuario;
    private List<Integer> listaB;
    private List<Integer> listaI;
    private List<Integer> listaN;
    private List<Integer> listaG;
    private List<Integer> listaO;
    private Set<String> cadenaListaB;
    private Set<String> cadenaListaI;
    private Set<String> cadenaListaN;
    private Set<String> cadenaListaG;
    private Set<String> cadenaListaO;
    private Set<String> cadenaHorizontal1;
    private Set<String> cadenaHorizontal2;
    private Set<String> cadenaHorizontal3;
    private Set<String> cadenaHorizontal4;
    private Set<String> cadenaHorizontal5;
}
