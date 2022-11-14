import { useState } from 'react'
import $ from 'jquery'
import TableClientes from '../../layout/components/TableClientes'
import styles from '../../layout/css/TableClientes.module.css'
import Usuario from '../../layout/components/Usuario'

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
        console.log(Usuario.getNome());
    });



    return(
        <>
            {Usuario.getNome() ? (
                <>
            <h1 className={styles.titulo}>Clientes cadastrados</h1>
            <br/>
            {resultado && <TableClientes resultado={resultado}/>}
                </>
             ) : ( 
                <h1>Não tá logado</h1>
            )}
        </>

       
    )

}

export default ListarClientes