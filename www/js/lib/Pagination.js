var pagination = {
      nbrResult: 0,
      offset: 0,
      limit: 10,  
      currentPage:1,
      lastPage: 0,
      firstPage: 0,
      pages: [],
      otherPagesLimit:4,
     
      getUsersNbr: async function(){  
            return new Promise(function(resolve, reject)  {                 
                  var success = function(message) {                
                        let nbrResult = message;
                        nbrResult = 1043;
                        resolve(nbrResult);   
                  };
                  var failure = function(message) {
                        alert("Erreur : " + message);
                  };  
                  navigator.plugins.alarm.getUsersNbr("", success, failure);
            });               
      },
      getFirstPage: function() {          
            this.firstPage = 1;
            this.pages.unshift(this.firstPage);
      },
      getLastPage: function() {   
            if(this.nbrResult > 1)  {
                  this.lastPage = Math.trunc(this.nbrResult / this.limit);

                  if(this.nbrResult % this.limit > 1)  this.lastPage++;

                  this.pages.push(this.lastPage);
            }              
      },
      navigation: function(direction = "") {  
            this.pages = [];

            this.getFirstPage();  
                 
            //todo : verification première et dernière page, recalculer le otherPagesLimit si le nombre de resultat < à 4, habillage du rendu
            if(direction === "PREV"){
                  for(let i = this.otherPagesLimit; i >= 1; i--)   {
                        let index = this.currentPage - i;
                        this.pages.push(index);   
                  }   
            }
            else
                  for(let i = 1; i <= this.otherPagesLimit; i++)   {
                        let index = this.currentPage + i;
                        this.pages.push(index);   
                  }   
            this.getLastPage();                     
      },    
      render: function(){  
            for(let i = 0; i < this.pages.length; i++)   {
                  let classCurentPage ="";

                  if(this.currentPage == (this.pages[i])) classCurentPage = 'text-info';

                  $(".pagination").append("<div class='pageIndex p-3 "+classCurentPage+"'>"+this.pages[i]+"</div>");
            }   
      },
      init: async function(){            
            await this.getUsersNbr().then((value) => {
                 this.nbrResult = value;
            });   

            if(this.currentPage == 1)  this.navigation("NEXT"); 
                           
            this.render();
      }   
}   