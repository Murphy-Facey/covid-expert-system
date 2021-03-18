window.onload = function () {
  eel.get_other_symptoms()(add_symptoms);

  const tempRange = document.getElementById("tempRange");
  let userTemp = document.getElementById("userTemp");
  tempRange.oninput = () => {
    userTemp.innerHTML = tempRange.value;
  };
};

function add_symptoms(symptoms) {
  //   console.log(symptoms);
  var cardOptions = document.querySelector(".options");
  symptoms.forEach((symptom) => {
    let cleanString = symptom.replace(/_/g, " ");
    cardOptions.innerHTML += `
    <div class="checkbox-container">
        <input type="checkbox" id='${symptom}' class="checkbox-square" name='${symptom}'>
        <label for='${symptom}' class="checkbox-text"> ${cleanString}</label>
    </div>
    `;
  });
}
