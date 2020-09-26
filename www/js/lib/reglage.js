


/******** affichage page des réglages ***********/

function showPageReglage(){
	
	
	/******** initialize et cr�er le tooltip ***********/  
	
	$(document).ready(function() {
		
		$("#heure").tooltip({
			
	 		position: { my: "top-40", at: "left"}
		});
		
		$("#textSms").tooltip({
			
	 		position: { my: "top-60", at: "top"}
		});
		
	});
	
    $('#prin').html("");



    /******** recuperation du message type ***********/

     var success = function(message) { 
         
		$('#textSms').val(message);

    };

    var failure = function(message) {
        
        alert("Erreur : " + message);
    };
    
    navigator.plugins.alarm.setMessage("",success, failure);


	/******** recuperation de l'heure de base ***********/
	
	 var success = function(message) { 

		 $('#heure').val(message);  
 
    };

    var failure = function(message) {
        
        alert("Erreur : " + message);
    };
    
    navigator.plugins.alarm.setHeure("",success, failure);
	
    $('#prin').append(   
        "<div class='card'>"+
            "<h6 class='card-header'><i class='fa fa-comment fa-1x' aria-hidden='true' ></i> Horaire (rappels et envoie de sms)</h6>"+
            "<div class='card-body' style='text-align: center;'>"+
                 "<input type='text' maxlength='05' class='form-control' id='heure'  title='R&eacute;glage de l&#39;heure hh:mm' placeholder='R&eacute;glage de l&#39;heure hh:mm'>"+
                "<button type='button' class='btn btn-primary' onclick='modifHeure();'>Modifier</button>"+
            "</div>"+
        "</div>"); 

    $('#prin').append(   
        "<div class='card'>"+
            "<h6 class='card-header'><i class='fa fa-comment fa-1x' aria-hidden='true' ></i> Message type pour sms</h6>"+
            "<div class='card-body' style='text-align: center;'>"+
                "<textarea class='form-control' id='textSms' rows='3' title='Ajoutez le mot `nom` pour positionner le prénom)' '></textarea>"+
                "<button type='button' class='btn btn-primary' onclick='modifTextSms();'>Modifier</button>"+
            "</div>"+
        "</div>"); 
    $("#prin").stop().slideDown('slow'); 
}




