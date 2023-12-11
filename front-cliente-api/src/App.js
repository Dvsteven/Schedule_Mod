import React, {Fragment} from "react";
//Routing para cada una de las rutas, Switch como contenedor de rutas
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

//layout imports
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/BNavegacion";

//Componentes
import Clientes from "./components/clientes/clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";
import Pedidos from "./components/pedidos/pedidos";
import Productos from "./components/productos/productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

function App() {
  return(
    <Router>
      <Fragment>
        <Header />
          <div classname="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Switch>
              <Route  exact path="/" component={Clientes} /> {/*Se crea la ruta de cada componente Route*/}

              <Route  exact path="/components/clientes/NuevoCliente" component={NuevoCliente} /> 

              <Route  exact path="/components/clientes/EditarCliente/:id" component={EditarCliente} /> 

              <Route  exact path="/components/pedidos/pedidos" component={Pedidos} />

              <Route  exact path="/components/productos/productos" component={Productos} />

              <Route  exact path="/components/productos/NuevoProducto" component={NuevoProducto} /> 

              <Route  exact path="/components/productos/EditarProducto/:id" component={EditarProducto} /> 

              </Switch>
            </main>
          </div>
      </Fragment>
    </Router>
  )
}
export default App;