import React, { Component } from 'react'
import '../estilos/jugadores.css'

class Jugadores extends Component {

  state = {
    datos:[],
  }

  componentDidUpdate(prevProps){
    if (prevProps.jugadores !== this.props.jugadores) {
      this.setState({ datos:this.props.jugadores})
    }
  }

  render(){

    return (
      <div className='divPrincipal'>
        <h2>Jugadores de Esta Sesion</h2>
        <div >
          <table className="table ">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datos.map(evento => {
                return(
                  <tr key={evento.idJugador}>
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

export default Jugadores;