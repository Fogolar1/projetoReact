import { useState } from 'react';
import $ from 'jquery';
import TextBoxInput from './TextBoxInput';

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
                <TextBoxInput id="usuario" conteudo="Usuário :" tipo="text" value={usuario} change={e => setUsuario(e.target.value)} />
                <TextBoxInput id="senha" conteudo="Senha :" tipo="password" value={senha} change={e => setSenha(e.target.value)} />
                <button type="submit">{botao}</button>
            </form>
    )
}
export default FormUsuario