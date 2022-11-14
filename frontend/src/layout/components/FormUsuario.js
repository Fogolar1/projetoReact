import { useState } from 'react';
import $ from 'jquery';
import TextBoxInput from './TextBoxInput';
import styles from '../../layout/css/FormUsuario.module.css'
import Usuario from '../../layout/components/Usuario'

function FormUsuario({action, botao}){
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const[resultado, setResultado] = useState("")

    function login(){
        console.log({usuario});
        Usuario.setNome({usuario});
        console.log(Usuario.getNome());
    }


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
                login();
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
                <button className={styles.botao} type="submit">{botao}</button>
            </form>
    )
}
export default FormUsuario