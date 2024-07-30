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

router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;

    const result = await db.query(
      `SELECT i.id,
        i.amt,
        i.paid,
        i.add_date,
        i.paid_date
        c.name,
        c.description
        FROM invoices AS i
        INNER JOIN companies AS c ON (i.comp_code = c.code)
        WHERE id = $1`,
      [id]
    );
  } catch (err) {
    throw new ExpressError(`No such invoice ${id}`, 404);
  }
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
