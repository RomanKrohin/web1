const form = document.getElementById('form');
const table = document.getElementById('result-table');
const error_div = document.getElementById('error_div');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const formData= new FormData(form)
    const x = x_values[x_values.length-1];
    const y = formData.get('y_field');
    const R = formData.get('R_field');

    formData.append('x_field', x);

    if (x >=-2 && x <=2 && y >-3 && y<5 && R>1 && R<4){
        fetch('php/script.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const content = `<tr>
                                <td>${x}</td>
                                <td>${y}</td>
                                <td>${R}</td>
                                <td>${data.collision}</td>
                            </tr>`
            table.innerHTML+= content;
        })
    }
    else{
        showError("Wrong data_JS", 3000)
    }

})

function showError(msg, delay){
    error_div.innerText= msg;

    setTimeout( function(){
        error_div.innerText="";
    }, delay);
}

let x_values= [];

document.querySelectorAll(".x_val").forEach(function(button){
    button.addEventListener("click", handler)
})

function handler(event){
    x_values.push(event.target.value);
}