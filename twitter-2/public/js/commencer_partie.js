window.onload = () => {
  window.scrollTo(0, 25);

  let a = [];
  sessionStorage.setItem("alreadyGivenCandidates", a);

  document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  document.getElementById("commencer").addEventListener("click", () => {
    window.location.href = "./question.html";
    sessionStorage.setItem("score", "");
  });
}