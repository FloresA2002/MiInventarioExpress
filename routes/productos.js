const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");
const auth = require("../middlewares/auth");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

// Multer config

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes"));
    }
  },
});


// 🔹 LISTAR
router.get("/", auth, async (req, res) => {
  const productos = await Producto.find().lean();
  res.render("productos/list", { productos });
});

// 🔹 FORM CREAR
router.get("/crear", auth, (req, res) => {
  res.render("productos/form");
});

// 🔹 CREAR
router.post(
  "/crear",
  auth,
  upload.single("imagen"),
  [
    body("nombre").notEmpty().withMessage("Nombre requerido"),
    body("precio").isFloat({ gt: 0 }).withMessage("Precio inválido"),
    body("descripcion").notEmpty().withMessage("Descripción requerida"),
  ],
  async (req, res) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("productos/form", {
        errores: errores.array(),
        producto: { ...req.body },
      });
    }

    const { nombre, precio, descripcion } = req.body;

    await Producto.create({
      nombre,
      precio,
      descripcion,
      imagen: req.file ? req.file.filename : null,
    });

    res.redirect("/productos");
  }
);

// 🔹 EDITAR
router.get("/editar/:id", auth, async (req, res) => {
  const producto = await Producto.findById(req.params.id).lean();
  res.render("productos/form", { producto });
});

router.post(
  "/editar/:id",
  auth,
  upload.single("imagen"),
  [
    body("nombre").notEmpty().withMessage("Nombre requerido"),
    body("precio").isFloat({ gt: 0 }).withMessage("Precio inválido"),
  ],
  async (req, res) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.render("productos/form", {
        errores: errores.array(),
        producto: { ...req.body, _id: req.params.id },
      });
    }

    const { nombre, precio, descripcion } = req.body;

    const data = { nombre, precio, descripcion };

    if (req.file) {
      data.imagen = req.file.filename;
    }

    await Producto.findByIdAndUpdate(req.params.id, data);

    res.redirect("/productos");
  }
);

// 🔹 ACTUALIZAR


// 🔹 ELIMINAR
router.get("/eliminar/:id", auth, async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect("/productos");
});

module.exports = router;