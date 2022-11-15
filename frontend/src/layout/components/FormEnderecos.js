import TextBoxInput from "./TextBoxInput"
import {useState} from 'react'
import $ from 'jquery'
import styles from '../css/FormEnderecos.module.css'
import {useEffect} from 'react'

function FormEnderecos({index, enderecos, reset}){
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

    function mascaraNumero(valor){
        valor=valor.replace(/\D/g,"")
        if(valor.length > 5){
            valor = valor.substring(0, 5);
        }
        setNumero(valor);
    }

    function mascaraTexto(valor){
        if(valor.length > 30){
            valor = valor.substring(0, 30)
        }
        return valor;
    }

    useEffect(() => {
        limparCampos(); 
      }, [reset]);

    function limparCampos(){
        setBairro("");
        setNumero("");
        setLogradouro("");
        setCidade("");
        setAdicionar("");
        setEsconder("");
    }

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
            <hr className={styles.line}/>
            <h2>Novo Endereço</h2>
            {enderecos && (<input id={"id" + index} name={"id" + index} type="text" hidden value={enderecos[index].id} readOnly></input>)}
            <div className={styles.inputWrapper}>
                <TextBoxInput id={"logradouro" + index} conteudo="Logradouro : " tipo="text" value={logradouro} 
                change={e => setLogradouro(mascaraTexto(e.target.value))} />
                <TextBoxInput id={"numero" + index} conteudo="Número : " tipo="text" value={numero} change={e => mascaraNumero(e.target.value)} />
            </div>
            <div className={styles.inputWrapper}>
                <TextBoxInput id={"bairro" + index} conteudo="Bairro : " tipo="text" value={bairro} change={e => setBairro(mascaraTexto(e.target.value))} />
                <TextBoxInput id={"cidade" + index} conteudo="Cidade : " tipo="text" value={cidade} change={e => setCidade(mascaraTexto(e.target.value))} />
            </div>
            <div>
                <button onClick={novoEndereco} type="button" hidden={esconder} className={styles.botaoAdicionar}>Adicionar</button>
                {adicionar}
                {adicionar  && (
                    <>
                        <button id={index} onClick={removeEndereco} type="button" className={styles.botaoRemover}>Remover</button>
                    </>
                )} 
            </div>
            
        </div>
    )
        
}

export default FormEnderecos