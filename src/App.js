import React, {Component} from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

/* const apiKey1 = "15604406-ef22fe9d807bace224d43b79f";
const apiKey2 = "15603947-038295202b5d36e5d1213a2d1"; */

class App extends Component{

  state = {
    termino:'',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'end')
  }

  paginaAnterior = () => {
      // read state
      let pagina = this.state.pagina;

      // if page is 1, do not go back

      if(pagina === 1) return null;

      // add 1 to the actual page
      pagina -= 1;

      // add state change
      this.setState({
        pagina
      }, () => {
        this.consultarApi();
        this.scroll();
      });
  }

  paginaSiguiente = () => {
      // read state
      let pagina = this.state.pagina;

      // add 1 to the actual page
      pagina += 1;

      // add state change
      this.setState({
        pagina
      }, () => {
        this.consultarApi();
        this.scroll();
      });
  }

  

  consultarApi = () => {

    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=15603947-038295202b5d36e5d1213a2d1&q=${termino}&per_page=30&page=${pagina}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes : resultado.hits}) )
    
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })   
  }

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
      <div className="row justify-content-center">
        <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
        />
      </div>
      </div>
    );
  }
}

export default App;
