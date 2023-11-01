// Функция для начала отсчета
function startCountdown() {
    // Получаем текущее время и время окончания отсчета (1 час в миллисекундах)
    var currentTime = Date.now();
    var endTime = currentTime + 3600000; // 1 час = 3600000 миллисекунд

    // Сохраняем время окончания отсчета в локальном хранилище
    localStorage.setItem('countdownEndTime', endTime);

    // Запускаем функцию обновления отображаемого времени
    updateCountdown();
}

// Функция для обновления отображаемого времени
function updateCountdown() {
    // Получаем время окончания отсчета из локального хранилища
    var endTime = localStorage.getItem('countdownEndTime');

    if (endTime) {
        // Вычисляем оставшееся время
        var currentTime = Date.now();
        var timeLeft = endTime - currentTime;

        // Преобразуем миллисекунды в минуты и секунды
        var minutes = Math.floor((timeLeft / 60000) % 60);
        var seconds = Math.floor((timeLeft / 1000) % 60);

        // Отображаем оставшееся время
        var countdownElement = document.getElementById('countdown');
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
var endTime = localStorage.getItem('countdownEndTime');
if (endTime && Date.now() < endTime) {
    // Если обратный отсчет еще не завершен, запускаем его
    updateCountdown();
} else {
    // Иначе начинаем новый обратный отсчет
    startCountdown();
}
