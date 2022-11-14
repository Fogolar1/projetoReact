import TextBoxInput from "./TextBoxInput"
import {useState} from 'react'
import $ from 'jquery'

function FormEnderecos({index, enderecos}){
    const[logradouro, setLogradouro] = useState(enderecos ? enderecos[index].logradouro : "")
    const[bairro, setBairro] = useState(enderecos ? enderecos[index].bairro : "")
    const[cidade, setCidade] = useState(enderecos ? enderecos[index].cidade : "")
    const[numero, setNumero] = useState(enderecos ? enderecos[index].numero : "")
    const[adicionar, setAdicionar] = useState("")
    const[esconder, setEsconder] = useState("")
    const lastIndex = index - 1;

    $(function(){
        if(enderecos && enderecos[index+1]){
            if(index !== 0){
                $("[id=" + lastIndex +"]").hide();
            } 
            setAdicionar(<FormEnderecos index={index + 1} enderecos={enderecos} />)
            setEsconder("hidden");
        }
    });

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
        if(enderecos[index + 1]){
            enderecos.pop();
        }
    }


    return(
        <div>
            <hr/>
            <h2>Novo Endereço</h2>
            {enderecos && (<input id={"id" + index} name={"id" + index} type="text" hidden value={enderecos[index].id} readOnly></input>)}
            <TextBoxInput id={"logradouro" + index} conteudo="Logradouro :" tipo="text" value={logradouro} change={e => setLogradouro(e.target.value)} />
            <TextBoxInput id={"numero" + index} conteudo="Numero :" tipo="text" value={numero} change={e => setNumero(e.target.value)} />
            <TextBoxInput id={"bairro" + index} conteudo="Bairro :" tipo="text" value={bairro} change={e => setBairro(e.target.value)} />
            <TextBoxInput id={"cidade" + index} conteudo="Cidade :" tipo="text" value={cidade} change={e => setCidade(e.target.value)} />
            <button onClick={novoEndereco} type="button" hidden={esconder}>Adicionar</button>
            {adicionar}
            {adicionar  && (
                <button id={index} onClick={removeEndereco} type="button">Remover</button>
            )}
        </div>
    )
        
}

export default FormEnderecos