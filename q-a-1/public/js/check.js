let img1 = document.getElementById("hidden-1");
let case1 = document.getElementById("case-1");

let img2 = document.getElementById("hidden-2");
let case2 = document.getElementById("case-2");

let img3 = document.getElementById("hidden-3");
let case3 = document.getElementById("case-3");

case1.addEventListener("click", () => {
  if(getComputedStyle(img1).display != "none"){
    img1.style.display = "none";
  } else {
    img1.style.display = "block";
  }
})

case2.addEventListener("click", () => {
    if(getComputedStyle(img2).display != "none"){
      img2.style.display = "none";
    } else {
      img2.style.display = "block";
    }
})

case3.addEventListener("click", () => {
    if(getComputedStyle(img3).display != "none"){
      img3.style.display = "none";
    } else {
      img3.style.display = "block";
    }
})



