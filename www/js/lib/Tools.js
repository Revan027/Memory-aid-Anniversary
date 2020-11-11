/**
 * Controle formulaire pour le nom et le numero de téléphone 
 */
function ControlUserForm(name,phone){
      // var regex = /^[a-zâäàéèùêëîïôöçñ]/;
      var regex = /([0-9"'@!?,.;:^$§%*µ$£¤=\}\{\)\(\]\#~&[+*\/\\|]+)/;//cherchera avec match si il trouve l'un de ces caractères
      var regex2 = /^[0|\+]{1}[3]{2}[6|7]{1}([0-9]{1}){8}$/;//format +33 : début de chaine on regarde si commence par un 0 et un +, suivi de 2 trois suivi de 7 chifrees de 0 à 9
      var regex3 = /^[0]{1}[6|7]{1}([0-9]{1}){8}$/;//format 06
      
      if(name === "" || phone === "") return form.FIELD_EMPTY;
            
      if(name.match(regex)) return form.WRONG_NAME_FORMAT;
      
      if(phone.match(regex2) === null && phone.match(regex3) === null)   return form.WRONG_PHONE_FORMAT;  

      return form.OK;
}

/**
 * Controle formulaire des options
 */
function ControlOptionForm(text,hour){	
      var regex = /([@<>$§%*µ$£¤=\}\{\)\(\]\#~&[+*\/\\|]+)/; 
      var regex2 = /([.|,|;|\s*]{1}nom[.|,|;|\s*]{1})/;//mot non sépéré par des espacements ou précédé d'un caractere ou d'un espacement et en fin de chaine avec ou sans espacement à la fin
      var regex3 = /(nom[^0-9a-z])|(nom$)|(^nom)/g;//mot nom sans caractere ou en fin et debut de chaine
      
      var tab = new Array();
      tab = text.match(regex3);

      if(text === "") return form.FIELD_CONTENT_EMPTY;
                     
      else if(text.match(regex)) return form.CHARACTER_PROHIBITED;          
          
      else if(!text.match(regex2)) return form.WORD_NAME_NOT_PRESENT;

      else if(tab.length>=2) return form.WORD_NAME_PRESENT_SEVERAL_TIMES;

      var regex4 = /^[2]{1}[0-4]{1}[:][0-5]{1}[0-9]{1}|[0-1]{1}[0-9]{1}[:][0-5]{1}[0-9]{1}$/;//heure à partir de 20 h et de 00 hh à 19
      tab = hour.match(regex4);
     
      if(hour === "") return form.FIELD_HOUR_EMPTY;

      else if(!hour.match(regex4))  return form.WRONG_SCHEDULE_FORMAT;

      else return form.OK;
}