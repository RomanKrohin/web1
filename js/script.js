const form = document.getElementById('form');
const table = document.getElementById('result-table');
const error_div = document.getElementById('error_div');
const checkbox = document.getElementById('checkbox');

function showError(msg, delay){
    error_div.innerText = msg;

    setTimeout(function(){
        error_div.innerText = "";
    }, delay);
}

const x_values = new Set();

window.addEventListener('load', function() {
    if (localStorage.getItem('tableData')) {
      table.innerHTML= JSON.parse(localStorage.getItem('tableData'));
    }
    if (localStorage.getItem('y_value')) {
        document.getElementById('y_field').value = localStorage.getItem('y_value');
    }
    if (localStorage.getItem('R_value')) {
        document.getElementById('R_field').value = localStorage.getItem('R_value');
    } 
});
  
form.addEventListener('input', function(){
    const formData = new FormData(form);
    localStorage.setItem('y_value', formData.get('y_field'));
    localStorage.setItem('R_value', formData.get('R_field'));
});

document.querySelectorAll(".x_val").forEach(function(button){
    button.addEventListener("click", handler);
});

function handler(event){
    const value = event.target.value;

    if (x_values.has(value)) {
        x_values.delete(value);
    } else {
        x_values.add(value);
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = new FormData(form);
    const y = formData.get('y_field');
    const R = formData.get('R_field');

    if (x_values.size == 0 || y == null || R == null) {
        showError("Check fields", 3000);
    }
 
    for (const value of x_values){
        formData.append('x_field', value);
        const queryString = new URLSearchParams(formData).toString();
        const url = `php/script.php?${queryString}`;
        console.log(value);
        if (value >= -2 && value <= 2 && y > -3 && y < 5 && R > 1 && R < 4){
            fetch(url, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const curTime = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
                const content = `<tr>
                                    <td>${value}</td>
                                    <td>${y}</td>
                                    <td>${R}</td>
                                    <td>${data.collision}</td>
                                    <td>${parseFloat(data.exectime).toFixed(2)}</td>
                                    <td>${curTime}</td>
                                </tr>`;
                table.innerHTML += content;

                localStorage.setItem('tableData', JSON.stringify(table.innerHTML));
            }); 
        }  
        else {
            if (value<= -2){
                showError("x need be >=-2", 3000);
            }
            if (value<= 2){
                showError("x need be <=2", 3000);
            }
            if (y < -3){
                showError("y need be >-3", 3000);
            }
            if (y > 5){
                showError("y  need be <5", 3000);
            }
            if (R > 4){
                showError("R need be <4", 3000);
            }
            if (R < 1){
                showError("R  need be >1", 3000);
            }
        }
    }
    
});
