document.addEventListener('DOMContentLoaded', () => {
  // Şarkı listesi
  const songs = [
    { src: "music/İnci Gibi.mp3", title: "İnci Gibi" },
    { src: "music/Aklımda Sen.mp3", title: "Aklımda Sen" },
    { src: "music/Ay İnanmıyorum.mp3", title: "Ay İnanmıyorum" },
    { src: "music/Kır Papatyası.mp3", title: "Kır Papatyası" },
    { src: "music/Esmerin Adı Oya (Sarışınlar Çat).mp3", title: "Esmerin Adı Oya (Sarışınlar Çat)" },
    { src: "music/Felaket.mp3", title: "Felaket" },
    { src: "music/MECBURUM.mp3", title: "MECBURUM" },
    { src: "music/Aman Güzel Yavaş Yürü.mp3", title: "Aman Güzel Yavaş Yürü" },
    { src: "music/Die With A Smile.mp3", title: "Die With A Smile" },
    { src: "music/Haydi Gel Benimle Ol.mp3", title: "Haydi Gel Benimle Ol" },
    { src: "music/Bu Kız.mp3", title: "Bu Kız" },
    { src: "music/Giderdi Hoşuma.mp3", title: "Giderdi Hoşuma" },
  ];

  let current = 0;
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPause');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const seekBar = document.getElementById('seekBar');
  const titleEl = document.getElementById('musicTitle');

  // Şarkı yükleme
  function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    titleEl.textContent = song.title;
    audio.load();
  }

  loadSong(current);

  // Play / Pause toggle
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶️';
    }
  });

  // Şarkı bitince otomatik olarak play ikonuna dön
  audio.addEventListener('ended', () => {
    current = (current + 1) % songs.length;
    loadSong(current);
    audio.play();
    playPauseBtn.textContent = '⏸️';
  });

  // Önceki - Sonraki
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % songs.length;
    loadSong(current);
    audio.play();
    playPauseBtn.textContent = '⏸️';
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + songs.length) % songs.length;
    loadSong(current);
    audio.play();
    playPauseBtn.textContent = '⏸️';
  });

  // Süre formatı
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  }

  // Şarkı süresi ve ilerleme çubuğu
  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    seekBar.value = Math.floor(audio.currentTime);
  });

  // İleri-geri sarma
  seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
  });
});

// 💖 Akan kalpler efekti
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💗';

  // Rastgele konum ve boyut
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (15 + Math.random() * 25) + 'px';
  heart.style.animationDuration = (4 + Math.random() * 4) + 's'; // düşme hızı

  document.body.appendChild(heart);

  // Belirli süre sonra DOM'dan kaldır
  setTimeout(() => heart.remove(), 8000);
}

// Belirli aralıklarla kalp oluştur
setInterval(createHeart, 400);

// 💌 Mektup Popup Kontrolleri
const letterBubble = document.getElementById('letterBubble');
const letterPopup = document.getElementById('letterPopup');

letterBubble.addEventListener('click', () => {
  letterPopup.style.display = 'flex';
  document.getElementById('messageCount').style.display = 'none';
});

letterPopup.addEventListener('click', (e) => {
  if (e.target === letterPopup) {
    letterPopup.style.display = 'none';
  }
});
