"use strict";

let seattle = {
  name: "Seattle",
  min: 23,
  max: 65,
  avg: 6.3,
  cookiesSoldEachHourArray: [],
  randomNumberCustomers: function () {
    //
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    //console.log
  },
  calcCookieSales: function () {
    //console.log
    let custThisHour = this.randomNumberCustomers();
    console.log(custThisHour);
  },
  render: function () {},
};

seattle.randomNumberCustomers = function () {};

console.log(seattle.randomNumberCustomers());
