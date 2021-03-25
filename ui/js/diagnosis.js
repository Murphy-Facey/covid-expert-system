window.onload = function () {
    var user_info = JSON.parse(localStorage.getItem("user_info"));
    // console.log(user_info);
    const { milds, severes, user_temp, user_name } = user_info;
    document.querySelector('.user-name').innerHTML = user_name;

    eel.have_covid(milds, severes, user_temp)(update);
};

function update(value) {
    var dia_info = "doesn't have any COVID-19 symptoms";
    
    if(value[0] == "mild") {
        dia_info = "have mild symptoms of COVID-19";
    } else if(value[0] == "severe") {
        dia_info = "have severe symptoms of COVID-19";
    }

    document.querySelector(".dia-info").innerHTML = dia_info;
    eel.update_statistics(value[0])(get_stats);
    
    eel.get_treatments(value[0])(set_treatments);
    console.log(value);
}

function get_stats(value) {
    document.querySelector(".total-value").innerHTML = value[0];
    var mild_persons = value[1] / value[0] * 100;
    var severe_persons = value[2] / value[0] * 100;
    document.querySelector(".mild-value").innerHTML = `${mild_persons.toFixed(1)}%`;
    document.querySelector(".severe-value").innerHTML =`${severe_persons.toFixed(1)}%`;

    console.log(value);
}

function set_treatments(value) {
    console.log(value);
    var treatments = document.querySelector('.treatment-list')
    for(var i of value) {
        treatments.innerHTML += `
        <li>${i}</li>
        `;
    }
}

function go_home() {
    document.location.href = "http://localhost:8000/index.html";
}
  