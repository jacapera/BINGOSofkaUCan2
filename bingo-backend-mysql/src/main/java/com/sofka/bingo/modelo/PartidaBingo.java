package com.sofka.bingo.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name= "partidabingo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartidaBingo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPartidaBingo;

    @CreationTimestamp
    private LocalDateTime fechaPartidaBingo;

    private Boolean ganador;

    private String jugadorGanador;

    @OneToMany( cascade = { CascadeType.PERSIST}, mappedBy = "partidaBingo")
    @JsonIgnoreProperties({"partidaBingo"})
    private List<BingoCard> bingoCards;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "balotario_id")
    @JsonIgnoreProperties({"partidaBingo"})
    private Balotario balotario;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn( name = "sesion_id")
    @JsonIgnoreProperties({"partidaBingo",})
    private Sesion sesion;



}
