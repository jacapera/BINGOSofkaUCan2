package com.sofka.bingo.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name= "jugador")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Jugador implements Serializable {

    @Id
    private String idJugador;
    private String usuario;
    private String estado;

    @OneToMany( cascade = {CascadeType.PERSIST}, mappedBy = "jugador")
    @JsonIgnoreProperties({"jugador", "cartones", "partidaBingo"})
    private List<BingoCard> cartones;

    @ManyToOne
    @JoinColumn( name = "sesion_id")
    @JsonIgnoreProperties({"jugadores"})
    private Sesion sesion;

}
