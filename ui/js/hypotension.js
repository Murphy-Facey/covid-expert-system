window.onload = function () {
    eel.get_symptoms("low_blood_pressure")(add_symptoms);
}

function add_symptoms(symptoms) {
    console.log(symptoms);
}

function go_back() {
    document.location.href = 'http://localhost:8000/index.html';
}