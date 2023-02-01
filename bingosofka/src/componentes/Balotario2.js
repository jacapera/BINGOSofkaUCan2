import axios from 'axios';
import React, { Component } from 'react'
import '../estilos/balotario2.css'
import {cookies} from './Login';

const urlIniciarBalotario = process.env.REACT_APP_URL_INICIAR_BALOTARIO;
const urlReiniciarBalotario = process.env.REACT_APP_URL_REINICIAR_BALOTARIO;
const urlPararBalotario = process.env.REACT_APP_PARAR_BALOTARIO;
const urlTraerBalota = process.env.REACT_APP_TRAER_BALOTA;
const urlTraerListaBalotas = process.env.REACT_APP_TRAER_LISTA_BALOTAS;
const urlPartidaBingoAddBalotario = process.env.REACT_APP_PARTIDABINGO_ADDBALOTARIO;
const urlUltimaPartidaBingo = process.env.REACT_APP_URL_ULTIMA_PARTIDA_BINGO;

//arreglo para asignar el rango de numero por cada letra, este solo aplica para balotario Frontend
const rangoNumerosPorLetra = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75]
};

//arreglo para almacenar los numero aleatorios, este solo aplica para el balotario Frontend
const combinacionesGeneradas = {
  B: [],
  I: [],
  N: [],
  G: [],
  O: [],
};

/**
 * Componente refactorizado del componente Balotario, se optimiza el código
 */
class Balotario2 extends Component {

//=====================================================================================================
//                                            VARIBLES DE ENTORNO (state)
//=====================================================================================================
  state = {

    //variable para balotario Frontend
    numero:0,

    //variable para balotario Frontend y para guardar balota de balotario Backend
    balota:'',

    //arreglo para guardar balotas acumuladas
    balotas:[],

    //guardar el id de PartidaBingo actual
    idPartidaBingo:'',

    //para guardar balotario en el Backend
    formBalotas:{
      balotas:[],
    },

    //para agregar Balotario a PartidaBingo actual
    formBalotario:{
      id:''
    },

    admin:false,

    iniciarCronometro:false
  }
 //---------------------------------------------------------------------------------------

  //variable para asignar el setInterval
  intervalo = 0;
//=====================================================================================================
//*                                    BALOTARIO BACKEND
//=====================================================================================================
//*                         FUNCIONES DEL BALOTARIO(inicar, reiniciar)
//=====================================================================================================
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
  /*
   * detiene la generación de balotas (!ojo...detiene no reinicia¡)
   */
  detenerBalotario = async () => {
    await axios.get( urlPararBalotario )
    .then( response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err.message);
      })
  }
  /*
   * trae una nueva balota cada determinado tiempo(segundos)
   */
  traerBalota = async () => {
    await axios.get( urlTraerBalota )
    .then( response => {
      this.setState({
        balota: response.data,
      })
    }).catch(err => {
      console.log(err.message);
      })
  }
  /*
   * trae arreglo con las balotas que han salido
   */
  traerListaBalotas = async () => {
    await axios.get( urlTraerListaBalotas )
    .then( response => {
      this.setState({
        balotas: response.data,
        formBalotas:{
          ...this.state.formBalotas,
          balotas:response.data
        }
      })
    //console.log(this.state.balotas)
    }).catch(err => {
      console.log(err.message);
      })
  }
//=====================================================================================================
//*                         AGREGAR BALOTARIO A PARTIDA
//=====================================================================================================
/*
 * trae la ultima sesion y se ejecuta en callback "metodoAgregarBalotarioAPartida"
 */
agregarBalotarioAPartida = async () => {
  await axios.get( urlUltimaPartidaBingo )
  .then( response => {
    this.setState({
      idPartidaBingo:response.data.idPartidaBingo
    }, () => {
      this.metodoAgregarBalotarioAPartida();
    })
  }).catch( err => {
    console.log( err.message );
  })
}
/*
 * agregar Balotario actual a la partida actual
 */
metodoAgregarBalotarioAPartida = async () => {
  await axios.put( urlPartidaBingoAddBalotario + '/' + this.state.idPartidaBingo, this.state.formBalotas )
  .then( response => {
    console.log("Agregando Balotario partida actual");
    console.log(response.data);
  }).catch(err => {
    console.log(err.message);
  })
}
//=====================================================================================================
//*                                        BALOTARIO FRONTEND
//=====================================================================================================
  /*
   * genera balotas
   */
  balotario = () => {
    //se genera número aleatorio del 1 hasta el 75
    const numeroAleatorio = Math.floor( Math.random() *75 ) + 1;
    let letra;
    //ciclo para asignar el valor correspondiente en cada letra, key sera el iterador en cada letra que
    //es un arreglo de numero con determinados rangos
    for ( let key in rangoNumerosPorLetra) {
      //validación para que numeroAleatorio coincida a la letra correspondiente
      if (numeroAleatorio >= rangoNumerosPorLetra[key][0] && numeroAleatorio <= rangoNumerosPorLetra[key][1]) {
        letra = key;
        break;
      }
    }
    //validación para que no se repita la balota y sea agregada
    if (!combinacionesGeneradas[letra].includes(numeroAleatorio)) {
      combinacionesGeneradas[letra].push(numeroAleatorio);
      this.setState({
        numero: numeroAleatorio,
        balota: letra
      });
      this.setState( prevState => ({
        balotas: prevState.balotas.concat(letra + numeroAleatorio)
      }));
    }
  }
//=====================================================================================================
  componentDidMount() {
    /*
     * validación para que el usuario relacionado sea representado en la variable de estado admin y solo
     * pueda ver algunos componentes del juego
     */
    if(cookies.get('_id') === "63c9826a54cfccba201d7686") {
      this.setState({ admin:true })
    }
    //this.peticionGetUltimaPartidaBingo();
  }

  componentWillUnmount() {
    this.intervalo = setInterval( () => {
      this.traerBalota();
      this.traerListaBalotas();
      if(this.state.balotas.length === 75) {
        clearInterval(this.intervalo);
      }
    }, 2000);
    //this.peticionGetUltimaPartidaBingo();
    //clearInterval(this.intervalo);
  }

  render() {

    return (
      <div className='divPrincipalBalotario2' >

        <h1 style={{
          fontSize:"30px",
          fontWeight:"bold"
          }}>Balota: {this.state.balota}</h1>

        <div style={{
          Width:'100%',
          display: 'flex',
          flexDirection:'row',
          gap: '10px',
          border: '3px solid green',
          marginTop: '10px'
          }}>
            <div style ={{
              width:'100%',
              display:'flex',
              flexWrap:'wrap',
              gap:'10px'
              }}> {
                  this.state.balotas.map((row, rowIndex) => (
                    <h3 key={rowIndex} ked = {rowIndex}>  {row},  </h3>
                    ))
                  }
            </div>
        </div>
        <div style= {{
          display:'flex',
          flex:'row',
          justifyContent:'center',
          gap: '10px',
          marginTop:'10px',
          }}>
          <button className='btn btn-primary' hidden={!this.state.admin} onClick={this.iniciarBalotario}>iniciar</button>
          <button className='btn btn-primary' hidden={!this.state.admin} onClick={this.reiniciarBalotario}>reiniciar</button>
          <button className='btn btn-primary' hidden={!this.state.admin} onClick={this.detenerBalotario}>Detener</button>
          <button className='btn btn-primary' hidden={!this.state.admin} onClick={this.agregarBalotarioAPartida}>Guardar</button>
        </div>

      </div>
    )
  }

}

export default Balotario2;
