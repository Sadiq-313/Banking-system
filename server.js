const dotenv = require("dotenv");
dotenv.config();
const express = require('express');


const app = require("./api/app.js");

const connectionDB = require("./api/config/db.js");

const PORT = process.env.PORT || 5000;

// Database connection
connectionDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app