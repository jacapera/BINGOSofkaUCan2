import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

class BalotarioBingo {

    public static void main(String[] args) {

        //Set<String> balotas = generarBalota();
        //System.out.println(balotas);
        generarBalota();
    }

    public static Set<String> generarBalota() {
        char[] letras = {'B', 'I', 'N', 'G', 'O'};
        char letra;
        int numero = 0;
        String balota = "";
        Set<String> balotas = new HashSet<>();
        Set<Integer> numeros = new HashSet<>();

        for (int i = 0; i < 255; i++) {
            letra = letras[new Random().nextInt(letras.length)];
            switch(letra) {
                case 'B':
                    numero = new Random().nextInt(15) + 1;
                    //balota = letra + Integer.toString(numero);
                    //balotas.add(balota);
                    //numeros.add(numero);
                    break;
                case 'I':
                    numero = new Random().nextInt(15) + 1 + 15;
                    //balota = letra + Integer.toString(numero);
                   // balotas.add(balota);
                    //numeros.add(numero);
                    break;
                case 'N':
                    numero = new Random().nextInt(15) + 1 + 30;
                    //balota = letra + Integer.toString(numero);
                    //balotas.add(balota);
                    //numeros.add(numero);
                    break;
                case 'G':
                    numero = new Random().nextInt(15) + 1 + 45;
                    //balota = letra + Integer.toString(numero);
                    //balotas.add(balota);
                    //numeros.add(numero);
                    break;
                case 'O':
                    numero = new Random().nextInt(15) + 1 + 60;
                    //balota = letra + Integer.toString(numero);
                    //balotas.add(balota);
                    //numeros.add(numero);
                    break;
            }
            balota = letra + Integer.toString(numero);
            balotas.add(balota);
            numeros.add(numero);
        }
        int tamañoNumeros = numeros.size();
        System.out.println(tamañoNumeros);
        System.out.println(numeros);
        System.out.println(balotas);
        System.out.println(balotas.size());
        return balotas;
    }
}

