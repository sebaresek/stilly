const express = require("express");
const router = express.Router();

const { createPreference  } = require('../constrollers/mercadopago');

router.post("/", createPreference )


module.exports= router