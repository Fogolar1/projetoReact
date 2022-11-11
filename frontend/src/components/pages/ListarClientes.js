import { useState } from 'react'
import $ from 'jquery'

function ListarClientes(){

    const[resultado, setResultado] = useState("");

    

    $(document).ready(function(){
        $.ajax({
            url: 'localhost:8000/listarClientes.php',
            type: 'GET',
            dataType: 'jsonp',
            contentType: 'application/javascript',
            headers : {'Access-Control-Allow-Origin' : 'http://localhost:3001'},
            crossDomain : true,
            success : function(response){
                console.log(response);
                setResultado(response);
            }
        })
    });

    return(
        <>
            <h1>Clientes cadastrados</h1>
            <h2>{resultado}</h2>
            {resultado && 
                resultado.map((resultado, index) => {
                    return <p key={resultado.id}>{resultado.nome}</p>
                })
            }

        </>
    )

}

export default ListarClientes