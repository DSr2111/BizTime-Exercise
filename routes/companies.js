const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.router();

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT code, name
        FROM companies
        ORDER BY name`
    );
    return res.json({ companies: result.rows });
  } catch (err) {
    return next(err);
  }
});
router.get("/", async function (req, res, next) {});
router.post("/", async function (req, res, next) {});
router.put("/", async function (req, res, next) {});
router.delete("/", async function (req, res, next) {});
