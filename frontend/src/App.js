import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Cadastro from './components/pages/Cadastro'
import CadastroClientes from './components/pages/CadastroClientes'
import ListarClientes from './components/pages/ListarClientes'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/clientes" element={<ListarClientes />}/>
        <Route path="/cadastrarClientes" element={<CadastroClientes />}/>
      </Routes>
    </Router>
  );
}

export default App;
