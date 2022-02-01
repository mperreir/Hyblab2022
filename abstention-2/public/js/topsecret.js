async function loadTopSecret() {
  let headerHtml = await loadTemplate('templates/header.ejs', [])
  container.innerHTML = headerHtml;
  date();
  let topSecret = await loadTemplate('templates/topsecret.ejs', {})
    document.getElementById('screen').innerHTML = topSecret;
}