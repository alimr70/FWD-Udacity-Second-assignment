// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const PORT = 8080;

// Initialize Server
const server = app.listen(PORT, () => {
  console.log("Server is runnig on port: " + PORT);
});

// Setup routes
// Get routes
app.get("/data", (req, res) => {
  res.send(projectData);
});

// Post routes
app.post("/saveData", (req, res) => {
  const data = req.body;
  let newData = {
    temperature: data.temperature,
    date: data.date,
    userResponse: data.userResponse,
  };

  try {
    projectData = { ...newData };
    console.log("Data saved");
    res.send(projectData);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
});
