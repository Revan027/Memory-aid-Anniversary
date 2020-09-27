/**
 * Init du modal de confirmation
 * @param {*} type 
 */
function InitConfirmModal(type){  
      var text = "";

      if(type == "Delete") text = "Confirmer la suppression ?";

      $('#Modal .card-header h5').html(text)
}

/**
 * Attente d'une confirmation
 */
function Confirm() {
      return new Promise((resolve, reject) => {
          $("#Modal").on("click", ".btnVal", function () {              
              $("#Modal").modal('hide');
              resolve(true);
          }); 
  
          $("#Modal").on('hidden.bs.modal', function (e) {
              resolve(false); 
          })
      });
  }

/**
 * Init du modal pour ajouter un anniversaire
 */
function InitSaveModal() {
      let content = "";

      for(let item of currentAnniversary){
            if(item.date == dateChoice)   content += "<i class='fa fa-user-circle-o' aria-hidden='true'></i> "+item.name+" </br>";               
      }

      if(content === ""){
            content = "<h6 class='card-title'> <i class='fa fa-exclamation-triangle fa' aria-hidden='true'></i> Aucun anniversaire trouvé </h6>";
      }
      $( "#pills-data").append(content);
}

/**
 * Init du modal de modification avec les informations d'un contact
 */
function InitUpdateModal(detailUser) {
    $("#name").val(detailUser.name);
    $("#phone").val(detailUser.phone);
}