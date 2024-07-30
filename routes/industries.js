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
