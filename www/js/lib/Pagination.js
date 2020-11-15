var pagination = {
      nbrResult: 0,
      offset: -10,
      limit: 10,  
      currentPage:0,
      lastPage: 0,
      firstPage: 0,
      pages: [],
      otherPagesLimit:4,
     
      getUsersNbr: async function(){  
            return new Promise(function(resolve, reject)  {                 
                  var success = function(message) {                
                        let nbrResult = message;
                        nbrResult = 18;
                        resolve(nbrResult);   
                  };
                  var failure = function(message) {
                        alert("Erreur : " + message);
                  };  
                  navigator.plugins.alarm.getUsersNbr("", success, failure);
            });               
      },
      getLastPage: function() {   
            this.pages.push(this.lastPage);          
      },
      setFirstPage: function() {          
            this.firstPage = 1;
            this.pages.unshift(this.firstPage);
      },
      setLastPage: function() {   
            if(this.nbrResult > 1)  {
                  this.lastPage = Math.trunc(this.nbrResult / this.limit);

                  if(this.nbrResult % this.limit > 1)  this.lastPage++;
            }              
      },
      setOtherPagesLimit: function() {   
            if( this.lastPage < this.otherPagesLimit)  {
                  this.otherPagesLimit = this.lastPage -  2;//retrait de la première et dernière pages dans le comptage
            }              
      },
      advancement: function(direction){         
            if(direction === "PREV"){
                  if(this.currentPage > this.firstPage)
                  {  
                        pagination.currentPage--;
                        pagination.offset -=  pagination.limit;
                  }                      
            }else{
                  if(this.currentPage < this.lastPage)
                  {  
                        pagination.currentPage++;
                        pagination.offset +=  pagination.limit;
                  }
            }           
      },
      navigation: function(direction, index = 0) {  
            this.pages = [];

            this.setFirstPage(); 
            this.setLastPage();   
            this.setOtherPagesLimit();
           
            if(direction === "PREV"){
                  this.advancement("PREV");

                  for(let i = this.otherPagesLimit; i >= 1; i--)   {
                        let index = this.currentPage - i;

                        if(index > 0) this.pages.push(index);                         
                  }   
            }
            else if(direction === "NEXT"){
                  this.advancement("NEXT");

                  for(let i = 1; i <= this.otherPagesLimit; i++)   {
                        let index = this.currentPage + i;
                        this.pages.push(index);   
                  }  
            }     
            else {
                  pagination.offset = (index -1) * pagination.limit;
                  pagination.currentPage = index;
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
      create: async function(){            
            await this.getUsersNbr().then((value) => {
                 this.nbrResult = value;
            });   

            if(this.currentPage == 0)  this.navigation("NEXT"); 
                           
            this.render();
      }   
}   