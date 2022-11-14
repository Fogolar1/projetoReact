import TextBoxInput from './TextBoxInput'
import FormEnderecos from './FormEnderecos'
import {useState} from 'react'
import $ from 'jquery'


function FormCliente({cliente}){

    const[nome, setNome] = useState(cliente ? cliente.nome : "")
    const[dataNasc, setDataNasc] = useState(cliente ? cliente.dataNascimento : "")
    const[cpf, setCPF] = useState(cliente ? cliente.cpf : "")
    const[rg, setRG] = useState(cliente ? cliente.rg : "")
    const[telefone, setTelefone] = useState(cliente ? cliente.telefone : "")
    const[resultado, setResultado] = useState("")
    const enderecos = cliente ? cliente.enderecos : "";
    const[erro, setErro] = useState("");

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

    function enviarForm(e){
        e.preventDefault();
        const form = $(e.target);

        let campos = form.serialize().split("&");
        
        let verificaErro = "";

        campos.some((campo) =>{
            let infoCampo = campo.split("=");
            let nomeDoCampo =  infoCampo[0].charAt(0).toUpperCase() + infoCampo[0].replace(/[0-9]/g, '').slice(1);
            if(!infoCampo[1]){
                setErro("Preencha o campo " + nomeDoCampo + " para continuar");
                verificaErro = "Erro";               
            }else{
                if((infoCampo[0].startsWith("telefone") && infoCampo[1].length < 15) || (infoCampo[0].startsWith("cpf") && infoCampo[1].length < 14)){
                    setErro("Preencha o campo " + nomeDoCampo + " corretamente para continuar");
                    verificaErro = "Erro";
                }
            }
            return verificaErro==="Erro";
        });


       if(!verificaErro){       
            setErro("");
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
        
    }

    return(
        <>
            <form 
            action="http://localhost:8000/cadastrarCliente.php"
            method="post"
            onSubmit={enviarForm}
            >
                {erro}
                {resultado}
                {cliente && (<input id="idCliente" name="idCliente" type="text" hidden value={cliente.id} readOnly></input>)}
                <TextBoxInput id="nome" conteudo="Nome :" tipo="text" value={nome} change={e => setNome(e.target.value)} />
                <TextBoxInput id="dataNasc" conteudo="Data de Nascimento :" tipo="date" value={dataNasc} change={e => setDataNasc(e.target.value)} />
                <TextBoxInput id="cpf" conteudo="CPF :" tipo="text" value={cpf} change={e => mascaraCPF(e.target.value)} />
                <TextBoxInput id="rg" conteudo="RG :" tipo="text" value={rg} change={e => setRG(e.target.value)} />
                <TextBoxInput id="telefone" conteudo="Telefone :" tipo="text" value={telefone} change={e => mascaraTelefone(e.target.value)} /> 
                <FormEnderecos enderecos={enderecos} index={0} />  
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormCliente