function get_started() {
  document.location.href = "http://localhost:8000/main.html";
}

function update_symptoms() {
  document.querySelector(
    ".container"
  ).innerHTML += `<div class="update-container">
        <div class="symptom-top">
            <input type="text" placeholder="Enter symptom here ..." class="symp"/>
            <div class="custom-select">
                <ul class="default-option" onclick="show_options()"></ul>
                <ul class="select-ul"></ul>
            </div>
        </div>
        <div class="symptom-body"></div>
        <div class="symptom-footer">
            <button onclick="close_container()">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <rect x="15.5563" width="4" height="22" rx="2" transform="rotate(45 15.5563 0)" fill="#FF4F5A"/>
                    <rect y="2.82843" width="4" height="22" rx="2" transform="rotate(-45 0 2.82843)" fill="#FF4F5A"/>
                </svg>
            </button>
            <button onclick="add_symptom()">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="9" width="4" height="22" rx="2" fill="#4DEC4A"/>
                    <rect y="13" width="4" height="22" rx="2" transform="rotate(-90 0 13)" fill="#4DEC4A"/>
                </svg>
            </button>
        </div>
    </div>
    `;
  eel.get_types()(add_types);
}

function on_select(name) {
  console.log(document.querySelector(`.select-ul .${name}`).parentElement);
  if (name == "hypotension") {
    eel.get_symptoms("low_blood_pressure")(set_symptoms);
  } else {
    eel.get_symptoms(name)(set_symptoms);
  }
  document.querySelector(
    ".default-option li"
  ).innerHTML = document.querySelector(
    `.select-ul .${name}`
  ).parentElement.innerHTML;
  document.querySelector(".custom-select").classList.remove("active");
}

function show_options() {
  document.querySelector(".custom-select").classList.toggle("active");
}

function add_types(types) {
  let default_option = document.querySelector(".default-option");
  let other_option = document.querySelector(".select-ul");
  types = uniq_fast(types);
  types[types.indexOf("low_blood_pressure")] = "hypotension";

  default_option.innerHTML = `<li>
            <div class="option ${types[0]}">
                <p>${types[0]}</p>
            </div>
        </li>
    `;

  for (var item of types) {
    other_option.innerHTML += `
        <li onclick="on_select('${item}')">
            <div class="option ${item}">
                <p>${item}</p>
            </div>  
        </li>
        `;
  }

  eel.get_symptoms("low_blood_pressure")(set_symptoms);
}

function set_symptoms(symptoms) {
  let symptoms_list = document.querySelector(".symptom-body");
  let type = document.querySelector(".default-option .option").innerText;

  console.log(symptoms);

  symptoms_list.innerHTML = "";

  for (var item of symptoms) {
    symptoms_list.innerHTML += `
        <div class="symptom ${item}">
            <p>Type: <span>${type}</span><p>
            <p>Symptom: <span>${item}</span></p>
            <svg height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg" onclick="remove_symptom('${item}')">
                <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/>
                <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
            </svg>
        </div>
        `;
  }
}

function uniq_fast(array) {
  var seen = {};
  var out = [];
  var len = array.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = array[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

function close_container() {
  var child = document.querySelector(".update-container");
  document.querySelector(".container").removeChild(child);
}

function add_symptom() {
  var symp = document.querySelector(".symp");
  let type = document.querySelector(".default-option .option").innerText;

  if (type == "hypotension") {
    type = "low_blood_pressure";
  }

  if (symp.value !== "") {
    eel.update_symptoms(type, symp.value);

    if (type == "low_blood_pressure") {
      type = "hypotension";
    }

    document.querySelector(".symptom-body").innerHTML += `
        <div class="symptom ${symp.value}">
            <p>Type: <span>${type}</span><p>
            <p>Symptom: <span>${symp.value}</span></p>
            <svg height="427pt" viewBox="-40 0 427 427.00131" width="427pt" xmlns="http://www.w3.org/2000/svg"  onclick="remove_symptom('${symp.value}')">
                <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/>
                <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
            </svg>
        </div>
        `;

    symp.value = "";
  }
}

function remove_symptom(symptom) {
  let type = document.querySelector(".default-option .option").innerText;
  var child = document.querySelector(`.${symptom}`);
  console.log(child);

  if (type == "hypotension") {
    type = "low_blood_pressure";
  }

  document.querySelector(".symptom-body").removeChild(child);
  eel.remove_symptom(type, symptom);
}
