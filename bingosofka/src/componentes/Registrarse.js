import React, { Component } from 'react'
import '../estilos/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const urlParticipantes = process.env.REACT_APP_URL_PARTICIPANTES

class PageLogin extends Component {
  state={
    form:{
      usuario:'',
      password:'',
      estado:"OnLine"
    }
  }

  handleChange=async e=>{
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    })
    //console.log(this.state.form)
  }

  peticionPost = async (res) => {
    await axios.post( urlParticipantes, this.state.form )
    .then(response => {
      alert('jugador registrado exitosamente')
    }).catch(err => {
      console.log(err.message);
    })
    window.location.href = './Login';
  }

  render() {
    return(
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <h1>Registrarse</h1>
          <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usuario"
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
              <button className="btn btn-primary" onClick={() => this.peticionPost()}>Enviar</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PageLogin