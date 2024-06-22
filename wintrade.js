const fs = require("fs");

const jsonToCsv = (jsonData) => {
  let csv = "";

  const headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";

  jsonData.forEach((obj) => {
    const values = headers.map((header) => obj[header]);
    csv += values.join(",") + "\n";
  });

  return csv;
};

const wintrade = async (req, res) => {
  try {
    // read input file
    let data = fs.readFileSync(req.file.path, "utf8");
    // convert csv to object
    let [keys, ...body] = data
      .split("\n")
      .map((item) => item.split(",").map((i) => i.trim()));
    keys = keys.map((item) => item.trim());
    const formatData = body.map((item) => {
      let object = {};
      keys.forEach((key, index) => (object[key] = item.at(index)));
      return object;
    });

    let result = formatData.sort((a, b) => {
      return (
        (b.Rating.split(":")[0] == "Robinson"
          ? b.Rating.split(":")[1] * 5
          : b.Rating.split(":")[1]) -
        (a.Rating.split(":")[0] == "Robinson"
          ? a.Rating.split(":")[1] * 5
          : a.Rating.split(":")[1])
      );
    });

    // convert back to csv and output
    csvData = jsonToCsv(result);
    fs.writeFile("output.csv", csvData, "utf-8", () => {
      console.log("Conversion successful. CSV file created.");
    });
  } catch (error) {
    res.status(403).json({
      status: 403,
      message: "error",
    });
  }
};

module.exports = { wintrade };
