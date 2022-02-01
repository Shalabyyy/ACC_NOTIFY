const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const joi = require("joi");
const moment = require("moment");
const csv = require("csv-parser");
const fs = require("fs");
const rtlArabic = require("rtl-arabic");

//app.use(express.static("centra-client/src/media"));

app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => res.json({ msg: "Hello World" }));
//app.use(express.static("centra-client/build"));

var text = "يوسف زكي شلبي";
console.log(text);
var convertedText = rtlArabic(text);
console.log(convertedText);

var xlsx = require("xlsx");
var wb = xlsx.readFile("data.xlsx");
var sheetValue = wb.Sheets[wb.SheetNames[0]];
//console.log(sheetValue);
var excelData = xlsx.utils.sheet_to_json(sheetValue, {
  header: "A",
  defval: 0,
});

//Arabic Text at C D E AA
//Col header at row [2] and [3]
const title = excelData[0].A;
//console.log(title);

function getById(id) {
  const query = excelData.filter(function (el) {
    return el.A == id;
  })[0];
  if (query == null) {
    console.log("No Results Found");
    return null;
  } else {
    console.log("Query Result: ", query);
    return query;
  }
}
//getById(6);
const messageList = require("./twilo");
messageList.test();
messageList.sendMessage(getById(6), title);

console.log(975.7633333333332);
console.log(

);
app.get("/excel/:id", (req, res) => {
  return res.json({ Result: getById(req.params.id) });
});

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "centra-client", "build", "index.html"));
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.listen(process.env.PORT || 4000, () =>
  console.log(`App listening on port ${process.env.PORT || 4000}`)
);
