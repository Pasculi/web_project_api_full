const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { HttpStatus, HttpResponseMessage } = require("./enums/httpError");
const auth = require("./middlewares/auth");
const authRoutes = require("./routes/auth");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
require("dotenv").config();
const cors = require("cors");
const { errors } = require("celebrate");

/* app.use(cors({
  origin: '*', // Specify allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Allow sending cookies across origin
  allowedHeaders: ['Content-Type', 'Authorization']
})); */

const allowedOrigins = [
  "localhost:3000",
  "https://arounduspasculi.strangled.net",
  "https://www.arounduspasculi.strangled.net",
  "https://arounduspasculi.strangled.net/signin",
  "https://www.arounduspasculi.strangled.net/signin",
  "https://arounduspasculi.strangled.net/signup",
  "https://www.arounduspasculi.strangled.net/signup",
  "https://api.arounduspasculi.strangled.net",
  "https://api.arounduspasculi.strangled.net/signin",
  "https://api.arounduspasculi.strangled.net/signup",
];


app.use(function (req, res, next) {
  const {origin} = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(auth);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connect successfully"))
  .catch((err) => console.error("Mongo connection error", err));

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errors());

app.use("/", (req, res) => {
  return res
    .status(HttpStatus.NOT_FOUND)
    .send({ message: HttpResponseMessage.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Conectado a servidor en port ${PORT}`);
});
