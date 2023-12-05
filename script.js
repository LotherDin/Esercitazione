function mostraMessaggio() {
    console.log("Hai cliccato sul bottone!");
  }
  
  // Aggiungi un gestore di eventi al bottone
  document.getElementById("myButton").addEventListener("click", mostraMessaggio);