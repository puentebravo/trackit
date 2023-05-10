const express = require("express");
const PORT = process.env.port || 3001;
const app = express();
const routes = require("./routes/apiRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      autoRemove: "native",
      touchAfter: 24 * 3600,
      crypto: {
        secret: process.env.ENCRYPT_SECRET,
      },
    }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server now listening on ${PORT}.`);
});
