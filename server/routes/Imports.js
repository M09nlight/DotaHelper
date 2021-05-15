function Imports() {
  const Router = require("express");
  const router = new Router();
  const express = require("express");
  const morgan = require("morgan");
  const cors = require("cors");
  const axios = require("axios");
  let DotaWebAPI = require("dota-web-api");
  let api = new DotaWebAPI("BACADDA8E857C66331F1BB6A7B52331A");
  require("dotenv").config();
  router.use(morgan("tiny"));
  router.use(cors());
  router.use(express.json());
}
module.exports = Imports;
