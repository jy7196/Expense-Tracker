if (process.env.NONE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("cookie-session");
const initializePassport = require("../passport-config.js");
const methodOverride = require("method-override");
const sql = require("mysql");
var con = sql.createConnection({
  host: "us-east.connect.psdb.cloud",
  user: "viiyz1e8ry673rgz1obi",
  password: "pscale_pw_wHUmb6M7mtXLmfJKbZtktr15cFiMF6cbRa58MfSEGBf",
  database: "users",
  ssl: {},
});
con.connect(function (err) {
  if (err) throw err;
});

const bcrypt = require("bcrypt");
app.engine("ejs", require("ejs").__express);
const path = require("path");
const { join } = require("path");
app.set("views", join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(flash());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "sec",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      rolling: true,
      maxAge: 1000 * 60 * 60 * 48,
      sameSite: "None",
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
initializePassport(passport, function getUser(email) {
  return new Promise((resolve) => {
    con.query(
      "SELECT budget,email, password, budget, data, name FROM account_info WHERE email = '" +
        email +
        "'",
      function (err, result) {
        if (err) throw err;
        resolve(result[0]);
      }
    );
  });
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.get("/index", checkNotAuthenticated, (req, res) => {
  res.render("index");
});
app.get("/userhome", checkAuthenticated, (req, res) => {
  try {
    con.query(
      "SELECT budget, data, name FROM account_info WHERE email = '" +
        req.user.email +
        "'",
      function (err, result) {
        if (err) throw err;
        res.render("userhome.ejs", {
          n: result[0].name,
          budget: result[0].budget,
          data: result[0].data,
        });
      }
    );
  } catch {
    res.render("index.ejs");
  }
});

app.post(
  "/index",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/userhome",
    failureRedirect: "/index",
    failureFlash: true,
  })
);


app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const mail = req.body.email;
    const name = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var expensedata = [{ expense: "", cost: 0 }];
    expensedata = JSON.stringify(expensedata);
    con.query(
      "INSERT INTO `account_info`(`email`, `password`, `name`, `budget`, `data` ) VALUES ('" +
        mail +
        "','" +
        hashedPassword +
        "','" +
        name +
        "', 0, '" +
        expensedata +
        "' )",
      async (err, res) => {
      }
    );
    res.redirect("/userhome");
  } catch {
    res.redirect("/register");
  }
});

app.post("/userhome", (req, res) => {
  try {
    con.query(
      "UPDATE account_info SET budget = '" +
        req.body.budget +
        "',  data = '" +
        req.body.data +
        "' WHERE email = '" +
        req.user.email +
        "'"
    );
    res.redirect("/userhome");
  } catch {
    res.redirect("/");
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/index");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/userhome");
  }
  return next();
}

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});
const port = process.env.port || 3000;
app.listen(port);
module.exports = app;
