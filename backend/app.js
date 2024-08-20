const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { HttpStatus, HttpResponseMessage } = require("./enums/httpError");
const auth = require("./middlewares/auth");
const authRoutes = require("./routes/auth");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
require("dotenv").config();
const { errors } = require("celebrate");

const { PORT } = process.env;
app.use(express.json());

app.use(authRoutes);

app.use(auth);


mongoose
  .connect("mongodb+srv://jsepulveda:tripleten2024@around.6vg4o.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Mongo connection error", err));

/* mongoose
  .connect(`mongodb://localhost:27017/aroundb`)
  .then(() => console.log("MongoDB connect successfully"))
  .catch((err) => console.error("Mongo connection error", err));
 */
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errors());

app.use('/', (req, res) => {
  return res
    .status(HttpStatus.NOT_FOUND)
    .send({ message: HttpResponseMessage.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
