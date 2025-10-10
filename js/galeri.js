document.addEventListener('DOMContentLoaded', function () {
  const yearDropdownLinks = document.querySelectorAll('.dropdown-item');
  const yearButtonsContainer = document.getElementById('year-buttons-container');
  const photoContainer = document.getElementById('photo-container');

  // Yıl seçildiğinde, o yılın ay butonlarını yükle
  yearDropdownLinks.forEach(link => {
      link.addEventListener('click', function (e) {
          const selectedYear = e.target.getAttribute('data-year');
          loadMonthButtons(selectedYear);  // Ay butonlarını yükle
      });
  });

  // Yıl butonlarını dinamik olarak yükle
  function loadMonthButtons(year) {
      yearButtonsContainer.innerHTML = '';  // Önceki butonları temizle
      const months = getMonthsForYear(year);  // Yıl için ayları al
      months.forEach(month => {
          const monthButton = document.createElement('button');
          monthButton.textContent = month;
          monthButton.classList.add('year-button', 'btn', 'btn-primary', 'mx-2', 'my-2');
          monthButton.style.borderRadius = '25px';  // Yuvarlak butonlar
          monthButton.style.transition = 'all 0.3s ease';  // Yumuşak geçiş

          // Butona tıklayınca fotoğrafları yükle
          monthButton.addEventListener('click', function () {
              loadPhotos(year, month);  // Fotoğrafları yükle
          });
          yearButtonsContainer.appendChild(monthButton);
      });
  }

  // Dinamik fotoğraf yükleme
  let photos = []; // Global array
  let currentIndex = 0;
  
  function loadPhotos(year, month) {
    photoContainer.innerHTML = '';
    photos = getPhotosForMonth(year, month);
  
    photos.forEach((photo, index) => {
      const photoItem = document.createElement('div');
      photoItem.classList.add('photo-item');
      photoItem.style.backgroundImage = `url('/images/${year}/${month}/${photo}')`;
  
      // Fade-in animasyonu için gecikme veriyoruz
      setTimeout(() => {
        photoItem.classList.add('show');
      }, index * 100); // 100ms gecikme ile sırayla gelir
  
      // Modal açma
      photoItem.addEventListener('click', () => {
        openModal(index, year, month);
      });
  
      photoContainer.appendChild(photoItem);
    });
  }
  
  
  

  // Yıl için ayları döndüren fonksiyon (manuel veri kullanıyoruz)
  function getMonthsForYear(year) {
      if (year === '2024') {
          return [
             '09.2024', '10.2024','11.2024', '12.2024'
          ];
      } else if (year === '2025') {
          return [
              '01.2025', '02.2025', '03.2025','04.2025', '05.2025', '06.2025', '07.2025', '08.2025', '09.2025'
          ];
      }
      return [];
  }


  
  // Fotoğrafları dinamik olarak almak için bir fonksiyon
  function getPhotosForMonth(year, month) {
    const photoFolderPath = `/images/${year}/${month}/`;

    // Burada bir değişkenle fotoğraf sayısını ayarlıyoruz
    const photoCount = 35;  // Fotoğraf sayısını buradan kontrol edebilirsiniz

    const photos = [];
    for (let i = 1; i <= photoCount; i++) {
      photos.push(`photo${i}.jpg`);  // Dinamik olarak fotoğraf isimlerini ekliyoruz
    }

    return photos;
  }
// Modal aç
let currentYear = '';
let currentMonth = '';

function openModal(index, year, month) {
    currentIndex = index;
    currentYear = year;
    currentMonth = month;
  
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    
    modal.style.display = "flex"; // Ortalamak için flex kullandık
    modalImg.src = `/images/${year}/${month}/${photos[currentIndex]}`;
  }
  
// Sağ ok - Sonraki fotoğraf
document.querySelector('.next').addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= photos.length) currentIndex = 0; // Döngüsel olsun
    updateModalPhoto();
  });
  
  // Sol ok - Önceki fotoğraf
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = photos.length - 1; // Döngüsel olsun
    updateModalPhoto();
  });
  
  // Modalı kapatma
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('photoModal').style.display = "none";
  });
  
  // Fotoğrafı güncelleme
  function updateModalPhoto() {
    const modalImg = document.getElementById('modalImg');
    modalImg.src = `/images/${currentYear}/${currentMonth}/${photos[currentIndex]}`;
  }
  
  
  // Modal kapatma
  const closeModal = document.querySelector('.close');
  closeModal.addEventListener('click', () => {
    const modal = document.getElementById('photoModal');
    modal.style.display = "none";
  });
  
  // Modal dışında tıklanınca kapansın
  const modal = document.getElementById('photoModal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  


});



