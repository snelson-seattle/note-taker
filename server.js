const express = require("express");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

// Serve client assets
app.use(express.static("public"));

// Apply body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request routing
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening for requests on port ${PORT}`);
});
