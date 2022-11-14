import TextBoxInput from "./TextBoxInput"
import {useState} from 'react'
import $ from 'jquery'

function FormEnderecos({index}){
    const[logradouro, setLogradouro] = useState("")
    const[bairro, setBairro] = useState("")
    const[cidade, setCidade] = useState("")
    const[numero, setNumero] = useState("")
    const[adicionar, setAdicionar] = useState("");
    const[esconder, setEsconder] = useState("");
    const lastIndex = index - 1;

    function novoEndereco(){
        setEsconder("hidden");
        if(index !== 0){
            $("[id=" + lastIndex +"]").hide();
        }
      
        setAdicionar(<FormEnderecos index={index + 1} />)
    }

    function removeEndereco(){
        if(index !== 0){
            $("[id=" + lastIndex +"]").show();
        }
        setEsconder("");
        setAdicionar("");
    }


    return(
        <>
            <hr/>
            <h2>Novo Endereço</h2>
            <TextBoxInput id={"logradouro" + index} conteudo="Logradouro :" tipo="text" value={logradouro} change={e => setLogradouro(e.target.value)} />
            <TextBoxInput id={"numero" + index} conteudo="Numero :" tipo="text" value={numero} change={e => setNumero(e.target.value)} />
            <TextBoxInput id={"bairro" + index} conteudo="Bairro :" tipo="text" value={bairro} change={e => setBairro(e.target.value)} />
            <TextBoxInput id={"cidade" + index} conteudo="Cidade :" tipo="text" value={cidade} change={e => setCidade(e.target.value)} />
            <button onClick={novoEndereco} type="button" hidden={esconder}>Adicionar</button>
            {adicionar}
            {adicionar  && (
                <button id={index} onClick={removeEndereco} type="button">Remover</button>
            )}
           
        </>
    )
        
}

export default FormEnderecos