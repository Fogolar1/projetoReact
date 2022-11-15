import { useState } from 'react';
import $ from 'jquery';
import TextBoxInput from './TextBoxInput';
import styles from '../../layout/css/FormUsuario.module.css'
import Usuario from './Usuario';
import { useNavigate } from 'react-router-dom';

function FormUsuario({action, botao}){
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const[retorno, setRetorno] = useState("")
    const[status, setStatus] = useState("")
    const erroClass = botao === "Cadastrar" ? styles.erroCadastro : styles.erro;
    const successClass = botao === "Cadastrar" ? styles.successCadastro : styles.success;
    const navigate = useNavigate();

    function login(idUsuario){
        Usuario.setNome({usuario});
        console.log(idUsuario);
        Usuario.setId(idUsuario);
        navigate('/clientes');
    }

    function verificaErro(form){
        
        let campos = form.serialize().split("&");
        
        let verificaErro = "";

        campos.some((campo) =>{
            let infoCampo = campo.split("=");
            let nomeDoCampo =  infoCampo[0].charAt(0).toUpperCase() + infoCampo[0].replace(/[0-9]/g, '').slice(1);
            if(!infoCampo[1]){
                setRetorno("Preencha o campo " + nomeDoCampo + " para continuar!");
                verificaErro = "Erro";               
            }
            return verificaErro==="Erro";
        });

        return verificaErro;
    }

    function enviarForm(e){

        e.preventDefault();
        const form = $(e.target);

        if(!verificaErro(form)){
            $.ajax({
                type : "POST",
                url: form.attr("action"),
                data: form.serialize(),
                success(data){
                    if(e.target.id === "Login"){
                        if(data === "login"){
                            login(data);
                        }else{
                            setRetorno("Usuário ou senha incorretos!");
                            setStatus("erro");
                        }
                    }else{
                        if(!Usuario.getNome()){
                            if(isNaN(data)){
                                setRetorno(data);
                                setStatus("erro");
                            }else{
                                login(data);
                            }
                        }else{
                            setRetorno(isNaN(data) ? data : "Usuário cadastrado com Sucesso");
                            setStatus(isNaN(data) ? "erro" : "success");
                        }
                    }
                    
                }
            })
        }
        
    }

    return(
        <>
            {retorno && (
                <p className={status==="success" ? successClass : erroClass}>{retorno}</p>
            ) }
            <form
            action={action}
            method="post"
            onSubmit={enviarForm}
            >
                <TextBoxInput id="usuario" conteudo="Usuário : " tipo="text" value={usuario} change={e => setUsuario(e.target.value)} />
                <TextBoxInput id="senha" conteudo="Senha : " tipo="password" value={senha} change={e => setSenha(e.target.value)} />
                <button className={botao==="Login" ? styles.login : styles.cadastro } type="submit">{botao}</button>
            </form>
        </>
       
    )
}
export default FormUsuario