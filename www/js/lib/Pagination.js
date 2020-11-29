var pagination = {
      nbrResult: 0,
      offset: 0,
      limit: 10,  
      currentPage: 0,
      lastPage: 0,
      firstPage: 1,
      pages: [],
      startPageLimit: 0,
      pageLimit: 4,

      create: async function(){            
            await this.getUsersNbr().then((value) => {
                 this.nbrResult = value;
            });   

            if(this.nbrResult < this.limit) return 0;

            if(this.currentPage == 0){  
                  this.initLastPage(); 
                  this.initLimitPage();       
                  this.createPages();              
            }                           
            this.render();
      },     
      getUsersNbr: async function(){  
            return new Promise(function(resolve, reject)  {                 
                  var success = function(message) {                
                        let nbrResult = message;
                        nbrResult = 184;
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
            }else if(index != 0){
                  this.offset = (index -1) * this.limit;
                  this.currentPage = index;
            }           
            this.createPages();    
      },   
      createPages: function() {          
            if(this.currentPage < this.startPageLimit){          
                  if(this.currentPage == 1)     this.startPageLimit = this.currentPage + 1;

                  else  this.startPageLimit = this.currentPage - 1;
            }else if(this.currentPage > this.pages[this.pages.length-2]){
                  if(this.currentPage == this.lastPage)    this.startPageLimit = this.currentPage - this.pageLimit;
                  
                  else   this.startPageLimit =  this.currentPage;                 
            }else if(this.currentPage == 0)    this.startPageLimit = this.firstPage + 1;     
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
            this.pages.push(this.lastPage);                   
      },   
      initLastPage: function() {   
            this.lastPage = Math.trunc(this.nbrResult / this.limit);

            if(this.lastPage > 0 && this.nbrResult % this.limit > 1)  this.lastPage++;         
      },   
      initLimitPage: function() {   
           if(this.lastPage < this.pageLimit)    this.pageLimit = this.lastPage;
      },   
      render: function(){  
            $(".pagination").append("<div class='prev'>prev</div>");
            
            for(let i = 0; i < this.pages.length; i++)   {
                  let classCurentPage ="";

                  if(this.currentPage == (this.pages[i])) classCurentPage = 'text-info';

                  $(".pagination").append("<div class='pageIndex p-3 "+classCurentPage+"'>"+this.pages[i]+"</div>");              
            }   
            $(".pagination").append("<div class='nextPage'>next</div>");           
      },    
}   