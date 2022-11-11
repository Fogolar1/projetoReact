import FormCliente from '../../layout/components/FormCliente'


function CadastroClientes(){
    return(
        <>
            <FormCliente action="http://localhost:8000/cadastrarCliente.php" />
        </>
    )
}

export default CadastroClientes