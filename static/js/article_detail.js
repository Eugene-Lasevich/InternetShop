function openSettingsWindow(parentWindow) {
    var newWindow = window.open('', 'Настройки', 'width=400,height=300');

    var settingsForm = document.createElement('form');
    settingsForm.id = 'style-form';

    settingsForm.innerHTML = `
        <label for="font-size">Размер шрифта:</label>
        <select id="font-size" name="font-size">
            <option value="12px">12px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
        </select>
        
        <label for="text-color">Цвет текста:</label>
        <input type="color" id="text-color" name="text-color">
        
        <label for="background-color">Цвет фона страницы:</label>
        <input type="color" id="background-color" name="background-color">
        
        <input type="submit" value="Применить">
    `;

    newWindow.document.body.appendChild(settingsForm);

    settingsForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var fontSize = newWindow.document.getElementById('font-size').value;
        var textColor = newWindow.document.getElementById('text-color').value;
        var backgroundColor = newWindow.document.getElementById('background-color').value;

         var content = document.querySelector('.content');

    content.style.fontSize = fontSize;
    content.style.color = textColor;
    content.style.backgroundColor = backgroundColor;
    });
}
