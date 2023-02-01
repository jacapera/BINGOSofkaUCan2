import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const urlParticipantes = process.env.REACT_APP_URL_PARTICIPANTES
//const fieldId = process.env.REACT_APP_FIELD_ID_USUARIO


class  PageUsuarios extends Component {
  state = {
    data:[],
    modalInsertar:false,
    modalEliminar:false,
    tipoModal:'',
    form:{
      _id:'',
      usuario:'',
      password:'',
  }
}

//--------CRUD(create, read, update, delete)-------

//GET
  peticionGet = () => {
    axios.get( urlParticipantes ).then(response => {
     //console.log(response.data);
      this.setState({
        data: response.data
      })
    }).catch(err => {
      console.log(err.message);
    })
  }

//POST
  peticionPost = async () => {
    //delete this.state.form.usu_id
    delete this.state.form._id
    await axios.post( urlParticipantes,this.state.form)
    .then(response => {
      this.modalInsertar(); /// para cerrar la modal
      this.peticionGet(); /// para actualizar el listado
    }).catch(err => {
      console.log(err.message);
    })
  }

//PUT
  peticionPut = () => {
    axios.put( urlParticipantes +  '/' + this.state.form._id, this.state.form)
    .then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(err => {
      console.error(err.message);
    })
  }

  //DELETE
  peticionDelete = () => {
    axios.delete( urlParticipantes + '/' + this.state.form._id)
    .then(response => {
      this.modalEliminar();
      this.peticionGet();
    }).catch(err => {
      console.error(err.message);
    })
  }
//---------Fin del CRUD--------------------------


  modalInsertar = () => {
    this.setState({
      modalInsertar: !this.state.modalInsertar
    })
  }

  modalEliminar = () => {
    this.setState({
      modalEliminar: !this.state.modalEliminar
    })
  }

  handleChange = async e => {  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
    e.persist();           /// y por eso debemos especificar persistencia
    await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
      form:{
        ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
        [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
      }
    });
    //console.log(this.state.form);  // probar por consola lo que se guarda
  }

  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        _id: usuario._id,
        usuario: usuario.usuario,
        password: usuario.password
      }
    })
  }

  componentDidMount(){
  this.peticionGet();
  }

  render(){
    const form = this.state.form
    return (
      <div className="App">
        <br /><br /><br />
        <button
          className="btn btn-success"
          onClick = { () => {
            this.setState({form:null, tipoModal:'insertar'});
            this.modalInsertar()
          }}>Agregar Usuario
        </button>
        <br /><br />
          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>USUARIO</th>
                <th>PASSWORD</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(usuarios=> {
                  return (
                    <tr key={usuarios._id}>
                      <td>{usuarios._id}</td>
                      <td>{usuarios.usuario}</td>
                      <td>{usuarios.password}</td>
                      <td>
                        {usuarios.usu_acciones}
                        <button className='btn btn-primary' onClick={()=>{this.seleccionarUsuario(usuarios); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        {"  "}
                        <button className='btn btn-danger' onClick={()=>{this.seleccionarUsuario(usuarios); this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{display:'block'}}>

            </ModalHeader>
            <ModalBody>
              <label htmlFor="_id">Id</label>
              <input
                className="form-control" type="text"
                name="_id"
                readOnly onChange={this.handleChange} value = {form?form._id:this.state.data.length+1}></input><br />
              <label htmlFor="usuario">Usuario</label>
              <input className='form-control' type="text" name="usuario" onChange={this.handleChange} value = {form?form.usuario:''}></input><br />
              <label htmlFor='password'>Password</label>
              <input className='form-control' type="text" name="password" onChange={this.handleChange} value = {form?form.password:''}></input><br />
            </ModalBody>
            <ModalFooter>
              {
                this.state.tipoModal === 'insertar'?
                <button className='btn btn-success' onClick={() => this.peticionPost()}>Insertar</button>
                :<button className='btn btn-success' onClick={() => this.peticionPut()}>Modificar</button>
              }
              <button className='btn btn-danger' onClick={() => this.modalInsertar()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen = {this.state.modalEliminar}>
              <ModalBody>
                esta segur@ de eliminar este registro?
              </ModalBody>
              <ModalFooter>
                <button className='btn btn-danger' onClick={() => {this.peticionDelete()}}>Si</button>
                <button className='btn btn-primary' onClick={()=>{this.modalEliminar()}} >No</button>
              </ModalFooter>
          </Modal>
      </div>
    );
  }
}

export default PageUsuarios;
