const cssMount = document.getElementById('css-mount');

fetch('battery.css', { method: 'GET'})
  .then(response => response.text())
  .then(data => { cssMount.innerHTML = data;});
