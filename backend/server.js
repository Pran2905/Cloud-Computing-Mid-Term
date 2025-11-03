const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "db",
  user: "root",
  password: "password",
  database: "toko_swalayan"
};

// fungsi untuk mencoba koneksi berulang
function connectWithRetry() {
  const db = mysql.createConnection(dbConfig);
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("Connected to MySQL database");
      app.use("/api/products", require("./routes/products")(db));
    }
  });
}
connectWithRetry();

app.get("/", (req, res) => res.send("Toko Swalayan API"));
app.listen(3000, () => console.log("Server running on port 3000"));

