import axios from 'axios';
import React, {  Component } from 'react'
import '../estilos/ganador.css';

const urlUltimaPartidaBingo = process.env.REACT_APP_URL_ULTIMA_PARTIDA_BINGO;

class Ganador extends Component {

  state = {
    ultimaPartidaBingo:'',
    jugadorGanador:''
  }

  intervalo = 0;

  /**
   * trae la ultima partida creada en el backend Springboot bingo
   */
  traerUltimaPartidaBingo = async () => {
    await axios.get( urlUltimaPartidaBingo )
    .then( response => {
      this.setState({
        ultimaPartidaBingo:response.data
      }, () => {
        let jugadorGanadorBingo = this.state.ultimaPartidaBingo.sesion.jugadores.find(
        jugador => jugador.estado === "Ganador");
        this.setState({ jugadorGanador:jugadorGanadorBingo.usuario })
      })
    }).catch( err => {
      console.log( err.message );
    })
  }

  componentDidMount() {
    this.traerUltimaPartidaBingo();
  }

  render() {
    return (
      <div className='divPrincipalGanador'>
        <h1 style = {{textAlign:'center'}}>!...En hora buena ya tenemos un Ganador...!    </h1>
        <p style = {{
          fontSize:"50px",
          fontWeight:"bold"
        }} > FELICITACIONES:  {this.state.jugadorGanador}</p>
        <button className='botonBingo' onClick={()=>{window.location.href='./PageInicio'}}>Ir a Sala Espera</button>
      </div>
    )
  }
}

export default Ganador;