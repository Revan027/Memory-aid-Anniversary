$( document ).ready(function() {

      /******** btn clique : recupération valeurs des champs ***********/ 
      $("body").on("click",".btn-modify",function(){
            UpdateOptions($('#sms').val(),$('#hour').val());
      });
});

function GetOptions(){

	/******** creation des tooltips ***********/ 
      $("#hour").tooltip({
            
            position: { my: "top-40", at: "left"}
      });
      
      $("#sms").tooltip({
            
            position: { my: "top-60", at: "top"}
      });
		
      /******** recuperation des réglages ***********/
      var success = function(message) { 
            let resp = JSON.parse(message); 
            for(let item of resp){
                  $('#hour').val(item.hour);  
                  $('#sms').val(item.sms); 
            }    
      };
      var failure = function(message) {
            
            alert("Erreur : " + message);
      };  
      navigator.plugins.alarm.getOptions("",success, failure);
}


function UpdateOptions(sms,hour){
      var correct = ControlOptionForm(sms,hour);
      
      if(correct != "Ok"){         
            alert(correct);   

      }else{
            var success = function(message) { 
                  alert(message);
            };
            var failure = function(message) {
                  
                  alert("Erreur : " + message);
            };  
            navigator.plugins.alarm.updateOptions(sms,hour,success, failure);
    }
}