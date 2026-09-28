const express = require("express");
const cookieParser = require("cookie-parser");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());

// Routes
const authRouter = require("./routes/auth.route.js");
const accountRouter = require("./routes/account.route.js");
const transactionRoutes = require("./routes/transition.router.js");

// Test route
app.get("/", (req, res) => {
    res.send("Ledger Server Is up and running");
});
 
// API routes
app.use("/api/auth", authRouter);
app.use("/v1/api/account", accountRouter);
app.use("/api/transactions", transactionRoutes);

module.exports = app;