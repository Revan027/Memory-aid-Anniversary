




																		/******************* call function supp *******************/                 
function getIdSupp(){
	
    var tabId = new Array();
    
     $('.card-header').find("input[type='checkbox']:checked").each(function() {
	
        tabId.push($(this).attr('id')); console.log($(this).attr('id'));
    });          
   
    var success = function(message) {
        alert(message);
        readJSON();
    };

    var failure = function(message) {
        alert(message);
    };
    
    if(tabId.length < 1){
        alert("Aucun anniversaire sélectionné");
        return true;
    }
    navigator.plugins.alarm.supp(tabId, success, failure);
    location.reload();
}




																		/******************* call function supp to one anniv  *******************/                 
function suppAnniv(id){
	
    console.log($(this).attr('id'));

    var success = function(message) {
	
        alert(message);
        readJSON();
    };

    var failure = function(message) {
	
        alert(message);
    };
    
    navigator.plugins.alarm.supp(id, success, failure);
    location.reload();
}


															/******************* fait apparaitre le bloc de modification *******************/     
function showModify(id){
	
	
	
	$('#exampleModalCenter2').modal('show');
	$('#exampleModalCenter2').find(".card-body").attr('id',id);

}


																		/******************* call function modif *******************/                    
function modifAnniv(){
    
    var new_name=$("#new_name").val();
    var new_num_tel=$("#new_num_tel").val();
    var id = $('#exampleModalCenter2').find(".card-body").attr('id');

    var retour = controleForm(new_name,new_num_tel);

    if(retour!=="ok"){
        
        alert(retour);

    }else{
        
        var success = function(message) {
	
			alert(message);
            $('#exampleModalCenter2').modal('hide');
			readJSON();

        }; 

        var failure = function(message) {
	
	 		alert(message);
            $('#exampleModalCenter2').modal('hide');
          
        };
        navigator.plugins.alarm.modif(id,new_name,new_num_tel, success, failure);   
	}
}


																		/******************* (deprecated)call function modif *******************/                    
function getIdModif(){
    
    var tabId = new Array();
    var new_name=$("#new_name").val();
    var new_num_tel=$("#new_num_tel").val();
    
    
    $('.card-header').find("input[type='checkbox']:checked").each(function(index) {
        tabId.push($(this).attr('id'));
    }); 
    var retour = controleForm(new_name,new_num_tel);
     
    if(tabId.length===0){
        
        alert("Veuillez sélectionner un anniversaire");
    }else if(tabId.length>1){
        
        alert("Veuillez sélectionner un seul anniversaire");
    }else if(retour!=="ok"){
        
        alert(retour);
    }else{
        
        var success = function(message) {
            
            alert(message); 
        }; 
        var failure = function(message) {
            
            alert(message);
        };
        navigator.plugins.alarm.modif(tabId,new_name,new_num_tel, success, failure);
        location.reload();
    }
}





																	/******************* call modification du text sms auto *******************/
function modifTextSms(){

    var texte=$('#textSms').val();
    var retour = controleModifTextSms(texte);
    
    if(retour!=='ok'){
        
        navigator.notification.alert(retour);
    }else{
        
        var success = function(message) {
            
            navigator.notification.alert(message); 
            $('#textSms').val(message);
        }; 
        var failure = function(message) {
            
            navigator.notification.alert(message);
        }; 
        navigator.plugins.alarm.modifTextSms(texte, success, failure);
    }
}


															/******************* call changement etat sms auto *******************/  
function modifEtat(num_tel,id,element){
    
    var etat;

	var success = function(message) {
	
         navigator.notification.alert(message); 

    }; 

    var failure = function(message) {
	
        navigator.notification.alert(message);

    };
    
    if($(element).is(':checked')){
	
		if(num_tel== new String("Aucun numéro")){
			
			$(element).prop('checked', false);
			navigator.notification.alert("Numéro de téléphone manquant !"); 
			
		}else{
			
			 etat=1;
			navigator.plugins.alarm.modifEtat(id, etat, success, failure);
			
		}     
    }else{
	
        etat=0; 
	    navigator.plugins.alarm.modifEtat(id, etat, success, failure);
    }
}


/*************************************************************** modification de l'heure'*****************************************************/  
function modifHeure(){
	
	var heure = $('#heure').val();
    var retour = controleModifHeure(heure);
    
    if(retour!=='ok'){
        
        navigator.notification.alert(retour);

    }else{
        		
		var success = function(message) {
			
	         navigator.notification.alert(message); 
	
	    }; 
	
	    var failure = function(message) {
		
	        navigator.notification.alert(message);
	
	    };
	
	    navigator.plugins.alarm.modifHeure(heure, success, failure);	
    }	
}

$(document).ready(function() {
    
    /******************* call affichage de la liste des contacts *******************/   
    $( ".contact" ).click(function() {
	
        var success = function(message) {
	
            $('#num_tel').val(message);

        }; 

        var failure = function(message) {
	
            alert(message);

        };
        
        navigator.plugins.alarm.showNum("",success, failure);
    });
    
    $( ".contact-new" ).click(function() {
	
        var success = function(message) {
	
            $('#new_num_tel').val(message);

        }; 

        var failure = function(message) {
	
            alert(message);

        };

        navigator.plugins.alarm.showNum("",success, failure);
    });
});