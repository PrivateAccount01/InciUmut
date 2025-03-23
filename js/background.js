// Arka plan sayısını belirleyin (Örneğin, 3 arka plan)
const numberOfBackgrounds = 5;

// Arka plan resimlerini dinamik olarak oluşturun
const backgrounds = [];
for (let i = 1; i <= numberOfBackgrounds; i++) {
  // Her arka planın adını 'arka1.jpeg', 'arka2.jpeg' şeklinde oluşturuyoruz
  backgrounds.push(`background/arka${i}.jpeg`);
}

let current = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url('${backgrounds[current]}')`;
  current = (current + 1) % backgrounds.length;
}

setInterval(changeBackground, 10000);
changeBackground();
