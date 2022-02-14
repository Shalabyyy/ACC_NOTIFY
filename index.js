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
const messageList = require("./twilo");

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => res.json({ msg: "Hello World" }));
//app.use(express.static("centra-client/build"));

function getIDListLabour(sheetValue) {
  const cells = Object.entries(sheetValue).filter(
    ([cell]) => !cell.startsWith("!")
  );

  const coloredCells = cells.filter(([cell, value]) => {
    if (
      cell.startsWith("J") &&
      value.s.fgColor != undefined &&
      value.s.fgColor.rgb != undefined
    ) {
      //If The Cell Is Colored at Col J
      //console.log(cell,value.s.fgColor.rgb)
      return value.s && value.s.bgColor;
    }
  });

  var ammends = [];
  const coloredCellsAmmends = cells.filter(([cell, value]) => {
    if (
      cell.startsWith("E") &&
      value.s.fgColor != undefined &&
      value.s.fgColor.rgb != undefined
    ) {
      //If The Cell Is Colored at Col E
      //console.log(cell,value.s.fgColor.rgb)
      var row = cell.substring(1);
      ammends.push(parseInt(sheetValue["B" + row].w));
      return value.s && value.s.bgColor;
    }
  });

  //console.log("To Be Removed", ammends);
  var perItemPay = [];
  for (const [cell, value] of coloredCells) {
    var row = cell.substring(1);
    var user_id = parseInt(sheetValue["B" + row].w);
    if (!ammends.includes(user_id)) {
      perItemPay.push(user_id);
    }
    //console.log(cell, value.w,sheetValue["A"+row].w);
  }
  return perItemPay;
}

function readData(sheetName) {
  var wb = xlsx.readFile(sheetName, { cellStyles: true });

  var sheetValue = wb.Sheets[wb.SheetNames[0]];
  //console.log(sheetValue);
  const filterIDs = getIDListLabour(sheetValue);
  console.log(filterIDs);
  //xlsx.writeFile(wb, sheetName);
  var excelData = xlsx.utils.sheet_to_json(sheetValue, {
    header: "A",
    defval: 0,
  });

  var title = excelData[0].A;
  return { title, excelData, filterIDs };
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

//Testing
const { title, excelData, filterIDs } = readData("data2.xlsx");

//messageList.test();
//console.log(getById(excelData,16))
//messageList.sendMessage(getById(excelData,16), title,filterIDs);

app.get("/:id1/:id2", (req, res) => {
  if (req.params.id2 == 0) {
    return res.json({ Result: getById(excelData, req.params.id1) });
  } else {
    var result = [];
    try {
      console.log(req.params.id1, req.params.id2);
      const id1 = parseInt(req.params.id1);
      const id2 = parseInt(req.params.id2);
      for (var i = id1; i < id2; i++) {
        console.log(i);
        result.push(getById(excelData, i));
      }
      return res.json({ Result: result });
    } catch (error) {
      return res.json({ Error: "Error While compiling sheet" });
    }
  }
});

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "centra-client", "build", "index.html"));
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.listen(process.env.PORT || 4000, () =>
  console.log(`App listening on port ${process.env.PORT || 4000}`)
);
