const express = require("express");
const app = express();
app.use(express.json({ type: "application/json" }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/view");
const PORT = process.env.PORT || 80;
require("./src/routes")(app, PORT);
const server = require("http").createServer(app);
const io = require("socket.io")(server);
server.listen(PORT);

module.exports = { PORT };

io.on("connect", (socket) => {
  console.log(socket.id);

  socket.on("auth", () => {
    io.to(socket.id).emit("auth", socket.id);
  });
});
