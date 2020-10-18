// objet javascript contenant les données à afficher
var dataContact = {
      user : [],
};
window.dateChoice;      //date d'une cellule

$(document).ready(function() {
      $("body").on("click","#save .btn-save",function(){    //demande d'ajout d'une personne
            AddUser();
      });

      $("body").on("click",".card .fa-pencil",function(event){    //demande de modification d'une personne          
            event.stopPropagation();
            var id = $(this).prev().attr("id");
            var detailUser = null;

            for(user of dataContact.user) {
                 if(user.id == id) detailUser = user;
            }      

            Load("Update",detailUser);

            $("body").on("click",".card .btn-save",function(event){ 
                  UpdateUser(id);
            });
      });
      
      $("body").on("click",".card .fa-trash",async function(event){     //demande de suppression d'une personne
            event.stopPropagation();
            var id = $(this).attr("id");

            Load("Confirm","Delete");

            await Confirm().then((confirm) => {
                  if (confirm)  DeleteUser(id);    
            })
      });

      $("body").on("click"," #btnDeleteContact",async function(event){  //demande de suppression de plusieurs personnes   
            var tabId = [];

            $('input[type=checkbox]').each(function (i) {
                 if($(this).is(':checked')) tabId.push($(this).attr("id"));        
            });

            if(tabId.length == 0){ 
                  alert("Veuillez sélectionner au moins un contact") ;
                  return 0;
            }   
            Load("Confirm","Delete");

            await Confirm().then((confirm) => {
                  if (confirm) DeleteUser(tabId); 
            })
      });

      $("body").on("click", ".custom-control-input",function(){   //demande de modification de l'envoie automatique de sms            
            UpdateUserState($(this));
      });

      $("body").on("click","tbody .dateChoice",function(){  //clique sur une cellule du calendrier
            dateChoice = $(this).attr("data");
                
            Load("Save");
      });

      $("body").on("click",".contact",function(){     //demande de voir les numéros de téléphone
            var success = function(message) {            
                 $("#phone").val(message)
            }; 
            var failure = function(message) {             
                  alert(message);
            };
            navigator.plugins.alarm.phoneContacts("",success, failure);
      });
});

function AddUser(){
      var name = $("#name").val();
      var phone = $("#phone").val();
      phone = phone.replace(/ /g,""); //permet de remplacer tous les espaces (et uniquement les espaces)
      phone = phone.replace(/\s/g,""); //permet de rempalcer tous les caractères 'blanc' (ceux que j'ai cités précédemment)
     /* $("input[type='checkbox']:checked").each(function(index) {
            tabId.push($(this).attr('id'));
      }); */  
      var correct = ControlUserForm(name,phone);
    
      if(correct != "Ok"){         
            alert(retour);   

      }else{
            var success = function(message) {             
                  alert(message); 
            }; 
            var failure = function(message) {             
                  alert(message);
            };      
            navigator.plugins.alarm.addUser(dateChoice,name,phone,success,failure);  
            location.reload();
    }
}

function DeleteUser(id){
      var success = function(message) {             
            alert(message); 
      }; 
      var failure = function(message) {             
            alert(message);
      };        
      navigator.plugins.alarm.deleteUser(id,success,failure);  
      location.reload();
}

function UpdateUser(id){
      var name = $("#name").val();
      var phone = $("#phone").val();
      phone = phone.replace(/ /g,""); //permet de remplacer tous les espaces (et uniquement les espaces)
      phone = phone.replace(/\s/g,""); //permet de rempalcer tous les caractères 'blanc' (ceux que j'ai cités précédemment)
      var correct = ControlUserForm(name,phone);

      if(correct != "Ok")  alert(retour); 
      else{
            var success = function(message) {             
                  alert(message); 
            }; 
            var failure = function(message) {             
                  alert(message);
            };        
            navigator.plugins.alarm.updateUser(id,name,phone,success,failure);  
            location.reload();
     }
}

function UpdateUserState(element){
      var success = function(message) {	
          alert(message);     
       }; 
      
      var failure = function(message) {        
          alert(message);    
      };
       
      let id = element.closest( ".collapse" ).prev().find("input[type=checkbox]").attr("id");
      var state = 0;

      if(element.is(':checked'))  state = 1;

      navigator.plugins.alarm.updateUserState(id, state, success, failure);      
}

async function GetUsers(){
      await new Promise((resolve, reject) => {                 
            var success = function(message) {
                  let resp = JSON.parse(message); 

                  for(let item of resp){
                        dataContact.user.push(
                              {"id": item.id,"name": item.name,"phone": item.phone.trim(),"state": item.state == 1 ? "checked" : "",
                                    "date":item.date,"dateRappel":item.dateRappel
                              }
                        ); 
                  } 
                  resolve('foo');   
            };
            var failure = function(message) {
                  alert("Erreur : " + message);
            };  
            navigator.plugins.alarm.getUsers("",success, failure);
      });
}

/*********** Reset des variables *************/  
function ResetContacts(){
      dataContact.user = [];
}

/*********** Init de la liste des contacts *************/  
async function InitContacts(){
      await GetUsers();
      Template(dataContact);
}     