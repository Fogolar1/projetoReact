import FormUsuario from '../../layout/components/FormUsuario'
import { Link } from 'react-router-dom'
import styles from '../../layout/css/Login.module.css' 

function Login(){
    return(
        <div className={styles.formLogin}>
            <div className={styles.loginWrapper}>
                <h1 className={styles.titulo}>Login</h1>
                <FormUsuario action="http://localhost:8000/login.php" 
                botao="Login"
                />
                <br/>
                <Link to="/cadastro">Não possui login? Clique aqui para realizar o cadastro </Link> 
            </div>
        </div>
    )
}

export default Login

