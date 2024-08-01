var express = require("express");

var indexRouter = express.Router();

/* GET some route. */
indexRouter.get("/some-route", (req, res) => {
  res.send("Some response");
});

module.exports = indexRouter;
