window.onload = function () {
  eel.get_symptoms("low_blood_pressure")(add_symptoms);
};

function add_symptoms(symptoms) {
  //   console.log(symptoms);
  var cardOptions = document.getElementById("inner-card-scroll");
  symptoms.forEach((symptom) => {
    cardOptions.innerHTML += `
    <div class="option-card">
        <div class="custom">
            <input type="checkbox" id='${symptom}' class="checkbox-square" name='${symptom}'>
            <div class="custom-checkbox"></div>
        </div>
        <label for='${symptom}' class="checkbox-text"> ${symptom}</label>
    </div>
    `;
  });
}

function toggle_hypotension_message(option) {
  var opposite = option == "show" ? "hide" : "show";
  var green_box = document.querySelector(".green-rectangle");
  if (!green_box.classList.contains(`.${option}-status`)) {
    green_box.classList.add(`${option}-status`);
    green_box.classList.remove(`${opposite}-status`);
  }
}

function submit_symptoms() {
  var symptoms = document.querySelectorAll(".checkbox-square:checked");
  //   console.log("symptoms-------->", symptoms);
  if (symptoms.length > 0) {
    toggle_hypotension_message("hide");
    document.querySelector(".card-2").style.display = "flex";
    document.querySelector(".card-3").style.display = "flex";
  } else {
    toggle_hypotension_message("show");
    document.querySelector(".card-2").style.display = "none";
    document.querySelector(".card-3").style.display = "none";
  }
}

function check_diagnosis() {
  var user_systolic = document.getElementById("user_systolic").value;
  var user_diastolic = document.getElementById("user_diastolic").value;

  if (user_systolic != "" && user_diastolic != "") {
    eel.check_level(user_diastolic, user_systolic)(have_hypotension);
  }
}

function have_hypotension(value) {
  var textBox = document.getElementById("green-rectangle-span");
  var green_box = document.querySelector(".green-rectangle");
  if (value[0]) {
    green_box.classList.add("status-red");
  } else {
    green_box.classList.contains("status-red")
      ? green_box.classList.remove("status-red")
      : null;
  }
  textBox.innerText = value[0] == 1 ? "may" : `don't`;
  toggle_hypotension_message("show");
}

function more_hypotension_info() {
  window.open(
    "https://www.webmd.com/heart/understanding-low-blood-pressure-basics#:~:text=Hypotension%20is%20the%20medical%20term,less%20than%2090%2F60).&text=A%20blood%20pressure%20reading%20appears,and%20fills%20them%20with%20blood."
  );
}

function go_back() {
  document.location.href = "http://localhost:8000/index.html";
}

function next_page() {
  document.location.href = "http://localhost:8000/main.html";
}