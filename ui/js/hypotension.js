window.onload = function () {
    eel.get_symptoms("low_blood_pressure")(addSymptoms);
}

function addSymptoms(symptoms) {
    console.log(symptoms);
}