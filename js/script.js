function sendDataToPHP(x, y, R) {
    const url = `./php/script.php?x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&R=${encodeURIComponent(R)}`;
    console.log(url);
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(result => {
            // Вывод результатов в таблицу
            addToResultTable(x, y, R, result);
        })
        .catch(error => {
            console.error(error);
        });
    }    
function addToResultTable(x, y, R, result) {
    const table = document.getElementById('result-table');

    const row = table.insertRow(-1);
    const xCell = row.insertCell(0);
    const yCell = row.insertCell(1);
    const RCell = row.insertCell(2);
    const resultCell = row.insertCell(3);
    const timeCell = row.insertCell(4);
    const executeTimeCell = row.insertCell(5);

    xCell.textContent = x;
    yCell.textContent = y;
    RCell.textContent = R;
    resultCell.textContent = result.collision;
    timeCell.textContent = `${parseFloat(result.exectime).toFixed(2)} s`;
    executeTimeCell.textContent= getCurrentTime();

    saveToLocalStorage();
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function saveToLocalStorage() {
    const formData = new FormData(document.getElementById('form'));
    const table = document.getElementById('result-table');
    const serializedData = JSON.stringify(Object.fromEntries(formData));
    localStorage.setItem('formValues', serializedData);

    const tableData = [];
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = {
            x: row.cells[0].textContent,
            y: row.cells[1].textContent,
            R: row.cells[2].textContent,
            collision: row.cells[3].textContent,
            exectime: row.cells[4].textContent
        };
        tableData.push(rowData);
    }
    const serializedTableData = JSON.stringify(tableData);
    localStorage.setItem('tableData', serializedTableData);
}

function loadFromLocalStorage() {
    const serializedData = localStorage.getItem('formValues');
    const table = document.getElementById('result-table');
    const tableData = JSON.parse((localStorage.getItem('tableData')));

    if (serializedData && tableData) {
        try {
            const formData = JSON.parse(serializedData);
            const form = document.getElementById('form');

            for (const [name, value] of Object.entries(formData)) {
                const input = form.elements[name];
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = value === 'on';
                    } else {
                        input.value = value;
                    }
                }
            }

            for (const rowData of tableData) {
                const row = table.insertRow(-1);
                const xCell = row.insertCell(0);
                const yCell = row.insertCell(1);
                const RCell = row.insertCell(2);
                const resultCell = row.insertCell(3);
                const timeCell = row.insertCell(4);
                const executeTimeCell = row.insertCell(5);

                xCell.textContent = rowData.x;
                yCell.textContent = rowData.y;
                RCell.textContent = rowData.R;
                resultCell.textContent = rowData.collision;
                timeCell.textContent = rowData.exectime;
                executeTimeCell.textContent = getCurrentTime();
            }
        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    }
}


function validateValues(y, R) {
    if (isNaN(y) || isNaN(R)) {
        showError('Please enter numeric values for x, y, and R');
        return false;
    }
    if (y < -3){
        showError("y need be >-3", 3000);
        return false;
    }
    if (y > 5){
        showError("y  need be <5", 3000);
        return false;
    }
    if (R > 4){
        showError("R need be <4", 3000);
        return false;
    }
    if (R < 1){
        showError("R  need be >1", 3000);
        return false;
    }

    return true;
}

function showError(message) {
    const errorDiv = document.getElementById('error_div');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(function () {
        errorDiv.style.display = 'none';
    }, 3000);
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const xCheckboxes = document.querySelectorAll('.x_val');
    const y = document.querySelector('input[name="y_field"]').value;
    const R = document.querySelector('input[name="R_field"]').value;

    if (!validateValues(y, R)) {
        return;
    }

    for (const checkbox of xCheckboxes) {
        if (checkbox.checked) {
            const x = checkbox.value;
            sendDataToPHP(parseFloat(x), parseFloat(y), parseFloat(R));
        }
    }

    saveToLocalStorage();
});

window.addEventListener('load', function () {
    loadFromLocalStorage();
});
