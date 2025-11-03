const express = require("express");
module.exports = (db) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  router.post("/", (req, res) => {
    const { name, price, stock } = req.body;
    db.query("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock],
      (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, price, stock });
      });
  });

  router.put("/:id", (req, res) => {
    const { name, price, stock } = req.body;
    db.query("UPDATE products SET name=?, price=?, stock=? WHERE id=?",
      [name, price, stock, req.params.id],
      (err) => {
        if (err) throw err;
        res.json({ message: "Updated" });
      });
  });

  router.delete("/:id", (req, res) => {
    db.query("DELETE FROM products WHERE id=?",
      [req.params.id],
      (err) => {
        if (err) throw err;
        res.json({ message: "Deleted" });
      });
  });

  return router;
};
