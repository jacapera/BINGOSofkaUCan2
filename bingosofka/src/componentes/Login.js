import React, { Component } from 'react'
import '../estilos/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Cookies from 'universal-cookie'

const urlParticipantes = process.env.REACT_APP_URL_PARTICIPANTES
const urlJugador = process.env.REACT_APP_URL_SESIONES_LINEA

export const cookies = new Cookies();

class PageLogin extends Component {
  state={
    formSesion:{
      username: '',
      password: ''
    },

    //arreglo que almacena jugadores que se logean en el juego
    data: [],
  }

  intervalo = 0;

  handleChange=async e=>{
    await this.setState({
      formSesion:{
        ...this.state.formSesion,
        [e.target.name]:e.target.value
      }
    })
    //console.log(this.state.form)
  }

  iniciarSesion=async()=>{
    let name=this.state.formSesion.username
    let pwd=this.state.formSesion.password
    if(name.length <= 0 || pwd.length <= 0){
      alert('Se requieren todos los datos')
      return "Datos Vacios"
    }
    await axios.get( urlParticipantes + "/" + name + "/" + pwd )
    .then(response=>{
      //console.log(response.data)
      return response.data
    }).then(response=>{
      if(response.length>0){
        var resp=response[0] // para evitar llamados tan largos con corchetes
        cookies.set("_id",resp._id,{path:"/"})/// el path es para que se puedan acceder de cualquier pagina
        cookies.set("usuario",resp.usuario,{path:"/"})
        cookies.set("password",resp.password,{path:"/"})
        alert("Bienvenid@ " + resp.usuario)
        window.location.href='./PageInicio'
      }else{
        alert("Verificar Usario y/o Clave")
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  //funcion que se ejecuta con un setInterval para ver que jugador inicia sesion, para luego pasarlo a la sala de juego
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

  componentDidMount() {
    this.intervalo = setInterval(() => {
      this.peticionGetSesionOnLine()
    },1500)
  }

  render() {
    return(
      <div className="containerPrincipal">

        <div className="containerSecundario">
          <h1>Iniciar Sesion</h1>
          <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.handleChange}
              />
              <br />
              <label>Contraseña: </label>
              <br />
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
              />
              <br />
              <button className="btn btn-primary" onClick={() => {this.iniciarSesion()}}>Enviar</button>
          </div>
        </div>

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

export default PageLogin