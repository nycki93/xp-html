function main() {
  const generateButton = document.getElementById('generate');
  generateButton.onclick = generate;
}

function generate() {
  const mainDiv = document.getElementById('main');
  for (let i = 0; i < 3; i += 1) {
    mainDiv.innerHTML += '<p>' + randomPlate() + '</p>';
  }
}

// no O, I, Q, or Z
const letters = 'ABCDEFGHJKLMNPRSTUVWXY';

// no 0
const numbers = '123456789'

function randomPlate() {
  const chars = [];
  for (let i = 0; i < 3; i += 1) {
    const n = Math.floor(Math.random() * letters.length);
    chars.push(letters[n]);
  }
  chars.push(' ');
  for (let i = 0; i < 3; i += 1) {
    const n = Math.floor(Math.random() * numbers.length);
    chars.push(numbers[n]);
  }
  return chars.join('');
}

main();
