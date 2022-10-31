function loadHtml(id, path) {
  console.log(`div id : ${id}, filename : ${path}`);

  const divEle = document.getElementById("loadcssjs");

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `${path}.js`;

  divEle.appendChild(script);

  divEle.innerHTML = `<link rel="stylesheet" href="${path}.css" />`;

  let xhttp;
  let element = document.getElementById(id);
  let file = `${path}.html`;
  if (file) {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          element.innerHTML = this.responseText;
        }
        if (this.status == 404) {
          element.innerHTML = "<h1>Page not found!</h1>";
        }
      }
    };
    xhttp.open("GET", `${path}.html`, true);
    xhttp.send();

    return;
  }
}
