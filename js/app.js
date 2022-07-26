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

let allStores = [];
let tableFoot = document.querySelector("tfoot");

function CookieCity(name, min, max, avg) {
  this.ciudad = name;
  this.minCookiesPerHour = min;
  this.maxCookiesPerHour = max;
  this.avgCookiesPerCustomer = avg;
  this.dailyTotal = 0;
  this.cookiesPerHour = [];

  allStores.push(this);
}

CookieCity.prototype.randomCustomer = function () {
  return Math.floor(
    Math.random() * (this.maxCookiesPerHour - this.minCookiesPerHour + 1) +
      this.minCookiesPerHour
  );
};

CookieCity.prototype.totalCookiesPerHour = function () {
  for (let i = 0; i < storeHours.length; i++) {
    let customersPerHour = this.randomCustomer();
    this.cookiesPerHour[i] = Math.ceil(
      customersPerHour * this.avgCookiesPerCustomer
    );
    this.dailyTotal += this.cookiesPerHour[i];
  }
};
CookieCity.prototype.render = function () {
  this.totalCookiesPerHour();
  let tableBody = document.querySelector("tbody");
  let tableRow = document.createElement("tr");
  tableBody.appendChild(tableRow);
  let cityData = document.createElement("td");
  cityData.textContent = this.ciudad;
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

function footer() {
  let newTableRow = document.createElement("tr");
  tableFoot.appendChild(newTableRow);
  let totalRowTitle = document.createElement("td");
  totalRowTitle.textContent = "Hourly Total";
  newTableRow.appendChild(totalRowTitle);
  let finalTotal = 0;
  for (let i = 0; i < storeHours.length; i++) {
    let hourlyTotal = 0;
    for (let j = 0; j < allStores.length; j++) {
      hourlyTotal += allStores[j].cookiesPerHour[i];
      finalTotal += allStores[j].cookiesPerHour[i];
    }
    let tdElement = document.createElement("td");
    tdElement.textContent = hourlyTotal;
    newTableRow.appendChild(tdElement);
  }

  let grandTotals = document.createElement("td");
  grandTotals.textContent = finalTotal;
  newTableRow.appendChild(grandTotals);
}

function header() {
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

  let cityGT = document.createElement("td");
  cityGT.textContent = "Daily Location Totals";
  topTableRow.appendChild(cityGT);
}

let form = document.querySelector("form");

function handleSubmit(event) {
  event.preventDefault();
  let Ciudad = new CookieCity(
    event.target.Ciudad.value,
    parseInt(event.target.MaximumTotal.value),
    parseInt(event.target.MinimumTotal.value),
    parseInt(event.target.AvgPerPerson.value)
  );
  Ciudad.render();
  tableFoot.textContent = "";
  footer();
}

form.addEventListener("submit", handleSubmit);

new CookieCity("Seattle", 23, 65, 6.3);
new CookieCity("Tokyo", 3, 24, 1.2);
new CookieCity("Dubai", 11, 38, 3.7);
new CookieCity("Paris", 20, 38, 2.3);
new CookieCity("Lima", 2, 16, 4.6);

header();
for (let i = 0; i < allStores.length; i++) {
  allStores[i].render();
}
footer();
