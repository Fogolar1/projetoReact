import { useState } from 'react';
import $ from 'jquery';

function FormUsuario({action, botao}){
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const[resultado, setResultado] = useState("")

    function enviarForm(e){
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type : "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data){
                setResultado(data);
                console.log({resultado});
            }
        })
    }

    return(
        <form 
            action={action}
            method="post"
            onSubmit={enviarForm}
            >
                <label htmlFor="usuario">Usuário :</label>
                <input id="usuario" name="usuario" type="text" value={usuario} onChange={e => setUsuario(e.target.value)} />
                <label htmlFor="senha">Senha :</label>
                <input id="senha" name="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                <button type="submit">{botao}</button>
            </form>
    )
}
export default FormUsuario