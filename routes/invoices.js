const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, comp_code
        FROM invoices
        ORDER BY id`
    );
    return res.json({ invoices: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
  } catch (err) {}
});

router.post("/", async function (req, res, next) {
  try {
  } catch (err) {}
});

router.put("/", async function (req, res, next) {
  try {
  } catch (err) {}
});

router.delete("/", async function (req, res, next) {
  try {
  } catch (err) {}
});
