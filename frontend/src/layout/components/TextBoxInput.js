function TextBoxInput({id, tipo, conteudo, change, value}){
    return(
        <>
            <label htmlFor={id}>{conteudo}</label>
            <input type={tipo} name={id} id={id} onChange={change} value={value}/>
        </>
    )
}

export default TextBoxInput