const SocketIOClient = require("socket.io-client");
module.exports = (app) => {
  app.get("/", (req, res) => {
    const socket = SocketIOClient.io("http://localhost");
    socket.emit("auth");
    socket.on("auth", (auth) => {
      return res.render("index", { auth: auth });
    });

    return res.status('404')
  });
};
