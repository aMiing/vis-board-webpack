var mysql = require("mysql"); //connection config
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "panelList",
});
if (connection) {
  return "link db success";
} else {
  return "link db fault";
}
