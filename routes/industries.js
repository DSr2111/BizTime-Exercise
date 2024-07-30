const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.router();

router.post("/", async function (req, res, next) {
  try {
    let { industry } = req.body;

    const result = await db.query(
      `INSERT INTO industries (industry)
        VALUES ($1)
        RETURNING id, industry`,
      [industry]
    );

    return res.status(201).json({ industry: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(`
        SELECT i.industry, array_agg(ci.comp_code) AS company_codes
        FROM industries i
        LEFT JOIN company_industries ci ON i.id = ci.industry_id
        GROUP BY i.id
      `);

    return res.json({ industries: result.rows });
  } catch (err) {
    return next(err);
  }
});

router.post("/associate", async function (req, res, next) {
  try {
    let { comp_code, industry_id } = req.body;

    const result = await db.query(
      `INSERT INTO company_industries (comp_code, industry_id)
         VALUES ($1, $2)
         RETURNING comp_code, industry_id`,
      [comp_code, industry_id]
    );

    return res.status(201).json({ association: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});
