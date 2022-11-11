import  FormUsuario  from '../../layout/components/FormUsuario'

function Cadastro(){
    return(
        <>
            <h1>Cadastro</h1>
            <FormUsuario action="http://localhost:8000/cadastro.php" 
            botao="Cadastrar"
            />
        </>
        
    )
}

export default Cadastro

