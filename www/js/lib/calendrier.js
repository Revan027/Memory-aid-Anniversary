/**************Fonctions gérant le calendrier***************/

/*******change date*********/
function changeDateAjax(sens) {

    if(sens === 2){//mois d'avant
        
        mois = mois-1;
        
        if(mois<1){
            mois=12;
            annee=annee-1;
        }
    }
    if(sens === 1){//mois d'après
        
       mois = mois+1;
            
        if(mois>12){
            mois=1;
            annee=annee+1;
        }
    }
    var m;
    if(mois<10 ){
        m = "0"+mois;
    } else{ m = mois;}
    
    var dateString = ""+m+"-"+annee;
    searchReadJSON(dateString);   
}

/*******create calendar********/
function createCalendar(){
 
    var monthNames = ["Janvier", "Fevrier", "Mars","Avril", "Mai", "Juin", "Juillet","Aout", "Septembre", "Octobre","Novembre", "Decembre"];
    var monthIndex = mois;
    var year = annee;
    var date = new Date(""+year+"-"+monthIndex+"-01"); 
    var first_jour = numJour(date.getDay());
    var nb_jour_month = NombreDeJour(annee,mois-1);

   var un ="<div id='container-fluid' ontouchmove='swipe(this,1);' ontouchstart='swipe(this,2);' ontouchend='swipe(this,3);' style='padding-top:1.5em!important;text-align:center;  '>"+
        
        
            "<div id='blockChangeView'>"+
                "<div id='blockLeft'>Jour</div>"+
                "<div id='blockRight' style=' background-color: #E6E6E6;'>Mois</div>"+ 
            "</div>"+
             
            "<div id='libelleMois'><b>"+monthNames[monthIndex-1] + ' ' + year+"</b></div>"+
            
            "<div id='blockChangeMonth'>"+
                "<div id='blockLeftFleche' onclick='changeDateAjax(2);'>"+
                    "<i class='fa fa-caret-left fa-lg' aria-hidden='true' ></i> "+
                "</div>"+
                "<div id='blockRightFleche' onclick='changeDateAjax(1);'>"+
                     "<i class='fa fa-caret-right fa-lg' aria-hidden='true'></i>"+
                "</div>"+
            "</div>"+
                 
            "<div class='table-responsive-sm'><table class='table'>"+
                "<tbody><tr id='mois'>"+
                     "<td>Lun</td>"+
                     "<td>Mar</td>"+
                     "<td>Mer</td>"+
                     "<td>Jeu</td>"+
                     "<td>Ven</td>"+
                     "<td>Sam</td>"+
                     "<td>Dim</td>"+
                "</tr>";

    var jour = 1;
    var pointeur = 1; 
    var nb_jour_prev_month = NombreDeJour(annee,mois-2);
    var jour_prev = nb_jour_prev_month - (first_jour-1)+1; 
    var deux = "<tr id='afterDay'>";   
    var trois="";
    
    
    /*********** Génération jour du mois précédent *************/
    while(pointeur!==first_jour){
    
        trois = trois +"<td style='color:silver;'><div class='container'><div class='row'>"+
                            "<div class='col-'>"+jour_prev+"</div>"+
                        "</div></div></td>";
    
        jour_prev = jour_prev+1;
        pointeur = pointeur +1;
    }
    
    var m;
    
    if(mois<10 ){
        
        m = "0"+mois;
    } else{ 
        
        m = mois;
    }

    /*********** Génération jour du mois en cours *************/
    var visible='hidden';
    var cible ="#exampleModalCenter";
    
    while(jour<=nb_jour_month){ 
    
        if(pointeur >7 ){
            
            pointeur = 1;
            trois = trois +"</tr>"+         
             
                                "<tr>";
        }
        
        /*********** Comparaison entre date du jour et date du calendrier *************/
        var date_current = new Date();  //date du jour
        var date_set = new Date(""+annee+"-"+mois+"-"+jour+""); //date en cours de génration 
        var date_formater = formatageDate(jour,mois,annee); //date en cours de génration 
        var nameAnniv='';
        
        for(var i=0;i<(tabDate.length);i++){    //parcours du tableau de date recupéré du json
            
            var tabSub = tabDate[i][0].substring(0,10); //recup date sans l'heure

            if(tabSub === date_formater){   //date génrérée = date d'un anniversaire
               
               visible='visible';
               nameAnniv = nameAnniv + tabDate[i][1]+";";
            }
        }
		
		var tableau_name=nameAnniv.split(";");
		var exposant = tableau_name.length-1;
		
        var infodTd='<div class="container">'+
                        '<div class="row">'+
                            '<div class="col-">'+jour+'</div>'+
                        '</div>'+
                        '<div class="row">'+
                            '<div class="col-"><input id="inputAnniv" type="text" style="display:none;" value="'+nameAnniv+'"><i class="fa fa-gift fa-fw" aria-hidden="true" style="visibility:'+visible+';"></i><span id="exposant" style="visibility:'+visible+';">('+exposant+')</span></div>'+
                        '</div>'+
                      '</div>';
              
        if(date_set.toDateString() === ladate.toDateString()){
            
            trois = trois + '<td style="background-color: rgba(0, 39, 141, 0.6); color:white;" data-toggle="modal" data-target="'+cible+'" onclick="showBox($(this),'+jour+',\''+mois+'\','+annee+');">'+infodTd+'</td>'; // console.log($(element).find(\'i\').attr(\'id\'));'<td onclick="alert(\''+annee+monthNames[monthIndex-1]+jour+'\');">'+jour+'</td>';
        }else{  
            
            trois = trois + '<td data-toggle="modal" data-target="'+cible+'" onclick="showBox($(this),'+jour+',\''+mois+'\','+annee+');">'+infodTd+'</td>';
        }
        jour=jour+1;
        pointeur=pointeur +1;
        visible='hidden';     
    }    
    jour = 1;
    
    /*********** Génération jour du mois prochain *************/
    while(pointeur<=7){

        trois = trois + "<td style='color:silver;'><div class='container'><div class='row'>"+
                            "<div class='col-'>"+jour+"</div>"+
                        "</div></div></td>";

        pointeur= pointeur +1; 
        jour= jour+1;
    }
    trois = trois + "</tr></tbody></table></div>";
    
    $('#prin').html(un+deux+trois);
    $("#prin").stop().slideDown('slow');
	tabDate.splice(0);
}
    
/*******know if years is bissextile********/
function Bissextile(annee){
    
    if ((annee%4==0) && ((annee%100!=0) || (annee%400==0))) return 29;
    else return 28;
}

/*******return number of day for month********/
function NombreDeJour(annee,idMois){   
    
    var nbJour = [31, Bissextile(annee), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    
    if(idMois<0){
        return nbJour[11];
    }else return nbJour[idMois];         
}

/*******Correspondance entre getDay() et les jours de la semaine********/
function numJour(idJour){
    
    if(idJour === 0){
        return 7;
    }else return idJour;
}

/*******Affichage de la box d'enregistrement pour chaque date********/
function showBox(element,jour,mois,annee){ 
    
    var mois2 = mois;
    if(jour<10 ){
        jour = "0"+jour;
    } 
    
    if(mois<10){
       mois2 = "0"+mois;
    }
    
    dateChoice = jour+'-'+(mois2)+'-'+annee;
    name = $(element).find('#inputAnniv').attr('value');    //recupère, grâce à l'élément cliqué, les noms des anniv

    if(name!==''){
	
		var tableau_name=name.split(";");
		$('#data').html("");
		
        $('.card').find('.nav').children().children().attr('class','nav-link');
        $('.card').find('.nav').children().next().children().attr('class','nav-link active');

       for(var i=0;i<tableau_name.length-1;i++){
	
			 $('#data').append(""+
			"<i class='fa fa-user-circle-o' aria-hidden='true'></i> "+tableau_name[i]+" </br>"); 
			
		}
		
        $( "#save" ).hide();
        $( "#data" ).show();
        
    }else{
	
        $('.card').find('.nav').children().children().attr('class','nav-link active');
        $('.card').find('.nav').children().next().children().attr('class','nav-link');
        $('#data').html("<h6 class='card-title'> <i class='fa fa-exclamation-triangle fa' aria-hidden='true'></i> Aucun anniversaire trouvé </h6>");
        $( "#data" ).hide();
        $( "#save" ).show();
    } 
}

/*******affichage date en entier, en chaine de caractère********/
function formatageDate(jour,mois,annee){ 
    
    var mois2 = mois;
    if(jour<10 ){
        jour = "0"+jour;
    } 
    
    if(mois<10){
       mois2 = "0"+mois;
    }
    return  ""+jour+"-"+mois2+"-"+annee+"";
}
