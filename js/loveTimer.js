const startDate = new Date("2024-10-11T00:00:00");

function updateTimer() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  // Negatif farkları düzelt
  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }

  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }

  if (months < 0) { months += 12; years--; }

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();


// === ANA SAYFA / YILDÖNÜMÜ KONTROLÜ ===
function checkAnniversaryRedirect() {
  const now = new Date();
  const startDate = new Date("2024-10-11T00:00:00");
  const diff = now - startDate;
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const oneYear = 365;

 const anniversaryLink = document.getElementById("anniversary-link");
  if (anniversaryLink) anniversaryLink.style.display = "none"; // varsayılan gizli

  // 🔹 Tam 1 yıl dolduysa (365 ≤ gün < 366)
  if (diffDays >= oneYear && diffDays < oneYear + 1) {
    if (anniversaryLink) anniversaryLink.style.display = "block"; // link görünür

    // Sadece ilk defa girildiğinde yönlendir
    const redirectedToday = localStorage.getItem("anniversaryRedirectDate");
    const today = now.toISOString().split("T")[0];

    if (redirectedToday !== today && !window.location.href.includes("yildonumu.html")) {
      localStorage.setItem("anniversaryRedirectDate", today);
      window.location.href = "yildonumu.html";
    }
  }

  // 🔹 1 gün geçtikten sonra (366. günden itibaren)
  else if (diffDays >= oneYear + 1) {
    if (anniversaryLink) anniversaryLink.style.display = "block"; // artık kalıcı görünür
  }

  // 🔹 1 yıldan önce
  else {
    if (anniversaryLink) anniversaryLink.style.display = "none"; // gizli
  }
}

document.addEventListener("DOMContentLoaded", checkAnniversaryRedirect);
