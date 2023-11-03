// Функция для начала отсчета
function startCountdown() {
    // Получаем текущее время и время окончания отсчета (1 час в миллисекундах)
    let currentTime = Date.now();
    let endTime = currentTime + 3600000; // 1 час = 3600000 миллисекунд

    // Сохраняем время окончания отсчета в локальном хранилище
    localStorage.setItem('countdownEndTime', endTime);

    // Запускаем функцию обновления отображаемого времени
    updateCountdown();
}

// Функция для обновления отображаемого времени
function updateCountdown() {
    // Получаем время окончания отсчета из локального хранилища
    let endTime = localStorage.getItem('countdownEndTime');

    if (endTime) {
        // Вычисляем оставшееся время
        let currentTime = Date.now();
        let timeLeft = endTime - currentTime;

        // Преобразуем миллисекунды в минуты и секунды
        let minutes = Math.floor((timeLeft / 60000) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        // Отображаем оставшееся время
        let countdownElement = document.getElementById('countdown');
        countdownElement.textContent = minutes + ' минут ' + seconds + ' секунд';

        if (timeLeft <= 0) {
            countdownElement.textContent = 'Отсчет завершен';
        } else {
            // Обновляем отображаемое время каждую секунду
            setTimeout(updateCountdown, 1000);
        }
    }
}

// Проверяем, был ли ранее начат обратный отсчет
let endTime = localStorage.getItem('countdownEndTime');
if (endTime && Date.now() < endTime) {
    // Если обратный отсчет еще не завершен, запускаем его
    updateCountdown();
} else {
    // Иначе начинаем новый обратный отсчет
    startCountdown();
}
