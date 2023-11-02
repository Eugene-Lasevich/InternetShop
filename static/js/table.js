function createTable() {
    const tableSize = parseInt(document.getElementById("table-size").value);
    const table = document.getElementById("table");
    table.innerHTML = '';

    for (let i = 0; i < tableSize; i++) {
        const row = table.insertRow();
        for (let j = 0; j < tableSize; j++) {
            const cell = row.insertCell();
            cell.textContent = Math.floor(Math.random() * 100) + 1;
            cell.addEventListener("click", highlightCell); // Добавляем обработчик клика

        }
    }
}
function highlightCell(event) {
    const cell = event.target;

    if (cell.classList.contains("highlighted")) {
        cell.classList.remove("highlighted"); // Удаляем класс выделения
    } else {
        const cellValue = parseInt(cell.textContent);
        if (cellValue % 2 === 0) {
            cell.classList.add("highlighted-even"); // Добавляем класс для четных чисел
        } else {
            cell.classList.add("highlighted-odd"); // Добавляем класс для нечетных чисел
        }
    }
}

function addRow() {
    const table = document.getElementById("table");
    const newRow = table.insertRow();
    const tableSize = table.rows[0].cells.length; // Получаем текущий размер строки

    for (let j = 0; j < tableSize; j++) {
        const cell = newRow.insertCell();
        cell.textContent = Math.floor(Math.random() * 100) + 1;
    }
}

function addColumn() {
    const table = document.getElementById("table");
    const tableSize = table.rows.length;

    for (let i = 0; i < tableSize; i++) {
        const newCell = table.rows[i].insertCell();
        newCell.textContent = Math.floor(Math.random() * 100) + 1;
    }
}

function transposeTable() {
    const table = document.getElementById("table");
    const rows = table.rows;
    const numRows = rows.length;
    const numCols = rows[0].cells.length;

    if (numRows !== numCols) {
        alert("Нельзя транспонировать неквадратную таблицу");
        return;
    }

    const transposedTable = document.createElement("table");

    for (let i = 0; i < numCols; i++) {
        const newRow = transposedTable.insertRow();
        for (let j = 0; j < numRows; j++) {
            const cell = newRow.insertCell();
            cell.textContent = rows[j].cells[i].textContent;
        }
    }

    // Заменяем текущую таблицу на транспонированную
    table.parentNode.replaceChild(transposedTable, table);
    transposedTable.id = "table"; // Присваиваем новой таблице тот же id
}


function applyMaxHighlights() {
    const maxHighlights = parseInt(document.getElementById("max-highlights").value);
    const table = document.getElementById("table");

    const rows = table.rows;
    const numRows = rows.length;
    const numCols = rows[0].cells.length;

    // Сбрасываем выделение предыдущих ячеек
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            rows[i].cells[j].classList.remove("highlighted");
        }
    }

    // Выделение не более n ячеек в каждой строке
    for (let i = 0; i < numRows; i++) {
        let highlightedCount = 0;

        for (let j = 0; j < numCols; j++) {
            const cell = rows[i].cells[j];

            // Проверяем, можно ли выделить данную ячейку
            if (!cell.classList.contains("highlighted") && highlightedCount < maxHighlights) {
                const leftNeighbor = j > 0 ? rows[i].cells[j - 1] : null;
                const rightNeighbor = j < numCols - 1 ? rows[i].cells[j + 1] : null;

                // Проверяем, что соседние ячейки не выделены
                if ((!leftNeighbor || !leftNeighbor.classList.contains("highlighted")) &&
                    (!rightNeighbor || !rightNeighbor.classList.contains("highlighted"))) {
                    cell.classList.add("highlighted");
                    highlightedCount++;
                }
            }
        }
    }
}



function processDate() {
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    if (month && day) {
        if (isSummerMonth(month)) {
            writeToFile("summer.txt", `${month} ${day}\n`);
        } else {
            writeToFile("winter.txt", `${month} ${day}\n`);
        }

        // Очистить введенные значения после обработки
        document.getElementById("month").value = "";
        document.getElementById("day").value = "";
    }
}

function isSummerMonth(month) {
    // Здесь определите, какие месяцы считать летними (например, май, июнь, июль)
    const summerMonths = ["май", "июнь", "июль"];
    return summerMonths.includes(month);
}

const summerMonths = {
    "июнь": 30,
    "июль": 31,
    "август": 31
};

const winterMonths = {
    "декабрь": 31,
    "январь": 31,
    "февраль": 27
};

function processDates() {
    const input = document.getElementById("dates").value;
    const datePairs = input.split(","); // Разделение введенных данных по запятым

    const validData = []; // Для хранения только корректных данных

    for (const datePair of datePairs) {
        const [month, day] = datePair.trim().split(" "); // Разделение месяца и числа по пробелу
        if (month && day) {
            const monthLowerCase = month.toLowerCase();
            if (isValidMonth(monthLowerCase) && isValidDay(monthLowerCase, day)) {
                validData.push({ month: monthLowerCase, day: day });
            }
        }
    }

    const summerData = {};
    const winterData = {};

    for (const entry of validData) {
        if (summerMonths.hasOwnProperty(entry.month)) {
            summerData[entry.month] = entry.day;
        } else if (winterMonths.hasOwnProperty(entry.month)) {
            winterData[entry.month] = entry.day;
        }
    }

    if (Object.keys(summerData).length > 0) {
        writeDatesToFile("summer_months.txt", summerData);
    }

    if (Object.keys(winterData).length > 0) {
        writeDatesToFile("winter_months.txt", winterData);
    }
}

function isValidMonth(month) {
    return summerMonths.hasOwnProperty(month) || winterMonths.hasOwnProperty(month);
}

function isValidDay(month, day) {
    const daysInMonth = summerMonths[month] || winterMonths[month];
    return day >= 1 && day <= daysInMonth;
}

function writeDatesToFile(filename, data) {
    let content = "";
    for (const month in data) {
        content += `${month} ${data[month]}\n`;
    }

    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function clearField() {
    document.getElementById("dates").value = "";
}