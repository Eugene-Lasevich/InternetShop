// Список баннеров и текущий индекс
let advertisements = document.querySelectorAll('.advertisement');
let currentIndex = 0;

// Функция для смены баннеров с анимацией
function rotateBanners() {
    advertisements[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % advertisements.length;
    advertisements[currentIndex].classList.add('active');
}

// Функция для обработки фокуса страницы
function handlePageFocus() {
    if (document.hasFocus()) {
        rotateBanners();
    }
}

// Применение интервала смены баннеров
document.getElementById('apply-interval').addEventListener('click', function () {
    let rotationInterval = document.getElementById('rotation-interval').value;
    clearInterval(rotationTimer);
    rotationTimer = setInterval(rotateBanners, rotationInterval * 1000);
});

// Обработка фокуса страницы
let rotationTimer = setInterval(rotateBanners, 5000); // Начнем смену баннеров каждые 5 секунд
handlePageFocus(); // Вызываем для начала смены баннеров

window.addEventListener('focus', handlePageFocus);
window.addEventListener('blur', function () {
    clearInterval(rotationTimer); // Останавливаем смену баннеров, когда страница теряет фокус
});
