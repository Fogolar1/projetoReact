import $ from 'jquery'
import { Link } from 'react-router-dom';
import styles from '../../layout/css/TableClientes.module.css'
import {BsFillPencilFill} from 'react-icons/bs'

function TableClientes({resultado}){
    const campos = ["Id","Nome" ,"Data de Nascimento", "CPF", "RG","Telefone","Endereços", "Editar", "Excluir"];

    function excluir(e){
        if(window.confirm("Tem certeza que quer excluir o usuário?")){
            let idCliente= $(e.target).parent().attr("id");
            $.ajax({
                url: 'http://localhost:8000/excluirCliente.php',
                type: 'POST',
                data : {id : idCliente},
                success : function(){
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
                            <td>
                            {cliente.enderecos.map((endereco, index) => {
                                return (
                                    <>
                                        <p key={index}>{endereco.logradouro}, número {endereco.numero}, {endereco.bairro}, {endereco.cidade}</p>
                                        <br/>
                                    </>
                                    
                                )
                            })}
                            </td>
                            
                            <td> <Link to="/editarCliente" state={{ id : cliente.id}}><button className={styles.transparent}><BsFillPencilFill/></button></Link></td>
                            <td> <button id={cliente.id} onClick={excluir} className={styles.transparent}><p className={styles.excluir}>X</p></button></td>
                        </tr>  
                    ) 
                })}
            </tbody>
            
        </table>
    )
}

export default TableClientes