document.addEventListener("click", function(){
    document.querySelector(".modal").style.display = "flex";
  });

document.querySelector(".login").addEventListener("click",function() {
    document.querySelector(".modal2").style.display="flex";    
})
document.querySelector(".register2").addEventListener("click",function() {
    document.querySelector(".modal2").style.display="none";    
})
document.querySelector(".close").addEventListener("click",function() {
    document.querySelector(".modal").style.display="none";    
})
