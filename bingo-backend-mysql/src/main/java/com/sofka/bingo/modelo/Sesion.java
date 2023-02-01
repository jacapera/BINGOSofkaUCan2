package com.sofka.bingo.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "sesion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sesion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany( cascade = {CascadeType.PERSIST}, mappedBy = "sesion")
    @JsonIgnoreProperties({"sesion"})
    private List<Jugador> jugadores;

    @OneToOne(mappedBy = "sesion")
    @JsonIgnoreProperties({"sesion", "partidaBingo"})
    private PartidaBingo partidaBingo;


}

