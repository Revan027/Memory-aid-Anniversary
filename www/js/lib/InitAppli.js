/**
 *  Lien pour l'initialisation de l'application
 */
function Initialize(){
      Load("Calendar");
      Load("Modal"); 

      var success = function(message) { 
          alert(message);
      };
  
      var failure = function(message) {
          
          alert("Erreur : " + message);
      };  
      navigator.plugins.alarm.init("",success, failure);  
}

/**
* Mise a jour de l'interface si l'applciation est mise en arrière plan
*/
function onResume() {
      setTimeout(function() { }, 0);             
}

function onLoad() {  				
      document.addEventListener("deviceready", onDeviceReady, false);
}

/**
 ** Dès que apllication prête sur android
*/ 
function onDeviceReady() { 
      Initialize();       
}