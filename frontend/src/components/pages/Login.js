import FormUsuario from '../../layout/FormUsuario'
import { Link } from 'react-router-dom'

function Login(){
    return(
        <>
            <h1>Login</h1>
            <FormUsuario action="http://localhost:8000/login.php" 
            botao="Login"
            />
            <Link to="/cadastro">Não possui login? Clique aqui para realizar o cadastro </Link> 
        </>
    )
}

export default Login

