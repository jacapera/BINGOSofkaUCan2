import React, { Component } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {cookies} from './Login';
import '../estilos/pageInicio.css';

const urlJugador = process.env.REACT_APP_URL_SESIONES_LINEA;
const urlSesionOne = process.env.REACT_APP_URL_SESIONES_ONESESION;
const urlSesiones = process.env.REACT_APP_URL_SESIONES;
const urlCronometroSesion = process.env.REACT_APP_URL_CRONOMETRO_SESION;
const urlSesionUltimaSesion = process.env.REACT_APP_URL_SESION_ULTIMASESION;
const urlStartCronometro = process.env.REACT_APP_URL_START_CRONOMETRO;
const urlJugadorSave = process.env.REACT_APP_URL_JUGADOR_SAVE;
const urlJugadorAll = process.env.REACT_APP_URL_JUGADOR_ALL;
const urlJugadorUpdate = process.env.REACT_APP_URL_JUGADOR_UPDATE

const jugadorId = cookies.get('_id')
const tiempoEspera = process.env.REACT_APP_TIEMPO_ESPERA;


class PageInicio extends Component {

//=====================================================================================================
//                                            VARIBLES DE ENTORNO (state)
//=====================================================================================================
  state = {
    //arreglo que almacena jugadores que se logean en el juego
    data: [],

    //variable que guarda el id jugador para hacer login
    idSesion:'',

    //arreglo que guarda los jugadores en una sesion de una partida de bingo
    ultimaSesionBingo:'',

    listaJugadores:'',

    admin:false,
    minutos:'',
    segundos:'',
    formJugador:{
      idJugador:'',
      usuario:'',
      estado:'Esperando'
    }
  }

  //variable para asignar la funcion de setInterval
  intervalo = 0 //setInterval componentWillUnmount(peticionGetSesionOnLine, peticionGetCronometro)
  intervalo2 = 0 //setTimeout peticionGetCronometro
  intervalo3 = 0 //setTimeout componentDidMount(peticionPostJugador)

//=====================================================================================================
//*                                        BACKEND NODEJS CON MONDODB
//=====================================================================================================
//*                                        Agregar jugador a sesion
//=====================================================================================================
  /*
  * trae sesion, se asigna a una variable el id de la sesion, se ejecuta en esta operacion "Agregar
  * jugador a Sesion"
  */
  peticionGetIdSesion = async () => {
    try {
      await axios.get(urlSesionOne)
      .then( response => {
      //en esta linea aseguramos se ejecute la peticion PUT y pueda contar con el parametro idSesion en su URL
      this.setState({ idSesion:response.data.oneSesion._id}, () => {this.agregarJugadorSesion()})
      //console.log(response.data)
      console.log(this.state.idSesion)
    })
    } catch (err) {
      console.error(err);
    }
  }

  /*
   * agrega un jugador a la sesion
   */
  agregarJugadorSesion = async () => {
    await axios.put(urlSesiones + '/' + this.state.idSesion, {jugadorId})
    .then( response => {
      console.log("PARTICIPANTES SESION LOGIN")
      console.log(response.data)
    }).catch(err => {
      console.error(err.message)
    })
  }

  /*
   * me muestra la agregacion hecha en mongodb (usuario, estado)
   */
  peticionGetSesionOnLine = async () => {
    await axios.get(urlJugador).then(response => {
      this.setState({
        data: response.data
      })
      //console.log(this.state.data)
    }).catch(err => {
      console.log(err.message);
    })
  }

//=====================================================================================================
//                                      Operaciones del Cronometro
//=====================================================================================================
/*
* trae estado del Cronometro, se ejecuta callback "crearJugador: me permite crear un jugador solo en el
* tiempo que este corriendo el cronometro y resetea su estado a Participando para iniciar nuevo juego",
* se ejecuta otra promesa que hara un llamado a la ultimaSesion y me permitira validar que el jugador
* se valida para cuando termine el tiempo del cronometro sea rederigido a la sala de juego.
*/
peticionGetCronometro = async () => {
  //traer la lista de todos los jugadores creados
  await axios.get( urlJugadorAll )
  .then( response => {
    this.setState({ listaJugadores: response.data})
  }).catch ( err => {
    console.error( err.message );
  });
  //trae el cronometro
  await axios.get(urlCronometroSesion)
  .then( response => {
    this.setState({
      minutos: response.data.minutos,
      segundos: response.data.segundos
    }, () => {
      //valida cuando cronometro este terminando, crea y actualiza jugador a "Participando"
      if ( this.state.minutos === 0 && this.state.segundos > 0) {
        this.crearJugadorYActualizar();
      }
      //comparar el estado del jugador actual
      let participando = this.state.listaJugadores.find ( jugador => jugador.idJugador === jugadorId &&
        jugador.estado === "Participando")?true:false;
      if ( (this.state.minutos === 0 && this.state.segundos === 0) && !participando ) {
        this.crearJugador();
      }
    })
  }).then( data => {
    //trae ultima sesion
    axios.get(urlSesionUltimaSesion)
    .then( response => {
      this.setState({ ultimaSesionBingo:response.data}, () => {
        //esta validacion es por si en la base de datos empieza sin registro, no me rompa el codigo
        if ( this.state.ultimaSesionBingo != null && this.state.ultimaSesionBingo.partidaBingo != null ) {
          let siJugadorEsta = this.state.ultimaSesionBingo.jugadores.find (
          jugador => jugador.idJugador === jugadorId)?true:false;
          let participando = this.state.listaJugadores.find ( jugador => jugador.idJugador === jugadorId &&
          jugador.estado === "Participando")?true:false;
          //validacion para los jugadores que estan en espera puedan ser rederigidos a la sala de juego
          if ( (this.state.minutos === 0 && this.state.segundos === 0) && (!siJugadorEsta) && (participando)  ) {
            window.location.href = './PageJuego';
          }
        }
      })
    })
  }).catch( err => {
    console.error(err.message);
  })
}

/*
 * valida si el jugador ya existe en la sesion actual, si no existe lo redirige a la sala de juego.
 */
validarPasoAPageJuego = async () => {
  await axios.get(urlCronometroSesion)
  .then( response => {
    this.setState({
      minutos: response.data.minutos,
      segundos: response.data.segundos
    })
  }).catch ( err => {
    console.error( err.message );
  });
  await axios.get( urlJugadorAll )
  .then( response => {
    this.setState({ listaJugadores: response.data})
  }).catch ( err => {
    console.error( err.message );
  });
  await axios.get(urlSesionUltimaSesion)
    .then( response => {
      this.setState({
        ultimaSesionBingo: response.data
      }, () => {
        if(this.state.ultimaSesionBingo != null && this.state.ultimaSesionBingo.partidaBingo != null){
          console.log(this.state.ultimaSesionBingo);
          //valida si jugador esta en la ultima sesion
          let siJugadorEsta = this.state.ultimaSesionBingo.jugadores.find (
          jugador => jugador.idJugador === jugadorId)?true:false;
          console.log(siJugadorEsta)
          //valida si en la ultima sesion en jugadores hay alguno con estado "Ganador"
          let siNoHanGanado = (this.state.ultimaSesionBingo.jugadores.find (
          jugador => jugador.estado === "Ganador"))?true:false;
          console.log(siNoHanGanado)
          //valida si la ultima sesion tiene agregada la ultima partida
          let empezadoJuego = (this.state.ultimaSesionBingo.partidaBingo != null)?true:false;
          console.log(empezadoJuego)
          //valida si en la ultima sesion en jugadores hay alguno con estado "Descalificado"
          let descalificado =this.state.ultimaSesionBingo.jugadores.find (
          jugador => jugador.idJugador === jugadorId && jugador.estado === "Descalificado")?true:false;
          console.log(descalificado)
          let participando = this.state.listaJugadores.find ( jugador => jugador.idJugador === jugadorId &&
          jugador.estado === "Participando")?true:false;

          //validacion para el jugador que este en alguna partida y salga del juego pueda volver a la partida que empezo si aun no han ganado
          if (  (this.state.minutos === 0 && this.state.segundos === 0) && (siJugadorEsta) && (!siNoHanGanado) && (!descalificado) ) {
            window.location.href = './PageJuego';
          }
          //valida cuando un jugador llegue si hay juego en curso debe esperar
          if ( (this.state.minutos === 0 && this.state.segundos === 0) && (!siJugadorEsta) && (empezadoJuego) && (!participando) ) {
            alert("hay un juego en curso espera a que termine o vuelve dentro de 10 minutos")
          }
          //valida cuando jugador sea descalificado no le permita volver a entrar a la partida que empezo
          if ( (this.state.minutos === 0 && this.state.segundos === 0) && (siJugadorEsta) && (descalificado)) {
            alert("Has sido descalificado y por eso has salido del juego...espera un nuevo juego o vuelve mas tarde")
          }
        }
      })
    }).catch ( err => {
    console.error( err.message );
  })
}
/*
 * envia valor en tiempoEspera duracion del cronometro
 */
peticionPostIniciarCronometo = async () => {
  try {
    await axios.post( urlStartCronometro, {tiempoEspera})
    .then(response => {
      console.log(response.data)
    })
  } catch (err) {
    console.error(err.message)
  }
}
//=====================================================================================================
//*                                BACKEND SPRINGBOOT CON MYSQL
//=====================================================================================================
//*                                    Crear jugador
//=====================================================================================================
  /*
   * crea jugador actual y lo actualiza a Participando
   */
  crearJugadorYActualizar = async () => {
    await this.setState({
      formJugador:{
        estado:"Participando",
        idJugador:cookies.get('_id'),
        usuario:cookies.get('usuario')
      }
    })
    await axios.post( urlJugadorSave, this.state.formJugador)
    .then( response => {
      console.log("JUGADOR BINGO CREADO Y ACTUALIZADO")
      console.log(response.data)
    }).then(data => {
      this.actualizarJugador();
    }).catch(err => {
      console.error(err.message);
    });
  }
  /*
   * crea jugador actual y por defecto "Esperando"
   */
  crearJugador = async () => {
    await this.setState({
      formJugador:{
        ...this.state.formJugador,
        idJugador:cookies.get('_id'),
        usuario:cookies.get('usuario')
      }
    })
    await axios.post( urlJugadorSave, this.state.formJugador)
    .then( response => {
      console.log("JUGADOR BINGO CREADO")
      console.log(response.data)
    }).catch(err => {
      console.error(err.message);
    });
  }
//=====================================================================================================
//*                                    Actualizar Jugador
//=====================================================================================================
  /*
  * trae todos los jugadores y se ejecuta un callback con "metodoActualizarJugador"
  */
  actualizarJugador = async () => {
    await axios.get(urlJugadorAll)
    .then( response => {
      this.setState({
        listaJugadores: response.data
      }, () => {
        this.metodoActualizarJugador();
      })
    }). catch ( err => {
      console.error ( err.message );
    })
  }

  /*
   * buscar y valida si esta el jugador actual, y actualiza su estado a "Participando", por si ya venia
   * de otro juego y se halla modificado su estado
   */
  metodoActualizarJugador = async () => {
    let jugador = (this.state.listaJugadores.find( jugador => jugador.idJugador === jugadorId))?true:false;
    if ( jugador ) {
      let jugador = {
        idJugador:jugadorId,
        estado:"Participando"
      }
      await axios.put(urlJugadorUpdate, jugador)
      .then( response => {
        console.log("jugador actualizado")
        console.log(response.data);
      }).catch ( err => {
        console.error ( err.message );
      })
    }
  }
//=====================================================================================================
  componentDidMount(){
    /*
     * validación para que el usuario relacionado sea representado en la variable de estado admin y solo
     * pueda ver algunos componentes del juego
     */
    if(cookies.get('_id') === "63c9826a54cfccba201d7686") {
      this.setState({ admin:true })
    }
    this.intervalo = setInterval(() => {
      this.peticionGetSesionOnLine()
      this.peticionGetCronometro()
    },1000)
    this.peticionGetIdSesion();
  }

  componentWillUnmount(){
    this.peticionGetIdSesion();
    this.validarPasoAPageJuego();
  }

  render(){

    return (
      <div className='divPrincipalPageInicio'>
        <h1>Bienvenidos al Bingo Virtual de Sofka</h1>
        <h2>Sala de Espera</h2>
        <button className='btn btn-primary' hidden={!this.state.admin} onClick={()=>this.peticionPostIniciarCronometo()}>Iniciar Cronometro</button>
        <div className='divPrincipalInicio'>
          <table className="table ">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(evento => {
                return(
                  <tr key={evento.id}>
                    <td>{evento.usuario}</td>
                    <td>{evento.estado}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default PageInicio;