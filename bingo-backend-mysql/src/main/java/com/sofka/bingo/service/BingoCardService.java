package com.sofka.bingo.service;

import com.sofka.bingo.modelo.BingoCard;
import com.sofka.bingo.modelo.Jugador;
import com.sofka.bingo.modelo.PartidaBingo;
import com.sofka.bingo.modelo.Sesion;
import com.sofka.bingo.repository.BingoCardRepository;
import com.sofka.bingo.repository.PartidaBingoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.google.gson.Gson;
import org.springframework.transaction.annotation.Transactional;


@Service
public class BingoCardService {

    @Autowired
    private BingoCardRepository bingoCardRepository;

    @Autowired
    private PartidaBingoRepository partidaBingoRepository;

    @Transactional(readOnly = true)
    public List<BingoCard> getAll() {
        return bingoCardRepository.getAll();
    }

    @Transactional(readOnly = true)
    public Optional<BingoCard> getBingoCard(int id) {
        return bingoCardRepository.getBingoCard(id);
    }

    @Transactional
    public BingoCard save(BingoCard bingoCard) {
        if ( bingoCard.getId() == null) {
            return bingoCardRepository.save(bingoCard);
        }
        return bingoCard;
    }

    @Transactional
    public Optional<BingoCard> addPartidaBingo(int id, PartidaBingo partidaBingo) {
        Optional<BingoCard>bingoCard = bingoCardRepository.getBingoCard(id);
        if (bingoCard.isPresent()) {
            if (partidaBingo.getIdPartidaBingo() != null){
                Optional<PartidaBingo> auxPartidaBingo = partidaBingoRepository.getPartidaBingo(partidaBingo.getIdPartidaBingo());
                if (auxPartidaBingo.isPresent()) {
                    if(!bingoCard.get().getPartidaBingo().equals(partidaBingo.getIdPartidaBingo()))
                    {
                        bingoCard.get().setPartidaBingo(partidaBingo);
                        return Optional.of(bingoCardRepository.save(bingoCard.get()));
                    }
                }
            }
        }
        return bingoCard;
    }

    @Transactional
    public BingoCard update(BingoCard bingoCard) {
        if (bingoCard.getId() != null) {
            Optional<BingoCard> aux = bingoCardRepository.getBingoCard(bingoCard.getId());
            if ( aux.isPresent()) {
                if (bingoCard.getListaB() != null) {
                    aux.get().setListaB(bingoCard.getListaB());
                }
                if (bingoCard.getListaI() != null) {
                    aux.get().setListaI(bingoCard.getListaI());
                }
                if (bingoCard.getListaN() != null) {
                    aux.get().setListaN(bingoCard.getListaN());
                }
                if (bingoCard.getListaG() != null) {
                    aux.get().setListaG(bingoCard.getListaG());
                }
                if (bingoCard.getListaO() != null) {
                    aux.get().setListaO(bingoCard.getListaO());
                }
                bingoCardRepository.save(aux.get());
                return aux.get();
            } else {
                return bingoCard;
            }
        } else {
            return bingoCard;
        }
    }

    @Transactional
    public boolean delete(int id) {
        boolean flag = false;
        Optional<BingoCard> bingoCard = bingoCardRepository.getBingoCard(id);
        if (bingoCard.isPresent()) {
           bingoCardRepository.delete(bingoCard.get());
           flag = true;
        }
        return flag;
    }

    /**
     * lógica para generar estructura del carton
     * @return retorna todas las listas necesarias para renderizar y validar
     */
    public String crearCarton(){
        //me permite tener una lista con listas de diferente tipo de objeto
        List<List<?>> listasBingo = new ArrayList<>();
        //matrix que simula el carton de bingo
        int[][] carton = new int[5][5];
        ArrayList<Integer> Aux = new ArrayList<Integer>();
        boolean validar = false;
        int temporal = 0;
        //ciclo para generar los numeros aleatorios de las posiciones del carton de bingo
        for (int i = 0; i <= 4; i++) {
            for (int row = 0; row < carton.length; row++) {
                while (!validar) {
                    temporal = (int) (Math.random() * 15) + 1 + 15 * i;
                    if (!Aux.contains(temporal)) {
                        validar = true;
                        Aux.add(temporal);
                    }
                }
                carton[row][i] = temporal;
                validar = false;
            }
        }
        //para asignar valor cero al centro del carton
        carton[2][2] = 0;
        //arreglos que utilizaremos para separar la matrix
        List<Integer> listaB = new ArrayList<>();
        List<Integer> listaI = new ArrayList<>();
        List<Integer> listaN = new ArrayList<>();
        List<Integer> listaG = new ArrayList<>();
        List<Integer> listaO = new ArrayList<>();

        //Opciones para ganar arreglos de String
        List<String> cadenaListaB = new ArrayList<>();
        List<String> cadenaListaI = new ArrayList<>();
        List<String> cadenaListaN = new ArrayList<>();
        List<String> cadenaListaG = new ArrayList<>();
        List<String> cadenaListaO = new ArrayList<>();
        List<String> cadenaHorizontal1 = new ArrayList<>();
        List<String> cadenaHorizontal2 = new ArrayList<>();
        List<String> cadenaHorizontal3 = new ArrayList<>();
        List<String> cadenaHorizontal4 = new ArrayList<>();
        List<String> cadenaHorizontal5 = new ArrayList<>();
        List<String> cadenaDiagonal1 = new ArrayList<>();
        List<String> cadenaDiagonal2 = new ArrayList<>();

        //ciclos que asignaran los valores correspondientes a cada columna representada en cada lista
        for ( int row = 0; row < carton.length; row++ ) {
            for ( int col = 0; col < carton[row].length; col++ ) {
                if ( col == 0 ) {
                    listaB.add(carton[row][col]);
                    cadenaListaB.add("B" + carton[row][col]);
                }
                if ( col == 1 ) {
                    listaI.add(carton[row][col]);
                    cadenaListaI.add("I" + carton[row][col]);
                }
                if ( col == 2 ) {
                    listaN.add(carton[row][col]);
                    cadenaListaN.add("N" + carton[row][col]);
                }
                if ( col == 3 ) {
                    listaG.add(carton[row][col]);
                    cadenaListaG.add("G" + carton[row][col]);
                }
                if ( col == 4 ) {
                    listaO.add(carton[row][col]);
                    cadenaListaO.add("O" + carton[row][col]);
                }
            }
        }
        cadenaListaN.remove(2);
        cadenaHorizontal1 = List.of(("B" + carton[0][0]), ("I" + carton[0][1]), ("N" + carton[0][2]), ("G" + carton[0][3]), ("O" + carton[0][4]));
        cadenaHorizontal2 = List.of(("B" + carton[1][0]), ("I" + carton[1][1]), ("N" + carton[1][2]), ("G" + carton[1][3]), ("O" + carton[1][4]));
        cadenaHorizontal3 = List.of(("B" + carton[2][0]), ("I" + carton[2][1]),                       ("G" + carton[2][3]), ("O" + carton[2][4]));
        cadenaHorizontal4 = List.of(("B" + carton[3][0]), ("I" + carton[3][1]), ("N" + carton[3][2]), ("G" + carton[3][3]), ("O" + carton[3][4]));
        cadenaHorizontal5 = List.of(("B" + carton[4][0]), ("I" + carton[4][1]), ("N" + carton[4][2]), ("G" + carton[4][3]), ("O" + carton[4][4]));
        cadenaDiagonal1   = List.of(("B" + carton[0][0]), ("I" + carton[1][1]),                       ("G" + carton[3][3]), ("O" + carton[4][4]));
        cadenaDiagonal2   = List.of(("B" + carton[4][0]), ("I" + carton[3][1]),                       ("G" + carton[1][3]), ("O" + carton[0][4]));
        listasBingo = List.of ( listaB, listaI, listaN, listaG, listaO, cadenaListaB, cadenaListaI, cadenaListaN, cadenaListaG, cadenaListaO,
                                cadenaHorizontal1, cadenaHorizontal2, cadenaHorizontal3, cadenaHorizontal4, cadenaHorizontal5, cadenaDiagonal1,
                                cadenaDiagonal2 );
        Gson gson = new Gson();
        String json = gson.toJson(listasBingo);
        return json;
    }



}
