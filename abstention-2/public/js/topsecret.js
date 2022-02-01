async function loadTopSecret() {
  let headerHtml = await loadTemplate('templates/header.ejs', [])
  container.innerHTML = headerHtml;
  date();
  let topSecret = await loadTemplate('templates/topsecret.ejs', {})
    document.getElementById('screen').innerHTML = topSecret;

}

function autotab(original,destination){
  if (original.getAttribute&&original.value.length==original.getAttribute("maxlength")){
    destination.focus();
  }
}