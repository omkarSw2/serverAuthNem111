const express = require("express");
const app = express();
const connection = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { auth } = require("./Middleware/authMiddleware");

app.use(express.json());

// Home Page
app.get("/", (req, res) => {
  res.status(200).send("<h1>Home Page</h1");
});
// About Page
app.get("/about", (req, res) => {
  res.status(200).send("<h1>About Page</h1");
});
// Movies Page
app.get("/movies", auth, (req, res) => {
  res.status(200).send("<h1>Movies Page</h1>");
});
// Series Page
app.get("/series", auth, (req, res) => {
  res.status(200).send("<h1>Series Page</h1>");
});

app.use("/users", userRouter);

app.listen(8080, async (req, res) => {
  try {
    await connection;
    console.log("Connected to the  DB");
    console.log("Server is runinig on the Port  http://localhost:8080");
  } catch (error) {
    console.log(error);
  }
});
