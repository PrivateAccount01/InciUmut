// Fotoğraf sayısını belirleyin (Örneğin, 20 fotoğraf)
const numberOfPhotos = 15;

// Fotoğraf yolunu dinamik olarak oluşturun
const sliderPhotos = [];
for (let i = 1; i <= numberOfPhotos; i++) {
  // Her fotoğrafın adını 'photo1.jpg', 'photo2.jpg' şeklinde oluşturuyoruz
  sliderPhotos.push(`slidingphoto/photo${i}.jpg`);
}

// Fotoğrafları dinamik olarak yükleyin
let currentSlide = 0;
const sliderImage = document.getElementById('sliderImage');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let sliderInterval;

// Fotoğrafı Güncelleme
function showSlide(index) {
  sliderImage.style.opacity = 0; // Fade-out efekti
  setTimeout(() => {
    sliderImage.src = sliderPhotos[index];
    sliderImage.style.opacity = 1; // Fade-in efekti
  }, 300);
}

// Sonraki Fotoğraf
function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderPhotos.length;
  showSlide(currentSlide);
}

// Önceki Fotoğraf
function prevSlide() {
  currentSlide = (currentSlide - 1 + sliderPhotos.length) % sliderPhotos.length;
  showSlide(currentSlide);
}

// Otomatik Kaydırma Başlat
function startSlider() {
  sliderInterval = setInterval(nextSlide, 4000); // 4 saniyede bir geçiş
}

// Otomatik Kaydırma Durdur ve Tekrar Başlat
function resetSliderInterval() {
  clearInterval(sliderInterval);
  startSlider();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetSliderInterval();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetSliderInterval();
});

// Başlangıçta İlk Fotoğrafı Göster ve Otomatik Kaydırma Başlat
showSlide(currentSlide);
startSlider();
