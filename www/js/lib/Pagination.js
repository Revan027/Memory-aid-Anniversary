var pagination = {
      nbrResult: 0,
      offset: 0,
      limit: 10,  
      currentPage:1,
      lastPage: 0,
      firstPage: 0,
      otherPages: [],
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
      },
      getLastPage: function() {   
            if(this.nbrResult > 1)  {
                  this.lastPage = Math.trunc(this.nbrResult / this.limit);

                  if(this.nbrResult % this.limit > 1)  this.lastPage++;
            }              
      },
      getOtherPages: function(direction) {  
            this.otherPages = [];

            if(direction === "NEXT"){
                  for(let i = 1; i <= this.otherPagesLimit; i++)   {
                        let index = this.currentPage + i;
                        this.otherPages.push(index);   
                  }   
            }
            else
                  for(let i = this.otherPagesLimit; i >= 1; i--)   {
                        let index = this.currentPage - i;
                        this.otherPages.push(index);   
                  }   
      },    
      render: function(){  
            $(".pagination").append("<div class='pageIndex p-3'>"+this.firstPage+"</div>");

            for(let i = 0; i < this.otherPages.length; i++)   {
                  $(".pagination").append("<div class='pageIndex p-3'>"+this.otherPages[i]+"</div>");
            }   

            $(".pagination").append("<div class='pageIndex p-3'>"+this.lastPage+"</div>");
      },
      init: async function(){            
            await this.getUsersNbr().then((value) => {
                 this.nbrResult = value;
            });       
            this.getFirstPage();  
            this.getLastPage();
            if(this.currentPage == 1) this.getOtherPages("NEXT");
            this.render();
      }   
}   