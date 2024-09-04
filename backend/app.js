const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { HttpStatus, HttpResponseMessage } = require("./enums/httpError");
const auth = require("./middlewares/auth");
const authRoutes = require("./routes/auth");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
require("dotenv").config();
const cors = require('cors');
const { errors } = require("celebrate");
const { PORT = 3000 } = process.env;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(auth);

mongoose.set("strictQuery", false);
mongoose
  .connect(`${process.env.DB_URI}`)
  .then(() => console.log("MongoDB connect successfully"))
  .catch((err) => console.error("Mongo connection error", err));

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errors());

app.use('/', (req, res) => {
  return res
    .status(HttpStatus.NOT_FOUND)
    .send({ message: HttpResponseMessage.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Conectado a servidor`);
});
