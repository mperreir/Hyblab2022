function loadheader(){
    const logo = document.getElementById("logo");
    const img = document.createElement("img");
    img.src = "img/logo/logo first.svg";
    img.id = "ok";
    logo.appendChild(img);
}

loadheader();