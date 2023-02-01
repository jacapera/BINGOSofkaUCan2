import axios from 'axios';
import {Component} from 'react'
import {cookies} from './Login'

const tiempoEspera = 1


class Cronometro extends Component {
  state = {
    segundos: 0,
    minutos: 0,
    horas: 0,
    segundosAux: 0,
    minutosAux: 0,
    horasAux: 0,
    cronometro:[],
  };

  intervalo = 0

  //Traer valores de cronometro en el server
  peticionGetCronometro = async () => {
    await axios.get('http://localhost:3010/api/cronometro/sesion')
    .then( response => {
      this.setState({ cronometro: response.data})
      //console.log(this.state.cronometro)
      this.setState({
        horasAux: this.state.cronometro.horasAux,
        minutosAux: this.state.cronometro.minutosAux,
        segundosAux: this.state.cronometro.segundosAux,
        segundos: this.state.cronometro.segundos,
        minutos: this.state.cronometro.minutos,
      })
      //console.log(this.state.horasAux + ":" + this.state.minutosAux + ":" + this.state.segundosAux)
    }).catch( err => {
      console.error(err.message);
    })
  }

  peticionPostIniciarCronometo = async () => {
    try {
      await axios.post('http://localhost:3010/api/start-cronometro', {tiempoEspera})
      .then(response => {
        console.log(response.data)
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  //Para correr cronometro localmente
  cronometro = async () => {
    this.setState(prevState => ({ segundos: prevState.segundos - 1 }))
    if (this.state.segundos === 0) {
      this.setState(prevState => ({ minutos: prevState.minutos - 1 }))
      this.setState({ segundos:59 })
    }

    if (this.state.segundos < 10) {
      this.setState({ segundosAux:"0" + this.state.segundos })
    } else {
      this.setState({ segundosAux: this.state.segundos })
    }

    if (this.state.minutos < 10) {
      this.setState({ minutosAux:"0" + this.state.minutos })
    } else {
      this.setState({ minutosAux: this.state.minutos })
    }

    if (this.state.horas < 10) {
      this.setState({ horasAux:"0" + this.state.horas })
    } else {
      this.setState({ horasAux: this.state.horas })
    }
  }

  componentDidMount() {
    this.intervalo = setInterval( () => {
      this.peticionGetCronometro();
      if ( this.state.minutos === 0 && this.state.segundos === 0) {
        clearInterval(this.intervalo);
      }
    }, 1000);

    if(cookies.get('_id') === "63c9826a54cfccba201d7686") {
      this.setState({ admin:true })
      //console.log(this.state.admin)
    }
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
      }}>
        <button className='btn btn-primary' hidden={!this.state.admin}
          onClick={()=>{this.peticionPostIniciarCronometo();this.peticionGetCronometro()}}>Iniciar Cronometro</button>
        <h1  style = {{
          color:"white",
          textAlign:"center"
        }}>{this.state.horasAux}:{this.state.minutosAux}:{this.state.segundosAux}</h1>
      </div>
    );
  }
}

export default Cronometro