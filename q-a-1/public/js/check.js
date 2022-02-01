let img1 = document.getElementById("hidden-1");
let case1 = document.getElementById("case-1");

let img2 = document.getElementById("hidden-2");
let case2 = document.getElementById("case-2");

let img3 = document.getElementById("hidden-3");
let case3 = document.getElementById("case-3");

let img4 = document.getElementById("hidden-4");
let case4 = document.getElementById("case-4");

let img5 = document.getElementById("hidden-5");
let case5 = document.getElementById("case-5");

let po_up_window =document.getElementById("po_up_window");
let po_up_exit=document.getElementById("po_up_exit");
let case6 = document.getElementById("po_up_exit");

var num=0;

case1.addEventListener("click", () => {
  if(getComputedStyle(img1).display != "none"){
    img1.style.display = "none";
    num-=1;
  } else {
    num+=1;
    img1.style.display = "block";
    if(num!=5){
        po_up_window.style.display="none";
        po_up_exit.style.display="none";
    }else {
        po_up_window.style.display="block";
        po_up_exit.style.display="block";
    }
  }
})

case2.addEventListener("click", () => {
    if(getComputedStyle(img2).display != "none"){
      img2.style.display = "none";
      num-=1;
    } else {
        num+=1;
      img2.style.display = "block";
        if(num!=5){
            po_up_window.style.display="none";
            po_up_exit.style.display="none";
        }else {
            po_up_window.style.display="block";
            po_up_exit.style.display="block";
        }
    }
})

case3.addEventListener("click", () => {
    if(getComputedStyle(img3).display != "none"){
      img3.style.display = "none";
      num-=1;
    } else {
        num+=1;
      img3.style.display = "block";
        if(num!=5){
            po_up_window.style.display="none";
            po_up_exit.style.display="none";
        }else {
            po_up_window.style.display="block";
            po_up_exit.style.display="block";
        }
    }
})

case4.addEventListener("click", () => {
  if(getComputedStyle(img4).display != "none"){
    img4.style.display = "none";
    num-=1;
  } else {
      num+=1;
    img4.style.display = "block";
      if(num!=5){
          po_up_window.style.display="none";
          po_up_exit.style.display="none";
      }else {
          po_up_window.style.display="block";
          po_up_exit.style.display="block";
      }
  }
})

case5.addEventListener("click", () => {
  if(getComputedStyle(img5).display != "none"){
    img5.style.display = "none";
    num-=1;
  } else {
      num+=1;
    img5.style.display = "block";
      if(num!=5){
          po_up_window.style.display="none";
          po_up_exit.style.display="none";
      }else {
          po_up_window.style.display="block";
          po_up_exit.style.display="block";
      }
  }
})

case6.addEventListener("click",()=>{
    po_up_window.style.display="none";
    po_up_exit.style.display="none";
})







