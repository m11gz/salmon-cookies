"use strict";

// console.log('hello');

let storeHours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12am",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

function CookieCity(name, min, max, avg) {
  this.cityName = name;
  this.minCookiesPerHour = min;
  this.maxCookiesPerHour = max;
  this.avgCookiesPerCustomer = avg;
  this.dailyTotal = 0;
  this.cookiesPerHour = [];

  this.randomCustomer = function () {
    return Math.floor(
      Math.random() * (this.maxCookiesPerHour - this.minCookiesPerHour + 1) +
        this.minCookiesPerHour
    );
  };

  this.totalCookiesPerHour = function () {
    for (let i = 0; i < storeHours.length; i++) {
      let customersPerHour = this.randomCustomer();
      this.cookiesPerHour[i] = Math.ceil(
        customersPerHour * this.avgCookiesPerCustomer
      );
      this.dailyTotal += this.cookiesPerHour[i];
    }
  };

  this.render = function () {
    this.totalCookiesPerHour();
    let tableBody = document.querySelector("tbody");
    let tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);
    let cityData = document.createElement("td");
    cityData.textContent = this.cityName;
    tableRow.appendChild(cityData);

    for (let i = 0; i < storeHours.length; i++) {
      let tableCookiesPerHour = document.createElement("td");
      tableCookiesPerHour.textContent = this.cookiesPerHour[i];
      tableRow.appendChild(tableCookiesPerHour);
    }

    let cityDailyTotal = document.createElement("td");
    cityDailyTotal.textContent = this.dailyTotal;
    tableRow.appendChild(cityDailyTotal);
  };
}

let seattle = new CookieCity("Seattle", 23, 65, 6.3);
let tokyo = new CookieCity("Tokyo", 3, 24, 1.2);
let dubai = new CookieCity("Dubai", 11, 38, 3.7);
let paris = new CookieCity("Paris", 20, 38, 2.3);
let lima = new CookieCity("Lima", 2, 16, 4.6);

seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();

let tableFoot = document.querySelector("tfoot");
let newTableRow = document.createElement("tr");
tableFoot.appendChild(newTableRow);
let totalRowTitle = document.createElement("td");
totalRowTitle.textContent = "Hourly Total";
newTableRow.appendChild(totalRowTitle);

for (let i = 0; i < storeHours.length; i++) {
  let hourlyTotals = document.createElement("td");
  hourlyTotals.textContent =
    seattle.cookiesPerHour[i] +
    tokyo.cookiesPerHour[i] +
    dubai.cookiesPerHour[i] +
    paris.cookiesPerHour[i] +
    lima.cookiesPerHour[i];
  newTableRow.appendChild(hourlyTotals);
}

let grandTotals = document.createElement("td");
grandTotals.textContent =
  seattle.dailyTotal +
  tokyo.dailyTotal +
  dubai.dailyTotal +
  paris.dailyTotal +
  lima.dailyTotal;
newTableRow.appendChild(grandTotals);

let tableHead = document.querySelector("thead");
let topTableRow = document.createElement("tr");
tableHead.appendChild(topTableRow);
let hoursRow = document.createElement("td");
hoursRow.textContent = "Store Hours";
topTableRow.appendChild(hoursRow);

for (let i = 0; i < storeHours.length; i++) {
  let everyHourRow = document.createElement("td");
  everyHourRow.textContent = storeHours[i];
  topTableRow.appendChild(everyHourRow);
}

let cityGrandTotals = document.createElement("td");
cityGrandTotals.textContent = "Daily Location Totals";
topTableRow.appendChild(cityGrandTotals);

let form = document.querySelector("form");

function handleSubmit(event) {
  event.preventDefault();
  let CityName = new CookieCity(
    event.target.CityName.value,
    parseInt(event.target.MaximumTotal.value),
    parseInt(event.target.MinimumTotal.value),
    parseInt(event.target.AvgPerPerson.value)
  );
  CityName.render();
}

form.addEventListener("submit", handleSubmit);
