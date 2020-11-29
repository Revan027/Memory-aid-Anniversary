let lengthBuffer = 0;

var option = {
      autoComplete: function(element, lengthSeparator, separator){
            var value = element.val();
            var length = value.length;
      
            if(lengthBuffer < length && length == lengthSeparator){
                  value += separator;
                  element.val(value);
            } 
            lengthBuffer = length;
      },
      event: {
            init: function(){
                  /******** btn clique : recupération valeurs des champs ***********/ 
                  $("body").on("click",".btn-modify",function(){
                        option.callPlugin.updateOptions($('#sms').val(),$('#hour').val());
                  });
               
                  $("body").on("input","#hour",function(){          
                        option.autoComplete($(this),2,':');           
                  });
            }         
      },     
      callPlugin: {
            updateOptions: function(sms,hour){
                  var correct = ControlOptionForm(sms,hour);
            
                  if(correct != "Ok"){         
                        alert(correct);   
                  }
                  else{
                        var success = function(message) { 
                              alert(message);
                        };
                        var failure = function(message) {            
                              alert("Erreur : " + message);
                        };  
                        navigator.plugins.alarm.updateOptions(sms,hour,success, failure);
                }
            },
            getOptions: function(){
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
      },    
}
jQuery(function() { 
      option.event.init();  
})