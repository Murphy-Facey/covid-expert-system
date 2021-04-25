window.onload = function () {
  eel.get_symptoms('mild')(add_mild_symptoms);
  eel.get_symptoms('severe')(add_severe_symptoms);

  const tempRange = document.getElementById("tempRange");
  let userTemp = document.getElementById("userTemp");
  tempRange.oninput = () => {
    userTemp.innerText = tempRange.value;
  };
};

function add_mild_symptoms(symptoms) {
  //   console.log(symptoms);
  var cardOptions = document.querySelector(".options");
  symptoms.forEach((symptom) => {
    let cleanString = symptom.replace(/_/g, " ");
    cardOptions.innerHTML += `
    <div class="checkbox-container">
      <div class="custom">
        <input type="checkbox" id="mild" class="checkbox-square" name="${symptom}">
        <div class="custom-checkbox"></div>
      </div>
      <label for='${symptom}' class="checkbox-text"> ${cleanString}</label>
    </div>
    `;
  });
}

function add_severe_symptoms(symptoms) {
  //   console.log(symptoms);
  var cardOptions = document.querySelector(".options");
  symptoms.forEach((symptom) => {
    let cleanString = symptom.replace(/_/g, " ");
    cardOptions.innerHTML += `
    <div class="checkbox-container">
        <div class="custom">
          <input type="checkbox" id="severe" class="checkbox-square" name="${symptom}">
          <div class="custom-checkbox"></div>
        </div>
        <label for='${symptom}' class="checkbox-text"> ${cleanString}</label>
    </div>
    `;
  });
}


function remove_user_exists() {
  var user_exists = document.getElementById("user_exists");
  
  if(user_exists.style.opacity !== 0)
    user_exists.style.opacity = 0;
}

function check_user_exists() {
  var user_name = document.getElementById('user-name').value;
  if(user_name === "") return;
  
  eel.user_exists(user_name)(check_diagnosis);
}

function check_diagnosis(user_exists) {
  if(user_exists) {
    document.getElementById("user_exists").style.opacity = 1;
    return;
  }

  var user_name = document.getElementById('user-name').value;
  var user_temp = document.getElementById('tempRange').value;
  var mild_symptoms = document.querySelectorAll('#mild:checked');
  var severe_symptoms = document.querySelectorAll('#severe:checked');

  var milds = [];
  var severes = [];

  mild_symptoms.forEach(value => {
    milds.push(value.getAttribute('name'));
  });

  severe_symptoms.forEach(value => {
    severes.push(value.getAttribute('name'));
  });

  localStorage.setItem("user_info", JSON.stringify({
    user_name,
    user_temp,
    milds,
    severes
  }));

  eel.add_user({
    "name": user_name,
    "temperature": user_temp,
    "mild_symptoms": milds,
    "severe_symptoms": severes
  })

  document.location.href = "http://localhost:8000/diagnosis.html";
}

function go_back() {
  document.location.href = "http://localhost:8000/frame3.html";
}
