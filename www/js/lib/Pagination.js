var pagination = {
      nbrResult: 0,
      offset: 0,
      limit: 10,  
      currentPage:0,
      lastPage: 0,
      firstPage: 1,
      pages: [],
      startPageLimit:0,
      pageLimit:4,

      init: function(){   
            this.startPageLimit = this.firstPage + 1;

            if( this.lastPage > 0)  {
                  for(let i = 0; i < this.pageLimit; i++){
                        this.pages[i] =  this.startPageLimit + i;
                  }
            }      
      },
      create: async function(){            
            await this.getUsersNbr().then((value) => {
                 this.nbrResult = value;
            });   

            if(this.currentPage == 0){  
                  this.getLastPage();                   
                  this.init(); 
                  this.addFirstPage();   
                  this.addLastPage();
                  this.currentPage++;   
            }                           
            this.render();
      },     
      getUsersNbr: async function(){  
            return new Promise(function(resolve, reject)  {                 
                  var success = function(message) {                
                        let nbrResult = message;
                        nbrResult = 63;
                        resolve(nbrResult);   
                  };
                  var failure = function(message) {
                        alert("Erreur : " + message);
                  };  
                  navigator.plugins.alarm.getUsersNbr("", success, failure);
            });               
      },
      advancement: function(direction,index = 0){         
            if(direction === "PREV" && this.currentPage > this.firstPage){
                  this.currentPage--;
                  this.offset -= this.limit;                  
            }else if(direction === "NEXT" && this.currentPage < this.lastPage){
                  this.currentPage++;
                  this.offset += this.limit;
            }else {
                  this.offset = (index -1) * this.limit;
                  this.currentPage = index;
            }           
            this.setOtherPagesLimit();           
      },   
      setOtherPagesLimit: function() {          
            if(this.currentPage < this.startPageLimit){          
                  if(this.currentPage == 1)     this.startPageLimit = this.currentPage + 1;

                  else  this.startPageLimit = this.currentPage - 1;
            }else if(this.currentPage > this.pages[this.pages.length-2]){
                  if(this.currentPage == this.lastPage)    this.startPageLimit = this.currentPage - this.pageLimit;
                  
                  else   this.startPageLimit =  this.currentPage;                 
            }           
            this.pages = [];
            let j = 0;
          
            for(let i = 0; i < this.pageLimit; i++){    
                  let page = this.startPageLimit+i;  

                  if(page < this.lastPage && page > this.firstPage) {
                        this.pages[j] = page;  
                        j++;  
                  }                          
            }                                       
            this.addFirstPage();            
            this.addLastPage();
      },
      addFirstPage: function() {          
            this.pages.unshift(this.firstPage);          
      },
      addLastPage: function() {   
            if(this.lastPage > 0 ) this.pages.push(this.lastPage);                   
      },   
      getLastPage: function() {   
            if(this.nbrResult > 1)  {
                  this.lastPage = Math.trunc(this.nbrResult / this.limit);

                  if(this.lastPage > 0 && this.nbrResult % this.limit > 1)  this.lastPage++;
            }              
      },   
      render: function(){  
            for(let i = 0; i < this.pages.length; i++)   {
                  let classCurentPage ="";

                  if(this.currentPage == (this.pages[i])) classCurentPage = 'text-info';

                  $(".pagination").append("<div class='pageIndex p-3 "+classCurentPage+"'>"+this.pages[i]+"</div>");              
            }   
      },    
}   