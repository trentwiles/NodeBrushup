const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("new.db");

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS allOfTheTexts (txt INTEGER, ts INTEGER)");

    const stmt = db.prepare("DELETE FROM allOfTheTexts WHERE 1=1");
    stmt.run();
    stmt.finalize();

    var things = ["Monday", "Sunday", "Thursday"]
    function handle(item){
        var ts = Math.floor(new Date().getTime() / 1000)
        const x = db.prepare("INSERT INTO allOfTheTexts VALUES (?, ?)");
        x.run(item, ts);
        x.finalize();
    }
    things.forEach(handle)

    //stmt.run("Ipsum " + i);

    db.each("SELECT * FROM allOfTheTexts", (err, row) => {
      console.log(row);
    });
  });