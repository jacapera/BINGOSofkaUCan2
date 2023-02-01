
import java.util.ArrayList;
import java.util.Random;

/**
 *
 * @author caper
 */
class Bingo {

    public static void main(String[] args) {

        cartonBingo();
    }

    public static int drawNum() {
        Random rand = new Random();
        int num = rand.nextInt(75) + 1;
        return num;
    }

    public static void cartonBingo() {
        int[][] carton = new int[5][5];
        ArrayList<Integer> alreadyUsed = new ArrayList<Integer>();
        boolean valid = false;
        int tmp = 0;

        for (int i = 0; i <= 4; i++) {
            for (int row = 0; row < carton.length; row++) {
                while (!valid) {
                    tmp = (int) (Math.random() * 15) + 1 + 15 * i;
                    if (!alreadyUsed.contains(tmp)) {
                        valid = true;
                        alreadyUsed.add(tmp);
                    }
                }
                carton[row][i] = tmp;
                valid = false;
            }
        }
        //para asignar valor cero al centro del carton
        carton[2][2] = 0;

        //para imprimir titulo "BINGO" en el carton
        String titulo[] = {"B", "I", "N", "G", "O"};

        for (int i = 0; i < titulo.length; i++) {
            System.out.print(titulo[i] + "\t");
        }

        System.out.println();

        for (int row = 0; row < carton.length; row++) {
            for (int col = 0; col < carton[row].length; col++) {
                System.out.print(carton[row][col] + "\t");
            }
            System.out.println();
        }
    }
}
