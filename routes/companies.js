const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.router();

// getting a list of all companies
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

// get info on a company
router.get("/:code", async function (req, res, next) {
    try {
      let code = req.params.code;
  
      const compResult = await db.query(
            `SELECT code, name, description
             FROM companies
             WHERE code = $1`,
          [code]
      );
  
      const invResult = await db.query(
            `SELECT id
             FROM invoices
             WHERE comp_code = $1`,
          [code]
      );

      if (compResult.rows.length === 0) {
        throw new ExpressError(`No matching company: ${code}`, 404)
      }

      const company = compResult.rows=[0];
      const invoice = invResult.rows;

      company.invoices = invoices.map(inv => inv.id);

      return res.json({"company": company});
    }
});
router.post("/", async function (req, res, next) {});
router.put("/", async function (req, res, next) {});
router.delete("/", async function (req, res, next) {});
