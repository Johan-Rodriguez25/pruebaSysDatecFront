import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./views/home/Home";

import RegistrarClase from "./views/registrarClase/RegistrarClase";
import RegistrosClase from "./views/registrosClase/RegistrosClase";
import EditarRegistrosClase from "./views/editarRegistrosClase/EditarRegistrosClase";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Clases</Link>
        </li>
        <li>
          <Link to="/registrosClase">Registros</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/registrarClase">
          <RegistrarClase />
        </Route>
        <Route path="/registrosClase">
          <RegistrosClase />
        </Route>
        <Route path="/editarRegistrosClase">
          <EditarRegistrosClase />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
