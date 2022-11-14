import { useState } from 'react'
import $ from 'jquery'
import TableClientes from '../../layout/components/TableClientes'
import styles from '../../layout/css/ListarClientes.module.css'
import Usuario from '../../layout/components/Usuario'
import NavBar from '../../layout/components/NavBar'
import {Navigate} from 'react-router-dom'

function ListarClientes(){

    const[resultado, setResultado] = useState("");

    $(function(){
        if(!resultado){
            $.ajax({
                url: 'http://localhost:8000/listarClientes.php',
                type: 'get',
                dataType: 'json',
                success : function(response){
                    setResultado(response);
                }
            })
        }
    });



    return(
        <>
            {Usuario.getNome() ? (
                <>
            <NavBar />
            <h1 className={styles.titulo}>Clientes cadastrados</h1>
            <br/>
            {resultado && <TableClientes resultado={resultado}/>}
                </>
             ) : ( 
                <Navigate to="/" />
            )}
        </>

       
    )

}

export default ListarClientes