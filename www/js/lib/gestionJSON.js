/*Fonction lisant le fichier json*/


/*******read a json file********/
function readJSON(){
	
    $('#prin').html("");

    var couleur='';
    var etat='';
	var num_tel='';
	
    $.getJSON(chemin).done(function(data){
        
       $('#prin').append("<div id='accordeon'>");

        $.each(data,function(index,d){
			
			num_tel = new String(d.num_tel); 
			
			if(num_tel== ""){

				num_tel = new String("\"Aucun num&eacute;ro\""); ;
				
			}
			
            if(index% 2 === 0){
	
                couleur='color: rgba(0, 47, 127, 0.9);';
            }
            else{
	
                 couleur='color: rgba(5, 81,162,0.9);';
            } 
           
            if((d.etat) === "1"){
	
                etat="checked"; 

            }else{
	
                etat="";
            }
            
            $('#prin').append(         
	
                "<div class='card'> "+

                    "<div class='card-header'>"+

                      "<div class='pretty p-default p-round p-smooth' >"+
                            "<input type='checkbox' id=\'"+d.id+"\'/>"+
                            "<div class='state p-primary'>"+
                                "<label class='state p-primary'></label>"+
                            "</div>"+
                        "</div>"+

                        "<span id='name' style='"+couleur+"'>"+

							"<a style='"+couleur+"' class='card-link' > " + d.name+ "</a>"+
							"<i  data-toggle='collapse' data-target='#item"+(index+1)+"' class='fa fa-angle-double-down fa-lg' aria-hidden='true'></i>"+
							"<i id=\'"+d.id+"\' class='fa fa-trash fa-lg' aria-hidden='true' onclick='suppAnniv("+d.id+");'></i>"+
							"<i class='fa fa-pencil fa-lg'  onclick='showModify("+d.id+");'  aria-hidden='true'></i>"+
						"</span>"+
                    "</div>"+
                 "</div>"+
                 
                "<div class='collapse' id='item"+(index+1)+"' data-parent='#accordeon' style='background-color: rgba(255, 255, 255, 0.7);'>"+
                    "<div class='card-body'>"+
                        "<span id='date'><i class='fa fa-gift' aria-hidden='true'></i> " + d.date + "</span>"+
						"<span id='rappel'><i class='fa fa-clock-o' aria-hidden='true'></i> Prochain rappel : " + d.date_rappel + "</span>"+
                        "<span id='calendier'><i class='fa fa-mobile fa-2x' aria-hidden='true'></i> " + d.num_tel +"</span>"+
                        "<span id='phone'>"+
                            "<div class='custom-control custom-switch'>"+
                                "<input type='checkbox' "+etat+" onclick='modifEtat(" + num_tel+","+d.id+",this);' class='custom-control-input' id='customSwitch"+(index+1)+"'>"+
                               " <label class='custom-control-label' for='customSwitch"+(index+1)+"' >Sms auto</label>"+
                            "</div></span>"+
                    "</div>"+
                "</div>"+
            "");
            lastId = d.ID;
        }); 

        $('#prin').append("</div>");
        $('#prin').append(
            "<div class='container'>"+  
                "<div class='row'>"+

                    "<div class='col' style='text-align: center;'>"+
                        "<button type='button' style='dispay:inline-block;' class='btn btn-primary' onclick='getIdSupp();'>Supprimer</button>"+
                    "</div>"+

                "</div>"+
            "</div>");     
        $("#prin").stop().slideDown('slow'); 
    })
    .fail(function(){
       $('#mainConteneur').html("<h6 class='card-title'> <i class='fa fa-exclamation-triangle fa' aria-hidden='true'></i> Aucun contact enregistré </h6>"); 
    });
}



/*******search date into a json files********/
function searchReadJSON(date){

    $.getJSON(chemin).done(function(data){
        var dateSub='';
        var i=0;
        
        $.each(data,function(index,d){

            dateSub = (d.date).substring(3,10);
            
            if(dateSub === date){
             
                tabDate[i] = new Array();
                tabDate[i].push(d.date);
                tabDate[i].push(d.name);
                tabDate[i].push(d.id);
                i++;
            }
        }); 
        createCalendar();   
    })
    .fail(function(){
        createCalendar();   
    });   
}
