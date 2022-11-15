var Usuario = (function() {
    var getNome = function() {
       let object =  JSON.parse(localStorage.getItem('sessionName'));  
       return object ? object.usuario : "";
    };
  
    var setNome = function(nomeRecebido) {
      localStorage.setItem('sessionName', JSON.stringify(nomeRecebido));     
    };

    var setId = function(idRecebido) {
      localStorage.setItem('sessionId', JSON.stringify(idRecebido));     
    };

    var getId = function() {
      let object =  JSON.parse(localStorage.getItem('sessionId'));  
       return object ? object : ""; 
    };

    return {
      getNome: getNome,
      setNome: setNome,
      getId : getId,
      setId : setId
    }
  
  })();
  
  export default Usuario;