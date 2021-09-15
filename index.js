const express = require("express");
const app = express();
app.use(express.json({ type: "application/json" }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/view");
require("./src/routes")(app);
const server = require("http").createServer(app);
const io = require("socket.io")(server);
server.listen(80);

io.on("connect", (socket) => {
  console.log(socket.id);

  socket.on("auth", () => {
    io.to(socket.id).emit("auth", socket.id);
  });
});
