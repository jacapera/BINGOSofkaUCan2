package com.sofka.bingo.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
@Entity
@Table(name = "bingocard")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BingoCard implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ElementCollection
    private List<Integer> listaB;

    @ElementCollection
    private List<Integer> listaI;

    @ElementCollection
    private List<Integer> listaN;

    @ElementCollection
    private List<Integer> listaG;

    @ElementCollection
    private List<Integer> listaO;

    @ElementCollection
    private Set<String> cadenaListaB;

    @ElementCollection
    private Set<String> cadenaListaI;

    @ElementCollection
    private Set<String> cadenaListaN;

    @ElementCollection
    private Set<String> cadenaListaG;

    @ElementCollection
    private Set<String> cadenaListaO;

    @ElementCollection
    private Set<String> cadenaHorizontal1;

    @ElementCollection
    private Set<String> cadenaHorizontal2;

    @ElementCollection
    private Set<String> cadenaHorizontal3;

    @ElementCollection
    private Set<String> cadenaHorizontal4;

    @ElementCollection
    private Set<String> cadenaHorizontal5;

    @ElementCollection
    private Set<String> cadenaDiagonal1;

    @ElementCollection
    private Set<String> cadenaDiagonal2;

    @ManyToOne
    @JoinColumn( name = "jugador_id")
    @JsonIgnoreProperties({"cartones", "bingoCards", "sesion", "jugador"})
    private Jugador jugador;

    @ManyToOne
    @JoinColumn( name = "partidabingo_id")
    @JsonIgnoreProperties({"bingoCards"})
    private PartidaBingo partidaBingo;

}
