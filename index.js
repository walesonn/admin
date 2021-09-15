const express = require("express");
require("dotenv/config");
const app = express();
app.use(express.json({ type: "application/json" }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/view");
require("./src/routes")(app);
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 80;
server.listen(PORT);

io.on("connect", (socket) => {
  console.log(socket.id);

  socket.on("auth", () => {
    io.to(socket.id).emit("auth", socket.id);
  });
});
