var Usuario = (function() {
    var getNome = function() {
      return localStorage.getItem('sessionName');  
    };
  
    var setNome = function(nomeRecebido) {
      localStorage.setItem('sessionName', nomeRecebido);     
    };
  
    return {
      getNome: getNome,
      setNome: setNome
    }
  
  })();
  
  export default Usuario;