import {Link, useNavigate} from 'react-router-dom'
import Usuario from './Usuario'
import styles from '../css/NavBar.module.css'

function NavBar(){

    const navigate = useNavigate();

    function logOut(){
        Usuario.setNome("");
        navigate('/');
    }

    return(
        <>
            <nav className={styles.navbar}>
                <ul className={styles.ulWrap}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <p>Projeto React</p>
                        </li>
                        <li className={styles.item}>
                            <Link to="/cadastrarClientes">Cadastrar Clientes</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/clientes">Listar Clientes</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/cadastro">Cadastrar Usuário</Link>
                        </li>
                    </ul>
                    <li className={styles.usuario}>
                            {Usuario.getNome()}
                            <br/>
                            <button className={styles.transparent} onClick={logOut}>Logout</button>
                    </li>
                </ul>  
            </nav>
        </>
    )

}

export default NavBar