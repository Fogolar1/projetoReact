var Usuario = (function() {
    var getNome = function() {
       let object =  JSON.parse(localStorage.getItem('sessionName'));  
       return object ? object.usuario : "";
    };
  
    var setNome = function(nomeRecebido) {
      localStorage.setItem('sessionName', JSON.stringify(nomeRecebido));     
    };
  
    return {
      getNome: getNome,
      setNome: setNome
    }
  
  })();
  
  export default Usuario;