import { Component } from "react"

/**
 * componente de React que muestra una balota y un número generados aleatoriamente.
 */
class Balotario extends Component {

  state = {
    numeroAux:0,
    balotaAux:'',
    listaBalotario:[]
  }

  intervalo = 0
  listaBalotasAux = []
  /**
   * función que genera balota y número aleatorios y los muestra en la consola.
   */
  balotario = () => {
    const balotas = ["B", "I", "N", "G", "O"]
    let validar = false
    let temporal = 0

    let randomIndex = Math.floor(Math.random() * 5)
    const balota = balotas[randomIndex]
    switch (balota) {
      case "B":
        temporal = Math.floor(Math.random()*15) + 1
        if (!this.listaBalotasAux.includes(balota + temporal)) {
          this.listaBalotasAux.push(balota + temporal)
          this.setState({
            numeroAux:temporal,
            balotaAux:balota,
          })
        }
        break;
      case "I":
        temporal = Math.floor(Math.random()*15) + 1 + 15
        if (!this.listaBalotasAux.includes(balota + temporal)) {
          this.listaBalotasAux.push(balota + temporal)
          this.setState({
            numeroAux:temporal,
            balotaAux:balota,
          })
        }
        break;
      case "N":
        temporal = Math.floor(Math.random()*15) + 1 + 30
        if (!this.listaBalotasAux.includes(balota + temporal)) {
          this.listaBalotasAux.push(balota + temporal)
          this.setState({
            numeroAux:temporal,
            balotaAux:balota,
          })
        }
        break;
      case "G":
        temporal = Math.floor(Math.random()*15) + 1 + 45
        if (!this.listaBalotasAux.includes(balota + temporal)) {
          this.listaBalotasAux.push(balota + temporal)
          this.setState({
            numeroAux:temporal,
            balotaAux:balota,
          })
        }
        break;
      case "O":
        temporal = Math.floor(Math.random()*15) + 1 + 60
        if (!this.listaBalotasAux.includes(balota + temporal)) {
          this.listaBalotasAux.push(balota + temporal)
          this.setState({
            numeroAux:temporal,
            balotaAux:balota,
          })
        }
        break;
    }
    console.log(balota + temporal)
    this.setState( prevState => ({
      //listBalotario: prevState.listBalotario.concat(balota+temporal)
      listaBalotario:this.listaBalotasAux
    }))
    console.log(this.state.listaBalotario)
  }

  componentDidMount() {
   // this.balotario()
  }

  componentWillUnmount(){
    //this.balotario()
  }


  render() {
    return (
      <div style={{
        width:'550px',
        border: '3px solid pink',
      }}>
        <h1>Balota: {this.state.balotaAux}{this.state.numeroAux}</h1>
        <button className='btn btn-primary' onClick={()=>this.balotario()}>Crear Balota</button>

        <div style={{
          Width:'100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          border: '3px solid green',
        }}>
          {
            this.state.listaBalotario.map((row, rowIndex) => (
              <h3 ked = {rowIndex}>{row}, </h3>
            ))
          }
        </div>
      </div>
    )
  }
}



export default Balotario