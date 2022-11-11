import TextBoxInput from './TextBoxInput'
import {useState} from 'react'
import $ from 'jquery'


function FormCliente({action}){
    const[nome, setNome] = useState("")
    const[dataNasc, setDataNasc] = useState("")
    const[cpf, setCPF] = useState("")
    const[rg, setRG] = useState("")
    const[telefone, setTelefone] = useState("")
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
        <>
            <form 
            action={action}
            method="post"
            onSubmit={enviarForm}
            >
                <TextBoxInput id="nome" conteudo="Nome :" tipo="text" value={nome} change={e => setNome(e.target.value)} />
                <TextBoxInput id="dataNasc" conteudo="Data de Nascimento :" tipo="date" value={dataNasc} change={e => setDataNasc(e.target.value)} />
                <TextBoxInput id="cpf" conteudo="CPF :" tipo="text" value={cpf} change={e => setCPF(e.target.value)} />
                <TextBoxInput id="rg" conteudo="RG :" tipo="text" value={rg} change={e => setRG(e.target.value)} />
                <TextBoxInput id="telefone" conteudo="Telefone :" tipo="text" value={telefone} change={e => setTelefone(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default FormCliente