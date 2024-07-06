const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("ice.db");
const axios = require("axios");

var res = "";

axios
  .get("https://api.weather.gov/gridpoints/TOP/32,81/forecast")
  .then(function (response) {
    // handle success
    res = response.data.properties.periods[0].detailedForecast;
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS weather (tempurature INTEGER)");

      const stmt = db.prepare("INSERT INTO weather VALUES (?)");
      stmt.run(res);
      stmt.finalize();

      //stmt.run("Ipsum " + i);

      db.each("SELECT * FROM weather", (err, row) => {
        console.log(row.tempurature);
      });
    });

    db.close();
  });
