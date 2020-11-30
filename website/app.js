/* Global Variables */
const generateBtn = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const dateEl = document.querySelector("#date");
const tempEl = document.querySelector("#temp");
const contentEl = document.querySelector("#content");

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=c60b79ccd2f8b0ae6edd4d8b94396949";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Get data function
const getData = async (url, zipCode, key) => {
  const request = await fetch(url + zipCode + key);
  try {
    const data = await request.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Post data function
const saveData = async (temp, date, userFeelings) => {
  let data = {
    temperature: temp,
    date: date,
    userResponse: userFeelings,
  };

  const request = await fetch("/saveData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const response = await request.json();
    return response;
  } catch (err) {
    console.error(err);
  }
};

// Update UI function
const updateUI = async () => {
  const request = await fetch("/data");
  try {
    const data = await request.json();

    dateEl.textContent = "Date: " + data.date;
    tempEl.textContent = "Temprature: " + data.temperature;
    contentEl.textContent = "Your feeling: " + data.userResponse;
    zip.value = "";
    feelings.value = "";
  } catch (err) {
    console.error(err);
  }
};

// Submit data function
const submitData = (e) => {
  // Prevent page reload
  e.preventDefault();

  // Initialize click functionality
  try {
    getData(baseURL, zip.value, apiKey)
      .then((data) => {
        saveData(data.main.temp, newDate, feelings.value);
      })
      .then((data) => {
        updateUI();
      });
  } catch (err) {
    console.error(err);
  }
};

// If the page refresh. This won't lose old data
updateUI();

// Get data and submit
generateBtn.addEventListener("click", submitData);
