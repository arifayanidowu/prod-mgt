const cors = require("cors");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const enforce = require("express-sslify");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const colors = require("colors");
const connectDB = require("./config/dbconn");

colors.enable();

dotenv.config();

connectDB();

// Routes
const auth = require("./routes/authRoutes");
const products = require("./routes/productsRoutes");
const comments = require("./routes/commentsRoute");

const errorHandler = require("./middleware/error");

const app = express();

// Force HTTPS Redirect
if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(express.json({ limit: "10kb" }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", auth);
app.use("/api/product", products);
app.use("/api/comment", comments);

app.use(errorHandler);

app.use(mongoSanitize());

//Set security headers to prevent XSS Attack
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Sanitize data to prevent XSS Attack
app.use(xss());

// Rate Limiting (max of 100 request per 10min) to prevent DoS attack
const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
});
app.use(limiter);
//Prevent http param polution
app.use(hpp());

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.use(
    favicon(path.join(__dirname, "client", "build", "favs", "favicon.ico"))
  );
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(
    `[Server]: running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
