/**
 * Controle formulaire pour le nom et le numero de téléphone 
 */
function ControlUserForm(name,phone){
      // var regex = /^[a-zâäàéèùêëîïôöçñ]/;
      var regex = /([0-9"'@!?,.;:^$§%*µ$£¤=\}\{\)\(\]\#~&[+*\/\\|]+)/;//cherchera avec match si il trouve l'un de ces caractères
      var regex2 = /^[0|\+]{1}[3]{2}[6|7]{1}([0-9]{1}){8}$/;//format +33 : début de chaine on regarde si commence par un 0 et un +, suivi de 2 trois suivi de 7 chifrees de 0 à 9
      var regex3 = /^[0]{1}[6|7]{1}([0-9]{1}){8}$/;//format 06
      
      if(name === "" || phone === "") return "Champ(s) vide(s)";
            
      if(name.match(regex)) return "Mauvais format de nom";
      
      if(phone.match(regex2) === null && phone.match(regex3) === null)   return "Mauvais format de numéro de téléphone";  

      return "Ok";
}

/**
 * Controle formulaire des options
 */
function ControlOptionForm(text,hour){	
      var regex = /([@<>$§%*µ$£¤=\}\{\)\(\]\#~&[+*\/\\|]+)/; 
      var regex2 = /(\s+nom\s+)|([.|,|;|\s+]{1}nom[.|,|;|\s]{1})|(\s+nom\s*)$/; //mot non sépéré par des espacements ou précédé d'un caractere ou d'un espacement et en fin de chaine avec ou sans espacement à la fin
      var regex3 = /(nom[^0-9a-z])|(nom$)|(^nom)/g; //mot nom sans caractere ou en fin et dubut de chaine
      
      var tab = new Array();
      tab = text.match(regex3);
    
      if(text ==="") return "Champ vide";
                     
      else if(text.match(regex)) return "Caractère(s) interdit(s) dans le contenu";          
          
      else if(!text.match(regex2)) return "Mot 'nom' non présent";

      else if(tab.length>=2) return "Mot 'nom' présent plusieurs fois";

      var regex4 = /^[2]{1}[0-4]{1}[:][0-5]{1}[0-9]{1}|[0-1]{1}[0-9]{1}[:][0-5]{1}[0-9]{1}$/;
      tab = hour.match(regex4);
     
      if(hour === "") return "Champ vide";

      else if(!hour.match(regex4))  return "Mauvais format d'horaire : HH:mm'";

      else return "Ok";
}