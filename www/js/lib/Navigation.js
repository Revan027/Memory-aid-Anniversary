$(document).ready(function() {  
           
      $("body").on("touchmove","#mainConteneur",function(){
            Swipe(this,1);
      });

      $("body").on("touchstart","#mainConteneur",function(){ 
            Swipe(this,2);
      });

      $("body").on("touchend","#mainConteneur",function(){ 
            Swipe(this,3);
      });

      $("body").on("click","#blockLeftFleche",function(){ 
            ChangeDate(2);
      });

      $("body").on("click","#blockRightFleche",function(){ 
            ChangeDate(1);
      });
});


var  x_start = 0;
var  x_end = 0;
var  y_start = 0;
var  y_end = 0;
var  x_move = 0;
var  time_start = 0;
var  time_end = 0;

/**
 * Gère le changement de date dans le calendrier par toucher
 * 
 */
function Swipe(e,evnt){
      if(evnt === 1){            
            if(in_page_home===true){
            // event.preventDefault();
            }

            var touchobj = event.changedTouches[0];
            x_move = touchobj.screenX; 
      }
      
      if(evnt === 2){             
            var touchobj = event.changedTouches[0];
            x_start = touchobj.screenX;
            y_start = touchobj.screenY;
            time_start = new Date().getTime();
      }
    
      if(evnt === 3){ 	
            time_end = new Date().getTime();
            var touchobj = event.changedTouches[0];
            x_end = touchobj.screenX;
            y_end = touchobj.screenY;

		if(x_end - x_start > 20 || x_end - x_start < -20){//calcul différence en axe x. Doit etre assez grand pour que ce soit un mouvement
			
			event.preventDefault();	
			
                  if((y_end - y_start) < 50 && (y_end - y_start)> -50 ){//Si le mouvement en axe y est faible
            
                        if((time_end - time_start) >= 40){//Si le temps de mouvement est assez long
                  
                              if(x_start < x_end && in_page_home===true) ChangeDate(2);
                              else  ChangeDate(1);                   
                        } 
                  }
		}
      }
}

/**
 * Gère la navigation dans le menu
 * 
 */
function NavMenu(num){
            
      if(num === "Calendar"){               
            in_page_home=true;
            Load("Calendar"); 
            ResetCalendar();
            InitCalendar();  

      }else if(num === "Contact"){         
            in_page_home=false;
            Load("Contact"); 

      }else{           
            in_page_home  =false;
            Load("Option"); 
      } 
}


    /*document.getElementById("mois").addEventListener('touchmove', function(e){ 
        if(in_page_home===true){
            e.preventDefault();
        }
        var touchobj = e.changedTouches[0];
        x_move = touchobj.screenX; 
    }, false);

     document.getElementById("mois").addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        x_start = touchobj.screenX;
        y_start = touchobj.screenY;
        time_start = new Date().getTime();
    }, false);

     document.getElementById("mois").addEventListener('touchend', function(e){
        time_end = new Date().getTime();
        var touchobj = e.changedTouches[0];
        x_end = touchobj.screenX;
        y_end = touchobj.screenY;

        if((y_end-y_start) <50 &&(y_end-y_start)>-50 ){

        if((time_end-time_start)>=40){

            if(x_move<x_start && x_move!==0 && in_page_home===true){
                changeDateAjax(1);
            }else if(x_move>x_start && x_move!==0 && in_page_home===true){   
                changeDateAjax(2);
            }
        } }
        x_start=0;
        x_move=0;
        time_start=0;
        time_end=0;
    }, false);*/
