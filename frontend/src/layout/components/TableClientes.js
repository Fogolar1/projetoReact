import $ from 'jquery'
import { Link } from 'react-router-dom';
import styles from '../../layout/css/TableClientes.module.css'


function TableClientes({resultado}){
    const campos = ["Id","Nome" ,"Data de Nascimento", "CPF", "RG","Telefone", "Editar", "Excluir"];


    function excluir(e){
        if(window.confirm("Tem certeza que quer excluir o usuário?")){
            let idCliente= e.target.id;
            console.log(e.target.closest("tr"));
            let idTable = e.target.closest("tr").key;
                 
            $.ajax({
                url: 'http://localhost:8000/excluirCliente.php',
                type: 'POST',
                data : {id : idCliente},
                success : function(response){
                   console.log(response);
                   delete resultado[idTable];
                   window.location.reload(false);
                }
            })
        }
    }

    return(
        <table className={styles.tableWrapper}>
            <thead>
                <tr>
                    {campos.map((campo, index) => {
                        return(
                            <th key={index}>{campo}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {resultado.map((cliente, index) => {
                    return (
                        <tr key={index}>
                            <td >{cliente.id}</td>
                            <td >{cliente.nome}</td>
                            <td >{cliente.dataNascimento}</td>
                            <td >{cliente.cpf}</td>
                            <td >{cliente.rg}</td>
                            <td >{cliente.telefone}</td>
                            <td> <Link to="/editarCliente" state={{ id : cliente.id}}><button>Editar {cliente.id}</button></Link></td>
                            <td> <button id={cliente.id} onClick={excluir}>Excluir</button></td>
                        </tr>  
                    ) 
                })}
            </tbody>
            
        </table>
    )
}

export default TableClientes