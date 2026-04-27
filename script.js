// WEATHER API
const weatherBtn = document.getElementById("getWeatherBtn");

if (weatherBtn) {
  weatherBtn.addEventListener("click", function() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "35b17ae6b5abf37a2589f0f98d23a1e1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          document.getElementById("weatherResult").innerHTML = `
            <h4>Weather in ${data.name}</h4>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Conditions: ${data.weather[0].description}</p>
          `;
        } else {
          document.getElementById("weatherResult").innerHTML = `<p>City not found!</p>`;
        }
      });
  });
}

// STUDY TIMER
const timerBtn = document.getElementById("startTimerBtn");
let timerInterval;

if (timerBtn) {
  timerBtn.addEventListener("click", function() {
    clearInterval(timerInterval);

    let minutes = parseInt(document.getElementById("studyMinutes").value);
    let timeLeft = minutes * 60;

    timerInterval = setInterval(() => {
      let min = Math.floor(timeLeft / 60);
      let sec = timeLeft % 60;
      document.getElementById("timerDisplay").textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
      }
    }, 1000);
  });
}

// DINING API
const mealBtn = document.getElementById("searchMealBtn");

if (mealBtn) {
  mealBtn.addEventListener("click", function() {
    const mealQuery = document.getElementById("mealInput").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealQuery}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const mealDiv = document.getElementById("mealResults");
        mealDiv.innerHTML = "";

        if (data.meals) {
          data.meals.forEach(meal => {
            const card = document.createElement("div");
            card.classList.add("card", "p-3", "mb-3");

            card.innerHTML = `
              <h4>${meal.strMeal}</h4>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
              <p>Category: ${meal.strCategory}</p>
              <p>Area: ${meal.strArea}</p>
            `;

            mealDiv.appendChild(card);
          });
        } else {
          mealDiv.innerHTML = `<p>No meals found!</p>`;
        }
      });
  });
}