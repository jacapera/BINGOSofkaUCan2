import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import '../estilos/pageJuego.css';
import Balotario2 from './Balotario2';
import Jugadores from './Jugadores';
import CartonBingo from './CartonBingo';
import axios from 'axios';
import {cookies} from './Login';

const jugadorId = cookies.get('_id');
const urlUltimaPartidaBingo = process.env.REACT_APP_URL_ULTIMA_PARTIDA_BINGO;
const urlPartidaBingoAddSesion = process.env.REACT_APP_URL_PARTIDABINGO_ADDSESION;
const urlULtimaSesion = process.env.REACT_APP_URL_ULTIMA_SESION;
const urlJugadorAddSesion = process.env.REACT_APP_URL_JUGADOR_ADDSESION;
const urlPartidaBingoUpdate = process.env.REACT_APP_URL_PARTIDABINGO_UPDATE;
const urlJugadorUpdate = process.env.REACT_APP_URL_JUGADOR_UPDATE;

/**
 * Componente principal donde se desarrolla el juego
 */
class PageInicio extends Component {

//=====================================================================================================
//                                            VARIBLES DE ENTORNO (state)
//=====================================================================================================
  state = {
    //guarda el id de la ultima partida creada en backend springboot bingo
    ultimaPartidaBingo:'',

    //json para agregar ultima sesion creada en el backend Springboot a jugador actual
    formSesion:{
      id:''
    },

    //guardar sesion actual
    ultimaSesionBingo:[],

    ganador:false,
    jugadores:'',
  }
  //---------------------------------------------------------------------------------------------------
  intervalo = 0;  //componentDidMount("traerUltimaSesion")
  intervalo2 = 0;

//=====================================================================================================
//                                   AGREGAR SESION A PARTIDA
//=====================================================================================================
  /*
   * trae la ultima sesion y se ejecuta en callback "metodoAgregarSesionAPartida"
   */
  agregarSesionAPartida = async () => {
    await axios.get(urlUltimaPartidaBingo)
    .then( response => {
      this.setState({
        ultimaPartidaBingo:response.data
      }, () => {
        this.metodoAgregarSesionAPartida();
      })
      console.log("ULTIMA PARTIDA BINGO")
      console.log(this.state.ultimaPartidaBingo);
    }).catch( err => {
      console.log( err.message );
    })
  }
  /*
   * agrega sesion actual a la partida actual
   */
  metodoAgregarSesionAPartida = async () => {
    await axios.put(urlPartidaBingoAddSesion + '/' +
    this.state.ultimaPartidaBingo.idPartidaBingo, this.state.formSesion)
    .then( response => {
      //console.log("respuesta addSesion a PartidaBingo");
      //console.log(response.data);
    }).catch (err => {
      console.error(err.message);
    })
  }
//=====================================================================================================
//                                       Agregar sesion a jugador
//=====================================================================================================
  /*
   * trae la ultima sesion creada y en un callback se ejecuta "metodoAgregarJugador"
   */
  agregarSesionAJugador = async () => {
    await axios.get(urlULtimaSesion)
    .then(response => {
      this.setState({
        jugadores:response.data.jugadores,
        formSesion:{
          id:response.data.id
      }}, () => {
        this.metodoAgregarSesion();
      })
    }).catch (err => {
      console.log(err.message)
    })
  }
  /*
   * agrega la sesion a jugador actual
   */
  metodoAgregarSesion = async () => {
    await axios.put( urlJugadorAddSesion + '/' + jugadorId, this.state.formSesion )
    .then(response => {
      //console.log("RESPUESTA addSesion a Jugador")
      //console.log(response.data);
    }).catch(err => {
      console.error(err.message);
    })
  }
//=====================================================================================================
//                                       Traer ultima sesion
//=====================================================================================================
  /*
  * trae ultima sesion
  */
  traerUltimaSesion = async () => {
    await axios.get( urlULtimaSesion )
    .then( response => {
      this.setState({
        ultimaSesionBingo:response.data,
        ganador:response.data.partidaBingo.ganador,
        jugadores:response.data.jugadores,
        formSesion:{ id: response.data.id}
      }, () => {
        //valida cuando ya hay un ganador y lo redirige a una pagina que anuncia el ganador
        if ( this.state.ganador ) {
          setTimeout( () => {
            window.location.href = './Ganador'
          }, 3000)
        }
      })
      //console.log("ultima sesion")
    }).catch ( err => {
      console.error ( err.message);
    })
  }
//=====================================================================================================
//                                             GANAR  BINGO
//=====================================================================================================
  /*
   * cambia estado jugador por defecto "Participando" a "Ganador"
   */
  modificarJugadorGanador = async () => {
    let jugador = {
      idJugador:jugadorId,
      estado:"Ganador"
    }
    await axios.put( urlJugadorUpdate, jugador )
    .then( response => {
      this.setState({ ganador:"true"})
      console.log(response.data);
    }).catch( err=> {
      console.error( err.message );
    })
  }
  /*
   * cambia estado jugador por defecto "Participando" a "Descalificado"
   */
  modificarJugadorDescalificado = async () => {
    let jugador = {
      idJugador:jugadorId,
      estado:"Descalificado"
    }
    await axios.put( urlJugadorUpdate, jugador )
    .then( response => {
      console.log(response.data);
    }).catch( err=> {
      console.error( err.message );
    })
  }
  /*
   * cambia en PartidaBingo en su atributo Ganador a "true"
   */
  modificarPartidaBingoGanador = async () => {
    let partida = {
      idPartidaBingo:this.state.ultimaPartidaBingo.idPartidaBingo,
      ganador:true
    }
    await axios.put( urlPartidaBingoUpdate, partida )
    .then ( response => {
      console.log(response.data);
    }).catch ( err => {
      console.error( err.message );
    })
  }
//=====================================================================================================


  componentDidMount(){
    this.agregarSesionAPartida();
  }

  componentWillUnmount(){
    //this.agregarSesionAPartida();
    this.agregarSesionAJugador();
    this.intervalo = setInterval ( () =>{
      this.traerUltimaSesion();
    }, 1000)
  }

  render(){

    return (
      <div className="divPrincipalPageJuego" >
        <div className="divTitulos">
          <h1>Bienvenidos al Bingo Virtual de Sofka</h1>
          <h1>Sala de Juego</h1>
        </div>
        <Jugadores  jugadores = { this.state.jugadores } />

        <CartonBingo
        modificarJugadorGanador = { this.modificarJugadorGanador }
        modificarJugadorDescalificado = { this.modificarJugadorDescalificado }
        modificarPartidaBingoGanador = { this.modificarPartidaBingoGanador }
        />

        <Balotario2 />
      </div>

    )
  }
}

export default PageInicio;