const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");


// 🔹 LOGIN FORM
router.get("/login", (req, res) => {
  res.render("auth/auth");
});

// 🔹 LOGIN
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Usuario requerido"),
    body("password").notEmpty().withMessage("Contraseña requerida"),
  ],
  async (req, res) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("auth/login", {
        errores: errores.array(),
      });
    }

    const { username, password } = req.body;

    const user = await Usuario.findOne({ username });

    if (!user) {
      return res.render("auth/login", {
        errores: [{ msg: "Usuario no encontrado" }],
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.render("auth/login", {
        errores: [{ msg: "Contraseña incorrecta" }],
      });
    }

    req.session.user = user;
    res.redirect("/productos");
  }
);

// 🔹 REGISTRO FORM
router.get("/registro", (req, res) => {
  res.render("auth/auth");
});

// 🔹 REGISTRO
router.post(
  "/registro",
  [
    body("username")
      .notEmpty().withMessage("Usuario requerido")
      .isLength({ min: 3 }).withMessage("Mínimo 3 caracteres en : Usuario"),

    body("password")
      .isLength({ min: 3 }).withMessage("Mínimo 3 caracteres en : Contraseña"),
  ],
  async (req, res) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("auth/registro", {
        errores: errores.array(),
      });
    }

    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    await Usuario.create({ username, password: hash });

    res.redirect("/auth/login");
  }
);

// 🔹 LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;