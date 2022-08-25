const express = require('express');
const mysql = require("mysql2");
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
