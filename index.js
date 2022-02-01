const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const joi = require("joi");
const moment = require("moment");
const csv = require("csv-parser");
const fs = require("fs");
const rtlArabic = require("rtl-arabic");
var xlsx = require("xlsx");
//app.use(express.static("centra-client/src/media"));

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => res.json({ msg: "Hello World" }));
//app.use(express.static("centra-client/build"));

function readData(sheetName) {
  var wb = xlsx.readFile(sheetName, { cellStyles: true });

  var sheetValue = wb.Sheets[wb.SheetNames[0]];
  //console.log(sheetValue);
  const cells = Object.entries(sheetValue).filter(
    ([cell]) => !cell.startsWith("!")
  );

  const coloredCells = cells.filter(([cell, value]) => {
    if (cell.startsWith("J") && value.s.fgColor != undefined && value.s.fgColor.rgb!=undefined ) { //If The Cell Is Colored
      //console.log(cell,value.s.fgColor.rgb)
      return value.s && value.s.bgColor;
    }
  });
 
  for (const [cell, value] of coloredCells) {
    console.log(cell, value.w);
    var row = cell.substring(1)
    try {
      xlsx.utils.sheet_add_aoa(sheetValue, [['NEW VALUE from NODE']], {origin: 'AI16'});
    } catch (err1) {
      console.log(err1)
      
    }
    
  }
  //xlsx.writeFile(wb, sheetName);
  var excelData = xlsx.utils.sheet_to_json(sheetValue, {
    header: "A",
    defval: 0,
  });
  //console.log(excelData)
  //Arabic Text at C D E AA
  //Col header at row [2] and [3]
  var title = excelData[0].A;
  return { title, excelData };
  console.log(title);
}

function getById(excelData, id) {
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

function checkDataIntegrity(excelData) {}
//Testing
const { title, excelData } = readData("data2.xlsx");

checkDataIntegrity(excelData);
const messageList = require("./twilo");
//messageList.test();
//messageList.sendMessage(getById(excelData,6), title);

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
