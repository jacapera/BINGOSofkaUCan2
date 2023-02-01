import axios from 'axios';
import React, {  Component } from 'react'
import '../estilos/bingoCard.css'
import {cookies} from './Login'

const urlUltimaPartidaBingo = process.env.REACT_APP_URL_ULTIMA_PARTIDA_BINGO;
const urlBingoCardSave = process.env.REACT_APP_URL_BINGOCARD_SAVE;
const urlBalotarioNumeros = process.env.REACT_APP_URL_BALOTARIO_NUMEROS;
const urlPararBalotario = process.env.REACT_APP_PARAR_BALOTARIO;
const urlIniciarBalotario = process.env.REACT_APP_URL_INICIAR_BALOTARIO;
const urlReiniciarBalotario = process.env.REACT_APP_URL_REINICIAR_BALOTARIO;
const urlTraerListaBalotas = process.env.REACT_APP_TRAER_LISTA_BALOTAS;
const urlPartidaBingoAddBalotario = process.env.REACT_APP_PARTIDABINGO_ADDBALOTARIO;
const urlStartCronometro = process.env.REACT_APP_URL_START_CRONOMETRO;
const urlBingoCardNew = process.env.REACT_APP_BINGOCARD_NEW;
const urlPartidaBingoUpdate = process.env.REACT_APP_URL_PARTIDABINGO_UPDATE;

const jugadorId = cookies.get('_id')
const titulo = ["B","I","N","G","O"]
const tiempoEspera = 2

/**
 * componente para renderizar el carton de bingo, validar logica de ganar bingo
 */
class CartonBingo2 extends Component {

//=====================================================================================================
//                               VARIBLES DE ENTORNO (state)
//=====================================================================================================
  state = {

    //arreglo para guardar datos del carton del jugador actual, ya que datos trae todos los cartones
    //creados de diferentes jugadores
    //copiaDatos:[],

    //donde se guarda matrix de carton creado en el Frontend
    cartonFrontend:[[], [], [], [], []],

    //donde se guarda matrix de carton creado en el Backend
    cartonBackend:[],

    //para guardar partida actual
    ultimaPartidaBingo:'',
    idPartidaBingo:'',

    admin:false,

    dataCartonBingo:[],

    /**
     * arreglos de números a donde extraemos datos del backend a renderizar
     */
    listaB:[],
    listaI:[],
    listaN:[],
    listaG:[],
    listaO:[],

    //enviar y guardar carton en el backend Springboot, se asigna jugador y partida actual
    formCartonBingo:{
      listaB:[],
      listaI:[],
      listaN:[],
      listaG:[],
      listaO:[],
      cadenaListaB:[],
      cadenaListaI:[],
      cadenaListaN:[],
      cadenaListaG:[],
      cadenaListaO:[],
      cadenaHorizontal1:[],
      cadenaHorizontal2:[],
      cadenaHorizontal3:[],
      cadenaHorizontal4:[],
      cadenaHorizontal5:[],
      cadenaDiagonal1:[],
      cadenaDiagonal2:[],
      jugador:{
        idJugador:''
      },
      partidaBingo:{
        idPartidBingo:''
      }
    },

    //arreglo de numeros balotario del backend
    listaNumerosBalotario:[],

    formBalotario:{
      balotas:[]
    },

    /**
     * arreglos donde guardamos las opciones de ganar del usuario a comparar con las del backend
     * pruebas locales solamente en el frontend
     */
    cadenaListaB:[],
    cadenaListaI:[],
    cadenaListaN:[],
    cadenaListaG:[],
    cadenaListaO:[],
    cadenaHorizontal1:[],
    cadenaHorizontal2:[],
    cadenaHorizontal3:[],
    cadenaHorizontal4:[],
    cadenaHorizontal5:[],
    cadenaDiagonal1:[],
    cadenaDiagonal2:[],

    /**
     * arreglos para guardar las selecciones del carton del jugador
     */
    seleccionListaB:[],
    seleccionListaI:[],
    seleccionListaN:[],
    seleccionListaG:[],
    seleccionListaO:[],
    seleccionHorizontal1:[],
    seleccionHorizontal2:[],
    seleccionHorizontal3:[],
    seleccionHorizontal4:[],
    seleccionHorizontal5:[],
    seleccionDiagonal1:[],
    seleccionDiagonal2:[],
  }
  //---------------------------------------------------------------------------------------------------

  //variable para asignar el setInterval para las peticiones al backend
  intervalo = 0; //setInterval("traerListaNumerosBalotario")
  intervalo2 = 0; //setTimeout("iniciarCronometro")
//=====================================================================================================
//*                                    CARTON BINGO BACKEND
//=====================================================================================================
  /*
   * generado en el backend, ya se asigna el idjugador
   */
  generarCartonBingoBackend = async () => {
    await axios.get( urlBingoCardNew )
    .then( response => {
      this.setState({
        cartonBackend:response.data,
      }, () => {
        this.setState({
          listaB:this.state.cartonBackend[0],
          listaI:this.state.cartonBackend[1],
          listaN:this.state.cartonBackend[2],
          listaG:this.state.cartonBackend[3],
          listaO:this.state.cartonBackend[4],
          cadenaListaB:this.state.cartonBackend[5],
          cadenaListaI:this.state.cartonBackend[6],
          cadenaListaN:this.state.cartonBackend[7],
          cadenaListaG:this.state.cartonBackend[8],
          cadenaListaO:this.state.cartonBackend[9],
          cadenaHorizontal1:this.state.cartonBackend[10],
          cadenaHorizontal2:this.state.cartonBackend[11],
          cadenaHorizontal3:this.state.cartonBackend[12],
          cadenaHorizontal4:this.state.cartonBackend[13],
          cadenaHorizontal5:this.state.cartonBackend[14],
          cadenaDiagonal1:this.state.cartonBackend[15],
          cadenaDiagonal2:this.state.cartonBackend[16],
          formCartonBingo:{
            ...this.state.formCartonBingo,
            listaB:this.state.cartonBackend[0],
            listaI:this.state.cartonBackend[1],
            listaN:this.state.cartonBackend[2],
            listaG:this.state.cartonBackend[3],
            listaO:this.state.cartonBackend[4],
            cadenaListaB:this.state.cartonBackend[5],
            cadenaListaI:this.state.cartonBackend[6],
            cadenaListaN:this.state.cartonBackend[7],
            cadenaListaG:this.state.cartonBackend[8],
            cadenaListaO:this.state.cartonBackend[9],
            cadenaHorizontal1:this.state.cartonBackend[10],
            cadenaHorizontal2:this.state.cartonBackend[11],
            cadenaHorizontal3:this.state.cartonBackend[12],
            cadenaHorizontal4:this.state.cartonBackend[13],
            cadenaHorizontal5:this.state.cartonBackend[14],
            cadenaDiagonal1:this.state.cartonBackend[15],
            cadenaDiagonal2:this.state.cartonBackend[16],
            jugador:{idJugador:jugadorId}
          }
        })
      })
      console.log("catonBackend:")
      console.log(this.state.cartonBackend)
    }).catch(err => {
      console.log(err.message);
    })
  }
//=====================================================================================================
//*                                    CARTON BINGO FRONTEND
//=====================================================================================================
  /*
   * genera un carton de bingo con logica en javascript, ya se asigna idJugador
   */
  generarCartonBingoFrontend = async () => {
    let carton = [[],[],[],[],[]]; //matriz temporal para crear los numeros aleatorios
    const Aux = []; // arreglo auxiliar para almacenar el numero random y poder comparar que no se repita
    let validar = false; //booleano para poder operar el while y me permita volver a crear el numero aleatorio si se llega a repetir
    let temporal = 0; //variable que me guarda el numero aleatorio durante su creacion y asignacion a la matriz temporal
    for (let i = 0; i <= 4; i++) {
      for (let row = 0; row < carton.length; row++) {
        while (!validar) {
          temporal = Math.floor( Math.random() * 15 ) + 1 + 15 * i;
          if (!Aux.includes(temporal)) {
            Aux.push(temporal);
            validar = true;
          }
        }
        carton[row][i] = temporal;//asignacion directa de los valores a la matriz
        validar = false; //cambiando estado para ingresar nuevamente al while y generar numero aleatorio
      }
    }
    carton[2][2] = 0 //asignacion directa en esta posicion de la matriz que representa el centro del carton, ya que esta posicion no se asigna balota
    await this.setState({cartonFrontend:carton }) //enviando valor a variable de estado
    for (let row = 0; row < this.state.cartonFrontend.length; row++) {
      for  (let col = 0; col < this.state.cartonFrontend[row].length; col++)  {
        //***LETRA B***, validacion para recuperar valores de la columna correspondiente a la letra B
        if (col === 0)  {
          //creando listaB
          await this.setState(prevState => {
            return {listaB: [...prevState.listaB.slice(0, row), this.state.cartonFrontend[row][col], ...prevState.listaB.slice(row + 1)]};
          })
          //creando string o cadena para opcion de ganar con la columna de la letra B
          await this.setState(prevState => {
            return {cadenaListaB: [...prevState.cadenaListaB.slice(0, row), ("B" + this.state.cartonFrontend[row][col]), ...prevState.cadenaListaB.slice(row + 1)]};
          })
        }
        //***LETRA I***, validacion para recuperar valores de la columna correspondiente a la letra I
        if (col === 1) {
          //creando listaI
          await this.setState(prevState => {
            return {listaI: [...prevState.listaI.slice(0, row), this.state.cartonFrontend[row][col], ...prevState.listaI.slice(row + 1)]};
          })
          //creando string o cadena para opcion de ganar con la columna de la letra I
          await this.setState(prevState => {
            return {cadenaListaI: [...prevState.cadenaListaI.slice(0, row), ("I" + this.state.cartonFrontend[row][col]), ...prevState.cadenaListaI.slice(row + 1)]};
          })
        }
        //***LETRA N***, validacion para recuperar valores de la columna correspondiente a la letra N
        if (col === 2) {
          //creando listaN
          await this.setState(prevState => {
            return {listaN: [...prevState.listaN.slice(0, row), this.state.cartonFrontend[row][col], ...prevState.listaN.slice(row + 1)]};
          })
          if (!(row === 2 && col === 2)){ //condicional para no agregar "N0", ya que la posicion[2][2] su valor no hace parte de las formas de ganar
            //creando string o cadena para opcion de ganar con la columna de la letra N
            await this.setState(prevState => {
            return {cadenaListaN: [...prevState.cadenaListaN.slice(0, row), ("N" + this.state.cartonFrontend[row][col]), ...prevState.cadenaListaN.slice(row + 1)]};
            })
          }
        }
        //***LETRA G***, validacion para recuperar valores de la columna correspondiente a la letra N
        if (col === 3) {
          //creando listaG
          await this.setState(prevState => {
            return {listaG: [...prevState.listaG.slice(0, row), this.state.cartonFrontend[row][col], ...prevState.listaG.slice(row + 1)]};
          })
          //creando string o cadena para opcion de ganar con la columna de la letra G
          await this.setState(prevState => {
            return {cadenaListaG: [...prevState.cadenaListaG.slice(0, row), ("G" + this.state.cartonFrontend[row][col]), ...prevState.cadenaListaG.slice(row + 1)]};
          })
        }
        //***LETRA O***, validacion para recuperar valores de la columna correspondiente a la letra N
        if (col === 4) {
          //creando listaO
          await this.setState(prevState => {
            return {listaO: [...prevState.listaO.slice(0, row), this.state.cartonFrontend[row][col], ...prevState.listaO.slice(row + 1)]};
          })
          //creando string o cadena para opcion de ganar con la columna de la letra O
          await this.setState(prevState => {
            return {cadenaListaO: [...prevState.cadenaListaO.slice(0, row), ("O" + this.state.cartonFrontend[row][col]), ...prevState.cadenaListaO.slice(row + 1)]};
          })
        }
      }
    }
    //creando string o cadena para opcion de ganar con la fila y que esta compuesta por un elemento de cada columna en cada letra (horizontal 1)
    await this.setState({
      cadenaHorizontal1:[("B" + this.state.cartonFrontend[0][0]), ("I" + this.state.cartonFrontend[0][1]), ("N" + this.state.cartonFrontend[0][2]), ("G" + this.state.cartonFrontend[0][3]), ("O" + this.state.cartonFrontend[0][4])]
    })
    //creando string o cadena para opcion de ganar con la fila y que esta compuesta por un elemento de cada columna en cada letra (horizontal 2)
    await this.setState({
      cadenaHorizontal2:[("B" + this.state.cartonFrontend[1][0]), ("I" + this.state.cartonFrontend[1][1]), ("N" + this.state.cartonFrontend[1][2]), ("G" + this.state.cartonFrontend[1][3]), ("O" + this.state.cartonFrontend[1][4])]
    })
    //creando string o cadena para opcion de ganar con la fila y que esta compuesta por un elemento de cada columna en cada letra (horizontal 3)
    await this.setState({
      cadenaHorizontal3:[("B" + this.state.cartonFrontend[2][0]), ("I" + this.state.cartonFrontend[2][1]), ("G" + this.state.cartonFrontend[2][3]), ("O" + this.state.cartonFrontend[2][4])]
    })
    //creando string o cadena para opcion de ganar con la fila y que esta compuesta por un elemento de cada columna en cada letra (horizontal 4)
    await this.setState({
      cadenaHorizontal4:[("B" + this.state.cartonFrontend[3][0]), ("I" + this.state.cartonFrontend[3][1]), ("N" + this.state.cartonFrontend[3][2]), ("G" + this.state.cartonFrontend[3][3]), ("O" + this.state.cartonFrontend[3][4])]
    })
    //creando string o cadena para opcion de ganar con la fila y que esta compuesta por un elemento de cada columna en cada letra (horizontal 5)
    await this.setState({
      cadenaHorizontal5:[("B" + this.state.cartonFrontend[4][0]), ("I" + this.state.cartonFrontend[4][1]), ("N" + this.state.cartonFrontend[4][2]), ("G" + this.state.cartonFrontend[4][3]), ("O" + this.state.cartonFrontend[4][4])]
    })
    //opcion para ganar en diagonal de arriba hacia abajo, de izquierda a derecha (diagonal 1)
    await this.setState({
      cadenaDiagonal1:[ ("B" + this.state.cartonFrontend[0][0]), ("I" + this.state.cartonFrontend[1][1]), ("G" + this.state.cartonFrontend[3][3]), ("O" + this.state.cartonFrontend[4][4]) ]
    })
    //opción de ganar en diagonal de abajo hacia arriba, de izquierda a derecha (diagonal 2)
    await this.setState({
      cadenaDiagonal2:[ ("B" + this.state.cartonFrontend[4][0]), ("I" + this.state.cartonFrontend[3][1]), ("G" + this.state.cartonFrontend[1][3]), ("O" + this.state.cartonFrontend[0][4]) ]
    })
    await this.setState({
      formCartonBingo:{
        ...this.state.formCartonBingo,
        listaB:this.state.listaB,
        listaI:this.state.listaI,
        listaN:this.state.listaN,
        listaG:this.state.listaG,
        listaO:this.state.listaO,
        cadenaListaB:this.state.cadenaListaB,
        cadenaListaI:this.state.cadenaListaI,
        cadenaListaN:this.state.cadenaListaN,
        cadenaListaG:this.state.cadenaListaG,
        cadenaListaO:this.state.cadenaListaO,
        cadenaHorizontal1:this.state.cadenaHorizontal1,
        cadenaHorizontal2:this.state.cadenaHorizontal2,
        cadenaHorizontal3:this.state.cadenaHorizontal3,
        cadenaHorizontal4:this.state.cadenaHorizontal4,
        cadenaHorizontal5:this.state.cadenaHorizontal5,
        cadenaDiagonal1:this.state.cadenaDiagonal1,
        cadenaDiagonal2:this.state.cadenaDiagonal2,
        jugador:{idJugador:jugadorId}
      }
    })
    console.log("formCartonBingo")
    console.log(this.state.formCartonBingo)
  }
//=====================================================================================================
//*                                    GUARDAR CARTON BINGO
//=====================================================================================================
  /*
   * se trae ultima partida("actual"), se asigna de una vez partida actual, se ejecuta un callback
   * para crear el Carton en el Backend
   */
  guardarCartonBingo = async () => {
    await axios.get( urlUltimaPartidaBingo )
    .then( response => {
      this.setState({
        formCartonBingo:{
          ...this.state.formCartonBingo,
          partidaBingo:{idPartidaBingo:response.data.idPartidaBingo}
        },
        ultimaPartidaBingo:response.data
      }, () => {
        this.metodoGuardarCartonBingo();
        this.mostrarCartonBingo();
      }
      )
      //console.log("ULTIMA PARTIDA BINGO")
      //console.log(this.state.ultimaPartidaBingo);
    }).catch( err => {
      console.log( err.message );
    })
  }
  /*
   * función peticion POST para guardar carton de bingo que se creo localmente
   */
  metodoGuardarCartonBingo =  async () => {
    //antes de enviar la peticion Post, validamos si en partida ya existe algun Carton
    if(this.state.ultimaPartidaBingo.bingoCards.length > 0) {
      //recorremos la lista de cartones de la partida actual
      for (let i = 0; i < this.state.ultimaPartidaBingo.bingoCards.length; i++) {
        //validamos si en la lista existe Carton asignado a jugador actual
        if (this.state.ultimaPartidaBingo.bingoCards[i].jugador.idJugador === jugadorId) {
          console.log(this.state.ultimaPartidaBingo.bingoCards[i].jugador.idJugador, jugadorId)
          return alert("ya creaste un carton de bingo para esta partida");
        }
      }
    }
    await axios.post( urlBingoCardSave,  this.state.formCartonBingo )
    .then(response => {
      this.setState({ dataCartonBingo:response.data})
      //console.log("dataCartonBingo: ")
      //console.log(this.state.dataCartonBingo)
      //console.log(response.data)
    }).catch(err => {
      console.log(err.message);
    })
  }
//=====================================================================================================
//*                        MOSTRAR CARTON BINGO PARTIDA ACTUAL DEL JUGADOR ACTUAL
//=====================================================================================================
  /*
   * se trae ultima partida("actual"), se ejecuta callback con la función de "metodoMostrarCartonBingo"
   */
  mostrarCartonBingo = async () => {
    await axios.get( urlUltimaPartidaBingo )
    .then( response => {
      this.setState({
        ultimaPartidaBingo:response.data
      }, () => {
        this.metodoMostrarCartonBingo();
      })
    }).catch( err => {
      console.log( err.message );
    })
  }
  /*
   * busca el Carton de la partida actual del jugador actual y actualizar variables de estado para
   * renderizar y mostrar el Carton
   */
  metodoMostrarCartonBingo = async () => {
    if (this.state.ultimaPartidaBingo.bingoCards.length > 0) {
      for (let i = 0; i < this.state.ultimaPartidaBingo.bingoCards.length; i++) {
        if (this.state.ultimaPartidaBingo.bingoCards[i].jugador.idJugador === jugadorId) {
          console.log(this.state.ultimaPartidaBingo.bingoCards[i].jugador.idJugador, jugadorId)
          // this.setState(prevState => {
          //   return {copiaDatos: [...prevState.copiaDatos.slice(0, i),
          //this.state.ultimaPartidaBingo.bingoCards[i], ...prevState.copiaDatos.slice(i + 1)]};
          // })
          this.setState({
            //arreglos para renderizar el carton
            listaB:this.state.ultimaPartidaBingo.bingoCards[i].listaB,
            listaI:this.state.ultimaPartidaBingo.bingoCards[i].listaI,
            listaN:this.state.ultimaPartidaBingo.bingoCards[i].listaN,
            listaG:this.state.ultimaPartidaBingo.bingoCards[i].listaG,
            listaO:this.state.ultimaPartidaBingo.bingoCards[i].listaO,
            //arreglos para comparar opcion de ganar por columna letra
            cadenaListaB:this.state.ultimaPartidaBingo.bingoCards[i].cadenaListaB,
            cadenaListaI:this.state.ultimaPartidaBingo.bingoCards[i].cadenaListaI,
            cadenaListaN:this.state.ultimaPartidaBingo.bingoCards[i].cadenaListaN,
            cadenaListaG:this.state.ultimaPartidaBingo.bingoCards[i].cadenaListaG,
            cadenaListaO:this.state.ultimaPartidaBingo.bingoCards[i].cadenaListaO,
            //arrglos para comparar opcion de ganar por filas
            cadenaHorizontal1:this.state.ultimaPartidaBingo.bingoCards[i].cadenaHorizontal1,
            cadenaHorizontal2:this.state.ultimaPartidaBingo.bingoCards[i].cadenaHorizontal2,
            cadenaHorizontal3:this.state.ultimaPartidaBingo.bingoCards[i].cadenaHorizontal3,
            cadenaHorizontal4:this.state.ultimaPartidaBingo.bingoCards[i].cadenaHorizontal4,
            cadenaHorizontal5:this.state.ultimaPartidaBingo.bingoCards[i].cadenaHorizontal5,
            //arreglos para comparar opcion de ganar en diagonal
            cadenaDiagonal1:this.state.ultimaPartidaBingo.bingoCards[i].cadenaDiagonal1,
            cadenaDiagonal2:this.state.ultimaPartidaBingo.bingoCards[i].cadenaDiagonal2
          })
        }
      }
    }
    //console.log("copiaDatos: trae el ultimo carton de este jugador")
    //console.log(this.state.copiaDatos)
  }
//=====================================================================================================
//*                                    OPERACIONES CON BALOTARIO
//=====================================================================================================
  /*
   * trae lista de numeros equivalente a los números de la lista de balotas, se utiliza para validar
   * cuando jugador quiere tachar en su carton la balota que ya ha salido
   */
  traerListaNumerosBalotario = async () => {
  await axios.get( urlBalotarioNumeros )
  .then( response => {
    this.setState({
      listaNumerosBalotario: response.data,
    })
  }).catch(err => {
    console.log(err.message);
    })
  }
  /*
   * detiene Balotario en el Backend
   */
  paraBalotario = async () => {
    await axios.get( urlPararBalotario )
    .then( response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
      })
  }
  /*
   * inicia o da continuidad al Balotario
   */
  iniciarBalotario = async () => {
    await axios.get( urlIniciarBalotario )
    .then( response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
    })
  }
  /*
   * vuele a vacio para empezar nuevamente al Balotario
   */
  reiniciarBalotario = async () => {
    await axios.get( urlReiniciarBalotario )
    .then( response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
      })
  }
//=====================================================================================================
//*                         AGREGAR BALOTARIO A PARTIDA
//=====================================================================================================
  /*
  * trae la ultima partida ("actual") y se ejecuta en callback "traerListaBalotas"
  */
  agregarBalotarioAPartida = async () => {
    await axios.get( urlUltimaPartidaBingo )
    .then( response => {
      this.setState({
        idPartidaBingo:response.data.idPartidaBingo
      }, () => {
        this.traerListaBalotas();
      });
    }).catch( err => {
      console.log( err.message );
    })
  }
  /*
  * trae arreglo con las balotas que han salido, ejecuta callback "metodoAgregarBalotarioAPartida"
  */
  traerListaBalotas = async () => {
    await axios.get( urlTraerListaBalotas )
    .then( response => {
      this.setState({
        formBalotario:{
          ...this.state.formBalotario,
          balotas:response.data
        }
      }, () => {
        this.metodoAgregarBalotarioAPartida();
      })
    }).catch(err => {
      console.log(err.message);
    })
  }
  /*
  * agregar Balotario actual a la partida actual
  */
  metodoAgregarBalotarioAPartida = async () => {
    await axios.put( urlPartidaBingoAddBalotario + '/' +
    this.state.idPartidaBingo, this.state.formBalotario )
    .then( response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
    })
  }
//=====================================================================================================
//*                         ACTUALIZAR JUGADOR GANADOR A PARTIDA
//=====================================================================================================
  /*
  * se trae ultima partida("actual"), se ejecuta callback "metodoAgregarGanadorAPartida" en el setState
  */
  actualizarJugadorGanadorPartida = async () => {
    await axios.get( urlUltimaPartidaBingo )
    .then( response => {
      this.setState({
        ultimaPartidaBingo: response.data,
        idPartidBingo: response.data.idPartidBingo
      }, () => {
        this.metodoActualizarGanadorAPartida();
      });
    }).catch( err => {
      console.log( err.message );
    })
  }
  /*
   * agrega a el jugador ganador a la partida
   */
  metodoActualizarGanadorAPartida = async () => {
    let jugadorGanador = this.state.ultimaPartidaBingo.sesion.jugadores.find(
      jugador => jugador.estado === "Ganador");
    let formActGanador = {
      idPartidaBingo:this.state.idPartidaBingo,
      jugadorGanador:jugadorGanador.usuario
    }
    await axios.put( urlPartidaBingoUpdate, formActGanador)
    .then ( response => {
      console.log(response.data);
    }).catch( err => {
      console.log( err.message );
    })
  }

//=====================================================================================================
//*                         INICIAR CRONOMETRO
//=====================================================================================================
/*
* envia valor en tiempoEspera duracion del cronometro
*/
iniciarCronometro = async () => {
  try {
    await axios.post( urlStartCronometro, {tiempoEspera} )
    .then(response => {
      console.log(response.data)
    })
  } catch (err) {
    console.error(err.message)
  }
}
//=====================================================================================================
//*                          LOGICA DE GANAR BINGO
//=====================================================================================================
  /*
   * Función para la logica del juego para ganar.
   * @param {*} event evento de click sobre el numero del carton de Bingo.
   * @param {*} valor valor equivalente al click en posicion del carton de Bingo.
   */
  async handleClick (event, valor)  {
    //seleccionando al boton del evento click
    const boton =  event.target;

    //Condicional para validar la balota del balotario con el número del cartón de Bingo y cambiar el estilo
    if (this.state.listaNumerosBalotario.includes(valor))
      {
        boton.style.backgroundColor = '#9999';

        //Condicional para ir guardando opción de ganar caso columna letra B
        if ((valor >= 1 && valor <= 15) && !this.state.seleccionListaB.includes("B" + valor))
          {
            await this.setState( prevState => ({ seleccionListaB: prevState.seleccionListaB.concat("B" + valor) }));
            const index = this.state.listaB.indexOf(valor)//segun el evento del click, con su valor determinadmo en que lista de letra esta y guardamos en una constante su posicion
            if ( index === 0 ) await this.setState( prevState => ({ seleccionHorizontal1: prevState.seleccionHorizontal1.concat("B" + valor) }));
            if ( index === 0 ) await this.setState( prevState => ({ seleccionDiagonal1: prevState.seleccionDiagonal1.concat("B" + valor)     }));
            if ( index === 1 ) await this.setState( prevState => ({ seleccionHorizontal2: prevState.seleccionHorizontal2.concat("B" + valor) }));
            if ( index === 2 ) await this.setState( prevState => ({ seleccionHorizontal3: prevState.seleccionHorizontal3.concat("B" + valor) }));
            if ( index === 3 ) await this.setState( prevState => ({ seleccionHorizontal4: prevState.seleccionHorizontal4.concat("B" + valor) }));
            if ( index === 4 ) await this.setState( prevState => ({ seleccionHorizontal5: prevState.seleccionHorizontal5.concat("B" + valor) }));
            if ( index === 4 ) await this.setState( prevState => ({ seleccionDiagonal2: prevState.seleccionDiagonal2.concat("B" + valor)     }));
          }

        //Condicional para ir guardando opción de ganar caso columna letra I
        else if ((valor >= 16 && valor <= 30) && !this.state.seleccionListaI.includes("I" + valor))
          {
            await this.setState( prevState => ({ seleccionListaI: prevState.seleccionListaI.concat("I" + valor) }));
            const index = this.state.listaI.indexOf(valor)
            if ( index === 0 ) await this.setState( prevState => ({ seleccionHorizontal1: prevState.seleccionHorizontal1.concat("I" + valor) }));
            if ( index === 1 ) await this.setState( prevState => ({ seleccionHorizontal2: prevState.seleccionHorizontal2.concat("I" + valor) }));
            if ( index === 1 ) await this.setState( prevState => ({ seleccionDiagonal1: prevState.seleccionDiagonal1.concat("I" + valor)     }));
            if ( index === 2 ) await this.setState( prevState => ({ seleccionHorizontal3: prevState.seleccionHorizontal3.concat("I" + valor) }));
            if ( index === 3 ) await this.setState( prevState => ({ seleccionHorizontal4: prevState.seleccionHorizontal4.concat("I" + valor) }));
            if ( index === 3 ) await this.setState( prevState => ({ seleccionDiagonal2: prevState.seleccionDiagonal2.concat("I" + valor)     }));
            if ( index === 4 ) await this.setState( prevState => ({ seleccionHorizontal5: prevState.seleccionHorizontal5.concat("I" + valor) }));
          }

        //Condicional para ir guardando opción de ganar caso columna letra N
        else if ((valor >= 31 && valor <= 45) && !this.state.seleccionListaN.includes("N" + valor))
          {
            await this.setState( prevState => ({ seleccionListaN: prevState.seleccionListaN.concat("N" + valor) }));
            const index = this.state.listaN.indexOf(valor)
            if ( index === 0 ) await this.setState( prevState =>({ seleccionHorizontal1: prevState.seleccionHorizontal1.concat("N" + valor) }));
            if ( index === 1 ) await this.setState( prevState =>({ seleccionHorizontal2: prevState.seleccionHorizontal2.concat("N" + valor) }));
            if ( index === 2 ) await this.setState( prevState =>({ seleccionHorizontal3: prevState.seleccionHorizontal3.concat("N" + valor) }));
            if ( index === 3 ) await this.setState( prevState =>({ seleccionHorizontal4: prevState.seleccionHorizontal4.concat("N" + valor) }));
            if ( index === 4 ) await this.setState( prevState =>({ seleccionHorizontal5: prevState.seleccionHorizontal5.concat("N" + valor) }));
          }

        //Condicional para ir guardando opción de ganar caso columna letra G
        else if ((valor >= 46 && valor <= 60) && !this.state.seleccionListaG.includes("G" + valor))
          {
            await this.setState( prevState => ({ seleccionListaG: prevState.seleccionListaG.concat("G" + valor) }));
            const index = this.state.listaG.indexOf(valor)
            if ( index === 0 ) await this.setState( prevState => ({ seleccionHorizontal1: prevState.seleccionHorizontal1.concat("G" + valor) }));
            if ( index === 1 ) await this.setState( prevState => ({ seleccionHorizontal2: prevState.seleccionHorizontal2.concat("G" + valor) }));
            if ( index === 1 ) await this.setState( prevState => ({ seleccionDiagonal2: prevState.seleccionDiagonal2.concat("G" + valor)     }));
            if ( index === 2 ) await this.setState( prevState => ({ seleccionHorizontal3: prevState.seleccionHorizontal3.concat("G" + valor) }));
            if ( index === 3 ) await this.setState( prevState => ({ seleccionHorizontal4: prevState.seleccionHorizontal4.concat("G" + valor) }));
            if ( index === 3 ) await this.setState( prevState => ({ seleccionDiagonal1: prevState.seleccionDiagonal1.concat("G" + valor)     }));
            if ( index === 4 ) await this.setState( prevState => ({ seleccionHorizontal5: prevState.seleccionHorizontal5.concat("G" + valor) }));
          }

        //Condicional para ir guardando opción de ganar caso columna letra O
        else if (!this.state.seleccionListaO.includes("O" + valor) && (valor >= 61 && valor <= 75))
        {
          await this.setState( prevState => ({ seleccionListaO: prevState.seleccionListaO.concat("O" + valor) }));
          const index = this.state.listaO.indexOf(valor)
            if ( index === 0 ) await this.setState( prevState => ({ seleccionHorizontal1: prevState.seleccionHorizontal1.concat("O" + valor) }));
            if ( index === 0 ) await this.setState( prevState => ({ seleccionDiagonal2: prevState.seleccionDiagonal2.concat("O" + valor)     }));
            if ( index === 1 ) await this.setState( prevState => ({ seleccionHorizontal2: prevState.seleccionHorizontal2.concat("O" + valor) }));
            if ( index === 2 ) await this.setState( prevState => ({ seleccionHorizontal3: prevState.seleccionHorizontal3.concat("O" + valor) }));
            if ( index === 3 ) await this.setState( prevState => ({ seleccionHorizontal4: prevState.seleccionHorizontal4.concat("O" + valor) }));
            if ( index === 4 ) await this.setState( prevState => ({ seleccionHorizontal5: prevState.seleccionHorizontal5.concat("O" + valor) }));
            if ( index === 4 ) await this.setState( prevState => ({ seleccionDiagonal1: prevState.seleccionDiagonal1.concat("O" + valor)    }));
        }
      }
    // console.log("===============================")
    // console.log("cadenaListaB: ")
    // console.log(this.state.cadenaListaB)
    // console.log("seleccionLB: ")
    // console.log(this.state.seleccionListaB)
    // console.log("seleccionLI: ")
    // console.log(this.state.seleccionListaI)
    // console.log("seleccionLN: ")
    // console.log(this.state.seleccionListaN)
    // console.log("seleccionLG: ")
    // console.log(this.state.seleccionListaG)
    // console.log("seleccionLO: ")
    // console.log(this.state.seleccionListaO)
    // console.log("cadenaH1: ")
    // console.log(this.state.cadenaHorizontal1)
    // console.log("seleccionH1: ")
    // console.log(this.state.seleccionHorizontal1)
    // console.log("cadenaH2: ")
    // console.log(this.state.cadenaHorizontal2)
    // console.log("seleccionH2: ")
    // console.log(this.state.seleccionHorizontal2)
    // console.log("cadenaH3: ")
    // console.log(this.state.cadenaHorizontal3)
    // console.log("seleccionH3: ")
    // console.log(this.state.seleccionHorizontal3)
    // console.log("cadenaH4: ")
    // console.log(this.state.cadenaHorizontal4)
    // console.log("seleccionH4: ")
    // console.log(this.state.seleccionHorizontal4)
    // console.log("cadenaH5: ")
    // console.log(this.state.cadenaHorizontal5)
    // console.log("seleccionH5: ")
    // console.log(this.state.seleccionHorizontal5)
    // console.log("seleccionDiagonal1")
    // console.log(this.state.seleccionDiagonal1)
    // console.log(this.state.cadenaDiagonal1)
    // console.log("seleccionDiagonal2")
    // console.log(this.state.seleccionDiagonal2)
    // console.log(this.state.cadenaDiagonal2)
  }

  bingo = async () => {
    await this.paraBalotario();//paramos balotario para validar si hay ganador
    //extraemos el elemento "N0" con le metodo filter() para poder hacer las comparaciones exactas
    const auxCadenaListaN = this.state.cadenaListaN.filter(elemento => elemento !== "N0")
    const AuxHorizontalN = this.state.cadenaHorizontal3.filter(elemento => elemento !== "N0")
    //console.log("auxCadenaListaN: " + auxCadenaListaN)
    //console.log("AuxHorizontalN: " + AuxHorizontalN)
    if (
        /**
         * validaciones para listas columnas letras, implementamos primero el metodo sort() para ordenar
         * ambas cadenas a comparar y luego con el metodo toString() convertimos a cadena para comparacion exacta
         * */
        this.state.cadenaListaB.sort().toString() === this.state.seleccionListaB.sort().toString() ||
        this.state.cadenaListaI.sort().toString() === this.state.seleccionListaI.sort().toString() ||
        auxCadenaListaN.sort().toString() === this.state.seleccionListaN.sort().toString() ||
        this.state.cadenaListaG.sort().toString() === this.state.seleccionListaG.sort().toString() ||
        this.state.cadenaListaO.sort().toString() === this.state.seleccionListaO.sort().toString() ||
        //validaciones para listas horizontales
        this.state.cadenaHorizontal1.sort().toString() === this.state.seleccionHorizontal1.sort().toString() ||
        this.state.cadenaHorizontal2.sort().toString() === this.state.seleccionHorizontal2.sort().toString() ||
        AuxHorizontalN.sort().toString() === this.state.seleccionHorizontal3.sort().toString() ||
        this.state.cadenaHorizontal4.sort().toString() === this.state.seleccionHorizontal4.sort().toString() ||
        this.state.cadenaHorizontal5.sort().toString() === this.state.seleccionHorizontal5.sort().toString() ||
        //validaciones para listas diagonales
        this.state.cadenaDiagonal1.sort().toString() === this.state.seleccionDiagonal1.sort().toString() ||
        this.state.cadenaDiagonal2.sort().toString() === this.state.seleccionDiagonal2.sort().toString()
      )
        {
          alert("¡¡¡FELICITACIONES... GANASTE!!!")
        await this.props.modificarJugadorGanador();
        await this.props.modificarPartidaBingoGanador();
        await this.agregarBalotarioAPartida();
        await this.actualizarJugadorGanadorPartida();
        await this.iniciarCronometro();
        await this.reiniciarBalotario();
        } else {
          alert("Lo siento has sido descalificado...")
          await this.props.modificarJugadorDescalificado();
          await this.iniciarBalotario();
          window.location.href = './PageInicio'
          }
  }

  componentDidMount(){
    /*
    * validación para que el usuario relacionado sea representado en la variable de estado admin y solo
    * pueda ver algunos componentes del juego
    */
    if(cookies.get('_id') === "63c9826a54cfccba201d7686") {
      this.setState({ admin:true })
    }
    this.intervalo = setInterval( () => {
      this.traerListaNumerosBalotario();
      if(this.state.listaNumerosBalotario.length === 75) {
        clearInterval(this.intervalo)
      }
    }, 2000);
    this.intervalo2 = setTimeout( () => {
      this.iniciarBalotario();
    }, 65000)
  }

  render() {

    return(
      <div  className='divPrincipalCartonBingo' style={{display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        marginTop:"25px",
        alignItems:"center",
        border:"3px solid gray",
        padding:"5px",
        }}>
        <h1>Carton</h1>
        <div >
          <div className='divtitulo'>
            {
            titulo.map((row, rowIndex) => (
              <button className='btnBingoCard' key={rowIndex} ked = {rowIndex} >{row}</button>
            ))
            }
          </div>

          <div className='divBingoCard2'>
            <div className='divLetra'>
              {
                this.state.listaB.map((row, rowIndex) => (
                  <button className='btnBingoCard' key={rowIndex} ked = {rowIndex} onClick={(event) =>this.handleClick(event, row)} >{row}</button>
                ))
              }
            </div>
            <div className='divLetra'>
              {
                this.state.listaI.map((row, rowIndex) => (
                  <button className='btnBingoCard' key={rowIndex} ked = {rowIndex} onClick={(event) =>this.handleClick(event, row)} >{row}</button>
                ))
              }
            </div>
            <div className='divLetra'>
              {
                this.state.listaN.map((row, rowIndex) => (
                  <button className='btnBingoCard' key={rowIndex} ked = {rowIndex} onClick={(event) =>this.handleClick(event, row)} >{row}</button>
                ))
              }
            </div>
            <div className='divLetra'>
              {
                this.state.listaG.map((row, rowIndex) => (
                  <button className='btnBingoCard' key={rowIndex} ked = {rowIndex} onClick={(event) =>this.handleClick(event, row)} >{row}</button>
                ))
              }
            </div>
            <div className='divLetra'>
              {
                this.state.listaO.map((row, rowIndex) => (
                  <button className='btnBingoCard' key={rowIndex} ked = {rowIndex} onClick={(event) =>this.handleClick(event, row)} >{row}</button>
                ))
              }
            </div>
          </div>
        </div>

        <div className='divBontones' >
          <button className='btnCarton' onClick={()=>this.generarCartonBingoFrontend()}>Frontend</button>{"   "}
          <button className='btnCarton' onClick={()=>{this.generarCartonBingoBackend()}}>Backend</button>{"   "}
          <button className='btnCarton' onClick={()=>{this.guardarCartonBingo()}}>Guardar</button>
          <button className='btnCarton' onClick={()=>{this.mostrarCartonBingo()}}>Mostrar</button>
        </div>
        <div>
            <button className='botonBingo' onClick={()=>this.bingo()}>BINGO</button>
          </div>
        <h3 style={{textAlign:"center"}} hidden={!this.state.admin} >jugadorId: {jugadorId}</h3>
      </div>
    )
  }
}
export default CartonBingo2;