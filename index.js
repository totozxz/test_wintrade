const func = require("./wintrade");

const express = require("express");
const app = express();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello World"));
app.post("/wintrade", upload.single("file"), async (req, res) => {
  await func.wintrade(req, res);
  res.send("Done");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
module.exports = app;

//------------------------------------------------------------
