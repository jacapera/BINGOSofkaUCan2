import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

class Balotario {

    public static void main(String[] args) {

        List<String>listaBalotas = new ArrayList<String>();
        generarBalota();
    }

    public static List<String> generarBalota() {
        char[] letras = {'B', 'I', 'N', 'G', 'O'};
        char letra;
        int numero = 0;
        String balota = "";
        List<String> balotas = new ArrayList<>();
        List<Integer> numeros = new ArrayList<>();

        for (int i = 0; i < 75; i++) {
            boolean validar = false;
            letra = letras[new Random().nextInt(letras.length)];
            switch(letra) {
                case 'B':
                    while(!validar) {
                        numero = new Random().nextInt(15) + 1;
                        balota = letra + Integer.toString(numero);
                        if (!balotas.contains(balota)) {
                            validar = true;
                            balotas.add(balota);
                            numeros.add(numero);
                        }
                    }
                    break;
                case 'I':
                    while(!validar) {
                        numero = new Random().nextInt(15) + 1 + 15;
                        balota = letra + Integer.toString(numero);
                        if (!balotas.contains(balota)) {
                            validar = true;
                            balotas.add(balota);
                            numeros.add(numero);
                        }
                    }
                    break;
                case 'N':
                    while(!validar) {
                        numero = new Random().nextInt(15) + 1 + 30;
                        balota = letra + Integer.toString(numero);
                        if (!balotas.contains(balota)) {
                            validar = true;
                            balotas.add(balota);
                            numeros.add(numero);
                        }
                    }
                    break;
                case 'G':
                    while(!validar) {
                        numero = new Random().nextInt(15) + 1 + 45;
                        balota = letra + Integer.toString(numero);
                        if (!balotas.contains(balota)) {
                            validar = true;
                            balotas.add(balota);
                            numeros.add(numero);
                        }
                    }
                    break;
                case 'O':
                    while(!validar) {
                        numero = new Random().nextInt(15) + 1 + 60;
                        balota = letra + Integer.toString(numero);
                        if (!balotas.contains(balota)) {
                            validar = true;
                            balotas.add(balota);
                            numeros.add(numero);
                        }
                    }
                    break;
            }
        }
        Collections.sort(numeros);
        Collections.sort(balotas);
        System.out.println(numeros);
        System.out.println(balotas);
        return balotas;
    }
}
