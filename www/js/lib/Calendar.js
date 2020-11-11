var ladate = new Date();      //date du jour
var monthIndex = ladate.getMonth(); //index du mois en cours
var monthNames = ["Janvier", "Fevrier", "Mars","Avril", "Mai", "Juin", "Juillet","Aout", "Septembre", "Octobre","Novembre", "Decembre"];
window.currentAnniversary = [];

// objet javascript contenant les données à afficher
var dataCalendar = {
      monthNames : monthNames[monthIndex]+" ",
      year : ladate.getUTCFullYear(),
      previousDays: [],
      currentDays: "",
      followingDays:[]
};
var pointeur = 1; //avancement dans une ligne du calendrier

/**
 * Changement de mois
 */
function ChangeDate(sens) { 
      if(sens === 2){//mois précédent
            monthIndex = monthIndex - 1;

            if(monthIndex < 0){
                  monthIndex = 11;
                  dataCalendar.year =  dataCalendar.year - 1;
            }    
      }

      if(sens === 1){//mois d'après
            monthIndex = monthIndex + 1;

            if(monthIndex >= 12){
                  monthIndex = 0;
                  dataCalendar.year =  dataCalendar.year + 1;
            }    
      
      }
      dataCalendar.monthNames = monthNames[monthIndex]; 
      ResetCalendar();  
      InitCalendar();
}

/**
 * Reset des variables
 */
function ResetCalendar(){
      pointeur = 1; 
      dataCalendar.previousDays = [];
      dataCalendar.currentDays = "";
      dataCalendar.followingDays = [];
      currentAnniversary = [];
}

/** 
*Init du calendrier 
*/  
async function InitCalendar(){
      InitPreviousDate();
      await GetDateSearch();
      InitCurrentDate();
      InitFollowingDate();
      Template(dataCalendar);
}

/**
 * Génère les jours du mois précédent
 */
function InitPreviousDate(){
      var firstDayCurrentMonth = NumberDayShow();
      var nbPreviousMonthDay = NumberDayMonth(dataCalendar.year,monthIndex-1);
      var currentDayPrevMonth = nbPreviousMonthDay - firstDayCurrentMonth; 

      while(currentDayPrevMonth < nbPreviousMonthDay){
            currentDayPrevMonth = currentDayPrevMonth + 1;   
            dataCalendar.previousDays.push({"previousDay": currentDayPrevMonth});          
            pointeur++;
      }
}

/**
 * Récupérère les anniversaire pour le mois en cours
 */
function GetDateSearch(){
      let dateSearch = ChangeDateFormat(monthIndex+1)+"-"+dataCalendar.year;

      return new Promise((resolve, reject) => {                 
            var success = function(message) {    
                  let resp = JSON.parse(message);

                  for(let item of resp){
                        currentAnniversary.push(
                              {"id": item.id, "name": item.name, "date":item.date}
                        ); 
                  }                          
                  resolve("foo");   
            };
            var failure = function(message) {
                  alert("Erreur : " + message);
            };  
            navigator.plugins.alarm.searchDate(dateSearch,success, failure);
      });
}

/**
 * Génère le rendu et les jours du mois en cours
 */
function InitCurrentDate(){
      var jour = 1;
      var nbMonthDay = NumberDayMonth(dataCalendar.year,monthIndex);

      while(jour <= nbMonthDay){    
            var date = new Date(""+dataCalendar.year+"-"+(monthIndex+1)+"-"+jour+""); //date en cours de génération 
            let style = "";
            let gift = "";
            let exposant = "";
            let iCheckDate = 0;

            if(currentAnniversary.length != 0){
                  for(let item of currentAnniversary){
                       if(item.date == moment(date).format('DD-MM-YYYY')) iCheckDate++;
                  }  

                  if(iCheckDate != 0){    // si au moins une correspondance trouvé
                        gift = "<i class='fa fa-gift fa-fw' aria-hidden='true'></i>";
                        exposant = "("+iCheckDate.toString()+")";
                  }
            }

            var infoTd = '<div class="container">'+
                              '<div class="row">'+
                                    '<div class="col-">'+jour+'</div>'+
                              '</div>'+  
                              '<div class="row">'+
                                    '<div class="countAnniv col-">'+gift+' '+ exposant +'</div>'+
                              '</div>'+                        
                        '</div>';

            if(pointeur > 7){ //si dépasse la colonne dimanche        
                pointeur = 1;
                dataCalendar.currentDays += "</tr><tr>";
            }   

            if(date.toDateString() === ladate.toDateString()){    //si date du jour
                  style = "style='background-color: rgba(0, 39, 141, 0.6); color:white;'";
            }

            dataCalendar.currentDays += '<td class="dateChoice" '+style+' data="'+ChangeDateFormat(jour)+'-'+ChangeDateFormat(monthIndex+1)+'-'+dataCalendar.year+'">'+infoTd+'</td>';
            jour++;
            pointeur++;    
      }     
}

/**
 * Génère les jours du mois suivant
 */
function InitFollowingDate(){
      let day = 1;

      while(pointeur <= 7){

            dataCalendar.followingDays.push({"followingDay": day});
            day++;
            pointeur++;  
      }
}

/**
 * Index du premier jour d'un mois
 */
function NumberDayShow(){
      var date = new Date(""+dataCalendar.year+"-"+(monthIndex+1)+"-01");   
      return NumberDay(date.getDay())-1;//nombre de jour à afficher
}

/**
 * Nombre de jour pour le mois correspondant
 */
function NumberDayMonth(annee,idMois){     
      var nbJour = [31, Bissextile(annee), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      
      if(idMois<0) return nbJour[11];

      else return nbJour[idMois];         
}

/**
 * Correspondance entre getDay() et les jours de la semaine
 */
function NumberDay(idJour){
      if(idJour === 0)  return 7;

      else return idJour;
}

/**
 * Nombre de jour si année bissextile
 */
function Bissextile(annee){   
      if ((annee%4==0) && ((annee%100!=0) || (annee%400==0))) return 29;
      
      else return 28;
}

/**
 * Convertit un jour ou un mois en dizaine
 * @param {*} date 
 */
function ChangeDateFormat(date){   
      if (date < 10 ) return 0+date.toString();
      return date.toString();
}