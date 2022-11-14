import TextBoxInput from './TextBoxInput'
import FormEnderecos from './FormEnderecos'
import {useState} from 'react'
import $ from 'jquery'


function FormCliente({cliente}){

    const[nome, setNome] = useState("")
    const[dataNasc, setDataNasc] = useState("")
    const[cpf, setCPF] = useState("")
    const[rg, setRG] = useState("")
    const[telefone, setTelefone] = useState("")
    const[resultado, setResultado] = useState("")

    $(function(){
        if(cliente){
            setNome(cliente.nome);
            setDataNasc(cliente.DataNascimento);
            setCPF(cliente.cpf);
            setRG(cliente.rg);
            setTelefone(cliente.telefone);
        }
    });

        
    

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
        <>
            <form 
            action="http://localhost:8000/cadastrarCliente.php"
            method="post"
            onSubmit={enviarForm}
            >
                {cliente && (<input id="id" name="id" type="text" hidden value={cliente.id}></input>)}
                <TextBoxInput id="nome" conteudo="Nome :" tipo="text" value={nome} change={e => setNome(e.target.value)} />
                <TextBoxInput id="dataNasc" conteudo="Data de Nascimento :" tipo="date" value={dataNasc} change={e => setDataNasc(e.target.value)} />
                <TextBoxInput id="cpf" conteudo="CPF :" tipo="text" value={cpf} change={e => setCPF(e.target.value)} />
                <TextBoxInput id="rg" conteudo="RG :" tipo="text" value={rg} change={e => setRG(e.target.value)} />
                <TextBoxInput id="telefone" conteudo="Telefone :" tipo="text" value={telefone} change={e => setTelefone(e.target.value)} />
                <FormEnderecos index={0}/>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormCliente