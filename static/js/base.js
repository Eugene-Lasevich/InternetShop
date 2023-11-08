// Функция для начала отсчета
function startCountdown() {
    let currentTime = Date.now();
    let endTime = currentTime + 3600000; // 1 час = 3600000 миллисекунд

    localStorage.setItem('countdownEndTime', endTime);

    updateCountdown();
}

function updateCountdown() {
    // Получаем время окончания отсчета из локального хранилища
    let endTime = localStorage.getItem('countdownEndTime');

    if (endTime) {
        // Вычисляем оставшееся время
        let currentTime = Date.now();
        let timeLeft = endTime - currentTime;

        let minutes = Math.floor((timeLeft / 60000) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        let countdownElement = document.getElementById('countdown');
        countdownElement.textContent = minutes + ' минут ' + seconds + ' секунд';

        if (timeLeft <= 0) {
            countdownElement.textContent = 'Отсчет завершен';
        } else {
            setTimeout(updateCountdown, 1000);
        }
    }
}

let endTime = localStorage.getItem('countdownEndTime');
if (endTime && Date.now() < endTime) {
    updateCountdown();
} else {
    // Иначе начинаем новый обратный отсчет
    startCountdown();
}
