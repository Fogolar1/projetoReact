import TextBoxInput from './TextBoxInput'
import FormEnderecos from './FormEnderecos'
import {useState} from 'react'
import $ from 'jquery'
import styles from '../css/FormCliente.module.css'
import Usuario from './Usuario'

function FormCliente({cliente}){

    const[nome, setNome] = useState(cliente ? cliente.nome : "")
    const[dataNasc, setDataNasc] = useState(cliente ? cliente.dataNascimento : "")
    const[cpf, setCPF] = useState(cliente ? cliente.cpf : "")
    const[rg, setRG] = useState(cliente ? cliente.rg : "")
    const[status, setStatus] = useState("")
    const[telefone, setTelefone] = useState(cliente ? cliente.telefone : "")
    const enderecos = cliente ? cliente.enderecos : "";
    const[retorno, setRetorno] = useState("");
    const[reset, setReset] = useState(0);

    function mascaraTelefone(valor){
        valor = valor.replace(/\D/g,'');
        valor = valor.replace(/(\d{2})(\d)/,"($1) $2");
        valor = valor.replace(/(\d)(\d{5})$/,"$1-$2");
        if(valor.length > 15){
            valor = valor.substring(0, 15);
        }
        setTelefone(valor);
    }

    function mascaraCPF(valor){
        valor=valor.replace(/\D/g,"")
        valor=valor.replace(/(\d{3})(\d)/,"$1.$2")
        valor=valor.replace(/(\d{3})(\d)/,"$1.$2")
        valor=valor.replace(/(\d{3})(\d{1,3})$/,"$1-$2")
        if(valor.length > 14){
            valor = valor.substring(0, 14);
        }
        setCPF(valor);
    }

    function mascaraRG(valor){
        valor=valor.replace(/\D/g,"")
        if(valor.length > 9){
            valor = valor.substring(0, 9);
        }
        setRG(valor);
    }

    function mascaraNome(valor){
        if(valor.length > 30){
            valor = valor.substring(0, 30);
        }
        setNome(valor);
    }

    function validaCPF(cpf) {
        cpf = cpf.replace("-", "").replaceAll(".","");
        
        var Soma;
        var Resto;
        Soma = 0;
        if (cpf === "00000000000") return false;
    
        for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(cpf.substring(9, 10)) ) return false;
    
        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
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
                setStatus("erro");           
            }else{
                if((infoCampo[0].startsWith("telefone") && infoCampo[1].length < 15) || (infoCampo[0].startsWith("cpf") && (infoCampo[1].length < 14 || !validaCPF(infoCampo[1])))){
                    setRetorno("Preencha o campo " + nomeDoCampo + " corretamente para continuar!");
                    setStatus("erro");
                    verificaErro = "Erro";
                }

            }
            return verificaErro==="Erro";
        });

        return verificaErro;
    }

    function limparCampos(){
        setNome("");
        setDataNasc("");
        setRG("");
        setTelefone("");
        setCPF("");
        
    }
    
    function enviarForm(e){
        e.preventDefault();
        
        const form = $(e.target);
       if(!verificaErro(form)){       
            
            $.ajax({
                type : "POST",
                url: form.attr("action"),
                data: form.serialize(),
                success(){
                    setRetorno("Usuário cadastrado com sucesso!");
                    setStatus("success");
                    if(!cliente){
                        setReset(prev => prev + 1);
                        limparCampos();
                    }
                }
            })
        }
        setReset(0);
        
    }

    return(
        <>
            <form 
            action="http://localhost:8000/cadastrarCliente.php"
            method="post"
            onSubmit={enviarForm}
            className={styles.formList}
            >
                <hr className={styles.line}/>
                {retorno && (
                    <p className={status==="success" ? styles.success : styles.erro}>{retorno}</p>
                )}
                {cliente && (<input id="idCliente" name="idCliente" type="text" hidden value={cliente.id} readOnly></input>)}
                {<input id="idUsuario" name="idUsuario" type="text" hidden value={Usuario.getId()} readOnly></input>}
                <div className={styles.inputWrapper}>
                    <TextBoxInput id="nome" conteudo="Nome : " tipo="text" value={nome} change={e => mascaraNome(e.target.value)} />
                    <TextBoxInput id="dataNasc" conteudo="Data de Nascimento : " tipo="date" value={dataNasc} change={e => setDataNasc(e.target.value)} />
                </div>
                <div className={styles.inputWrapper}>
                    <TextBoxInput id="cpf" conteudo="CPF : " tipo="text" value={cpf} change={e => mascaraCPF(e.target.value)} />
                    <TextBoxInput id="rg" conteudo="RG : " tipo="text" value={rg} change={e => mascaraRG(e.target.value)} />
                </div> 
                <TextBoxInput id="telefone" conteudo="Telefone : " tipo="text" value={telefone} change={e => mascaraTelefone(e.target.value)} /> 
                <FormEnderecos enderecos={enderecos} index={0} reset={reset} />  
                <button type="submit" className={styles.botaoEnviar}>Enviar</button>
            </form>
        </>
    )
}

export default FormCliente