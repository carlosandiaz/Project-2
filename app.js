require("dotenv").config();

const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/project-2", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(methodOverride('_method'))

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerPartial("formPartial", "{{_form_fields}}");

// default value for title local
app.locals.title = "Design & Development Books Repository";
app.locals.nav = "Navigation";
app.locals.footer = "Footer";

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const authorRouter = require("./routes/authors");
app.use("/authors", authorRouter);
const bookRouter = require("./routes/books");
app.use("/books", bookRouter);

module.exports = app;
