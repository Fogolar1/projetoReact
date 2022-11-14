import FormCliente from '../../layout/components/FormCliente'
import Usuario from '../../layout/components/Usuario'

function CadastroClientes(){
    return(
        <>
            {Usuario.getNome() ? (
                <FormCliente />
            ) : (
                <h1>Não tá logado</h1>
            )}
            
        </>
    )
}

export default CadastroClientes