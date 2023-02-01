import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import '../estilos/menuInicial.css'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Cronometro from './Cronometro'
import axios from "axios";
//import {cookies} from './Login'

const cookies = new Cookies();
const jugadorId = cookies.get('_id')
const urlSesionOne = process.env.REACT_APP_URL_SESIONES_ONESESION;
const urlSesiones = process.env.REACT_APP_URL_SESIONES

class MenuInicial extends Component {

  state={
    estaLoguin:false,
    admin:false,
    idSesion:'',
    verJuego:false,
    cronometro:[],
    segundos:'',
    minutos:''
  }

  intervalo = 0;

  /*
   * solicita id de la sesion y se elimina jugador de la sesion mediante la ejecución de un callback "quitarJugadorSesion"
   */
  peticionGetIdSesion = async () => {
    try {
      await axios.get(urlSesionOne)
      .then( response => {
      //en esta linea aseguramos se ejecute la peticion DELETE y pueda contar con el parametro idSesion en su URL
      this.setState({ idSesion:response.data.oneSesion._id}, () => { this.quitarJugadorSesion()})
      //console.log(response.data)
      console.log(this.state.idSesion)
    })
    } catch (err) {
      console.error(err);
    }
  }

  quitarJugadorSesion = ()=>{
    axios.delete( urlSesiones
      + '/'+ this.state.idSesion + '/' + jugadorId)
    .then(response => {
      console.log(response.data);
    }).catch( err => {
      console.error(err.message);
    });
  }

  componentDidMount(){
    if(cookies.get("usuario")){
      this.setState({ estaLoguin:true })
    }else{
      this.setState({ estaLoguin:false })
      // window.location.href="./" /// redirigir al inicio
    }
    if(cookies.get('_id') === "63c9826a54cfccba201d7686") {
      this.setState({ admin:true })
      //console.log(this.state.admin)
    }
  }

  async cerrarSesion(){
    await this.peticionGetIdSesion();
    cookies.remove("_id",{path:"/"})
    cookies.remove("usuario",{path:"/"})
    cookies.remove("password",{path:"/"})
    window.location.href="./Login"
    this.setState({estaLoguin:false})
  }

render() {
  return (
    <div className='divPrincipalMenuInicial'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div>
            <Link className="navbar-brand" to='/' >
              <img src='https://img.freepik.com/vector-premium/bolas-juego-loteria-bingo-cartones-loteria-numeros-suerte_8071-2352.jpg?w=740' width={120} alt="Bingo" />
            </Link><h5 style = {{color:'white'}}>Bingo SofkaU</h5>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mx-auto">

              <li className="nav-item" hidden={!this.state.estaLoguin}>
                <Link className="nav-link" aria-current="page" to='/PageInicio'><h4>Inicio</h4></Link>
              </li>
              <li className="nav-item" hidden={this.state.estaLoguin}>
                <Link className="nav-link" aria-current="page" to='/Login'><h4>Iniciar Sesión</h4></Link>
              </li>
              <li className="nav-item" hidden={this.state.estaLoguin}>
                <Link className="nav-link" aria-current="page" to='/Registrarse'><h4>Registrarse</h4></Link>
              </li>
              <li className="nav-item" hidden={!this.state.admin}>
                <Link className="nav-link" aria-current="page" to='/PageJuego'><h4>Juego</h4></Link>
              </li>
              <li className="nav-item" hidden={!this.state.admin}>
                <Link className="nav-link" aria-current="page" to='/PageUsuarios'><h4>Usuarios</h4></Link>
              </li>
              <li className="nav-item" hidden={!this.state.estaLoguin}>
                <Link className="nav-link" onClick={()=>this.cerrarSesion()} to='/Login'><h4>Salir</h4></Link>
              </li>

            </ul>
          </div>
          <div hidden={!this.state.estaLoguin}>
            <h4 style = {{color:'white', textAlign:"center"}}>{cookies.get("usuario")}</h4>
            <h4 hidden={!this.state.admin} style = {{color:'white', textAlign:"center"}}>{cookies.get('_id')}</h4>
            <h4 style = {{color:'white', textAlign:"center"}}>Próximo juego en: </h4>
            <Cronometro />
          </div>
        </div>
      </nav>
    </div>
  );
}
}


export default MenuInicial;