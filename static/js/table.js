
const table = document.getElementById("myTable");
let maxSelection = 1;
let selectedCells = new Set();

// Генерация случайного числа от 1 до 10
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Генерация случайной квадратной таблицы
function generateTable() {
    const tableSizeInput = document.getElementById("table-size");
    const tableSize = parseInt(tableSizeInput.value);

    // Проверка, что введенное значение является положительным числом
    if (!isNaN(tableSize) && tableSize > 0) {
        const table = document.getElementById("myTable");
        table.innerHTML = "";
        selectedCells.clear();

        for (let i = 0; i < tableSize; i++) {
            const row = table.insertRow(i);
            for (let j = 0; j < tableSize; j++) {
                const cell = row.insertCell(j);
                cell.innerText = getRandomNumber();
                cell.addEventListener("click", () => toggleCellSelection(cell));
            }
        }
    } else {
        alert("Please enter a valid positive number for Table Size.");
    }
}


// Транспонирование таблицы
function transposeTable() {
  const rows = table.rows;
  const columns = [];
  for (let i = 0; i < rows[0].cells.length; i++) {
    columns.push(Array.from({ length: rows.length }, (_, j) => rows[j].cells[i]));
  }
  table.innerHTML = "";
  for (const column of columns) {
    const row = table.insertRow();
    for (const cell of column) {
      row.appendChild(cell.cloneNode(true));
    }
  }

  let rowss = table.getElementsByTagName("tr");


  for (let i = 0; i < rowss.length; i++) {
    let _cells = rowss[i].getElementsByTagName("td");
    for (let j = 0; j < _cells.length; j++) {
        table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].addEventListener("click", () => toggleCellSelection(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j]));

    }
  }
}

// Выделение ячейки
function toggleCellSelection(cell) {
  const value = parseInt(cell.innerText, 10);
  console.log(cell.classList)
  if (!cell.classList.contains("selected") && !cell.classList.contains("selected-even")) {
    if (canSelectCell(cell)) {
        if (value % 2 == 0) {
            cell.classList.add("selected-even");
        } else {
            cell.classList.add("selected");
        }
        selectedCells.add(cell);
    }
  } else if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
    if (value % 2 == 0) {
      cell.classList.remove("selected-even");
    } else {
        cell.classList.remove("selected");
    }
    selectedCells.delete(cell);
  }
}

// Проверка, можно ли выделить ячейку

function canSelectCell(cell) {

  const rowIndex = cell.parentNode.rowIndex;
  const cellIndex = cell.cellIndex;

  const row = cell.parentNode;
  const cellsInRow = row.cells;

  let r = check_row(rowIndex);
  let c = check_collumn(cellIndex);
  let n1 = check_up(rowIndex, cellIndex);
  let n2 = check_down(rowIndex, cellIndex);
  let n3 = check_left(rowIndex, cellIndex);
  let n4 = check_right(rowIndex, cellIndex);

  //console.log(r, c);
  //console.log(n1, n2, n3, n4);

  return r && c && n1 && n2 && n3 && n4;


}

function check_row(i) {
    let t = document.getElementById("myTable");
    let rows = t.getElementsByTagName("tr");
    let row = rows[i];
    let cells = row.getElementsByTagName("td");

    let count = 0;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("selected") || cells[i].classList.contains("selected-even")) {
            count++;
        }
    }

    return count < maxSelection;
}

function check_collumn(j) {
    let t = document.getElementById("myTable");
    let rows = t.getElementsByTagName("tr");

    let count = 0;

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        if (cells[j].classList.contains("selected") || cells[j].classList.contains("selected-even")) {
            count++;
        }
    }

    return count < maxSelection;
}

function check_up(i, j) {
    if (i == 0)
      return true;

    let t = document.getElementById("myTable");
    let rows = t.getElementsByTagName("tr");
    let row = rows[i-1];
    let cells = rows[i - 1].getElementsByTagName("td");
    let cell = cells[j];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

function check_down(i, j) {
    if (i + 1 == document.getElementById("myTable").getElementsByTagName("tr").length)
      return true;

    let t = document.getElementById("myTable");
    let rows = t.getElementsByTagName("tr");
    let row = rows[i+1];
    let cells = rows[i + 1].getElementsByTagName("td");
    let cell = cells[j];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

function check_right(i, j) {
    if (j + 1 == document.getElementById("myTable").getElementsByTagName("tr")[i].getElementsByTagName("td").length)
      return true;

    let t = document.getElementById("myTable");
    let rows = t.getElementsByTagName("tr");
    let row = rows[i];
    let cells = rows[i].getElementsByTagName("td");
    let cell = cells[j + 1];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

function check_left(i, j) {
    if (j == 0)
      return true;

    let t = document.getElementById("myTable");
    let rows = t.getElementsByTagName("tr");
    let row = rows[i];
    let cells = rows[i].getElementsByTagName("td");
    let cell = cells[j - 1];

    if (cell.classList.contains("selected") || cell.classList.contains("selected-even")) {
      return false;
    } else {
      return true;
    }
}

// Установить максимальное количество выбранных ячеек
function setMaxSelection() {
  const input = document.getElementById("maxSelection");
  maxSelection = parseInt(input.value, 10);
  resetSelection();
}

// Сбросить выделение
function resetSelection() {
  for (const cell of selectedCells) {
    cell.classList.remove("selected");
    const value = parseInt(cell.innerText, 10);
    if (value % 2 === 0) {
      cell.classList.remove("selected-even");
    }
  }
  selectedCells.clear();
}

// Добавить новый ряд
function addRow() {
  const newRow = table.insertRow(table.rows.length);
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const cell = newRow.insertCell(i);
    cell.innerText = getRandomNumber();
    cell.addEventListener("click", () => toggleCellSelection(cell));
  }
}

// Добавить новую колонку
function addColumn() {
  for (let i = 0; i < table.rows.length; i++) {
    const cell = table.rows[i].insertCell(table.rows[i].cells.length);
    cell.innerText = getRandomNumber();
    cell.addEventListener("click", () => toggleCellSelection(cell));
  }
}

//-----------------------------------------------------------------------------------------------------------------


const summerMonths = {
    "июнь": 30,
    "июль": 31,
    "август": 31
};

const winterMonths = {
    "декабрь": 31,
    "январь": 31,
    "февраль": 28
};

function processDates() {
    const input = document.getElementById("dates").value;
    const datePairs = input.split(",");

    const validData = [];

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


//----------------------------------------------------------------------------------------
const image = document.getElementById('image');
const rotateSlider = document.getElementById('rotate-slider');
const sizeSlider = document.getElementById('size-slider');

rotateSlider.addEventListener('input', () => {
    const rotateValue = rotateSlider.value;
    image.style.transform = `rotate(${rotateValue}deg) scale(${sizeSlider.value / 100})`;
});

sizeSlider.addEventListener('input', () => {
    const sizeValue = sizeSlider.value;
    image.style.transform = `rotate(${rotateSlider.value}deg) scale(${sizeValue / 100})`;
});


//------------------------------------------------------------------------------------
let counterValue = 0;

function updateCounter() {
    document.getElementById("counter").textContent = counterValue.toString(2);
}

document.getElementById("increment").addEventListener("click", function () {
    counterValue = counterValue + 1;
    updateCounter();
});

document.getElementById("decrement").addEventListener("click", function () {
    counterValue = counterValue - 1;
    updateCounter();
});

updateCounter();
