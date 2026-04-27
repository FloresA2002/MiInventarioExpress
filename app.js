const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔹 Conexión MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/inventario")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// 🔹 Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// 🔹 Sesiones
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

// 🔹 Pasar usuario a vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// 🔹 Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// 🔹 Rutas
const productoRoutes = require("./routes/productos");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

app.use("/productos", productoRoutes);
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

// 🔹 Redirección principal
app.get("/", (req, res) => {
  res.redirect("/productos");
});

// 🔌 SOCKET.IO (CHAT)
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("mensaje", (data) => {
    // data = { user, msg }
    io.emit("mensaje", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// 🔹 Servidor
server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});