function main() {
  const generateButton = document.getElementById('generate');
  generateButton.onclick = generate;
}

function generate() {
  const mainDiv = document.getElementById('main');
  mainDiv.innerHTML += '<p>ABC 123</p>';
  mainDiv.innerHTML += '<p>DEF 456</p>';
  mainDiv.innerHTML += '<p>GHI 789</p>';
}

main();
