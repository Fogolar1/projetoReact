import FormCliente from '../../layout/components/FormCliente'
import Usuario from '../../layout/components/Usuario'
import NavBar from '../../layout/components/NavBar'
import {Navigate} from 'react-router-dom'
import styles from '../../layout/css/CadastroCliente.module.css'

function CadastroClientes(){
    return(
        <>
            {Usuario.getNome() ? (
                <>
                    <NavBar />
                    <h1 className={styles.titulo}>Cadastrar Cliente</h1>
                    <FormCliente />
                </>
            ) : (
                <Navigate to="/" />
            )}
            
        </>
    )
}

export default CadastroClientes