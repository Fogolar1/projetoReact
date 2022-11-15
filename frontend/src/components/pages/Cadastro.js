import  FormUsuario  from '../../layout/components/FormUsuario'
import NavBar from '../../layout/components/NavBar'
import Usuario from '../../layout/components/Usuario'
import styles from '../../layout/css/Cadastro.module.css'
import { useNavigate } from 'react-router-dom'

function Cadastro(){
    const navigate = useNavigate();
    
    function retornar(){
        navigate("/")
    }

    return(
        <>
            {Usuario.getNome() && (
                <NavBar />
            )}
             <h1 className={styles.titulo}>Cadastro</h1>
            <div className={styles.cadastro}>
                <FormUsuario action="http://localhost:8000/cadastro.php" 
                botao="Cadastrar"
                />
            </div>
            {!Usuario.getNome() && (
                <button onClick={retornar} className={styles.voltar} >Voltar</button>
            )}
        </>
        
    )
}

export default Cadastro

