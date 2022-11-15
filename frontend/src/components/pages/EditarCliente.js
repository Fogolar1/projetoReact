import { useLocation, Navigate } from 'react-router-dom'
import { useState } from 'react'
import $ from 'jquery'
import FormCliente from '../../layout/components/FormCliente';
import Usuario from '../../layout/components/Usuario';
import NavBar from '../../layout/components/NavBar';
import styles from '../../layout/css/EditarCliente.module.css'

function EditarCliente(){
    const location = useLocation();
    const{id} = location.state;

    const[resultado, setResultado] = useState("")
    
    $(function(){
        if(!resultado){
            console.log(id);
            $.ajax({
                url: 'http://localhost:8000/listarClientes.php?id=' + id,
                type: 'GET',
                dataType: 'json',
                success : function(response){
                    setResultado(response);
                }
            })
        }
        console.log(resultado[0]);
    });
    
    return (
        <>
            {Usuario.getNome() ? (
                <>
                    <NavBar />
                    <h1 className={styles.titulo}>Editar Cliente</h1>
                    {resultado && 
                        <FormCliente  cliente={resultado[0]}/>
                    } 
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
        
        
    )
}

export default EditarCliente