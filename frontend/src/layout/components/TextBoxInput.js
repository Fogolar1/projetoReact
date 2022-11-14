import styles from '../../layout/css/TextBoxInput.module.css'

function TextBoxInput({id, tipo, conteudo, change, value}){
    return(
        <div className={styles.textBoxWrapper}>
            <label htmlFor={id}>{conteudo}</label>
            <input type={tipo} name={id} id={id} onChange={change} value={value}/>
        </div>
    )
}

export default TextBoxInput