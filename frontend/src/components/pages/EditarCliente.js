import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import $ from 'jquery'
import FormCliente from '../../layout/components/FormCliente';
import Usuario from '../../layout/components/Usuario'


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
        console.log(resultado);
    });
    
    return (
        <>
            {Usuario.getNome() ? (
                <>
                    {resultado && 
                        <FormCliente  cliente={resultado[0]}/>
                    } 
                </>
            ) : (
                <h1>Não tá logado</h1>
            )}
        </>
        
        
    )
}

export default EditarCliente