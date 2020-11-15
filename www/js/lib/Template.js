var partials = {
      pagination:""
};

/**
 * Gestion des templates
 * @param {*} data 
 */
function Template(data, partials = ""){
      // récupération du template
      var template = $('#template').html();

      // génération du HTML
      var rendered = Mustache.render(template, data, partials);
  
      // Insertion du résultat dans la page HTML
      $('#mainConteneur').html(rendered);
}

/**
 * Chargement des pages
 * @param {*} page 
 * @param {*} param 
 */
function Load(page,param = null){
      switch (page) {

            case 'Calendar':
                  $("#LoadTemplate").load("./Calendar.html", function(data) {  
                        ResetCalendar();
                        InitCalendar(); 
                  });  
                  break;

            case 'Option':
                  $("#mainConteneur").load("./Option.html", function(data) {//chargement d'une page html vers une div
                        option.callPlugin.getOptions();
                   }); 
                  break;

            case 'Contact':
                  $("#LoadTemplate").load("./Contact.html", function(data) {
                        ResetContacts();
                        InitContacts();             
                  }); 
                  break;
                 
            case 'Pagination':
                  $("#LoadTemplate").load("./Pagination.html", function(data) { });               
                  break; 

            case 'Modal':
                  $("#LoadModal").load("./Modal/Modal.html", function(data) { });               
                  break; 

            case 'Save': 
                  $("#Modal .card").load("./Modal/Save.html", function(data) {
                        InitSaveModal();
                        $('#Modal').modal('show');
                  });               
                  break; 

            case 'Update':
                  $("#Modal .card").load("./Modal/Update.html", function(data) { 
                        InitUpdateModal(param);
                        $('#Modal').modal('show');
                  });               
                  break; 

            case 'Confirm':
                  //empty card
                  $("#Modal .card").load("./Modal/Confirm.html", function(data) {
                        InitConfirmModal(param);
                        $('#Modal').modal('show');
                  });               
                  break; 

            default: break;
      }  
}

/**
 * Chargement des sous templates
 * @param {*} page 
 * @param {*} param 
 */
async function LoadPartial(page, param = null){
      switch (page) {

            case "Pagination":
                  await $.get("pagination.html", function(data) {
                        partials.pagination = data;
                  }, "html")  
            break;

            default: break;
      }
}